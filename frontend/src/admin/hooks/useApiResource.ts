import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";

type ResourceState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Fetches `path` on mount and whenever `path` changes. Pass `null` to skip
 * fetching (e.g. while a required id is still unknown).
 */
export function useApiResource<T>(path: string | null): ResourceState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    if (!path) return;
    setLoading(true);
    setError(null);
    api
      .get<T>(path)
      .then((result) => setData(result))
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [path]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
