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

export type { Message, Comment, ApiResponse };
