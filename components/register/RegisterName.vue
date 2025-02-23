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
      <h2 class="text-xl font-bold text-dark">تسجيل دخول</h2>
    </div>
    <div class="text-right mb-2 text-dark font-medium">الاسم الكامل</div>
    <UInput
      v-model="store.name"
      color="white"
      variant="outline"
      @blur="store.validateName"
      @input="store.validateName"
    />
    <p v-if="store.errors.name" class="text-red-500 text-xs mt-1 text-right">
      {{ store.errors.name }}
    </p>

    <UButton
      @click="store.nextStep"
      block
      color="primary"
      variant="solid"
      class="mt-6"
      :disabled="!!store.errors.name || !store.name.trim()"
    >
      متابعة التسجيل
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { useRegisterStore } from "@/stores/register";
const store = useRegisterStore();
</script>