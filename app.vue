<template>
  <div>
    <div v-if="gameState === GAME_STATES.INTRO" class="intro-screen">
      <h1>賣女孩救火柴</h1>
      <p>Help the match girl survive by typing words related to dreams!</p>
      <button @click="startGame">Start Game</button>
    </div>

    <div v-else-if="gameState === GAME_STATES.LOADING" class="loading-screen">
      Loading...
    </div>

    <div v-else-if="gameState === GAME_STATES.LOSE" class="result-screen">
      <h2>Game Over!</h2>
      <p>Final Score: {{ score }}</p>
      <p>Levels Completed: {{ currentLevel - 1 }}</p>
      <button @click="returnToIntro">Return to Title</button>
    </div>

    <div v-else-if="gameState === GAME_STATES.WIN" class="result-screen">
      <h2>Congratulations!</h2>
      <p>You've completed all levels!</p>
      <p>Final Score: {{ score }}</p>
      <button @click="returnToIntro">Return to Title</button>
    </div>

    <div v-else-if="gameState === GAME_STATES.PLAYING">
      <div class="game-stats">
        <div class="timer">Time: {{ timeLeft }}s</div>
        <div>Level: {{ currentLevel }}/{{ MAX_LEVELS }}</div>
      </div>
      <label>Girl's Dream: {{ themeWord }}</label>
      <div>Target Score: {{ targetScore }}</div>
      <div>Current Score: {{ score }}</div>
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

<style scoped>
.timer {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 1rem;
}

.result-screen {
  text-align: center;
  padding: 2rem;
}

.result-screen button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.2em;
  cursor: pointer;
}

.game-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.intro-screen {
  text-align: center;
  padding: 2rem;
}

.intro-screen h1 {
  font-size: 2em;
  margin-bottom: 1rem;
}

.loading-screen {
  text-align: center;
  padding: 2rem;
}
</style>