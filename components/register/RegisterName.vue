<template>
 <div class="w-full max-w-sm">
  <div class="flex items-center mb-4 space-x-2 rtl:space-x-reverse">
    <UButton 
      icon="i-heroicons-arrow-right" 
      color="icon" 
      size="xs" 
      @click="store.prevStep"
    />
    <h2 class="text-xl font-bold text-dark">تسجيل دخول</h2>
  </div>
    <div class="text-right mb-2 text-dark font-medium">الاسم الكامل</div>
    <UInput 
      v-model="store.name"
      color="primary"
      variant="outline"
    />

    <UButton 
      @click="store.nextStep" 
      block 
      color="primary" 
      class="mt-4"
    >
      متابعة التسجيل
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { useRegisterStore } from '@/stores/register';
const store = useRegisterStore();
</script>
