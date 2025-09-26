<template>
  <div class="border-b border-gray-100 w-[50rem] max-md:max-w-[30rem]">
    <div class="px-4 py-2 mb-4 text-xs font-semibold text-gray-600 uppercase">
      Busquedas recientes
    </div>
    <Listbox
      paginator
      class="w-full border-none bg-[var(--p-popover-background)] &>.p-popover-content:bg-red-500"
      emptyMessage="No hay historial de busqueda"
      :options="store.history"
      :rows="5"
      v-model="selected"
      @update:modelValue="emit('change', selected)" />
  </div>
</template>

<script setup lang="ts">
import { useHistoryStore } from "../../stores/history";

interface Emits {
  (e: "change", value: string): void;
}

const emit = defineEmits<Emits>();

const store = useHistoryStore();
const selected = ref<string>("");
</script>

<style></style>
