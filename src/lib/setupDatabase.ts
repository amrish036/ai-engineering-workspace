import { sql } from '@/lib';

export default async function setupDatabase() {
    await sql`
    CREATE EXTENSION IF NOT EXISTS vector
  `;

    await sql`
    CREATE TABLE IF NOT EXISTS repo_chunks (
      id SERIAL PRIMARY KEY,
      file_path TEXT,
      content TEXT,
      embedding VECTOR(384)
    )
  `;
}