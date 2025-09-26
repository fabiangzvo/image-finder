<template>
  <Button class="!absolute left-0 top-0" variant="text" pt:icon:style="font-size:1.3rem; font-weight:bold;"
    :icon="$colorMode.value !== 'dark' ? 'pi pi-moon' : 'pi pi-sun'" @click="
      $colorMode.value = $colorMode.value === 'dark' ? 'light' : 'dark'
      " />
</template>

<script lang="ts" setup></script>

<style></style>
