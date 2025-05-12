
// Re-export types from the main types file
export * from "../../types/community";

// Additional API-specific types can be defined here if needed
export interface ApiResponse<T> {
  data: T;
  error: Error | null;
}
