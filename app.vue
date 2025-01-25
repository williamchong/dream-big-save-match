<template>
  <div>
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
</template>
<script setup>
import { loadModel, compareWord } from './utils/model'

const themeWord = 'How can one become rich?'
const inputWord = ref('')
const targetScore = ref(5)
const score = ref(0)

onMounted(() => {
  loadModel()
})

async function onSubmit() {
  score.value = await compareWord(themeWord, inputWord.value)
}
</script>