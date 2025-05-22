<template>
  <div class="w-full max-w-sm">
    <h2 class="text-xl font-bold mb-6 text-dark">
      تم ارسال رمز التحقق الى جوالك
    </h2>

    <p class="text-dark mb-4">ادخل رمز التحقق (OTP) إلى هاتفك</p>
    <UInput
      type="text"
      v-model="otp"
      color="white"
      variant="outline"
      @blur="validateField"
      @input="validateField"
    />
    <p v-if="displayedError" class="text-red-500 text-sm mt-1 text-start">
      {{ displayedError }}
    </p>

    <p
      class="mt-2 text-sm cursor-pointer text-center"
      :class="{
        'lg:text-gray-400 text-gray-600 cursor-not-allowed': countdown > 0,
        'lg:text-primary text-white cursor-pointer underline': countdown === 0,
      }"
      @click="resendOtp"
    >
      إعادة ارسال رمز التحقق {{ countdown > 0 ? `بعد ${countdown} ث` : "" }}
    </p>

    <UButton
      @click="onSubmit"
      block
      color="primary"
      variant="solid"
      class="mt-6"
      :disabled="!meta.valid || !otp.trim()"
      :loading="loading"
    >
      تأكيد
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRegisterStore } from "@/stores/register";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const store = useRegisterStore();
const countdown = ref(60);
let interval: ReturnType<typeof setInterval> | null = null;
const loading = ref(false);

const schema = yup.object({
  otp: yup
    .string()
    .required("رمز التحقق مطلوب")
    .matches(/^\d{4}$/, "رمز التحقق يجب أن يكون 4 أرقام"),
});

const { errors, meta, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    otp: store.otp,
  },
});
const { value: otp } = useField<string>("otp");

const semanticOTPError = ref("");

const displayedError = computed(() => {
  return errors.value.otp || semanticOTPError.value;
});

const validateField = () => {
  store.otp = otp.value;
};

watch(otp, () => {
  if (errors.value.otp) errors.value.otp = undefined;
  if (semanticOTPError.value) semanticOTPError.value = "";
});

const onSubmit = handleSubmit(async () => {
  loading.value = true;
  semanticOTPError.value = "";
  
  await store.ValidateOTP();
  if (store.errors.otp == "OTP is incorrect") {
    semanticOTPError.value = "رمز التحقق غير صحيح";
  } else {
    semanticOTPError.value = store.errors.otp;
  }
  store.errors.otp="";
  loading.value = false;
});

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

const resendOtp = async () => {
  if (countdown.value === 0) {
    console.log("Resending OTP...");
    await store.ResendOTP();
    startCountdown();
  }
};
</script>
