<template>
  <div class="h-full flex flex-col justify-center items-center gap-4">
    <h1>Welcome to the homepage</h1>
    <div>
      <Button
        :label="counterStore.count.toString()"
        @click="counterStore.increment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "../../stores/counter";

const counterStore = useCounterStore();
</script>

<style lang="scss"></style>
