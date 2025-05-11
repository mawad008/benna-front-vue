<template>
    <UModal v-model="isOpen" prevent-close :transition="true">
      <div class="flex flex-col items-center p-6">
   
        <img src="/congrats.png" alt="Success" class="w-35 h-35 mb-4" />
   
        <h2 class="text-lg font-semibold text-gray-800">
          لا يوجد استقطاعات
        </h2>
        <p class="text-gray-600 text-sm text-center mt-2">
          كما يتاح لك تفعيل استقطاعات أخرى بالرجوع للصفحة الرئيسية
        </p>
    
        <UButton
          class="mt-6 w-full font-bold py-2 rounded-lg"
          color="primary"
          variant="solid"
          @click="$router.push('/')"
          block
        >
          الرجوع
        </UButton>
      </div>
    </UModal>
  </template>
  
  <script setup>


  </script>
  