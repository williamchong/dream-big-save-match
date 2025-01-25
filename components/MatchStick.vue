<template>
  <div class="matchstick-container relative" :style="{ transform: `scale(${scale})` }">
    <!-- Match Stick -->
    <div class="matchstick">
      <div class="match-head"></div>
      <div class="match-stick"></div>
    </div>

    <!-- Flame Animation -->
    <div class="flame-wrapper">
      <div class="flame-base"></div>
      <div class="flame-mid"></div>
      <div class="flame-top"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  scale: {
    type: Number,
    default: 1
  }
})
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
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  filter: blur(0.02em);
}

.flame-base {
  width: 15px;
  height: 15px;
  background: #ff6b00;
  border-radius: 50% 50% 35% 35%;
  animation: flicker 0.5s ease-in infinite alternate;
}

.flame-mid {
  width: 10px;
  height: 25px;
  background: #ffd800;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50% 50% 20% 20%;
  animation: flicker 0.3s ease-out infinite alternate;
}

.flame-top {
  width: 8px;
  height: 8px;
  background: #ff3d00;
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  animation: flicker 0.2s ease-in infinite alternate;
}

@keyframes flicker {
  0% {
    transform: translateX(-50%) scale(0.9, 1.1);
  }
  100% {
    transform: translateX(-50%) scale(1.1, 0.9);
  }
}
</style>
