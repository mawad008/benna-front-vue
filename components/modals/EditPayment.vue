<template>
    <UModal v-model="isOpen">
      <div class="p-6">
        
        <Title title="تعديل الاستقطاع" badge="1" class="mb-4" />
<!-- Donation Amount Selection -->
<div class="mt-4">
  <label class="block text-dark font-bold text-sm mb-2">اختر مبلغ المتبرع</label>
  <div class="flex flex-wrap gap-2 justify-end">
    <UButton 
      v-for="amount in amounts" 
      :key="amount" 
      :label="amount + ' ر.س'" 
      variant="outline" 
      color="selector"
      class="px-4 py-2 rounded-lg" 
     
    />
    <div class="flex flex-col">
      <UInput 
        placeholder="مبلغ آخر" 
        class="w-28 border-gray-300" 
        color="white"
        varient="solid"
       
      />  
    </div>
  </div>
</div>

<!-- Recurring Donation Type -->
<div class="mt-6">
  <label class="block text-dark font-bold text-sm mb-2">نوع الاستقطاع الدوري</label>
  <div class="flex justify-end gap-2">
    <UButton 
      v-for="type in types" 
      :key="type.label" 
      :label="type.label" 
      variant="outline" 
      color="selector"
      class="px-4 py-2 rounded-lg" 
    />
  </div>
</div>


<Title title="خيارات الدفع المتاحة" badge="2" class="mb-4 text-end" />

<!-- Payment Methods -->
<div class="flex justify-center gap-4 mb-4">
  <UButton
    class="h-12 w-24 flex items-center justify-center rounded-lg bg-white"
    color="selector"
    varient="outline
  >
    <img :src="method.icon"  class="h-15" />
  </UButton>
</div>

<!-- Cardholder Name -->
<div class="mt-4">
  <label class="block text-dark font-bold text-sm mb-2"
    >اسم حامل البطاقة</label
  >
  <UInput
    class="w-full border-gray-300 p-2 rounded-lg"
    color="white"
    varient="outline"
  />
</div>

<!-- Card Number -->
<div class="mt-4">
  <label class="block text-dark font-bold text-sm mb-2"
    >رقم البطاقة</label
  >
  <UInput
    class="w-full border-gray-300 p-2 rounded-lg"
    color="white"
    varient="outline"
  />
 
</div>

<!-- Expiry Date & CVV -->
<div class="mt-4 flex gap-4">
  <div class="flex-1">
    <label class="block text-dark font-bold text-sm mb-2"
      >تاريخ الانتهاء</label
    >
    <UInput

      placeholder="شهر/سنة"
      class="w-full border-gray-300 p-2 rounded-lg"
      color="white"
    varient="outline"
    />
  </div>
  <div class="flex-1">
    <label class="block text-dark font-bold text-sm mb-2"
      >رمز التحقق (CVV)</label
    >
    <UInput
      placeholder="CVV"
      class="w-full border-gray-300 p-2 rounded-lg"
      color="white"
    varient="outline"
    />
 
  </div>
</div>








          <div class="flex justify-end gap-2">
            <UButton color="gray" @click="closeModal">إلغاء</UButton>
            <UButton type="submit" color="primary">حفظ</UButton>
          </div>
      
      </div>
    </UModal>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineEmits, defineProps } from "vue";
  import Title from "@/components/ui/Title.vue";
  



const amounts = [5, 10, 50, 100];
const types = [
  { label: "شهري", value: "monthly" },
  { label: "اسبوعي", value: "weekly" },
  { label: "يومي", value: "daily" }
];

  // Props & Emits
  const props = defineProps({ row: Object });
  const emit = defineEmits(["close"]);
  
  // Local state for editing
  const isOpen = ref(true);
  const editedRow = ref({ ...props.row });
  
const paymentMethods = [
  { id: "visa", name: "Visa", icon: "/visa.png" },
  { id: "mastercard", name: "MasterCard", icon: "/mastercard.png" },
  { id: "mada", name: "Mada", icon: "/mada.png" },
];
  
  // Close Modal
  const closeModal = () => {
    isOpen.value = false;
    emit("close");
  };
  
  // Save Changes
  const saveChanges = () => {
    console.log("Saving changes:", editedRow.value);
    closeModal();
  };
  </script>
  