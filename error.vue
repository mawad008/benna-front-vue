<template>
    <div class="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-100 m-auto">
      <div class="bg-white dark:bg-gray-100 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 class="text-3xl font-bold text-red-600 mb-4">{{ error?.message || $t('errorPage.title') }}</h1>
        <p class="text-gray-700 dark:text-gray-700 mb-6">
          {{ error?.message || $t('errorPage.message') }}
        </p>
        <UButton
          color="primary"
          variant="solid"
          class="w-full"
          @click="route.push('/')"
          block
        >
          {{ $t('errorPage.title') }}
        </UButton>
      </div>
    </div>
  </template>
  
  <script setup>
  const error = defineProps({
    error: Object
  })
  const route = useRouter();
  
//   const handleReload = () => {
//     window.location.reload()
//   }
  </script>
  