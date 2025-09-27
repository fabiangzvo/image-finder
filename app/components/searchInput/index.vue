<template>
  <div class="relative transition-all duration-300 w-full">
    <InputGroup
      class="shadow-md h-14 rounded-full px-2 border border-t-0 dark:border-gray-800 dark:bg-[field]"
    >
      <InputGroupAddon
        unstyled
        class="flex items-center justify-center rounded-full"
      >
        <Button class="w-10 h-10" icon="pi pi-search" rounded variant="text" />
      </InputGroupAddon>
      <InputText
        v-model="query"
        unstyled
        ref="inputRef"
        type="text"
        placeholder="Buscar imagenes..."
        class="w-full pl-4 py-4 text-lg rounded-2xl outline-none transition-all border-l-none"
        @focus="emit('focus', $event)"
        @keydown="emit('keydown', $event)"
        @update:modelValue="(value) => emit('update:input', value!)"
      />
      <Button
        v-show="!!query"
        variant="text"
        @click="emit('clear')"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-1 transition-colors"
        icon="pi pi-times"
      />
    </InputGroup>
  </div>
</template>

<script lang="ts" setup>
import type { SearchInputEmits } from "#shared/types/searchInput";

const emit = defineEmits<SearchInputEmits>();
const query = defineModel<string>();
</script>

<style></style>
