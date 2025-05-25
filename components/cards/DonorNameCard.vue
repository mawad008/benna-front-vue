<template>
  <div class="flex justify-center md:w-[80%] lg:w-[60%] w-full h-fit">
    <div
      class="w-full lg:w-4/5 p-6 border border-gray-300 rounded-lg shadow-sm bg-white"
    >
      <!-- Title with Badge -->
      <Title :title="$t('cards.donorCard.title')" badge="2" class="mb-4" />

      <!-- Donor Name Input -->
      <div class="mt-4">
        <label class="block text-dark font-bold text-sm mb-2"
          >{{ $t("cards.donorCard.label") }}</label
        >
        <input
          v-model="donorStore.donorName"
          class="w-full border-gray-300 p-2 rounded-lg"
          @blur="donorStore.validateDonor()"
        />
        <p v-if="donorStore.errors.donorName" class="text-red-500 text-xs mt-1">
          {{ donorStore.errors.donorName }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/ui/Title.vue";
import { useDonorStore } from "@/stores/donation/donorStore";

const donorStore = useDonorStore();
</script>



<style scoped>
input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: #f9fafb;
  width: 100%;
  direction: ltr;
}

input:focus {
  outline: none;
  border-color: #138b96;
  box-shadow: 0 0 0 3px rgba(19, 139, 150, 0.3);
}

input::placeholder {
  color: #9ca3af;
}
</style>
