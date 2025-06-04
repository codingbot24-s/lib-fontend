export interface Book {
  id: number
  title: string
  arabictitle: string
  scholar: string
  topic_id: number
  topic: {
    id: number
    name: string
    description: string
    created_at?: string
    updated_at?: string
  }
  language: string
  publisher?: string
  edition: string
  coverimage: string
  viewpdfurl: string
  download_url: string
  description: string
  created_at: string
  updated_at: string
  status? : string
}

export interface ApiResponse {
  books: {
    id: number;
    title: string;
    arabictitle: string;
    scholar: string;
    topic_id: number;
    topic: {
      id: number;
      name: string;
      description: string;
      created_at: string;
      updated_at: string;
    };
    language: string;
    publisher: string;
    edition: string;
    coverimage: string;
    viewpdfurl: string;
    download_url: string;
    description: string;
    created_at: string;
    updated_at: string;
  }[];
}



