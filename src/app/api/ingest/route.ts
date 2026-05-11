import { generateEmbedding, getProjectFiles, sql, chunkCode } from '@/lib'

export async function GET() {
  await sql`

    DELETE FROM code_embeddings

  `;
  // 1. Read project files
  const files = await getProjectFiles();

  // 2. Chunk files
  const chunks = files.flatMap((file) => chunkCode(file.file, file.content));

  let inserted = 0;

  // 3. Generate embeddings + store
  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk.content);

    await sql`
      INSERT INTO code_embeddings (
        file,
        content,
        embedding
      )
      VALUES (
        ${chunk.file},
        ${chunk.content},
        ${JSON.stringify(embedding)}
      )
    `;

    inserted++;
  }

  return Response.json({
    success: true,
    inserted,
  });
}
