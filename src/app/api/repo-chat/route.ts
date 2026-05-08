import OpenAI from "openai";

import sql from "../../lib/db";

import { generateEmbedding } from "../../lib/embeddings";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function GET() {
  const question =
    "Explain how API routes work in this project";

  // 1. Generate query embedding
  const embedding =
    await generateEmbedding(question);

  // 2. Retrieve most relevant chunks
  const results = await sql`
    SELECT
      file,
      content,

      embedding <=> ${JSON.stringify(
        embedding
      )}::vector AS distance

    FROM code_embeddings

    ORDER BY distance ASC

    LIMIT 5
  `;

  // 3. Build context
  const context = results
    .map(
      (result) =>
        `FILE: ${result.file}\n${result.content}`
    )
    .join("\n\n");

  // 4. Ask LLM using retrieved context
  const completion =
    await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are an expert AI engineering assistant that explains repositories.",
        },

        {
          role: "user",
          content: `
Question:
${question}

Repository Context:
${context}

Answer the question using the repository context above.
`,
        },
      ],
    });

  return Response.json({
    question,

    retrievedFiles: results.map(
      (r) => r.file
    ),

    answer:
      completion.choices[0].message.content,
  });
}