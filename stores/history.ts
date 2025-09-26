import { defineStore } from "pinia";

interface HistoryState {
  history: string[];
  query: string;
  page: number;
}

export const useHistoryStore = defineStore(
  "history",
  () => {
    const state = reactive<HistoryState>({
      query: "",
      history: [],
      page: 0,
    });

    const { query, history, page } = toRefs<HistoryState>(state);

    function pushHistory(query: string): void {
      if (!query || history.value.includes(query)) return;

      history.value.unshift(query);
    }

    function removeHistoryItem(index: number): void {
      history.value.splice(index, 1);
    }

    return {
      history,
      pushHistory,
      removeHistoryItem,
      persist: true,
      query,
      page,
    };
  },
  {
    persist: true,
  }
);
