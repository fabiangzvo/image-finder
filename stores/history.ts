import { defineStore } from "pinia";

interface HistoryState {
  history: string[];
  query: string;
  page: number;
  sellers: Seller[];
}

export const useHistoryStore = defineStore(
  "history",
  () => {
    const state = reactive<HistoryState>({
      query: "",
      history: [],
      page: 0,
      sellers: [],
    });

    const { query, history, page, sellers } = toRefs<HistoryState>(state);

    function pushHistory(query: string): void {
      if (!query || history.value.includes(query)) return;

      history.value.unshift(query);
    }

    function removeHistoryItem(index: number): void {
      history.value.splice(index, 1);
    }

    function resetSellers(): void {
      sellers.value = sellers.value.map((seller) => ({ ...seller, points: 0 }));
    }

    onMounted(async () => {
      const response = await $fetch<SellerApiResponse>("/api/sellers");

      if (!response.error) {
        if (sellers.value.length > 0) {
          const newSellers = response.data.filter(
            (seller) => !sellers.value.some((s) => s.id === seller.id)
          );

          const base = sellers.value.length > 0 ? [] : sellers.value;

          sellers.value.push(...base, ...newSellers);
        } else {
          sellers.value = response.data;
        }
      }
    });

    return {
      history,
      pushHistory,
      removeHistoryItem,
      persist: true,
      query,
      page,
      sellers,
      resetSellers,
    };
  },
  {
    persist: true,
  }
);
