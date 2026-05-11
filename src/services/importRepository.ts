type ImportRepositoryParams = {
  repoUrl: string;
};

export default async function importRepository({ repoUrl }: ImportRepositoryParams) {
  const response = await fetch('/api/import-repo', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      repoUrl,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to import repository');
  }

  return response.json();
}
