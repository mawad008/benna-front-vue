<template>
  <div class="flex justify-center w-[70%] h-fit mt-10 mb-5">
    <div class="w-4/5 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <!-- Title with Badge -->
      <Title title="تفعيل استقطاع جديد" badge="1" class="mb-4" />

      <!-- Donation Amount Selection -->
      <div class="mt-4">
        <label class="block text-dark font-bold text-sm mb-2">اختر مبلغ المتبرع</label>
        <div class="flex flex-wrap gap-2 justify-end">
          <UButton 
            v-for="amount in amounts" 
            :key="amount" 
            :label="amount + ' ر.س'" 
            @click="donorStore.setAmount(amount)" 
            variant="outline" 
            class="px-4 py-2 rounded-lg" 
            :class="{ 'bg-[#138B96] text-white': donorStore.selectedAmount === amount }"
          />
          <div class="flex flex-col">
            <UInput 
              v-model="donorStore.customAmount" 
              placeholder="مبلغ آخر" 
              class="w-28 border-gray-300" 
              @input="donorStore.setCustomAmount($event.target.value)"
            />
            <p v-if="donorStore.errors.amount" class="text-red-500 text-xs mt-1">
              {{ donorStore.errors.amount }}
            </p>
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
            @click="donorStore.setRecurringType(type.value)" 
            variant="outline" 
            class="px-4 py-2 rounded-lg" 
            :class="{ 'bg-[#138B96] text-white': donorStore.recurringType === type.value }"
          />
        </div>
        <p v-if="donorStore.errors.recurringType" class="text-red-500 text-xs mt-1 text-right">
          {{ donorStore.errors.recurringType }}
        </p>
      </div>

      <!-- Start Date -->
      <div class="mt-6">
        <label class="block text-dark font-bold text-sm mb-2">تاريخ بدء الاستقطاع الدوري</label>
        <div class="flex flex-col items-end">
          <UInput 
            type="date" 
            v-model="donorStore.startDate" 
            class="w-full border-gray-300 p-2 rounded-lg" 
            @change="donorStore.setStartDate(donorStore.startDate)"
          />
          <p v-if="donorStore.errors.startDate" class="text-red-500 text-xs mt-1">
            {{ donorStore.errors.startDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/ui/Title.vue";
import { useDonorStore } from "@/stores/donation/donorStore";

const donorStore = useDonorStore();
const amounts = [5, 10, 50, 100];
const types = [
  { label: "شهري", value: "monthly" },
  { label: "اسبوعي", value: "weekly" },
  { label: "يومي", value: "daily" }
];
</script>