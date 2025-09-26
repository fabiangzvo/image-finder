import { defineStore } from "pinia";

export const useHistoryStore = defineStore(
  "history",
  () => {
    const history = ref<string[]>([]);

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
    };
  },
  {
    persist: true,
  }
);
