<template>
  <div class="h-full flex flex-col">
    <!-- Game Area with Ocean Background -->
    <div class="flex-1 relative flex items-center justify-between p-4 md:p-8 min-h-[400px] ocean-bg overflow-hidden">
      <!-- Ocean Waves Animation -->
      <div class="waves-overlay"></div>

      <!-- Battle Info with better contrast -->
      <div class="absolute top-4 left-0 right-0 flex justify-between px-4 md:px-8 z-20">
        <div class="text-lg md:text-xl font-bold text-white drop-shadow-md">Time: {{ timeLeft }}s</div>
        <div class="text-white drop-shadow-md">Level: {{ level }}/{{ maxLevel }}</div>
      </div>

      <!-- Enemy with fixed aspect ratio container -->
      <div class="w-1/3 relative z-10">
        <div class="aspect-square relative mx-auto max-w-[200px] md:max-w-[300px]">
          <img :src="currentEnemy" :alt="enemyName"
            class="absolute inset-0 w-full h-full object-contain transform-gpu animate-float">
        </div>
      </div>

      <!-- Match in Bubble with enhanced effects -->
      <div class="w-1/3 relative z-30"> <!-- Increased z-index -->
        <div class="aspect-square relative mx-auto w-[150px] md:w-[200px]">
          <div class="absolute inset-0 rounded-full animate-pulse bubble-effect" :style="bubbleStyle" />
          <div class="absolute inset-0 flex items-center justify-center">
            <MatchStick :scale="1.5" :combo-count="comboCount" />
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 md:p-8 bg-gray-50">
      <div class="max-w-3xl mx-auto">
        <!-- Combo Display -->
        <div v-if="comboCount > 0" class="mb-4">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold">Combo x{{ comboCount }} ({{ multiplier.toFixed(1) }}x)</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500 transition-all duration-100"
              :style="{ width: `${(comboTimeLeft / comboTimeTotal) * 100}%` }"></div>
          </div>
        </div>

        <div class="mb-4 space-y-2">
          <div class="text-base md:text-lg">Girl's Dream: {{ displayTheme }}</div>
          <div>Target: {{ targetScore }} | Score: {{ score }}</div>
        </div>

        <form class="flex gap-2 relative" @submit.prevent="$emit('submit')">
          <input :value="modelValue"
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your answer..." @input="$emit('update:modelValue', $event.target.value)">
          <button type="submit" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Enter
          </button>
          <!-- Feedback Emoji -->
          <Transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="showFeedback" class="-top-12 left-4 text-4xl animate-bounce"
              :class="{ 'text-green-500': lastInputGood, 'text-red-500': !lastInputGood }">
              {{ lastInputGood ? '✨' : '💧' }}
            </div>
          </Transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import MatchStick from './MatchStick.vue'

const props = defineProps({
  timeLeft: Number,
  level: Number,
  maxLevel: Number,
  theme: String,
  score: Number,
  targetScore: Number,
  modelValue: String,
  comboCount: Number,
  comboTimeLeft: Number,
  comboTimeTotal: Number,
  multiplier: Number,
  lastInputGood: {
    type: Boolean,
    default: false
  },
  showFeedback: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'submit'])

// Add computed property for formatted theme display
const displayTheme = computed(() => {
  if (!props.theme) return ''
  return props.theme.charAt(0).toUpperCase() + props.theme.slice(1)
})

// Enemy management
const enemies = [
  'block.jpeg',
  'cat.jpeg',
  'coke.jpeg',
  'ghost.jpeg',
  'ghoul.jpeg',
  'snake.jpeg',
  'sushi.jpeg',
]

// New function to get random enemy
function getRandomEnemy() {
  const randomIndex = Math.floor(Math.random() * enemies.length)
  return enemies[randomIndex]
}

const currentEnemy = computed(() => {
  // Use props.level as seed to ensure same enemy for same level attempt
  const enemy = getRandomEnemy()
  return new URL(`../assets/enemy/${enemy}`, import.meta.url).href
})

const enemyName = computed(() =>
  currentEnemy.value.split('/').pop().split('.')[0]
)

// Enhanced bubble style with more protective appearance
const bubbleStyle = computed(() => {
  const scoreRatio = props.score / props.targetScore
  return {
    background: `radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(147,197,253,${0.3 + (scoreRatio * 0.3)}) 100%)`,
    transform: `scale(${1 + (scoreRatio * 0.5)})`,
    border: `${2 + (scoreRatio * 4)}px solid rgba(255,255,255,0.6)`,
    boxShadow: `0 0 20px rgba(147,197,253,${0.3 + (scoreRatio * 0.3)})`
  }
})
</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.ocean-bg {
  background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
  position: relative;
}

.waves-overlay {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%23ffffff11'/%3E%3C/svg%3E");
  background-position: center;
  background-repeat: repeat-x;
  animation: wave 20s linear infinite;
  opacity: 0.3;
}

.bubble-effect {
  backdrop-filter: blur(4px);
}

@keyframes wave {
  0% {
    background-position-x: 0;
  }

  100% {
    background-position-x: 800px;
  }
}
</style>
