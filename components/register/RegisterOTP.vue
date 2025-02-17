<template>
  <div class="w-full max-w-sm">
    <h2 class="text-xl font-bold mb-4 text-dark">تم ارسال رمز التحقق الى جوالك</h2>

    <p class="text-dark mb-4">ادخل رمز التحقق (OTP) إلى هاتفك</p>
    <UInput 
      type="password" 
      v-model="store.otp"
      color="white"
      variant="outline"
    />

    <p 
      class="mt-2 text-sm cursor-pointer text-center"
      :class="{ 'lg:text-gray-400 text-gray-600 cursor-not-allowed': countdown > 0, 'lg:text-primary text-white cursor-pointer underline': countdown === 0 }"
      @click="resendOtp"
    >
     إعادة ارسال رمز التحقق {{ countdown > 0 ? `بعد ${countdown} ث` : '' }}
    </p>

    <UButton 
      @click="store.nextStep" 
      block 
      color="primary" 
      variant="solid"
      class="mt-4"
    >
      تأكيد
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRegisterStore } from '@/stores/register';

const store = useRegisterStore();
const countdown = ref(60);
let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  startCountdown();
});


const startCountdown = () => {
  countdown.value = 60;
  interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(interval!);
    }
  }, 1000);
};

const resendOtp = () => {
  if (countdown.value === 0) {
    console.log("Resending OTP...");
    startCountdown();
  }
};
</script>
