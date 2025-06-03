export interface Book {
  id: number
  title: string
  arabicTitle?: string
  description: string
  scholar: string
  topic: string
  language: string
  publisher: string
  edition: string
  coverimage: string
  viewpdfurl: string
  download_url: string
  created_at: string
  updated_at: string
  volumes?: number
  pages?: number
  rating?: number
  publishYear?: number
  status? : string
}

export interface ApiResponse {
  books: Book[]
  pagination: {
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
}



