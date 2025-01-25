<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <label>{{ themeWord }}</label>
      <div>Target: {{ targetScore }}</div>
      <p>{{ score }}</p>
      <form @submit.prevent="onSubmit">
        <input v-model="inputWord">
        <button type="submit">
          Enter
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { loadModel, compareWord } from './utils/model'
import { LIST_OF_THEMES } from './constant'

const isLoading = ref(true)
const themeWord = ref('')
const inputWord = ref('')
const targetScore = ref(5)
const score = ref(0)

onMounted(async () => {
  isLoading.value = true
  await loadModel()
  isLoading.value = false
  onNewGame()
})

function onNewGame() {
  onNewLevel()
}

function getRandomTheme() {
  const randomIndex = Math.floor(Math.random() * LIST_OF_THEMES.length)
  return LIST_OF_THEMES[randomIndex]
}

function onNewLevel() {
  inputWord.value = ''
  score.value = 0
  themeWord.value = getRandomTheme()
}

async function onSubmit() {
  const question = `How can I become ${themeWord.value}?'`
  const result = await compareWord(question, inputWord.value)
  if (result >= 11) {
    // good answer
    score.value += Math.round((result - 10)^2)
  } else {
    // bad or meh answer
    score.value -= Math.round(10 - result)
  }
  inputWord.value = ''
}
</script>