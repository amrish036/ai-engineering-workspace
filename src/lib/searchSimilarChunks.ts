import { sql } from '@/lib';

type SearchSimilarChunksParams = {
  embedding: number[];

  limit?: number;
};

export default async function searchSimilarChunks({
  embedding,
  limit = 5,
}: SearchSimilarChunksParams) {
  const result = await sql`
    SELECT
      id,
      file_path,
      content,
      embedding <=> ${JSON.stringify(embedding)}::vector AS distance
    FROM repo_chunks
    ORDER BY distance ASC
    LIMIT ${limit}
  `;

  return result;
}
