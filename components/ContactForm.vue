<template>
  <div class="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
    <p class="text-center text-gray-700 mb-4">
      رضاكم يهمنا ويسعدنا سماع مقترحاتكم وملاحظاتكم من خلال التواصل معنا على
      مركز الاتصال
      <span class="font-bold">920002568</span> أو تعبئة النموذج أدناه
    </p>

    <div class="flex justify-center gap-4 mb-4 text-dark">
      <URadio
        v-for="option in options"
        :key="option.value"
        v-model="contactStore.type"
        :value="option.value"
        :label="option.label"
      />
    </div>

    <div class="mb-4">
      <label for="fullName" class="block text-gray-700 mb-1 font-semibold"
        >الاسم الكامل</label
      >
      <UInput
        id="fullName"
        v-model="contactStore.fullName"
        class="mb-1"
        required
        color="white"
        variant="outline"
      />
      <p v-if="contactStore.errors.fullName" class="text-red-500 text-sm mb-2">
        {{ contactStore.errors.fullName }}
      </p>
    </div>

    <!-- Phone Input -->
    <div class="mb-4">
      <PhoneInput v-model="contactStore.phone" />
      <!-- <p v-if="contactStore.errors.phone" class="text-red-500 text-sm mb-2">
        {{ contactStore.errors.phone }}
      </p> -->
    </div>

    <div class="mb-4">
      <label for="message" class="block text-gray-700 mb-1 font-semibold">اكتب هنا</label>
      <UTextarea
        id="message"
        v-model="contactStore.message"
        class="mb-1"
        required
        color="white"
        variant="outline"
      />
      <p v-if="contactStore.errors.message" class="text-red-500 text-sm mb-2">
        {{ contactStore.errors.message }}
      </p>
    </div>

    <UButton
      @click="handleSubmit"
      class="w-full mt-5 text-center"
      color="primary"
      variant="solid"
      block
    >
      إرسال
    </UButton>

    <p v-if="successMessage" class="text-green-500 text-center mt-3">
      {{ successMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useContactStore } from "@/stores/contact";
import PhoneInput from "@/components/ui/PhoneInput.vue"; 

const contactStore = useContactStore();
const successMessage = ref("");

const options = [
  { label: "رسالة", value: "message" },
  { label: "مقترح", value: "suggestion" },
  { label: "شكوى", value: "complaint" },
];

const handleSubmit = () => {
  if (contactStore.validateForm()) {
    console.log("Form Data:", contactStore.$state);
    successMessage.value = "تم إرسال النموذج بنجاح!";
    contactStore.resetForm();
    setTimeout(() => (successMessage.value = ""), 3000);
  }
};
</script>