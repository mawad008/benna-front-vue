<template>
  <div class="w-full max-w-sm">
    <div class="flex items-center mb-6 space-x-2 rtl:space-x-reverse">
      <UButton
        icon="i-heroicons-arrow-right"
        color="icon"
        size="xs"
        @click="store.prevStep"
        :disabled="store.step === 0"
      />
      <h2 class="text-xl font-bold text-dark">{{ $t("loginModel.register.nameStep.title") }}</h2>
    </div>

    <div class="text-start mb-2 text-dark font-medium">{{ $t("loginModel.register.nameStep.fullname") }}</div>
    <UInput
      v-model="name"
      color="white"
      variant="outline"
      @blur="validateField"
      @input="validateField"
    />
    <p v-if="store.errors.name" class="text-red-500 text-xs mt-1 text-start">
      {{ store.errors.name }}
    </p>

    <UButton
      @click="onSubmit"
      block
      color="primary"
      variant="solid"
      class="mt-6"
      :disabled="!meta.valid || !name.trim() || loading"
      :loading="loading"
    >
      {{ $t("loginModel.register.nameStep.next") }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { useRegisterStore } from "@/stores/register";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";


const {t} =useI18n();
const store = useRegisterStore();

const schema = yup.object({
  name: yup
    .string()
    .required(t("loginModel.register.nameStep.nameError"))
    .min(2, t("loginModel.register.nameStep.nameError2")),
});

const { errors, meta, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: store.name,
  },
});

const { value: name } = useField<string>("name");

const loading = ref(false);

watch(name, (newVal) => {
  store.name = newVal;
});

const validateField = () => {
  store.name = name.value;
  store.validateName();
};

const onSubmit = handleSubmit(async () => {
  loading.value = true;
  await store.Register();
  loading.value = false;
});
</script>
