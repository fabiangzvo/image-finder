<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8 transition-all duration-500 flex flex-col items-center justify-center">
    
    <!-- Título y subtítulo, se desvanecen al empezar a buscar -->
    <div :class="`text-center transition-all duration-500 ${isExpanded ? 'opacity-0 scale-95 -translate-y-8 h-0 overflow-hidden mb-0' : 'opacity-100 scale-100 mb-12'}`">
      <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
        Búsqueda Inteligente
      </h1>
      <p class="text-gray-600 text-lg">Encuentra lo que necesitas con nuestra búsqueda avanzada</p>
    </div>

    <div :class="`max-w-4xl w-full mx-auto transition-transform duration-500 ease-in-out ${isExpanded ? '-translate-y-32' : ''}`">
      <!-- Barra de búsqueda principal -->
      <div ref="searchRef" class="relative">
        <div :class="`relative bg-white rounded-2xl shadow-xl transition-all duration-300 ${isOpen ? 'ring-2 ring-blue-500 shadow-2xl' : ''}`">
          <div class="relative">
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
              :class="`lucide lucide-search absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isOpen ? 'text-blue-500' : 'text-gray-400'}`"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            
            <input
              ref="inputRef"
              type="text"
              v-model="query"
              @input="handleInputChange"
              @focus="setIsOpen(true)"
              @keydown="handleKeyDown"
              placeholder="Buscar productos, categorías, marcas..."
              class="w-full pl-12 pr-12 py-4 text-lg rounded-2xl outline-none transition-all"
            />
            
            <button
              v-if="query"
              @click="clearSearch"
              class="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
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
                class="lucide lucide-x w-5 h-5 text-gray-400 hover:text-gray-600"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Dropdown de sugerencias -->
        <div v-if="isOpen" class="absolute w-full mt-2 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <!-- Loading state -->
          <div v-if="isLoading" class="p-8 flex flex-col items-center justify-center text-gray-500">
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

          <!-- Sugerencias de búsqueda -->
          <div v-if="!isLoading && query && suggestions.length > 0" class="py-2">
            <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
              Resultados
            </div>
            <ListResult />
          </div>

          <!-- Sin resultados -->
          <div v-if="!isLoading && query && suggestions.length === 0" class="p-8 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
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
                class="lucide lucide-search w-8 h-8 text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <p class="text-gray-500 mb-1">No se encontraron resultados</p>
            <p class="text-sm text-gray-400">Intenta con otros términos de búsqueda</p>
          </div>

          <!-- Estado inicial: Búsquedas recientes y trending -->
          <div v-if="!isLoading && !query">
            <!-- Búsquedas recientes -->
            <div v-if="recentSearches.length > 0" class="border-b border-gray-100">
              <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                Recientes
              </div>
              <button
                v-for="(search, index) in recentSearches"
                :key="index"
                @click="() => { setQuery(search); performSearch(search, activeFilter); }"
                class="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
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
                  class="lucide lucide-clock w-4 h-4 text-gray-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span class="text-gray-700">{{ search }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import ListResult from '../../components/list-result/index.vue';

const query = ref('');
const isOpen = ref(false);
const isLoading = ref(false);
const suggestions = ref([]);
const recentSearches = ref([]);
const selectedIndex = ref(-1);
const activeFilter = ref('all');
const searchRef = ref(null);
const inputRef = ref(null);
let debounceTimer = null;
const isExpanded = ref(false);

// Datos simulados para demostración
const mockData = {
  products: [
    { id: 1, title: 'MacBook Pro 16"', category: 'Laptops', trending: true },
    { id: 2, title: 'iPhone 15 Pro Max', category: 'Smartphones', trending: true },
    { id: 3, title: 'iPad Air', category: 'Tablets' },
    { id: 4, title: 'AirPods Pro', category: 'Audio' },
    { id: 5, title: 'Apple Watch Ultra', category: 'Wearables', trending: true },
    { id: 6, title: 'Magic Keyboard', category: 'Accesorios' },
    { id: 7, title: 'Studio Display', category: 'Monitores' },
    { id: 8, title: 'Mac Mini', category: 'Desktops' },
  ],
  categories: ['all', 'Laptops', 'Smartphones', 'Tablets', 'Audio', 'Wearables', 'Accesorios', 'Monitores', 'Desktops'],
  trending: [
    'iPhone 15 Pro Max',
    'MacBook Pro',
    'Apple Watch Ultra',
    'AirPods Pro'
  ]
};

// Cargar búsquedas recientes del localStorage al montar el componente
onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  recentSearches.value = saved.slice(0, 5);

  const handleClickOutside = (event) => {
    if (searchRef.value && !searchRef.value.contains(event.target)) {
      isOpen.value = false;
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));
});

const performSearch = (searchTerm, filter) => {
  if (searchTerm.trim().length < 3) {
    suggestions.value = [];
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  
  setTimeout(() => {
    const filtered = mockData.products.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || item.category === filter;
      return matchesQuery && matchesFilter;
    });
    
    suggestions.value = filtered;
    isLoading.value = false;
  }, 300);
};

const handleInputChange = (e) => {
  const value = e.target.value;
  query.value = value;
  isOpen.value = true;
  selectedIndex.value = -1;
  
  if (value.length === 0) {
    isExpanded.value = false;
  }

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (value.trim().length >= 3) {
      isExpanded.value = true;
      performSearch(value, activeFilter.value);
    } else {
      isExpanded.value = false;
    }
  }, 300);
};

const saveToRecent = (searchTerm) => {
  const updated = [searchTerm, ...recentSearches.value.filter(s => s !== searchTerm)].slice(0, 5);
  recentSearches.value = updated;
  localStorage.setItem('recentSearches', JSON.stringify(updated));
};

const handleSelect = (item) => {
  query.value = item.title;
  saveToRecent(item.title);
  isOpen.value = false;
  console.log('Seleccionado:', item);
};

const handleKeyDown = (e) => {
  if (!isOpen.value) return;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      selectedIndex.value = selectedIndex.value < suggestions.value.length - 1 ? selectedIndex.value + 1 : selectedIndex.value;
      break;
    case 'ArrowUp':
      e.preventDefault();
      selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : -1;
      break;
    case 'Enter':
      e.preventDefault();
      if (selectedIndex.value >= 0 && suggestions.value[selectedIndex.value]) {
        handleSelect(suggestions.value[selectedIndex.value]);
      } else if (query.value) {
        saveToRecent(query.value);
        isOpen.value = false;
      }
      break;
    case 'Escape':
      isOpen.value = false;
      break;
  }
};

const clearSearch = () => {
  query.value = '';
  suggestions.value = [];
  isOpen.value = false;
  isExpanded.value = false;
  inputRef.value?.focus();
};

const handleFilterChange = (filter) => {
  activeFilter.value = filter;
  performSearch(query.value, filter);
};
</script>

<style scoped>
/*
  Los estilos de Tailwind se pueden usar directamente en la plantilla.
  No se necesita un bloque <style> si solo se usan clases de Tailwind.
  Este bloque es solo para referencia o para estilos personalizados.
*/
</style>