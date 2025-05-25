<template>
  <div class="flex justify-center md:w-[80%] lg:w-[60%] sm:w-[100%] h-fit  mb-4" >
    <div class="w-full lg:w-4/5 p-8 border border-gray-300 rounded-lg shadow-sm bg-white">
      <!-- Title with Badge -->
      <Title :title="$t('cards.donationCard.title')" badge="1" class="mb-6" />

      <!-- Donation Amount Selection -->
      
      <label class="block text-dark font-bold text-sm mb-3">{{ $t('cards.donationCard.amount') }}</label>
      <div class="mt-6 flex flex-col lg:flex-row">
        <div class="flex  lg:flex-row gap-3 flex-wrap items-center">
          <UButton v-for="amount in amounts" :key="amount" :label="amount + ' '"
            @click="donorStore.setAmount(amount)" variant="outline" color="selector"
            class="px-5 py-2.5 rounded-lg min-w-[80px]" :class="{
              'bg-[#138B96] text-white': donorStore.selectedAmount === amount,
            }" >
          {{amount}} <img src="/unit.svg" alt="unit" class="w-4 h-4">
          </UButton>
           
          <div class="flex flex-col items-end lg:flex-1 sm:flex-none ">
            <UInput v-model="donorStore.customAmount" :placeholder="$t('cards.donationCard.customAmount')" class="w-full border-gray-300 px-5 py-2.5"
              color="white" varient="solid" @input="donorStore.setCustomAmount($event.target.value)" />

          </div>
        </div>

        <p v-if="donorStore.errors.amount" class="text-red-500 text-xs mt-1">
          {{ donorStore.errors.amount }}
        </p>
      </div>

      <!-- Start Date and Recurring Donation Type -->
      <div class="mt-6 ">
        <div class="flex flex-col lg:flex-row justify-between items-start gap-6 ">
          <!-- Start Date -->
          <div class="flex-1">
            <label class="block text-dark font-bold text-sm mb-5">{{ $t('cards.donationCard.startDate') }}</label>
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton icon="i-heroicons-calendar-days-20-solid" :label="donorStore.startDate"
                class="w-full px-5 py-2.5" color="icon" />
              <template #panel="{ close }">
                <DatePicker v-model="date" is-required @close="close" @click="HandleDate" />
              </template>
            </UPopover>
            <p v-if="donorStore.errors.startDate" class="text-red-500 text-xs mt-1">
              {{ donorStore.errors.startDate }}
            </p>
          </div>

          <!-- Recurring Donation Type -->
          <div class="flex-1">
            <label class="block text-dark font-bold text-sm mb-5">{{ $t('cards.donationCard.recurringType') }}</label>
            <div class="flex gap-3">
              <UButton v-for="type in types" :key="type.label" :label="type.label"
                @click="donorStore.setRecurringType(type.value)" variant="outline" color="selector"
                class="px-5 py-2.5 rounded-lg min-w-[80px]" :class="{
                  'bg-[#138B96] text-white':
                    donorStore.recurringType === type.value,
                }" />
            </div>
            <p v-if="donorStore.errors.recurringType" class="text-red-500 text-xs mt-1 text-right">
              {{ donorStore.errors.recurringType }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/ui/Title.vue";
import { useDonorStore } from "@/stores/donation/donorStore";
import { format } from 'date-fns';

const date = ref(new Date());
const donorStore = useDonorStore();
const amounts = [5, 10, 50, 100];
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const types = [
  { label: t('cards.donationCard.monthly'), value: "month" },
  { label: t('cards.donationCard.weekly'), value: "week" },
  { label: t('cards.donationCard.daily'), value: "day" },
];

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


const HandleDate = () => {
  const formatted = formatDate(date.value);
  donorStore.setStartDate(formatted);
  // console.log(donorStore.startDate);
}


</script>

<style></style>