import { useState } from 'react';

import { importRepository } from '@/services';

type UseRepositoryImportParams = {
  onSuccess?: () => void;
};

export function useRepositoryImport({ onSuccess }: UseRepositoryImportParams = {}) {
  const [importingRepo, setImportingRepo] = useState(false);

  async function handleImportRepository(repoUrl: string) {
    if (!repoUrl.trim()) return;

    try {
      setImportingRepo(true);

      await importRepository({
        repoUrl,
      });

      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setImportingRepo(false);
    }
  }

  return {
    importingRepo,

    handleImportRepository,
  };
}

export default useRepositoryImport;
