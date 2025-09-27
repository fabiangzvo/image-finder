<template>
  <Carousel
    :value="items"
    :numVisible="5"
    :numScroll="5"
    :responsiveOptions="responsiveOptions"
    :prevButtonProps="{
      class: 'absolute top-1/2 left-2 rounded-full z-50 disabled:hidden',
    }"
    :nextButtonProps="{
      class: 'absolute top-1/2 right-2 rounded-full z-50 disabled:hidden',
    }"
    pt:content:class="p-0 m-0 rounded-lg"
    pt:body:class="!p-0 "
    pt:root:class="p-0 m-0">
    <template #item="slotProps">
      <Card
        class="cursor-pointer transition-all duration-300 relative m-4 rounded-xl overflow-hidden shadow-lg"
        pt:body:class="!p-0"
        pt:footer:class="hidden">
        <template #content>
          <Image
            pt:image:class="min-h-[400px] object-cover object-center hover:scale-105"
            :src="slotProps.data.link"
            :alt="slotProps.data.title"
            class="w-full relative"
            preview />
          <div
            class="absolute bottom-0 p-2 w-full dark:bg-black/50 bg-white/60 backdrop-blur-sm h-20 flex flex-col cursor-default">
            <div class="flex flex-col">
              <span class="text-lg font-semibold">
                {{ slotProps.data.user?.name || "Usuario Anonimo" }}
              </span>
              <p class="text-md">
                {{ slotProps.data.user?.observations || "Descripción" }}
              </p>
            </div>
            <Button
              size="large"
              icon="pi pi-heart"
              class="absolute right-2 -translate-y-1/2"
              rounded />
          </div>
        </template>
      </Card>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import type { ListResultProps } from "#shared/types/listResult";

const props = defineProps<ListResultProps>();
const emit = defineEmits(["handleClick", "handlePagination"]);

const responsiveOptions = ref([
  {
    breakpoint: "@media (width >= 96rem)",
    numVisible: 5,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>
<style>
.p-items-hidden .p-carousel-item {
  visibility: visible;
}
</style>
