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
    pt:root:class="p-0 m-0"
  >
    <template #item="slotProps">
      <Card
        class="cursor-pointer transition-all duration-300 relative m-2 rounded-xl overflow-hidden shadow-lg"
        pt:body:class="!p-0"
        pt:footer:class="hidden"
      >
        <template #content>
          <Image
            pt:image:class="min-h-[400px] object-cover object-center cursor-default"
            class="w-full relative"
            :src="slotProps.data.link"
            :alt="slotProps.data.title"
            :preview="
              !salesStore.responses.some(
                (response) => response.key === store.query
              )
            "
          />
          <div
            class="absolute bottom-0 p-2 w-full dark:bg-black/70 bg-white/90 backdrop-blur-sm h-20 flex flex-col cursor-default"
          >
            <div class="flex flex-col">
              <span class="text-lg font-semibold line-clamp-1 pr-2">
                {{ slotProps.data.user?.name || "Usuario Anonimo" }}
              </span>
              <p class="text-md">
                {{ slotProps.data.user?.observations || "Descripción" }}
              </p>
            </div>
            <Button
              size="large"
              :icon="
                salesStore.responses.some(
                  (response) =>
                    response.user === slotProps.data.user.id &&
                    response.key === store.query
                )
                  ? 'pi pi-heart-fill'
                  : 'pi pi-heart'
              "
              class="absolute right-2 -translate-y-10 disabled:bg-[var(--p-primary-800)] disabled:opacity-100"
              rounded
              :disabled="
                salesStore.responses.some(
                  (response) => response.key === store.query
                )
              "
              @click="
                salesStore.addResponse(slotProps.data.user.id, store.query)
              "
            />
          </div>
        </template>
      </Card>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import type { ListResultProps } from "#shared/types/listResult";

defineProps<ListResultProps>();
const emit = defineEmits(["handleClick", "handlePagination"]);

const salesStore = useSalesStore();
const store = useHistoryStore();

const responsiveOptions = ref([
  {
    breakpoint: "96rem",
    numVisible: 4,
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
