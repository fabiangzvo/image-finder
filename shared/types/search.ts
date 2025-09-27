import type { SearchResult } from "./google";
import type { Seller } from "./seller";

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

