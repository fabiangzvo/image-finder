import Aura from "@primeuix/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
  ],
  primevue: {
    components: {
      include: "*",
    },
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
});
