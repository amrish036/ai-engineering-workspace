import { generateEmbedding, getProjectFiles, cosineSimilarity, chunkCode } from '@/lib';

export async function GET() {
  const query = 'Where is API route logic handled?';

  // 1. Read files
  const files = await getProjectFiles();

  // 2. Chunk files
  const chunks = files.flatMap((file) => chunkCode(file.file, file.content));

  // 3. Embed query
  const queryEmbedding = await generateEmbedding(query);

  // 4. Embed chunks + score
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

  // 5. Sort best matches
  scoredChunks.sort((a, b) => b.score - a.score);

  return Response.json({
    query,
    topResults: scoredChunks.slice(0, 5),
  });
}
