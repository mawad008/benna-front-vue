<template>
    <div class="flex justify-center w-[70%] h-fit mt-5 mb-10">
      <div class="w-4/5 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
        <!-- Title with Badge -->
        <Title title="خيارات الدفع المتاحة" badge="3" class="mb-4 text-end" />
  
        <!-- Payment Methods -->
        <div class="flex justify-center gap-4 mb-4">
          <UButton 
            v-for="method in paymentMethods" 
            :key="method.id"
            :class="{
              'border-2 border-[#138B96]': paymentStore.selectedPaymentMethod === method.id,
              'border-gray-300': paymentStore.selectedPaymentMethod !== method.id
            }"
            class="h-12 w-24 flex items-center justify-center rounded-lg bg-white"
            @click="paymentStore.selectPaymentMethod(method.id)"
          >
            <img :src="method.icon" :alt="method.name" class="h-15">
          </UButton>
        </div>
        <p v-if="paymentStore.errors.paymentMethod" class="text-red-500 text-sm text-center">
          {{ paymentStore.errors.paymentMethod }}
        </p>
  
        <!-- Cardholder Name -->
        <div class="mt-4">
          <label class="block text-dark font-bold text-sm mb-2">اسم حامل البطاقة</label>
          <UInput 
            v-model="paymentStore.cardholderName" 
            class="w-full border-gray-300 p-2 rounded-lg" 
          />
          <p v-if="paymentStore.errors.cardholderName" class="text-red-500 text-sm">
            {{ paymentStore.errors.cardholderName }}
          </p>
        </div> 
  
        <!-- Card Number -->
        <div class="mt-4">
          <label class="block text-dark font-bold text-sm mb-2">رقم البطاقة</label>
          <UInput 
            v-model="paymentStore.cardNumber" 
            class="w-full border-gray-300 p-2 rounded-lg" 
          />
          <p v-if="paymentStore.errors.cardNumber" class="text-red-500 text-sm">
            {{ paymentStore.errors.cardNumber }}
          </p>
        </div> 
  
  
        <!-- Expiry Date & CVV -->
        <div class="mt-4 flex gap-4">
          <div class="flex-1">
            <label class="block text-dark font-bold text-sm mb-2">تاريخ الانتهاء</label>
            <UInput 
              v-model="paymentStore.expiryDate" 
              placeholder="شهر/سنة" 
              class="w-full border-gray-300 p-2 rounded-lg" 
            />
            <p v-if="paymentStore.errors.expiryDate" class="text-red-500 text-sm">
              {{ paymentStore.errors.expiryDate }}
            </p>
          </div>
          <div class="flex-1">
            <label class="block text-dark font-bold text-sm mb-2">رمز التحقق (CVV)</label>
            <UInput 
              v-model="paymentStore.cvv" 
              placeholder="CVV" 
              class="w-full border-gray-300 p-2 rounded-lg" 
            />
            <p v-if="paymentStore.errors.cvv" class="text-red-500 text-sm">
              {{ paymentStore.errors.cvv }}
            </p>
          </div>
        </div>
  
        <!-- Donate Button -->
        <div class="mt-6">
          <UButton 
            class="w-full bg-[#138B96] text-white font-bold py-2 rounded-lg text-center"
            @click="donationStore.submitDonation()"
          >
            تبرع الآن
          </UButton>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Title from "@/components/ui/Title.vue";
  import { useDonationStore } from "@/stores/donation/donationStore";
  import { usePaymentStore } from "@/stores/donation/paymentStore";
  
  const donationStore = useDonationStore();
  const paymentStore = usePaymentStore();
  
  const paymentMethods = [
    { id: "visa", name: "Visa", icon: "/visa.png" },
    { id: "mastercard", name: "MasterCard", icon: "/mastercard.png" },
    { id: "mada", name: "Mada", icon: "/mada.png" }
  ];
  </script>