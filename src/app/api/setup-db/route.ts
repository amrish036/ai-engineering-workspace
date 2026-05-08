import sql from '../../lib/db';

export async function GET() {
  // Enable pgvector
  await sql`
    CREATE EXTENSION IF NOT EXISTS vector;
  `;

  // Create embeddings table
  await sql`
    CREATE TABLE IF NOT EXISTS code_embeddings (
      id SERIAL PRIMARY KEY,

      file TEXT NOT NULL,

      content TEXT NOT NULL,

      embedding vector(384)
    );
  `;

  return Response.json({
    success: true,
  });
}
