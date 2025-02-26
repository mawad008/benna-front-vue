<template>
  <div class="w-full max-w-sm">
    <h2 class="text-xl font-bold mb-6 text-dark">تسجيل دخول</h2>

    <div class="text-right mb-2 text-dark font-medium">رقم الجوال</div>
    <div class="flex items-center gap-2">
      <UInput
        v-model="store.phone"
        color="white"
        variant="outline"
        class="flex-1 text-gray-900"
        @blur="store.validatePhone"
        @input="store.validatePhone"
      />
      <div
        class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md border border-gray-300"
      >
        966+
      </div>
    </div>
    <p v-if="store.errors.phone" class="text-red-500 text-xs mt-1 text-right">
      {{ store.errors.phone }}
    </p>

    <UButton
      @click="store.nextStep"
      block
      class="mt-6"
      color="primary"
      variant="solid"
      :disabled="!!store.errors.phone || !store.phone.trim()"
    >
      متابعة التسجيل
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { useRegisterStore } from "@/stores/register";
const store = useRegisterStore();
</script>