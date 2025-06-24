<template>
  <div class="w-full max-w-sm">
    <h2 class="text-xl font-bold mb-6 text-dark">
      {{ $t("loginModel.register.OTPStep.title") }}
    </h2>

    <p class="text-dark mb-4">
      {{ $t("loginModel.register.OTPStep.instruction") }}
    </p>
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
      {{ $t("loginModel.register.OTPStep.resend") }}
      {{
        countdown > 0
          ? ` ${countdown} ${$t("loginModel.register.OTPStep.sec")}`
          : ""
      }}
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
      {{ $t("loginModel.register.OTPStep.next") }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRegisterStore } from "@/stores/register";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { locale } = useI18n();
const store = useRegisterStore();
const countdown = ref(60);
let interval: ReturnType<typeof setInterval> | null = null;
const loading = ref(false);


const emit = defineEmits(['close','nextStep']);

const closeModal = () => {
  emit('close');
};




const schema = yup.object({
  otp: yup
    .string()
    .required(t("loginModel.register.OTPStep.otpError"))
    .matches(/^\d{4}$/, t("loginModel.register.OTPStep.otpError2")),
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
try{
  await store.ValidateOTP(locale.value);
  store.errors.otp = "";
  loading.value = false;
  if(store.mode==="login"){
    closeModal();
  }else{
    store.nextStep();
  }
}catch(error:any){
  loading.value = false;
  if (store.errors.otp == "OTP is incorrect") {
    semanticOTPError.value = "رمز التحقق غير صحيح";
  } else {
    semanticOTPError.value = store.errors.otp;
  }
}

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
    await store.ResendOTP(locale.value);
    startCountdown();
  }
};
</script>
