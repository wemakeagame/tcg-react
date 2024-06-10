export interface ApiResponse<T> {
    data: T | null;
    error?: Error;
  }
  
export interface ErrorResponse {
    error: string;
  }