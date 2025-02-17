<template>
    <div class="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
      <p class="text-center text-gray-700 mb-4">
        رضاكم يهمنا ويسعدنا سماع مقترحاتكم وملاحظاتكم من خلال التواصل معنا على مركز الاتصال
        <span class="font-bold">920002568</span> أو تعبئة النموذج أدناه
      </p>
  
      <div class="flex justify-center gap-4 mb-4 text-dark">
        <URadio v-for="option in options" :key="option.value" v-model="contactStore.type" :value="option.value" :label="option.label" />
      </div>
  
      <div>
        <UInput v-model="contactStore.fullName" placeholder="الاسم الكامل" class="mb-1" required color="white" variant="outline"/>
        <p v-if="contactStore.errors.fullName" class="text-red-500 text-sm mb-2">{{ contactStore.errors.fullName }}</p>
      </div>
  
      <div>
        <div class="flex items-center gap-2">
          <UInput v-model="contactStore.phone" placeholder="رقم الهاتف" class="flex-1 mb-1" required  color="white" varient="outline" />
          <div class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md border border-gray-300">+966</div>
        </div>
        <p v-if="contactStore.errors.phone" class="text-red-500 text-sm mb-2">{{ contactStore.errors.phone }}</p>
      </div>
  
      <div>
        <UTextarea v-model="contactStore.message" placeholder="اكتب هنا" class="mb-1" required color="white" variant="outline" />
        <p v-if="contactStore.errors.message" class="text-red-500 text-sm mb-2">{{ contactStore.errors.message }}</p>
      </div>
  
      <UButton @click="handleSubmit" class="w-full mt-5" color="primary" variant="solid">
        إرسال
      </UButton>
  
      <p v-if="successMessage" class="text-green-500 text-center mt-3">{{ successMessage }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useContactStore } from '@/stores/contact';
  
  const contactStore = useContactStore();
  const successMessage = ref('');
  
  const options = [
    { label: 'رسالة', value: 'message' },
    { label: 'مقترح', value: 'suggestion' },
    { label: 'شكوى', value: 'complaint' }
  ];
  
  const handleSubmit = () => {
    if (contactStore.validateForm()) {
      console.log('Form Data:', contactStore.$state);
      successMessage.value = 'تم إرسال النموذج بنجاح!';
      contactStore.resetForm(); 
      setTimeout(() => (successMessage.value = ''), 3000);
    }
  };
  </script>
  