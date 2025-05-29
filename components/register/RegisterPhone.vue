<template>
  <div class="w-full max-w-sm">
    <h2 class="text-xl font-bold mb-6 text-dark">
      {{ $t("loginModel.register.phoneStep.RegisterTitle") }}
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

    <p v-if="errors.phone" class="text-red-500 text-xs mt-1 text-start">
      {{ errors.phone }}
    </p>
    <p v-if="store.errors.phone" class="text-red-500 text-sm mt-1 text-start">
      {{ store.errors.phone }} ,<span @click="HandleUserLogin" class="text-primary text-sm cursor-pointer"> {{ $t("loginModel.login") }}</span>
    </p>

    <!-- Submit Button -->
    <UButton
      @click="onSubmit"
      block
      class="mt-6"
      color="primary"
      variant="solid"
      :disabled="!meta.valid || !phone"
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
import { useI18n } from "vue-i18n";


const { t } = useI18n();

const store = useRegisterStore();

const schema = yup.object({
  phone: yup
    .string()
    .required(t("loginModel.register.phoneStep.phoneError"))
    .transform((value) => value.replace(/\D/g, ""))
    .matches(/^05\d{8}$/, t("loginModel.register.phoneStep.phoneError2")),
});

const loading = ref(false);
const { errors, meta, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    phone: store.phone,
  },
});

const { value: phone } = useField<string>("phone");
const handlePhoneValidation = (phoneObject: {
  valid: boolean;
  number: string;
}) => {
  if (phoneObject.valid) {
    phone.value = phoneObject.number.replace(/\D/g, "");
  } else {
    phone.value = "";
  }
};
const HandleUserLogin = async () => {
  store.phone = phone.value.replace(/\D/g, "");
  loading.value = true;
  store.mode = "login";
  await store.Login();
  store.step = 2;
  loading.value = false;
};
const onSubmit = handleSubmit(async () => {
  store.phone = phone.value.replace(/\D/g, "");
  loading.value = true;
  await store.RegisterStepOne();
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
