import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { Result, ResultErrors } from "../types/result";
import { get, post } from "../utils/http";
import { useContext } from "react";
import { UserIdContext } from "../utils/context";

const formatFullUrl = (url: string) => {
  let loanmateBaseAddress = process.env.VITE_LOANMATE_PUBLIC_API_URL;

  if (!loanmateBaseAddress) {
    throw new Error("LOANMATE_PUBLIC_API_URL is not set");
  }

  if (loanmateBaseAddress[loanmateBaseAddress.length - 1] === "/") {
    loanmateBaseAddress = loanmateBaseAddress.slice(
      0,
      loanmateBaseAddress.length - 1
    );
  }

  return loanmateBaseAddress + "/api/v1" + url;
};

export const useUserIdContext = () => {
  const context = useContext(UserIdContext);
  return context;
};

export const useApiQuery = <T>(
  url: string,
  queryParams?: any,
  options?: UseQueryOptions<T, ResultErrors>
) => {
  const formattedUrl = formatFullUrl(url);

  return useQuery<T, ResultErrors>({
    queryKey: options?.queryKey ?? [url],
    queryFn: async () => {
      const result = await get<Result<T>>(formattedUrl, queryParams);
      return result.successful ? result.data : Promise.reject(result.error);
    },
  });
};

export const useApiMutation = <TResponse, TBody>(
  url: string,
  options?: Omit<UseMutationOptions<TResponse, ResultErrors, TBody>, "queryKey">
) => {
  const formattedUrl = formatFullUrl(url);
  const action = post;

  return useMutation<TResponse, ResultErrors, TBody>({
    mutationFn: async (body) => {
      const result = await action<Result<TResponse>>(formattedUrl, body);
      return result.successful ? result.data : Promise.reject(result.error);
    },
    ...options,
  });
};
