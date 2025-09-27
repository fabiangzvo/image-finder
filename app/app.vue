<template>
  <div class="relative dark:bg-black bg-white">
    <ThemeButton />
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <ConfirmDialog></ConfirmDialog>
    <Toast />
  </div>
</template>
<script setup lang="ts">
import "primeicons/primeicons.css";
</script>
<style>
@import "tailwindcss-primeui";
</style>
