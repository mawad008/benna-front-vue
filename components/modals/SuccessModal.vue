<template>
  <UModal v-model="isOpen" prevent-close :transition="true">
    <div class="flex flex-col items-center p-6">
      <!-- Success Icon -->
      <!-- <img src="/success-icon.svg" alt="Success" class="w-24 h-24 mb-4" /> -->

      <!-- Success Message -->
      <h2 class="text-lg font-semibold text-gray-800">
        تمت عملية الاستقطاع بنجاح
      </h2>
      <p class="text-gray-600 text-sm text-center mt-2">
        كما يتاح لك تفعيل استقطاعات أخرى بالرجوع للصفحة الرئيسية
      </p>

      <!-- Return Button -->
      <UButton
        class="mt-6 w-full font-bold py-2 rounded-lg"
        color="primary"
        variant="solid"
        @click="closeModal"
      >
        الرجوع
      </UButton>
    </div>
  </UModal>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};


defineExpose({ openModal });
</script>
