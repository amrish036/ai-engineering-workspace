import { getProjectFiles } from "../../lib/files";

export async function GET() {
  const files = await getProjectFiles();

  return Response.json({
    count: files.length,
    files,
  });
}