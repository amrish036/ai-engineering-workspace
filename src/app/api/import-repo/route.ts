import { NextResponse } from 'next/server';
import simpleGit from 'simple-git';
import path from 'path';
import fs from 'fs';
import { getRepoFiles, chunkFile, generateEmbedding, sql, setupDatabase } from '@/lib';

export async function POST(request: Request) {
  try {
    
    await setupDatabase();

    const dbCheck = await sql`SELECT current_database()`;

    console.log(dbCheck);

    const tables = await sql`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  `;

    console.log(tables);

    const body = await request.json();

    const repoUrl = body.repoUrl;

    if (!repoUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Repository URL required',
        },
        { status: 400 }
      );
    }

    const repoName = repoUrl.split('/').pop()?.replace('.git', '');
    const localPath = path.join(process.cwd(), 'repos', repoName || 'repo');

    // Create repos folder
    if (!fs.existsSync(path.join(process.cwd(), 'repos'))) {
      fs.mkdirSync(path.join(process.cwd(), 'repos'));
    }

    const git = simpleGit();

    // Clone repo
    await git.clone(repoUrl, localPath);
    console.log('Clone complete');

    const files = getRepoFiles(localPath);
    console.log('Files found:', files.length);

    const chunks = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');

      const fileChunks = chunkFile(content);

      for (const chunk of fileChunks) {
        chunks.push({
          file,
          content: chunk.content,
          chunkIndex: chunk.index,
        });
      }
    }
    console.log('Total chunks:', chunks.length);

    const embeddedChunks = [];
    const limitedChunks = chunks.slice(0, 20);

    for (const chunk of limitedChunks) {
      const embedding = await generateEmbedding(chunk.content);
      embeddedChunks.push({
        ...chunk,
        embedding,
      });
      console.log(`Embedding chunk ${embeddedChunks.length + 1}/${chunks.length}`);
    }

    for (const chunk of embeddedChunks) {
      await sql`INSERT INTO repo_chunks (
                        file_path,
                        content,
                        embedding
                        )
                    VALUES (
                        ${chunk.file},
                        ${chunk.content},
                        ${JSON.stringify(chunk.embedding)}
            )`;
      console.log('Stored:', chunk.file);
    }

    return NextResponse.json({
      success: true,
      message: 'Repository imported successfully',
      fileCount: files.length,
      chunkCount: chunks.length,
      embeddedChunkCount: embeddedChunks.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to import repository',
      },
      { status: 500 }
    );
  }
}
