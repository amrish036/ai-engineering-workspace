import OpenAI from 'openai';
import { generateEmbedding, sql } from '@/lib';

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function GET(request: Request) {
  const question = new URL(request.url).searchParams.get('question') || '';

  // 1. Generate embedding
  const embedding = await generateEmbedding(question);

  // 2. Retrieve relevant chunks
  const results = await sql`
    SELECT
      file,
      content,

      embedding <=> ${JSON.stringify(embedding)}::vector AS distance

    FROM code_embeddings

    ORDER BY distance ASC

    LIMIT 5
  `;

  // 3. Build context
  const context = results.map((result) => `FILE: ${result.file}\n${result.content}`).join('\n\n');

  // 4. Stream response
  const completion = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',

    stream: true,

    messages: [
      {
        role: 'system',
        content: 'You are an expert AI engineering assistant.',
      },

      {
        role: 'user',
        content: `
Question:
${question}

Repository Context:
${context}

Answer using the repository context.
`,
      },
    ],
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of completion) {
        const text = chunk.choices[0]?.delta?.content || '';

        controller.enqueue(encoder.encode(text));
      }

      controller.close();
    },
  });

  return new Response(stream);
}
