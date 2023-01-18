import axios, { RawAxiosRequestConfig } from "axios";
import { HNYApiError } from "./errorMessage";
import { getErrorMessage } from "./lib";

interface FetcherRequestInit extends RawAxiosRequestConfig<unknown> {
  params?: number | string;
  query?: {
    [key: string]: any;
  };
}

enum Api {
  baseUrl = "http://43.201.103.199",
}

const instance = axios.create({
  baseURL: Api["baseUrl"],
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const fetcher = (url: string, options: FetcherRequestInit) => {
  const { params, query, ...rest } = options;

  if (params) url += `/${params}`;
  if (query) url += `?${new URLSearchParams(query)}`;

  const response = instance(`${Api["baseUrl"]}${url}`, rest);

  return response;
};

const clientFetcher = async (url: string, options: FetcherRequestInit) => {
  try {
    const response = await fetcher(url, options);

    if (response.status !== 200)
      throw new HNYApiError(response.status, `${url} Api Error`);

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const clientApi = async (url: string, options: FetcherRequestInit) => {
  const { data, ...rest } = options;

  try {
    const response = await fetcher(url, {
      ...rest,
      data,
    });

    if (response.status !== 200)
      throw new HNYApiError(response.status, `${url} Api Error`);

    return response.data;
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

export { Api, clientApi, clientFetcher };
