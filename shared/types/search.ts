import type { SearchResult } from "./google";

export interface SellerApiResponse {
  error?: any;
  data: Seller[];
}

export interface SearchState {
  results: SearchResult[];
  total: number;
  isLoading: boolean;
  isChecked: boolean;
  isFinished: boolean;
  showSellerModal: boolean;
  winner: Seller;
  remainingPoints: number;
}

export interface Seller {
  id: string;
  name: string;
  identification: string;
  observations: string;
  status: string;
  points: number;
}
