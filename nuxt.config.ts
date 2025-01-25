// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "賣女孩救火柴 - Dream Big Save Match",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "在這款獨特的文字輸入遊戲中，扮演掉入海中的火柴，運用小女孩的夢想之力來對抗海中的威脅。Global Game Jam Hong Kong 2025 參賽作品。",
        },
        {
          name: "keywords",
          content: "game jam, indie game, word game, match girl, dream",
        },

        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "賣女孩救火柴 - Dream Big Save Match",
        },
        {
          property: "og:description",
          content:
            "在這款獨特的文字輸入遊戲中，扮演掉入海中的火柴，運用小女孩的夢想之力來對抗海中的威脅。Global Game Jam Hong Kong 2025 參賽作品。",
        },
      ],
      link: [
        {
          rel: "link",
          as: "script",
          href: "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs",
        },
        {
          rel: "link",
          as: "script",
          href: "https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder",
        },
      ],
      script: [
        { src: "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs" },
        {
          src: "https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder",
        },
      ],
    },
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss"],
});
