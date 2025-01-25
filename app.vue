<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="timer">Time: {{ timeLeft }}s</div>
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

const TIME_LIMIT = 60 // 60 seconds per level
const timeLeft = ref(TIME_LIMIT)
const timerInterval = ref(null)
const endTime = ref(null)

onMounted(async () => {
  isLoading.value = true
  await loadModel()
  isLoading.value = false
  onNewGame()
})

function startTimer() {
  clearInterval(timerInterval.value)
  endTime.value = new Date(Date.now() + TIME_LIMIT * 1000)
  timeLeft.value = TIME_LIMIT
  
  timerInterval.value = setInterval(() => {
    const now = new Date()
    const remaining = Math.max(0, Math.ceil((endTime.value - now) / 1000))
    
    timeLeft.value = remaining
    if (remaining <= 0) {
      clearInterval(timerInterval.value)
      endLevel()
    }
  }, 500) // 更頻繁檢查以獲得更準確的倒數
}

function endLevel() {
  clearInterval(timerInterval.value)
  if (score.value >= targetScore.value) {
    alert('Level Complete!')
    onNewLevel()
  } else {
    alert('Game Over!')
    onNewGame()
  }
}

function onNewGame() {
  clearInterval(timerInterval.value)
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
  startTimer()
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

onUnmounted(() => {
  clearInterval(timerInterval.value)
})
</script>

<style scoped>
.timer {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>