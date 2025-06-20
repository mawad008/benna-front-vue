<template>
  <div class="w-full max-w-sm">
    <h2 class="text-xl font-bold mb-6 text-dark">
      {{ $t("loginModel.register.phoneStep.title") }}
    </h2>

    <!-- Phone Input -->
    <div class="text-start mb-2 text-dark font-medium">
      {{ $t("loginModel.register.phoneStep.phone") }}
    </div>

    <VueTelInput
      v-model="phone"
      mode="national"
      :defaultCountry="'SA'"
      :disabledFetchingCountry="true"
      :enabledCountryCode="false"
      :onlyCountries="['SA']"
      :inputOptions="{ styleClasses: 'custom-input' }"
      :dropdownOptions="{ styleClasses: 'custom-dropdown' }"
      @validate="handlePhoneValidation"
      class="w-full custom-tel-input"
    />

    <p v-if="displayedError" class="text-red-500 text-sm mt-1 text-start">
      {{ displayedError }}
    </p>

    <!-- Submit Button -->
    <UButton
      @click="onSubmit"
      block
      class="mt-6"
      color="primary"
      variant="solid"
      :disabled="!phone"
      :loading="loading"
    >
      {{ $t("loginModel.register.phoneStep.next") }}
    </UButton>
  </div>
</template>
<script setup lang="ts">
import { useRegisterStore } from "@/stores/register";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useRegisterStore();
const loading = ref(false);
const { locale } = useI18n();

const schema = yup.object({
  phone: yup
    .string()
    .required(t("loginModel.register.phoneStep.phoneError"))
    .transform((value) => value.replace(/\D/g, ""))
    .matches(/^(?:0)?5\d{8}$/, t("loginModel.register.phoneStep.phoneError2")),
});

const { errors, handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: schema,
});
const { value: phone } = useField<string>("phone");

const semanticPhoneError = ref("");

const displayedError = computed(() => {
  return errors.value.phone || semanticPhoneError.value;
});

const handlePhoneValidation = (phoneObject: {
  valid: boolean;
  number: string;
}) => {
  if (phoneObject.valid) {
    phone.value = phoneObject.number;
  } else {
    phone.value = "";
  }
};

watch(phone, () => {
  if (errors.value.phone) errors.value.phone = undefined;
  if (semanticPhoneError.value) semanticPhoneError.value = "";
});

const onSubmit = handleSubmit(async () => {
  loading.value = true;
  semanticPhoneError.value = "";
  store.phone = phone.value.replace(/\D/g, "");
  await store.Login(locale.value);

  if (store.errors.loginPhone === "User not found") {
    semanticPhoneError.value =
      "رقم الجوال غير صحيح الرجاء إدخال رقم صحيح او انشاء مستخدم جديد";
  } else {
    semanticPhoneError.value = store.errors.loginPhone;
  }

  loading.value = false;
});
</script>

<style scoped>
.custom-tel-input {
  direction: ltr;
}

:deep(.custom-tel-input .custom-input) {
  background-color: white !important;
  /* border: 1px solid #d1d5db !important; */
  /* border-radius: 0.375rem !important;  */
  padding: 0.5rem 0.5rem !important;
  width: 100%;
  color: #111928 !important;
}

:deep(.custom-tel-input .custom-input:focus) {
  border-color: #138b96 !important;
  /* box-shadow: 0 0 0 2px rgba(19, 139, 150, 0.2) !important;  */
}

:deep(.custom-tel-input .custom-dropdown) {
  background-color: white !important;
  border: 1px solid #d1d5db !important;
  border-radius: 0.375rem !important;
  color: #111928 !important;
}

:deep(.custom-tel-input .custom-dropdown:hover) {
  background-color: #f3f4f6 !important;
}
</style>
