<template>
         <Hero />
    <div class="container mt-20">
    <DonationTable />
    <UBadge 
          color="red"
          variant="subtle"
          >
         HELLO
          </UBadge>
    </div>
   
</template>

<script setup lang="ts">
import Hero from "@/components/ui/Hero.vue";
import DonationTable from "@/components/DonationTable.vue";

definePageMeta({
  layout: "default",
});


</script>


