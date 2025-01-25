<template>
  <div class="min-h-screen flex flex-col">
    <div v-if="gameState === GAME_STATES.INTRO">
      <IntroScreen @startGame="startGame" />
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

    <div v-else-if="gameState === GAME_STATES.PLAYING && isLoading" class="flex-1 flex items-center justify-center">
      <div class="animate-pulse text-2xl">Loading...</div>
    </div>

    <div v-else-if="gameState === GAME_STATES.PLAYING" class="flex-1">
      <GameScreen :time-left="timeLeft" :level="currentLevel" :max-level="MAX_LEVELS" :theme="themeWord" :score="score"
        :target-score="targetScore" :combo-count="comboCount" :combo-time-left="comboTimeLeft"
        :multiplier="currentMultiplier" v-model="inputWord" @submit="onSubmit" />
    </div>
  </div>
</template>

<script setup>
import IntroScreen from './components/IntroScreen.vue'
import GameScreen from './components/GameScreen.vue'
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

// Combo system constants
const INITIAL_COMBO_TIME = 5000 // 5 seconds
const MAX_COMBO = 5
const BASE_MULTIPLIER = 1.2

// Add combo state
const comboCount = ref(0)
const comboTimer = ref(null)
const comboEndTime = ref(null)
const comboTimeLeft = ref(0)

const currentMultiplier = computed(() => {
  if (comboCount.value === 0) return 1
  return Math.pow(BASE_MULTIPLIER, Math.min(comboCount.value, MAX_COMBO))
})

onMounted(async () => {
  isLoading.value = true
  await loadModel()
  isLoading.value = false
})

async function startGame() {
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
  comboCount.value = 0
  clearInterval(comboTimer.value)
}

function startComboTimer() {
  clearInterval(comboTimer.value)
  const duration = INITIAL_COMBO_TIME - (comboCount.value * 500)
  comboEndTime.value = Date.now() + duration

  comboTimer.value = setInterval(() => {
    const now = Date.now()
    comboTimeLeft.value = Math.max(0, comboEndTime.value - now)

    if (comboTimeLeft.value <= 0) {
      clearInterval(comboTimer.value)
      comboCount.value = 0
    }
  }, 16)
}

async function onSubmit() {
  const question = `How can I become ${themeWord.value}?'`
  const result = await compareWord(question, inputWord.value)

  if (result >= 11) {
    const baseScore = (result - 10) ^ 2
    const finalScore = Math.round(baseScore * currentMultiplier.value)
    score.value += finalScore

    comboCount.value = Math.min(comboCount.value + 1, MAX_COMBO)
    startComboTimer()
  } else {
    comboCount.value = 0
    clearInterval(comboTimer.value)
    score.value -= Math.round(10 - result)
  }

  inputWord.value = ''
}

onUnmounted(() => {
  clearInterval(timerInterval.value)
  clearInterval(comboTimer.value)
})
</script>