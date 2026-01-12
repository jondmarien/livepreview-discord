export interface CacheEntry {
  content: string;
  timestamp: number;
  fileType: string;
  size: number;
}

export interface FileTypeInfo {
  extension: string;
  mimeType: string;
  displayName: string;
  icon: string;
  isSupported: boolean;
  type: string;
}

export interface GlobalState {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}
