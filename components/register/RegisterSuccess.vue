<template>
  <div class="w-full max-w-sm text-center">
    <div class="flex justify-center items-center mb-3">
    <img src="/congrats.png" alt="Success" class="w-35 h-35 " />
  </div>
    <h2 class="text-xl text-dark font-bold mb-4">تم انشاء الحساب بنجاح</h2>
    <p class="text-dark mb-4">مرحبًا بك في منصتنا</p>
    <UButton @click="navigateTo('/home')" block color="primary" variant="solid">
  دخول
</UButton>
  </div>
</template>

<script setup lang="ts">
</script>
