<template>
  <section
    class="relative h-[60vh] md:h-[70vh] hidden md:flex items-center justify-center bg-cover bg-center px-4 md:px-8 h-[70vh]"
    style="background-image: url('/hero-bg.png')"
  >
    <div
      class="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center text-white w-full m-auto"
    >
      <div class="w-full px-4 md:px-6 lg:px-8 text-center mt-10">
        <h1 class="font-semibold text-[19px] text-center mb-2">
          {{ $t("hero.title") }}
        </h1>
        <p class="font-semibold text-[18px] p-2 mb-2 text-center">
          {{ $t("hero.deduction") }}
        </p>
        <p class="font-normal text-[18px] text-center mb-2">
          {{ $t("hero.quote") }}
        </p>
      </div>

      <div
        class="flex justify-center relative w-full px-4 md:px-6 lg:px-8 p-10 mt-10 h-[70vh]"
      >
        <div class="hero-image relative w-[clamp(200px,50vw,500px)]">
          <div
            v-for="(ball, index) in balls"
            :key="index"
            class="absolute rounded-full floating-ball"
            :style="{
              backgroundColor: ball.color,
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              top: `${ball.top}%`,
              left: `${ball.left}%`,
              zIndex: 10,
              animationDuration: `${ball.speed}s`,
              animationDelay: `${ball.delay}s`,
            }"
          ></div>
          <img
            v-if="heroImage"
            :src="heroImage"
            alt="Hero Image"
            class="masked-image relative z-[5]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
const heroImage = ref("/hero-image2.png");

const balls = ref([
  { size: 12, color: "#2753AC", top: 5, left: 5, speed: 4, delay: 0 },
  { size: 20, color: "#E56942", top: 25, left: 10, speed: 5, delay: 1 },
  { size: 18, color: "#FFB749", top: 10, left: 85, speed: 3, delay: 0.5 },
  { size: 25, color: "#A2C73B", top: 70, left: 95, speed: 6, delay: 1.2 },
  { size: 14, color: "#9042B6", top: 90, left: 25, speed: 4.5, delay: 0.8 },
  { size: 22, color: "#FF5733", top: 55, left: 5, speed: 3.5, delay: 1.5 },
  { size: 16, color: "#36A2EB", top: 15, left: 60, speed: 5, delay: 0.3 },
  { size: 30, color: "#FFC107", top: 75, left: 80, speed: 4.8, delay: 0.6 },
  { size: 10, color: "#8BC34A", top: 2, left: 50, speed: 3.2, delay: 1.1 },
  { size: 18, color: "#9C27B0", top: 95, left: 45, speed: 5.2, delay: 0.7 },
]);
</script>

<style scoped>
.hero-image {
  position: relative;
  width: 90%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.masked-image {
  width: 90%;
  height: auto;
  object-fit: contain;
  -webkit-mask-image: url("/mask-image.png");
  -webkit-mask-size: cover;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-image: url("/mask-image.png");
  mask-size: cover;
  mask-position: center;
  mask-repeat: no-repeat;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}

.floating-ball {
  animation: float infinite ease-in-out alternate;
  z-index: 10;
}
</style>
