import { useState } from "react";
import { AxiosResponse } from "axios";

export function useAsyncHandler<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<T | null>(null);

  const run = async (promise: Promise<AxiosResponse<T>>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await promise;
      setData(response.data);
      return response;
    } catch (err: unknown) {
      setError(
        typeof err === "object" && err !== null && "message" in err
          ? (err as { message: string }).message
          : "Unknown error"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, run };
}
