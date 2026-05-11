import OpenAI from 'openai';
import { generateEmbedding, getProjectFiles, cosineSimilarity, chunkCode } from '@/lib'


const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function GET() {
  const question = 'Explain how the AI routes work in this project';

  // 1. Read project files
  const files = await getProjectFiles();

  // 2. Chunk files
  const chunks = files.flatMap((file) => chunkCode(file.file, file.content));

  // 3. Embed question
  const queryEmbedding = await generateEmbedding(question);

  // 4. Score chunks
  const scoredChunks = await Promise.all(
    chunks.map(async (chunk) => {
      const embedding = await generateEmbedding(chunk.content);

      const score = cosineSimilarity(queryEmbedding, embedding);

      return {
        ...chunk,
        score,
      };
    })
  );

  // 5. Get top chunks
  scoredChunks.sort((a, b) => b.score - a.score);

  const topChunks = scoredChunks
    .slice(0, 5)
    .map((chunk) => `FILE: ${chunk.file}\n${chunk.content}`)
    .join('\n\n');

  // 6. Ask LLM using retrieved context
  const completion = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',

    messages: [
      {
        role: 'system',
        content: 'You are an AI engineering assistant that explains codebases.',
      },
      {
        role: 'user',
        content: `
Question:
${question}

Relevant Code Context:
${topChunks}

Answer the question using the provided repository context.
`,
      },
    ],
  });

  return Response.json({
    question,
    answer: completion.choices[0].message.content,
  });
}
