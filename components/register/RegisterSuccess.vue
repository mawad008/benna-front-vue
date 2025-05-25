<template>
  <div class="w-full max-w-sm text-center">
    <div class="flex justify-center items-center mb-3">
    <img src="/congrats.png" alt="Success" class="w-35 h-35 " />
  </div>
    <h2 class="text-xl text-dark font-bold mb-4">{{ store.mode === 'login' ? $t('loginModel.success.LoginMessage') : $t('loginModel.success.RegisterMessage') }}</h2>
    <p class="text-dark mb-4">  {{$t('loginModel.success.title')}} </p>
    <UButton @click="closeModal" block color="primary" variant="solid">
  {{$t('loginModel.success.enter')}}
</UButton>
  </div>
</template>

<script setup lang="ts">
import { useRegisterStore } from '@/stores/register';
const store = useRegisterStore();


const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>
