import { sql } from '@/lib';

export async function GET() {
  const result = await sql`
    SELECT NOW()
  `;

  return Response.json({
    connected: true,
    time: result,
  });
}
