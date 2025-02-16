<template>
  <div class="h-screen flex flex-col md:flex-row relative">
    <!-- Background Section -->
    <div class="absolute md:relative inset-0 h-full lg:w-[50%] w-full bg-[url('/bg.png')] bg-cover bg-center">
      <div class="hidden md:flex justify-center items-center h-full">
        <img src="/heart-hands.png" alt="Heart Hands" class="w-45" />
      </div>
    </div>

    <!-- Form Section -->
    <div class="absolute inset-0 md:relative md:w-1/2 flex justify-center items-center p-4">
      <div class="w-full max-w-sm md:w-full md:max-w-none md:h-full bg-white/30 backdrop-blur-md rounded-lg p-6 
                  md:bg-white md:backdrop-blur-none md:flex md:items-center md:justify-center">
        
        <div class="flex flex-col items-center w-full min-h-[300px] md:min-h-[400px] relative">
  <div class="w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-b from-[#169FAE] to-[#138B96] p-2 mb-4">
    <img src="/logo.png" alt="Logo" class="w-[50%] h-[50%]" />
  </div>

          <p class="text-dark mb-6 font-bold text-center">
            جمعية بناء لرعاية الأيتام ترخيص 568
          </p>

          <Transition :name="store.transitionDirection" mode="out-in">
  <component :is="currentStepComponent"></component>
</Transition>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRegisterStore } from '@/stores/register';
definePageMeta({
  layout: "auth",
});


const store = useRegisterStore();
const loadingStore = useLoadingStore();



const steps = [
  defineAsyncComponent(() => import('@/components/register/RegisterPhone.vue')),
  defineAsyncComponent(() => import('@/components/register/RegisterName.vue')),
  defineAsyncComponent(() => import('@/components/register/RegisterOTP.vue')),
  defineAsyncComponent(() => import('@/components/register/RegisterSuccess.vue'))
];

const currentStepComponent = computed(() => steps[store.step]);
</script>

<style scoped>
.slide-left-enter-active, .slide-right-leave-active,
.slide-right-enter-active, .slide-left-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.4s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>




