import { AxiosError } from "axios";

interface Message {
  postId: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  commentId: string;
  postId: string;
  content: string;
}

interface ApiResponse<T> {
  code: number;
  data: T;
}

type ApiError = AxiosError<{ code: number; message: string }>;

export type { Message, Comment, ApiResponse, ApiError };
