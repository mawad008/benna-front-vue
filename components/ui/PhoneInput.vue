<template>
  <div>
    <div class="text-right mb-2 text-dark font-medium">رقم الجوال</div>
    <VueTelInput v-model="phone" mode="international" :defaultCountry="'SA'" :preferred-countries="['SA']"
      autoFormat="true" :inputOptions="{
        styleClasses: 'custom-input',
      }" :dropdownOptions="{
        showSearchBox: true,
        searchBoxPlaceholder: 'Search country code....',
        showDialCodeInSelection: true,
        showFlags: true,
        styleClasses: 'custom-dropdown',
      }" @validate="handlePhoneValidation" class="w-full custom-tel-input" />
    <p v-if="errors.phone" class="text-red-500 text-xs mt-1 text-right">
      {{ errors.phone }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const schema = yup.object({
  phone: yup
    .string()
    .required("رقم الجوال مطلوب")
    .test("phone-valid", "رقم الجوال غير صالح", (value) => {
      const phoneRegex = /^\+?\d{10,14}$/;
      return phoneRegex.test(value || "");
    }),
});

const { errors, meta, handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: phone } = useField<string>("phone");

const handlePhoneValidation = (phoneObject: {
  valid: boolean;
  number: string;
}) => {
  phone.value = phoneObject.number;
  emit("update:modelValue", phoneObject.number);
};
</script>

<style scoped>
.custom-tel-input {
  direction: ltr;
}

::v-deep(.custom-tel-input .custom-input) {
  background-color: white !important;
  padding: 0.5rem 0.5rem !important;
  width: 100%;
  color: #111928 !important;
}

::v-deep(.custom-tel-input .custom-input:focus) {
  border-color: #138b96 !important;
}

::v-deep(.custom-tel-input .custom-dropdown) {
  background-color: white !important;
  border: 1px solid #d1d5db !important;
  border-radius: 0.375rem !important;
  color: #111928 !important;
}

::v-deep(.custom-tel-input .custom-dropdown:hover) {
  background-color: #f3f4f6 !important;
}
</style>