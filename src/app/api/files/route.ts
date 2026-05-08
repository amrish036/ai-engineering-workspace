import { getProjectFiles } from '../../lib/files';
import { chunkCode } from '../../lib/chunk';

export async function GET() {
  const files = await getProjectFiles();

  const allChunks = files.flatMap((file) => chunkCode(file.file, file.content));

  return Response.json({
    totalFiles: files.length,
    totalChunks: allChunks.length,
    chunks: allChunks.slice(0, 5),
  });
}
