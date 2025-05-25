<template>
  <Transition name="slide-left">
    <div
      v-if="isOpen"
      ref="modalRef"
      class="fixed inset-0 z-50 flex overflow-y-auto w-full h-screen bg-black/50"
    >
      <div
        class="relative z-50 m-auto w-[95%] h-[95vh] flex border border-gray-200 rounded-lg bg-white overflow-hidden overflow-y-auto"
      >
        <!-- Left Image Section -->
        <div
          class="hidden md:flex w-1/2 bg-[url('/bg.png')] bg-cover bg-center relative"
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-5 right-5 z-60"
          >
            <UButton
              color="gray"
              variant="ghost"
              size="lg"
              icon="heroicons:x-mark"
            />
          </button>
          <div class="flex justify-center items-center w-full">
            <img src="/heart-hands.png" alt="Heart Hands" class="w-45 px-5" />
          </div>
        </div>

        <!-- Right Content Section -->
        <div
          class="relative w-full md:w-1/2 bg-white md:bg-transparent flex justify-center items-center p-4"
        >
          <div
            class="w-full max-w-sm md:max-w-none md:h-full bg-white/30 md:bg-white backdrop-blur-md md:backdrop-blur-none rounded-lg p-6 flex items-center justify-center"
          >
            <div
              class="flex flex-col items-center w-full min-h-[300px] md:min-h-[400px] relative"
            >
              <!-- Logo -->
              <div
                class="lg:w-40 lg:h-40 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-gradient-to-b from-[#169FAE] to-[#138B96] p-2 mb-4"
              >
                <img src="/logo.png" alt="Logo" class="w-[50%] h-[50%]" />
              </div>

              <!-- Organization Title -->
              <p class="text-dark mb-6 font-bold text-center">
                {{ $t("loginModel.title") }}
              </p>

              <!-- Dynamic Step Component -->
              <Transition :name="store.transitionDirection" mode="out-in">
                <component
                  :is="
                    isLogin ? LoginSteps[store.step] : RegisterSteps[store.step]
                  "
                  @close="closeModal"
                />
              </Transition>

              <!-- Error Message -->
              <div class="text-red-600 text-center font-medium mt-2">
                {{ error }}
              </div>

              <!-- Toggle Login/Register -->
              <div class="flex justify-center">
                <span
                  @click="HandleUserRegister"
                  class="mt-6 text-primary font-bold cursor-pointer hover:underline"
                  :class="{ hidden: store.step > 0 }"
                >
                  {{
                    isLogin ? $t("loginModel.newUser") : $t("loginModel.login")
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, watch } from "vue";
import { useRegisterStore } from "@/stores/register";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["close"]);
const store = useRegisterStore();

const isLogin = ref(true);
const isOpen = ref(true);
const error = ref("");
const modalRef = ref(null);

const closeModal = () => {
  document.body.classList.remove("modal-open");
  isOpen.value = false;
  setTimeout(() => {
    emit("close");
  }, 400);
};

onClickOutside(modalRef, () => {
 closeModal();
});

watch(isOpen, (val) => {
  document.body.classList.toggle("modal-open", val);
});

watch(
  () => store.errors,
  (val) => {
    error.value = val.phone || val.name || val.otp || "";
  }
);

const HandleUserRegister = () => {
  isLogin.value = !isLogin.value;
  store.step = 0;
  store.reset();
};

const LoginSteps = [
  defineAsyncComponent(() => import("@/components/login/LoginPhone.vue")),
  defineAsyncComponent(() => import("@/components/register/RegisterOTP.vue")),
  defineAsyncComponent(
    () => import("@/components/register/RegisterSuccess.vue")
  ),
];

const RegisterSteps = [
  defineAsyncComponent(() => import("@/components/register/RegisterPhone.vue")),
  defineAsyncComponent(() => import("@/components/register/RegisterName.vue")),
  defineAsyncComponent(() => import("@/components/register/RegisterOTP.vue")),
  defineAsyncComponent(
    () => import("@/components/register/RegisterSuccess.vue")
  ),
];
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.4s ease-in-out;
}
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>

<style>
body.modal-open {
  overflow: hidden;
}
</style>
