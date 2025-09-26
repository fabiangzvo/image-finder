<template>
  <div class="relative dark:bg-black bg-white">
    <ThemeButton />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import "primeicons/primeicons.css";

import ThemeButton from "../components/themeButton/index.vue";
</script>
<style>
@import "tailwindcss-primeui";
</style>
