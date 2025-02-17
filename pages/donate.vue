<template>
         <Hero />
    <div class="container mt-20">
    <DonationTable />
    <Table/>
    <!-- <TableDonation/> -->
    </div>
   
</template>

<script setup lang="ts">
import Hero from "@/components/ui/Hero.vue";
import DonationTable from "@/components/DonationTable.vue";
import Table from "@/components/Table.vue";
import TableDonation from "@/components/Table.vue";

definePageMeta({
  layout: "default",
});


</script>


