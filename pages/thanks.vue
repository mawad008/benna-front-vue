<template>
  <section
    class="bg-[#138B96] h-[94vh] w-full flex items-center justify-center"
  >
    <div
      class="container mx-auto flex flex-col items-center justify-center text-center py-24 px-4"
    >
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-5xl font-bold text-white mb-4">
          شكراً لتبرعك
        </h1>
        <p class="text-2xl lg:text-4xl text-white">
          نحن نقدر دعمك ومساهمتك في عملنا الخيري.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "@/composables/api";

const route = useRoute();
const { id, status, amount, message } = route.query;
const { post } = useApi();

const createPayment = async () => {
  try {
    const response = await post("/api/createPayment/", {
      id,
      status,
      amount,
      // message,
    });
    console.log(response);
  } catch (error) {
    console.error("Payment creation failed", error);
  }
};

onMounted(() => {
  createPayment();
});
</script>
