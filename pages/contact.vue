<template>
       <Hero />
    <div class="lg:mt-10 md:mt-20">
     <ContactForm />
     <br>
     <br>
     <br>
     <OfficeLocations/>
    </div>
</template>
<script setup>
import Hero from "@/components/ui/Hero.vue";
import ContactForm from "@/components/ContactForm.vue";
import OfficeLocations from "@/components/OfficeLocations.vue";

definePageMeta({
  layout: "default",
});
</script>