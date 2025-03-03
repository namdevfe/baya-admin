export interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
}

export interface ListPagination {
  currentPage: number
  total: number
  totalPages: number
  limit: number
}

export interface ListParams {
  page?: number
  limit?: number
  sort?: string
  sortBy?: string
  [key: string]: any
}
