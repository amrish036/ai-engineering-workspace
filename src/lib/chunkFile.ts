type Chunk = {
    content: string;
    index: number;
};

const CHUNK_SIZE = 1200;

const CHUNK_OVERLAP = 200;

export function chunkFile(content: string): Chunk[] {
    const chunks: Chunk[] = [];

    let start = 0;
    let index = 0;

    while (start < content.length) {
        const end = start + CHUNK_SIZE;
        const chunk = content.slice(start, end);

        chunks.push({ content: chunk, index, });

        start += CHUNK_SIZE - CHUNK_OVERLAP;

        index++;
    }

    return chunks;
}

export default chunkFile;