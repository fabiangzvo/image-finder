<template>
  <div class="card">
    <Carousel :value="products" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions"
      pt:content:class="p-0 m-0" pt:body:class="!p-0 " pt:root:class="p-0 m-0">
      <template #item="slotProps">
        <Card class=" hover:scale-125 cursor-pointer transition-all duration-300" :pt="{
          body: { class: 'bg-gray-500 !p-0' }
        }">
          <template #content>
            <div class="relative mx-auto p-0 m-0">
              <Image :src="slotProps.data.img" :alt="slotProps.data.tag" class="w-full rounded h-full" preview />
              <div
                class="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large backdrop-blur backdrop-saturate-150 absolute bg-red-500/80 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                  <p class="text-black text-tiny">Available soon.</p>
                  <p class="text-black text-tiny">Get notified.</p>
                </div><button type="button" tabindex="0" data-react-aria-pressable="true"
                  class="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-3 min-w-16 h-8 gap-2 rounded-full [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover text-tiny">Notify
                  Me</button>
              </div>
            </div>
          </template>
        </Card>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
  { id: 1, img: '/image.jpg', tag: 'T-shirt' },
  { id: 2, img: '/image.jpg', tag: 'Pants' },
  { id: 3, img: '/image.jpg', tag: 'Shirt' },
  { id: 4, img: '/image.jpg', tag: 'Shirt' },
  { id: 5, img: '/image.jpg', tag: 'shoes' }
]);

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);
</script>
