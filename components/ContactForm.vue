<template>
  <div class="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
    <!-- Intro Text -->
    <p class="text-center text-gray-700 mb-4 font-semibold">
      {{ $t("contactPage.description") }}
      <!-- <span class="font-bold"> {{ $t("contactPage.callCenter") }}</span> -->
    </p>

    <!-- Radio Options -->
    <div class="flex justify-center gap-4 mb-4 text-dark">
      <URadio
        v-for="option in options"
        :key="option.value"
        v-model="contactStore.type"
        :value="option.value"
        :label="option.label"
      />
    </div>

    <!-- Full Name -->
    <div class="mb-4">
      <label for="fullName" class="block text-gray-700 mb-1 font-semibold">{{
        $t("contactPage.contactForm.fullName")
      }}</label>
      <UInput
        id="fullName"
        v-model="contactStore.name"
        class="mb-1"
        required
        color="white"
        variant="outline"
      />
      <p v-if="contactStore.errors.name" class="text-red-500 text-sm mb-2">
        {{ contactStore.errors.name }}
      </p>
    </div>

    <!-- Phone Input -->
    <div class="mb-4">
      <label class="block text-gray-700 mb-1 font-semibold">{{
        $t("contactPage.contactForm.phone")
      }}</label>
      <VueTelInput
        v-model="contactStore.phone"
        mode="national"
        :defaultCountry="'SA'"
        :enabledCountryCode="true"
        :countryCode="'SA'"
        :disabledFetchingCountry="true"
        :onlyCountries="['SA']"
        :inputOptions="{ styleClasses: 'custom-input' }"
        :dropdownOptions="{ styleClasses: 'custom-dropdown' }"
        @input="handlePhoneInput"
        class="w-full custom-tel-input"
      />
      <p v-if="contactStore.errors.phone" class="text-red-500 text-sm mt-2">
        {{ contactStore.errors.phone }}
      </p>
    </div>

    <!-- Message -->
    <div class="mb-4">
      <label for="message" class="block text-gray-700 mb-1 font-semibold">{{
        $t("contactPage.contactForm.note")
      }}</label>
      <UTextarea
        id="message"
        v-model="contactStore.note"
        class="mb-1"
        required
        color="white"
        variant="outline"
      />
      <p v-if="contactStore.errors.note" class="text-red-500 text-sm mb-2">
        {{ contactStore.errors.note }}
      </p>
    </div>

    <!-- API Error -->
    <p v-if="contactStore.apiError" class="text-red-500 text-center mt-3">
      {{ $t("contactPage.apiError") }}
    </p>

    <!-- Submit Button -->
    <UButton
      @click="handleSubmit"
      class="w-full mt-5 text-center"
      color="primary"
      variant="solid"
      block
      :loading="contactStore.loading"
      :disabled="contactStore.loading"
    >
      {{ $t("contactPage.contactForm.send") }}
    </UButton>

    <!-- Success Message -->
    <p v-if="successMessage" class="text-green-500 text-center mt-3">
      {{ successMessage }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useContactStore } from "@/stores/contact";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const contactStore = useContactStore();
const successMessage = ref("");

const handlePhoneInput = (phoneObject: { valid: boolean; number: string }) => {
  if (phoneObject.valid) {
    contactStore.phone = phoneObject.number.replace(/\D/g, "");
  }
};

const options = [
  { label: t("contactPage.messageOptions.message"), value: "message" },
  { label: t("contactPage.messageOptions.suggestion"), value: "suggestion" },
  { label: t("contactPage.messageOptions.complaint"), value: "complaint" },
];

const handleSubmit = async () => {
  successMessage.value = "";
  contactStore.phone = contactStore.phone.replace(/\D/g, "");
  const success = await contactStore.sendMessage();
  if (success) {
    successMessage.value = t("contactPage.successMessage");
    contactStore.resetForm();
  }
};
</script>

<style scoped>
.custom-tel-input {
  direction: ltr;
}

:deep(.custom-tel-input .custom-input) {
  background-color: white !important;
  padding: 0.5rem 0.5rem !important;
  width: 100%;
  color: #111928 !important;
}

:deep(.custom-tel-input .custom-input:focus) {
  border-color: #138b96 !important;
}

:deep(.custom-tel-input .custom-dropdown) {
  background-color: white !important;
  border: 1px solid #d1d5db !important;
  border-radius: 0.375rem !important;
  color: #111928 !important;
}
</style>
