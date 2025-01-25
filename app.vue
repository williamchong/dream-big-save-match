<template>
  <div class="p-4">
    <div v-if="gameState === GAME_STATES.INTRO" class="text-center p-8">
      <h1 class="text-4xl font-bold mb-4">賣女孩救火柴</h1>
      <p class="mb-4">Help the match girl survive by typing words related to dreams!</p>
      <button @click="startGame"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Start Game
      </button>
    </div>

    <div v-else-if="gameState === GAME_STATES.LOADING" class="text-center p-8">
      Loading...
    </div>

    <div v-else-if="gameState === GAME_STATES.LOSE" class="text-center p-8">
      <h2 class="text-3xl font-bold mb-4">Game Over!</h2>
      <p class="mb-2">Final Score: {{ score }}</p>
      <p class="mb-4">Levels Completed: {{ currentLevel - 1 }}</p>
      <button @click="returnToIntro"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Return to Title
      </button>
    </div>

    <div v-else-if="gameState === GAME_STATES.WIN" class="text-center p-8">
      <h2 class="text-3xl font-bold mb-4">Congratulations!</h2>
      <p class="mb-2">You've completed all levels!</p>
      <p class="mb-4">Final Score: {{ score }}</p>
      <button @click="returnToIntro"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Return to Title
      </button>
    </div>

    <div v-else-if="gameState === GAME_STATES.PLAYING" class="space-y-4">
      <div class="flex justify-between items-center mb-4">
        <div class="text-xl font-bold">Time: {{ timeLeft }}s</div>
        <div>Level: {{ currentLevel }}/{{ MAX_LEVELS }}</div>
      </div>

      <div class="space-y-2">
        <label class="block">Girl's Dream: {{ themeWord }}</label>
        <div>Target Score: {{ targetScore }}</div>
        <div>Current Score: {{ score }}</div>
      </div>

      <form @submit.prevent="onSubmit" class="flex gap-2">
        <input v-model="inputWord"
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button type="submit" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Enter
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { loadModel, compareWord } from './utils/model'
import { LIST_OF_THEMES, GAME_STATES } from './constant'

const MAX_LEVELS = 5
const gameState = ref(GAME_STATES.INTRO) // 'playing', 'over', 'win'
const currentLevel = ref(1)

const isLoading = ref(true)
const themeWord = ref('')
const inputWord = ref('')
const targetScore = ref(0)
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

async function startGame() {
  gameState.value = GAME_STATES.LOADING
  await loadModel()
  onNewGame()
}

function returnToIntro() {
  gameState.value = GAME_STATES.INTRO
  clearInterval(timerInterval.value)
}

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
  }, 500)
}

function endLevel() {
  clearInterval(timerInterval.value)
  if (score.value >= targetScore.value) {
    if (currentLevel.value >= MAX_LEVELS) {
      gameState.value = GAME_STATES.WIN
    } else {
      currentLevel.value++
      onNewLevel()
    }
  } else {
    gameState.value = GAME_STATES.LOSE
  }
}

function onNewGame() {
  gameState.value = GAME_STATES.PLAYING
  currentLevel.value = 1
  targetScore.value = 5
  onNewLevel()
}

function getRandomTheme() {
  const randomIndex = Math.floor(Math.random() * LIST_OF_THEMES.length)
  return LIST_OF_THEMES[randomIndex]
}

function onNewLevel() {
  inputWord.value = ''
  targetScore.value += 5
  score.value = 0
  themeWord.value = getRandomTheme()
  startTimer()
}

async function onSubmit() {
  const question = `How can I become ${themeWord.value}?'`
  const result = await compareWord(question, inputWord.value)
  if (result >= 11) {
    // good answer
    score.value += Math.round((result - 10) ^ 2)
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