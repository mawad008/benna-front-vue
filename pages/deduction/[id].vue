<template>
    <Hero />
    <div class="container lg:mt-10 md:mt-20">
       <p class="text-2xl font-bold mb-4 text-primary">عرض الاستقطاعات</p>
    <div
      v-if="deductionsStore.deductions.length === 0"
      class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] flex items-center justify-center text-2xl font-medium"
    >
      لا يوجد استقطاعات حاليا
   
    </div>
    <DeductionsTable v-else />

  </div>
  
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import Hero from "@/components/ui/Hero.vue";
  import DeductionsTable from "@/components/DeductionsTable.vue";
  import { useDeductionsStore } from "@/stores/deductions";
  import { useAuthStore } from "@/stores/auth";
  import { useRoute } from "vue-router";
  
  definePageMeta({ layout: "default" });
  
  const route = useRoute();
  const deductionsStore = useDeductionsStore();
  const authStore = useAuthStore();
  
  const loading = ref(false);
  const error = ref(null);
  const deductions = ref([]);
  const campaigns_id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
console.log(campaigns_id);



  onMounted(async () => {
    await authStore.init();
    if (authStore.isLoggedIn) {
     await deductionsStore.fetchDeductions(campaigns_id);
    }
  });
  </script>
  