// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'link', as: 'script', href: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs' },
        { rel: 'link', as: 'script', href: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder' },
      ],
      script: [
        { src: "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs" },
        { src: "https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder" },
      ],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
