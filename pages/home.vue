<template>
     <Hero />
  <div class="min-h-screen flex flex-col items-center bg-gray-50 lg:mt-10 md:mt-20">
    <div class="w-full flex flex-col items-center p-4">
      <DonationCard />
      <DonorNameCard />
      <PaymentOptionsCard />
    </div>
  </div>
</template>

<script setup>
import Hero from "@/components/ui/Hero.vue";
import DonationCard from "@/components/cards/DonationCard.vue";
import DonorNameCard from "@/components/cards/DonorNameCard.vue";
import PaymentOptionsCard from "@/components/cards/PaymentOptionsCard.vue";

definePageMeta({
  layout: "default",
});
</script>