import type { Seller } from "./search";
import type { SearchResult } from "./google";

export interface ListItem extends SearchResult {
  user?: Seller;
}

export interface ListResultProps {
  items: ListItem[];
  isChecked: boolean;
  total: number;
  isLoading: boolean;
}
