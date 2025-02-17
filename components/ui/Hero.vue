<template>
  <section
    class="relative h-[90vh] hidden md:flex items-center justify-center bg-cover bg-center px-8 "
    style="background-image: url('/hero-bg.png')"
  >
    <div
      class="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center text-white text-center w-[95%]  "
    >
      <div class="w-[100%]  ml-80  ">
        <h1 class="font-bold lg:text-[40px] md:text-[28px] md:leading-[42px] lg:leading-[45px] text-right">
          جمعية بناء لرعاية الأيتام تأسست الجمعية عام 2010 م ، تحت إشراف المركز
          الوطني لتنمية القطاع الغير ربحي بترخيص رقم 568 تساهم الجمعية برعاية
          وكفالة أكثر من 4500 يتيم ويتيمة
        </h1>
        <p class="font-normal lg:text-[28px] md:text-[20px] md:leading-[34px] lg:leading-[36px] text-right mt-4">
          قالَ رَسُول اللَّه ﷺ: (مَا مِنْ يَوْمٍ يُصبِحُ العِبادُ فِيهِ إِلَّا
          مَلَكَانِ يَنْزِلانِ، فَيَقُولُ أَحَدُهُمَا: اللَّهُمَّ أَعْطِ
          مُنْفِقًا خَلَفًا، وَيَقُولُ الآخَرُ: اللَّهُمَّ أَعْطِ مُمْسِكًا
          تَلَفًا)
        </p>
      </div>

      <div class="flex justify-center relative">
        <div class="hero-image relative ">
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
            class="masked-image relative z-[5] w-[90%]  "
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useAsyncData, useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();


const { data: baseURL } = await useAsyncData("baseURL", () => {
  return config.public.baseURL ?? "";
});


const heroImage = ref(`${baseURL.value}/hero-image2.png`);

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
  width:100%;
  /* width: fit-content;
  height: fit-content; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.masked-image {
  width: 100%;
  height: 100%;
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
