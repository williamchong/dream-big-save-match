<template>
  <div class="matchstick-container relative" :style="{ transform: `scale(${scale})` }">
    <!-- Match Stick -->
    <div class="matchstick">
      <div class="match-head"></div>
      <div class="match-stick"></div>
    </div>

    <!-- Flame Animation with combo effects -->
    <div class="flame-wrapper" :style="flameStyle">
      <div class="flame-base" :style="flameBaseStyle"></div>
      <div class="flame-mid" :style="flameMidStyle"></div>
      <div class="flame-top" :style="flameTopStyle"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  scale: {
    type: Number,
    default: 1
  },
  comboCount: {
    type: Number,
    default: 0
  }
})

// Calculate flame size based on combo count
const flameScale = computed(() => 1 + (props.comboCount * 0.2)) // Increase by 20% per combo

const flameStyle = computed(() => ({
  transform: `translate(-50%, ${-30 - (props.comboCount * 2)}px) scale(${flameScale.value})`,
  filter: `blur(${0.02 + (props.comboCount * 0.005)}em)`,
  zIndex: 20
}))

// Base sizes for flames that will be scaled
const flameBaseStyle = computed(() => ({
  filter: `brightness(${1 + props.comboCount * 0.2}) drop-shadow(0 0 3px rgba(255,107,0,0.5))`,
  background: 'linear-gradient(to top, #ff6b00, #ff8800)',
}))

const flameMidStyle = computed(() => ({
  filter: `brightness(${1 + props.comboCount * 0.15}) drop-shadow(0 0 2px rgba(255,216,0,0.5))`,
  background: 'linear-gradient(to top, #ffd800, #ffef00)',
  height: `${25 + props.comboCount * 3}px` // Increase height with combo
}))

const flameTopStyle = computed(() => ({
  filter: `brightness(${1 + props.comboCount * 0.1}) drop-shadow(0 0 2px rgba(255,61,0,0.5))`,
  background: 'linear-gradient(to top, #ff3d00, #ff5500)',
  width: `${8 + props.comboCount * 1}px`, // Increase width with combo
  height: `${8 + props.comboCount * 1}px` // Increase height with combo
}))
</script>

<style scoped>
.matchstick-container {
  width: 20px;
  height: 100px;
  position: relative;
  transition: transform 0.3s ease;
}

.matchstick {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.match-head {
  position: absolute;
  top: 0;
  width: 100%;
  height: 20px;
  background: #e74c3c;
  border-radius: 50% 50% 20% 20%;
}

.match-stick {
  position: absolute;
  top: 20px;
  width: 40%;
  height: calc(100% - 20px);
  left: 30%;
  background: #d5bc93;
}

.flame-wrapper {
  position: absolute;
  top: 20px;  /* Adjusted position */
  left: 50%;
  transform: translateX(-50%);
  filter: blur(0.02em);
  transition: all 0.3s ease;
  mix-blend-mode: screen;  /* Add blend mode for better fire effect */
}

.flame-base {
  position: absolute;
  width: 15px;
  height: 15px;
  left: 50%;
  background: #ff6b00;
  border-radius: 50% 50% 35% 35%;
  animation: flicker 0.5s ease-in infinite alternate;
  transition: all 0.3s ease;
  opacity: 0.9;
}

.flame-mid {
  width: 10px;
  height: 25px;
  background: #ffd800;
  position: absolute;
  left: 50%;
  bottom: -15px;
  transform: translateX(-50%);
  border-radius: 50% 50% 20% 20%;
  animation: flicker 0.3s ease-out infinite alternate;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.flame-top {
  width: 8px;
  height: 8px;
  background: #ff3d00;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  animation: flicker 0.2s ease-in infinite alternate;
  transition: all 0.3s ease;
  opacity: 0.7;
}

@keyframes flicker {
  0% {
    transform: translateX(-50%) scale(0.9, 1.1);
    opacity: 0.9;
  }

  100% {
    transform: translateX(-50%) scale(1.1, 0.9);
    opacity: 1;
  }
}
</style>
