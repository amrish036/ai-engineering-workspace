import OpenAI from 'openai';
import { generateEmbedding, searchSimilarChunks } from '@/lib';

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function GET(request: Request) {
  try {
    const question = new URL(request.url).searchParams.get('question') || '';
    if (!question.trim()) {
      return new Response('Question required', { status: 400 });
    }
    // 1. Generate embedding
    const queryEmbedding = await generateEmbedding(question);

    const similarChunks = await searchSimilarChunks({
      embedding: queryEmbedding,
      limit: 5,
    });

    const limitedChunks = similarChunks.slice(0, 5);

    console.log(limitedChunks.map((chunk) => chunk.file_path));

    console.log(
      limitedChunks.map((chunk) => ({
        file: chunk.file_path,
        preview: chunk.content.slice(0, 200),
      }))
    );

    // 3. Build context
    const context = limitedChunks
      .map(
        (chunk) => `
FILE: ${chunk.file_path}

CODE:
${chunk.content}
`
      )
      .join('\n\n====================\n\n');



    // 4. Stream response
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      stream: true,
      messages: [
        {
          role: 'system',
          content: `You are an AI repository assistant.

Use ONLY the provided repository context.

When answering:
- Mention relevant file names.
- Explain implementation details from the code.
- Do not make up functionality.
- If the answer is not in the context, say you could not find relevant information in the repository.
- Keep answers concise and technical.`,
        },
        {
          role: 'user',
          content: `
USER QUESTION:
${question}

REPOSITORY CONTEXT:
${context}

Answer the question using ONLY the repository context above.
Reference relevant files when possible.
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
  } catch (error) {
    console.error('Repo chat error:', error);

    return new Response(
      'Something went wrong while processing the repository chat.',
      {
        status: 500,
      }
    );
  }
}
