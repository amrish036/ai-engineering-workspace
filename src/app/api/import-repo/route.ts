import { NextResponse } from 'next/server';
import simpleGit from 'simple-git';
import path from 'path';
import fs from 'fs';
import { getRepoFiles, chunkFile } from '@/lib';

export async function POST(request: Request) {
    try {
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
            const content =
                fs.readFileSync(
                    file,
                    'utf-8'
                );

            const fileChunks =
                chunkFile(content);

            for (const chunk of fileChunks) {
                chunks.push({
                    file,
                    content: chunk.content,
                    chunkIndex: chunk.index,
                });
            }
        }

        console.log('Total chunks:', chunks.length);

        return NextResponse.json({
            success: true,
            message: 'Repository imported successfully',
            fileCount: files.length,
            chunkCount: chunks.length,
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
