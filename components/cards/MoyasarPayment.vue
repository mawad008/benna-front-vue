<template>
    <div class="flex justify-center md:w-[80%] lg:w-[60%] w-full h-fit mb-4">
      <div class="w-full lg:w-4/5 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
         <Title title="إتمام عملية الدفع" badge="3" class="mb-4 text-end" />

      <div class="mysr-form" />
    </div>
  </div>
</template>

  
<script setup lang="ts">
import { onMounted } from 'vue';
import { useDonorStore } from '@/stores/donation/donorStore';
import Title from "@/components/ui/Title.vue";
const donorStore = useDonorStore();

onMounted(() => {
  window.Moyasar.init({
    element: '.mysr-form',
    amount: donorStore.selectedAmount,
    currency: 'SAR',
    description: 'Donation',
    publishable_api_key: 'pk_test_2Ftd31JoJvPQhbYrKdmyPdr7HsfPVFZF8Q1mEs5e',
    callback_url: 'http://localhost:3000/thanks',
    methods: ['creditcard'],
  });
});
</script>

  
<style scoped>

</style>

<!-- http://localhost:3000/thanks?id=4ca75fec-4565-4927-a2fe-d6a28bb8b1ab&status=paid&amount=1000&message=APPROVED -->