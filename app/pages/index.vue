<template>
  <div
    class="min-h-screen p-8 transition-all duration-500 flex flex-col items-center justify-center">
    <div
      :class="`max-w-4xl w-full mx-auto transition-transform duration-500 ease-in-out ${
        isExpanded ? '-translate-y-32' : ''
      }`">
      <div
        :class="`relative flex justify-center text-center transition-all duration-500 mb-2 ${
          isExpanded
            ? 'opacity-0 scale-95 -translate-y-8 h-0 overflow-hidden mb-0'
            : 'opacity-100 scale-100 bottom-0'
        }`">
        <Image :src="currentImageSrc" alt="Logo" fill />
        <h1
          class="text-5xl font-bold z-50 text-shadow-lg/30 dark:text-shadow-black text-shadow-white absolute bottom-0">
          Imagenes del mundo
        </h1>
        <div
          class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent dark:from-black" />
      </div>
      <!-- Barra de búsqueda principal -->
      <div ref="searchRef" class="relative">
        <SearchInput
          v-model="query"
          @update:input="handleInputChange"
          @focus="toggle"
          @keydown="handleKeyDown"
          @clear="clearSearch" />
        <Popover ref="op">
          <HistoryList
            v-if="!isLoading && !query"
            @change="handleInputChange" />
        </Popover>
        <!-- Dropdown de sugerencias -->
        <div
          v-if="isOpen"
          class="absolute w-full mt-2 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <!-- Loading state -->
          <div
            v-if="isLoading"
            class="p-8 flex flex-col items-center justify-center text-gray-500">
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
              class="lucide lucide-loader-2 w-8 h-8 animate-spin mb-2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span class="text-sm">Buscando...</span>
          </div>

          <!-- Sugerencias de búsqueda -->
          <!--&& suggestions.length > 0 -->
          <div v-if="!isLoading && query" class="py-2">
            <div
              class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
              Resultados
            </div>
            <ListResult />
          </div>

          <!-- Sin resultados -->
          <div
            v-if="!isLoading && query && suggestions.length === 0"
            class="p-8 text-center">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ListResult from "../../components/listResult/index.vue";
import SearchInput from "../../components/searchInput/index.vue";
import HistoryList from "../../components/historyList/index.vue";
import { useHistoryStore } from "../../stores/history";

const store = useHistoryStore();
// const handleFilterChange = (filter) => {
//   activeFilter.value = filter;
//   performSearch(query.value, filter);
// };
const op = ref();
const query = ref("");
const isOpen = ref(false);
const isLoading = ref(false);
const suggestions = ref<string[]>([]);
const recentSearches = ref([]);
const selectedIndex = ref<number>(-1);
const activeFilter = ref("all");
const searchRef = ref<HTMLDivElement | null>(null);
let debounceTimer: number | undefined;
const isExpanded = ref(false);
const toggle = (event: any) => {
  op.value.toggle(event);
};

// Datos simulados para demostración
const mockData = {
  products: [
    { id: 1, title: 'MacBook Pro 16"', category: "Laptops", trending: true },
    {
      id: 2,
      title: "iPhone 15 Pro Max",
      category: "Smartphones",
      trending: true,
    },
    { id: 3, title: "iPad Air", category: "Tablets" },
    { id: 4, title: "AirPods Pro", category: "Audio" },
    {
      id: 5,
      title: "Apple Watch Ultra",
      category: "Wearables",
      trending: true,
    },
    { id: 6, title: "Magic Keyboard", category: "Accesorios" },
    { id: 7, title: "Studio Display", category: "Monitores" },
    { id: 8, title: "Mac Mini", category: "Desktops" },
  ],
  categories: [
    "all",
    "Laptops",
    "Smartphones",
    "Tablets",
    "Audio",
    "Wearables",
    "Accesorios",
    "Monitores",
    "Desktops",
  ],
  trending: [
    "iPhone 15 Pro Max",
    "MacBook Pro",
    "Apple Watch Ultra",
    "AirPods Pro",
  ],
};

// Cargar búsquedas recientes del localStorage al montar el componente
onMounted(() => {
  const handleClickOutside = (event: any) => {
    if (searchRef.value && !searchRef.value.contains(event.target)) {
      isOpen.value = false;
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  onUnmounted(() =>
    document.removeEventListener("mousedown", handleClickOutside)
  );
});

const performSearch = (searchTerm: string) => {
  if (!searchTerm) return;

  isLoading.value = true;

  setTimeout(() => {
    console.log("searchTerm", searchTerm);
    store.pushHistory(searchTerm);
    suggestions.value = [];
    isLoading.value = false;
  }, 300);
};

const handleInputChange = (value: string) => {
  query.value = value;
  isOpen.value = true;
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
  console.log("Seleccionado:", item);
  if (!item) return;

  query.value = item;
  store.pushHistory(item);
  isOpen.value = false;
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isOpen.value) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      selectedIndex.value =
        selectedIndex.value < suggestions.value.length - 1
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
      if (selectedIndex.value >= 0 && suggestions.value[selectedIndex.value]) {
        console.log(suggestions.value[selectedIndex.value]);
        handleSelect(suggestions.value[selectedIndex.value] as string);
      } else if (query.value) {
        console.log("entro");
        store.pushHistory(query.value);
        isOpen.value = false;
      }
      break;
    case "Escape":
      isOpen.value = false;
      break;
  }
};

const clearSearch = () => {
  query.value = "";
  suggestions.value = [];
  isOpen.value = false;
  isExpanded.value = false;
};

const currentImageSrc = ref("/world.png");
const colorMode = useColorMode();

watch(colorMode, () => {
  currentImageSrc.value =
    colorMode.value === "dark" ? "/world-night.png" : "/world.png";
});
</script>

<style scoped>
/*
  Los estilos de Tailwind se pueden usar directamente en la plantilla.
  No se necesita un bloque <style> si solo se usan clases de Tailwind.
  Este bloque es solo para referencia o para estilos personalizados.
*/
</style>
