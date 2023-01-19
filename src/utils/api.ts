import axios, { RawAxiosRequestConfig } from "axios";
import { ApiError } from "../types";

interface FetcherRequestInit extends RawAxiosRequestConfig<unknown> {
  params?: number | string;
  query?: {
    [key: string]: any;
  };
}

const instance = axios.create({
  baseURL: process.env.VITE_BASE_URL,
  headers: {
    "Content-Security-Policy": "upgrade-insecure-requests",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const fetcher = (url: string, options: FetcherRequestInit) => {
  const { params, query, ...rest } = options;

  if (params) url += `/${params}`;
  if (query) url += `?${new URLSearchParams(query)}`;

  const response = instance(`${url}`, rest);

  return response;
};

const errorHandler = (message: string, error: ApiError) => {
  const errorMessage = error.response?.data.message ?? message;

  alert(errorMessage);
};

export { errorHandler };
export default fetcher;
