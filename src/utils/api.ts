import { HNYApiError } from "./errorMessage";
import { getErrorMessage } from "./lib";

interface FetcherRequestInit extends RequestInit {
  params?: number | string;
  query?: {
    [key: string]: any;
  };
  data?: unknown;
}

enum Api {
  baseUrl = "http://43.201.103.199",
}

const fetcher = (url: string, options: FetcherRequestInit) => {
  const { params, query, ...rest } = options;

  if (params) url += `/${params}`;
  if (query) url += `?${new URLSearchParams(query)}`;

  const response = fetch(`${Api["baseUrl"]}${url}`, rest);

  return response;
};

const clientFetcher = async (url: string, options: FetcherRequestInit) => {
  const headers = {
    ...options.headers,
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await fetcher(url, {
      ...options,
      headers,
    });

    if (!response.ok)
      throw new HNYApiError(response.status, `${url} Api Error`);

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const clientApi = async (url: string, options: FetcherRequestInit) => {
  const { data, headers, ...rest } = options;
  const requestBody = JSON.stringify(data);

  try {
    const response = await fetcher(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
      body: requestBody,
      ...rest,
    });

    if (!response.ok)
      throw new HNYApiError(response.status, `${url} Api Error`);

    const result = await response.json();

    return result;
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

export { Api, clientApi, clientFetcher };
