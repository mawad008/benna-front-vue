<template>
         <Hero />
    <div class="container lg:mt-10 md:mt-20">
    <DonationTable />
    <!-- <Table/> -->
    <!-- <TableDonation/> -->
    </div>
   
</template>

<script setup lang="ts">
import Hero from "@/components/ui/Hero.vue";
import DonationTable from "@/components/DonationTable.vue";

definePageMeta({
  layout: "default",
});


</script>


