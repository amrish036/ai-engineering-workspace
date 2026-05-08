type Chunk = {
  file: string;
  content: string;
};

export function chunkCode(
  file: string,
  content: string,
  chunkSize = 1000
): Chunk[] {
  const chunks: Chunk[] = [];

  for (let i = 0; i < content.length; i += chunkSize) {
    const chunk = content.slice(i, i + chunkSize);

    chunks.push({
      file,
      content: chunk,
    });
  }

  return chunks;
}
