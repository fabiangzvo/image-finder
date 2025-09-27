<template>
  <div
    class="min-h-screen p-8 transition-all duration-500 flex flex-col items-center justify-center"
  >
    <div
      class="max-w-4xl w-full mx-auto transition-transform duration-500 ease-in-out relative"
    >
      <div
        :class="[
          'relative flex justify-center text-center transition-all duration-400 mb-2',
          isExpanded
            ? 'opacity-0 scale-95 -translate-y-8 h-0 overflow-hidden mb-0'
            : 'opacity-100 scale-100 bottom-0',
        ]"
      >
        <Image
          :src="$colorMode.value === 'dark' ? '/world-night.png' : '/world.png'"
          alt="Logo"
          fill
        />
        <h1
          class="text-5xl font-bold z-50 text-shadow-lg/30 dark:text-shadow-black text-shadow-white absolute bottom-0"
        >
          Imagenes del mundo
        </h1>
        <div
          class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent dark:from-black"
        />
      </div>
      <!-- Barra de búsqueda principal -->
      <SearchInput
        v-model="store.query"
        @update:input="handleInputChange"
        @focus="popoverRef.toggle($event)"
        @keydown="handleKeyDown"
        @clear="clearSearch"
      />
      <Popover ref="popoverRef" v-show="!isLoading && !store.query">
        <HistoryList @change="handleInputChange" />
      </Popover>
      <div
        v-if="isLoading"
        class="p-8 flex flex-col items-center justify-center text-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-loader-2 w-8 h-8 animate-spin mb-2"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span class="text-sm">Buscando...</span>
      </div>
    </div>
    <transition
      enter-active-class="transition-all delay-550 duration-500 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all delay-0 duration-500 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 hidden"
    >
      <div v-show="!isLoading && store.query" class="py-2 relative">
        <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
          Resultados
        </div>
        <ListResult
          :items="results"
          :isChecked="isChecked"
          :total="total"
          :isLoading="isLoading"
          @handlePagination="({ page }) => (store.page = page)"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
//import type { SearchResponse } from "#shared/types/google";
import type { SearchState } from "#shared/types/search";
import type { Seller } from "#shared/types/seller";

import { useHistoryStore } from "../../stores/history";

const store = useHistoryStore();

const state = reactive<SearchState>({
  isChecked: false,
  isFinished: false,
  isLoading: true,
  results: [],
  total: 0,
  showSellerModal: false,
  winner: {} as Seller,
  remainingPoints: 20,
});

const {
  isChecked,
  isFinished,
  isLoading,
  results,
  total,
  showSellerModal,
  winner,
  remainingPoints,
} = toRefs<SearchState>(state);
const popoverRef = ref();
const selectedIndex = ref<number>(-1);
const searchRef = ref<HTMLDivElement | null>(null);
let debounceTimer: any;
const isExpanded = ref(false);

// function handleClick(seller: Seller): void {
//   const index = sellers.value.findIndex(
//     (currentSeller) => currentSeller.id === seller.id
//   );

//   if (!sellers.value[index].points) {
//     sellers.value[index].points = 3;
//   } else {
//     sellers.value[index].points += 3;
//   }

//   if (sellers.value[index]?.points >= 20) isFinished.value = true;

//   isChecked.value = true;
// }

async function performSearch(searchTerm: string): Promise<void> {
  if (!searchTerm || searchTerm.length < 3) return;

  isLoading.value = true;

  try {
    popoverRef.value.hide();
    // const response = await $fetch<SearchResponse>("/api/search", {
    //   params: {
    //     q: store.query,
    //     page: store.page,
    //   },
    // });

    // if (response.error) throw response.error;

    results.value = Array.from({ length: store.sellers.length ?? 0 }).map(
      (_, index) => ({
        kind: "customsearch#result",
        title: "CVC 75/25 21*21",
        htmlTitle: "CVC 75/25",
        link: "https://image.made-in-china.com/202f0j00vFularWsCkcL/CVC-75-25-21-21-57-58-230GSM-Proban-Treatment-Water-Repellent-Fabric-Used-in-Security-Coats-Jacket-Pants-Trousers-for-Industry.webp",
        displayLink: "cbxy2020.en.made-in-china.com",
        snippet: "CVC 75/25 21*21",
        htmlSnippet: "CVC",
        mime: "image/webp",
        fileFormat: "image/webp",
        image: {
          contextLink:
            "https://cbxy2020.en.made-in-china.com/product/nFbfjPXGAehW/China-CVC-75-25-21-21-57-58-230GSM-Proban-Treatment-Water-Repellent-Fabric-Used-in-Security-Coats-Jacket-Pants-Trousers-for-Industry.html",
          height: 550,
          width: 550,
          byteSize: 52188,
          thumbnailLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4CThmBqbeWTy_A6D6PJ3QpCyp1_G68zM4dgw2bCuVXjPx31LeMHqEi4&s",
          thumbnailHeight: 133,
          thumbnailWidth: 133,
        },
        user: store.sellers[index],
      })
    ) as ListItem[];
    // total.value = Number(response.total);

    store.pushHistory(searchTerm);
  } catch (error) {
    console.error("Error al buscar:", error);
  }
  isLoading.value = false;
}

const handleInputChange = (value: string) => {
  store.query = value;
  selectedIndex.value = -1;

  if (value.length === 0) {
    isExpanded.value = false;
  }

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (value.length > 0) {
      isExpanded.value = true;
      performSearch(value);
    } else {
      isExpanded.value = false;
    }
  }, 300);
};

function handleSelect(item: any): void {
  if (!item) return;

  store.query = item;
  store.pushHistory(item);
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!popoverRef.value) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      selectedIndex.value =
        selectedIndex.value < store.history.length - 1
          ? selectedIndex.value + 1
          : selectedIndex.value;
      break;
    case "ArrowUp":
      e.preventDefault();
      selectedIndex.value =
        selectedIndex.value > 0 ? selectedIndex.value - 1 : -1;
      break;
    case "Enter":
      e.preventDefault();
      if (selectedIndex.value >= 0 && store.history[selectedIndex.value]) {
        handleSelect(store.history[selectedIndex.value]);
      } else if (store.query) {
        store.pushHistory(store.query);
        popoverRef.value.hide();
      }
      break;
    case "Escape":
      popoverRef.value.hide();
      break;
  }
};

const clearSearch = () => {
  store.query = "";
  popoverRef.value.hide();
  isExpanded.value = false;
};

onMounted(async () => {
  if (!store.query) return;

  isExpanded.value = true;
  await performSearch(store.query);
});
/**
 * <!-- Sin resultados -->
        <div v-if="!isLoading && query" class="p-8 text-center">
          <div
            class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search w-8 h-8 text-gray-400">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <p class="text-gray-500 mb-1">No se encontraron resultados</p>
          <p class="text-sm text-gray-400">
            Intenta con otros términos de búsqueda
          </p>
        </div>
 */
</script>

<style scoped>
/*
  Los estilos de Tailwind se pueden usar directamente en la plantilla.
  No se necesita un bloque <style> si solo se usan clases de Tailwind.
  Este bloque es solo para referencia o para estilos personalizados.
*/
</style>
