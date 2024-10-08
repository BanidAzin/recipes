import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export type FetchProps = {
  endPoint?: string;
  method?: "get" | "post" | "put" | "delete";
};

type mutationProps = {
  mutationEndPoint?: string;
  query?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
};

export const useFetch = ({ endPoint, method = "get" }: FetchProps = {}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async ({
    mutationEndPoint = endPoint,
    query,
    onSuccess,
    onError,
  }: mutationProps) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const { data } = await axios[method](`${BASE_URL}/${mutationEndPoint}`, {
        params: {
          number: 4,
          query,
          apiKey: process.env.EXPO_PUBLIC_API_KEY,
        },
      });
      setData(data);
      if (onSuccess) onSuccess(data);
    } catch (error: Error | any) {
      setIsError(true);
      setError(error.message);
      if (onError) onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    refetch: (params: mutationProps) => fetchData(params),
    data,
    isLoading,
    isError,
    error,
  };
};
