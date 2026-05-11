import fs from 'fs';

import path from 'path';

const INCLUDED_EXTENSIONS = [
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.json',
    '.md',
];

const EXCLUDED_FOLDERS = [
    'node_modules',
    '.git',
    '.next',
    'dist',
    'build',
];

export default function getRepoFiles(
    dir: string
): string[] {
    let results: string[] = [];

    const files =
        fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(
            dir,
            file
        );

        const stat =
            fs.statSync(filePath);

        // Skip ignored folders
        if (
            stat.isDirectory() &&
            EXCLUDED_FOLDERS.includes(file)
        ) {
            continue;
        }

        if (stat.isDirectory()) {
            results = [
                ...results,
                ...getRepoFiles(filePath),
            ];
        } else {
            const ext =
                path.extname(file);
            if (
                INCLUDED_EXTENSIONS.includes(
                    ext
                )
            ) {
                results.push(filePath);
            }
        }
    }

    return results;
}