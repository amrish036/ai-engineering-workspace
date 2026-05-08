import { generateEmbedding } from "../../lib/embeddings";

export async function GET() {
  const embedding = await generateEmbedding(
    "JWT authentication middleware"
  );

  return Response.json({
    dimensions: embedding.length,
    preview: embedding.slice(0, 10),
  });
}