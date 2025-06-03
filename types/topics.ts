export interface Topic {
  id: number;
  name: string;
  description: string;
  booksCount?: number;
}

export interface TopicsResponse {
  topics: Topic[];
}
