import type { Ref } from "vue";

export interface Seller {
  id: string;
  name: string;
  identification: string;
  observations: string;
  status: string;
  points: number;
}

export interface SellerApiResponse {
  error?: any;
  data: Seller[];
}

export interface UseSeller {
  sellers: Ref<Seller[]>;
  isLoading: Ref<boolean>;
  resetSellers: () => void;
}
