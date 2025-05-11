<template>
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 bg-white flex overflow-hidden w-[95%] h-[95vh] border border-gray-200 rounded-lg m-auto">
    <div class="hidden md:flex w-1/2 bg-[url('/bg.png')] bg-cover bg-center relative">
      <div class="flex justify-center items-center w-full">
        <img src="/heart-hands.png" alt="Heart Hands" class="w-45" />
      </div>
    </div>

    <div class="inset-0 bg-[url('/bg.png')] bg-cover bg-center z-50">
      <button @click="closeModal" class="absolute top-5 right-5 z-60" ref="isOpen">
        <UButton color="gray" variant="ghost" size="lg" icon="heroicons:x-mark" />
      </button>
    </div>

    <div class="relative z-10 w-full md:w-1/2 flex justify-center items-center p-4 bg-white md:bg-transparent">
      <div
        class="w-full max-w-sm md:w-full md:max-w-none md:h-full bg-white/30 backdrop-blur-md rounded-lg p-6 
                md:bg-white md:backdrop-blur-none md:flex md:items-center md:justify-center"
      >
        <div class="flex flex-col items-center w-full min-h-[300px] md:min-h-[400px] relative">
          <div
            class="lg:w-40 lg:h-40 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-gradient-to-b from-[#169FAE] to-[#138B96] p-2 mb-4"
          >
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
</Transition>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent, watch } from 'vue';
import { useRegisterStore } from '@/stores/register';

const store = useRegisterStore();

const steps = [
  defineAsyncComponent(() => import('@/components/register/RegisterPhone.vue')),
  defineAsyncComponent(() => import('@/components/register/RegisterName.vue')),
  defineAsyncComponent(() => import('@/components/register/RegisterOTP.vue')),
  defineAsyncComponent(() => import('@/components/register/RegisterSuccess.vue')),
];

const currentStepComponent = computed(() => steps[store.step]);

const isOpen = ref(true);


// const emit = defineEmits(['close']);

const closeModal = () => {
  console.log("close");
  isOpen.value = false;
  document.body.classList.remove('modal-open');
  // emit('close');
};

watch(isOpen, (val) => {
  document.body.classList.toggle('modal-open', val);
});
</script>

<style scoped>
.slide-left-enter-active,
.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active {
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

<style>
body.modal-open {
  overflow: hidden;
}
</style>
