import { defineStore } from "pinia";

interface SellerState {
  sellers: Seller[];
  responses: { user: string; key: string }[];
  remainingPoints: number;
}

export const useSalesStore = defineStore(
  "sellers",
  () => {
    const state = reactive<SellerState>({
      sellers: [],
      responses: [],
      remainingPoints: 20,
    });

    const { sellers, responses, remainingPoints } = toRefs<SellerState>(state);

    function resetSellers(): void {
      sellers.value = sellers.value.map((seller) => ({ ...seller, points: 0 }));
      responses.value = [];
      remainingPoints.value = 20;
    }

    function incrementPoints(sellerId: string): boolean {
      const index = sellers.value.findIndex(
        (currentSeller) => currentSeller.id === sellerId
      );

      if (index === -1) return false;

      if (!sellers.value[index]?.points) {
        sellers.value[index]!.points = 3;
      } else {
        sellers.value[index]!.points += 3;
      }

      updateRemainingPoints();

      if (sellers.value[index]!.points >= 20 || remainingPoints.value <= 0)
        return false;

      return true;
    }

    function addResponse(user: string, key: string): void {
      const result = incrementPoints(user);

      if (!result || !key) return;

      responses.value.push({ user, key });
    }

    function updateRemainingPoints(): void {
      const winner = Array.from(sellers.value).sort(
        ({ points: aPoints = 0 }, { points: bPoints = 0 }) => bPoints - aPoints
      )[0];

      if (winner?.points) {
        const rest = 20 - winner.points || 0;

        remainingPoints.value = rest >= 0 ? rest : 0;
      } else {
        remainingPoints.value = 20;
      }
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
          sellers.value = response.data.map((seller) => ({
            ...seller,
            points: 0,
          }));
        }

        updateRemainingPoints();
      }
    });

    return {
      sellers,
      resetSellers,
      responses,
      addResponse,
      remainingPoints,
    };
  },
  {
    persist: true,
  }
);
