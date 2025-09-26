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
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  piniaPersistedstate: {
    storage: "localStorage",
    debug: true,
    cookieOptions: {
      watch: true,
    },
  },
  primevue: {
    components: {
      include: "*",
    },
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".dark-mode",
        },
      },
    },
  },
  image: {
    domains: ["*"],
  },
  tailwindcss: {
    config: {
      darkMode: ["class", ".dark-mode"],
      content: [
        "./components/**/*.{vue,js,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./node_modules/primevue/**/*.{vue,js,ts}", // 👈 importante
      ],
    },
  },
  colorMode: {
    storage: "cookie",
    preference: "light",
    fallback: "light",
  },
  runtimeConfig: {
    googleApiKey: process.env.GOOGLE_SEARCH_API_KEY ?? "",
    googleApiUrl: process.env.GOOGLE_SEARCH_API_URL ?? "",
    googleSearchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID ?? "",
  },
});
