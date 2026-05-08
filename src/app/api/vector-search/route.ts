import sql from "../../lib/db";

import { generateEmbedding } from "../../lib/embeddings";

export async function GET() {
    const query =
        "Where are API routes handled?";

    // 1. Embed user query
    const embedding =
        await generateEmbedding(query);

    // 2. Search nearest vectors
    const results = await sql`
    SELECT
      id,
      file,
      content,

      embedding <=> ${JSON.stringify(
        embedding
    )}::vector AS distance

    FROM code_embeddings

    ORDER BY distance ASC

    LIMIT 5
  `;

    return Response.json({
        query,
        results,
    });
}