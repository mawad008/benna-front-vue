<template>
    <div class="w-full max-w-sm">
      <h2 class="text-xl font-bold mb-6 text-dark">تسجيل دخول</h2>
  
      <!-- Phone Input -->
      <div class="text-right mb-2 text-dark font-medium">رقم الجوال</div>
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
  
      <p v-if="errors.phone" class="text-red-500 text-xs mt-1 text-right">
        {{ errors.phone }}
      </p>
  
      <!-- Submit Button -->
      <UButton
        @click="onSubmit"
        block
        class="mt-6"
        color="primary"
        variant="solid"
        :disabled="!phone"
      >
        متابعة التسجيل
      </UButton>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRegisterStore } from "@/stores/register";
  import { VueTelInput } from "vue-tel-input";
  import "vue-tel-input/dist/vue-tel-input.css";
  import { useForm, useField } from "vee-validate";
  import * as yup from "yup";
  
  const store = useRegisterStore();
  
  const schema = yup.object({
    phone: yup
      .string()
      .required("يرجى إدخال رقم الجوال")
      .transform((value) => value.replace(/\D/g, ""))
      .matches(/^05\d{8}$/, "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"),
  });
  
  
  
  
  const { errors, handleSubmit } = useForm({
    validationSchema: schema,
  });
  
  const { value: phone } = useField<string>("phone");
    const handlePhoneValidation = (phoneObject: { valid: boolean; number: string }) => {
    if (phoneObject.valid) {
      phone.value = phoneObject.number.replace(/\D/g, "");
  
    } else {
      phone.value = "";
    }
  };
  
  
  const onSubmit = handleSubmit(() => {
    store.phone = phone.value.replace(/\D/g, "");
    store.Login();
    store.nextStep();
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
  