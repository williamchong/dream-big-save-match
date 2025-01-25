<template>
  <div class="text-center p-8 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">賣女孩救火柴</h1>

    <div class="mb-8 relative aspect-[16/9] w-full">
      <img
        v-if="introImages[currentSlide]"
        :src="introImages[currentSlide]"
        :alt="`Story illustration ${currentSlide + 1}`"
        class="w-full h-full object-contain rounded-lg shadow-lg bg-gray-100"
      >
      <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        <button v-for="i in 3" :key="i" :class="[
          'w-3 h-3 rounded-full',
          currentSlide === i - 1 ? 'bg-blue-500' : 'bg-gray-300'
        ]" @click="currentSlide = i - 1" />
      </div>
    </div>

    <p class="mb-6 text-lg">{{ stories[currentSlide] }}</p>

    <div class="space-x-4">
      <button v-if="currentSlide > 0"
        class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors" @click="currentSlide--">
        Previous
      </button>
      <button v-if="currentSlide < 3"
        class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors" @click="currentSlide++">
        Next
      </button>
      <button
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        @click="$emit('startGame')">
        Start Game
      </button>
    </div>
  </div>
</template>

<script setup>
const currentSlide = ref(-1)

// Hack to avoid the first slide being empty
onMounted(() => {
  currentSlide.value = 0
})

// Import all intro images
const introImages = [
  new URL('../assets/intro/intro_0.jpeg', import.meta.url).href,
  new URL('../assets/intro/intro_1.jpeg', import.meta.url).href,
  new URL('../assets/intro/intro_2.jpeg', import.meta.url).href,
]

const stories = [
  "從前有一個賣女孩的小火柴，他手中有着各式各樣的小女孩，等着被人抽走，在不同的地方成長，實現自己的夢想。",
  "有一天小火柴在海旁叫賣：有沒有人要買小女孩啊？吸引了海神過來抽卡買女孩，但小火柴沒認出對方是神明，還以為是個普通的顧客。",
  "結果海神不滿自己抽到的女孩。一怒之下，火柴被吹進了海裡。海水即將熄滅火柴的火光，火柴情急之下召喚出了藏在其中的夢想之力...",
  "現在，你必須幫助火柴運用這些夢想之力，抵抗海中的威脅。記住，每個夢想都需要合適的關鍵詞來強化它的力量！"
]
</script>
