<template>
  <section
    class="relative min-h-[60vh] md:min-h-[70vh] hidden md:flex items-center justify-center bg-cover bg-center px-4 md:px-8"
    :class="{
      'pt-[9vw] md:pt-[9vw] pb-[5vw]': locale === 'en',
      'pt-[9vw] md:pt-[9vw] pb-[5vw]': locale === 'ar',
    }"
    style="background-image: url('/hero-bg.png')"
  >
    <div
      class="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center text-white w-full max-w-[90vw]"
      :class="{ 'md:grid-cols-2-reverse': locale === 'ar' }"
    >
      <div
        class="w-full px-4 md:px-6 lg:px-8"
        :class="{
          'text-right md:pr-4 lg:pr-8': locale === 'ar',
          'text-left md:pl-4 lg:pl-8': locale === 'en',
        }"
      >
        <h1
          class="font-bold text-[clamp(16px,0.08*50vw,30px)] leading-[clamp(24px,0.1*50vw,45px)] text-justify"
          :class="{
            'text-right': locale === 'ar',
            'text-left': locale === 'en',
          }"
        >
          {{
            locale === "ar"
              ? "جمعية بناء لرعاية الأيتام تأسست الجمعية عام 2010 م ، تحت إشراف المركز الوطني لتنمية القطاع الغير ربحي بترخيص رقم 568 تساهم الجمعية برعاية وكفالة أكثر من 4500 يتيم ويتيمة"
              : "Bina Association for Orphan Care was established in 2010 under the supervision of the National Center for Non-Profit Sector Development with license number 568. The association contributes to the care and sponsorship of over 4,500 orphans."
          }}
        </h1>
        <p
          class="font-normal text-[clamp(14px,0.06*50vw,24px)] leading-[clamp(20px,0.08*50vw,36px)] mt-[2vw] text-justify"
          :class="{
            'text-right': locale === 'ar',
            'text-left': locale === 'en',
          }"
        >
          {{
            locale === "ar"
              ? "قالَ رَسُول اللَّه ﷺ: (مَا مِنْ يَوْمٍ يُصبِحُ العِبادُ فِيهِ إِلَّا مَلَكَانِ يَنْزِلانِ، فَيَقُولُ أَحَدُهُمَا: اللَّهُمَّ أَعْطِ مُنْفِقًا خَلَفًا، وَيَقُولُ الآخَرُ: اللَّهُمَّ أَعْطِ مُمْسِكًا تَلَفًا)"
              : "The Messenger of Allah (peace be upon him) said: 'There is no day on which the servants wake up but that two angels descend. One of them says: O Allah, grant a successor to the one who spends, and the other says: O Allah, grant ruin to the one who withholds.'"
          }}
        </p>
      </div>

      <div class="flex justify-center relative w-full px-4 md:px-6 lg:px-8">
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
            class="masked-image relative z-[5] w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useAsyncData, useRuntimeConfig } from "#imports";
import { useI18n } from "vue-i18n";

const config = useRuntimeConfig();
const { locale } = useI18n();

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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.masked-image {
  width: 100%;
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

.grid-cols-2-reverse {
  direction: rtl;
}
</style>