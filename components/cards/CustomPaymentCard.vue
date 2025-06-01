<template>
  <div class="flex justify-center w-full h-fit mb-4">
    <div
      class="w-full p-6 border border-gray-300 rounded-lg shadow-sm bg-white"
    >
      <div class="flex items-center gap-2">
        <UButton
          color="primary"
          variant="solid"
          :icon="icon"
          @click="donationStore.showPayment = false"
        >
        </UButton>
        <br />
        <!-- Title with Badge -->
        <Title
          :title="$t('cards.customPaymentCard.title')"
          badge="3"
          class="text-end"
        />
      </div>
      <p v-if="errors.amount" class="text-red-500 text-sm mb-4 text-center">
        {{ errors.amount }}
      </p>

      <!-- Form -->
      <form @submit.prevent="handlePayment" id="moyasar-token-form">
        <!-- Cardholder Name -->
        <div class="mt-4">
          <label class="block text-dark font-bold text-sm mb-2">{{
            $t("cards.customPaymentCard.cardholderName")
          }}</label>
          <input
            v-model="form.cardholderName"
            class="w-full border-gray-300 p-2 rounded-lg text-start"
            :placeholder="$t('cards.customPaymentCard.cardholderName')"
            :disabled="isSubmitting"
          />
          <p v-if="errors.cardholderName" class="text-red-500 text-sm">
            {{ errors.cardholderName }}
          </p>
        </div>

        <!-- Card Number -->
        <div class="mt-4">
          <label class="block text-dark font-bold text-sm mb-2">{{
            $t("cards.customPaymentCard.cardNumber")
          }}</label>
          <input
            v-model="form.cardNumber"
            @input="formatCardNumber"
            maxlength="19"
            placeholder="1234 5678 9012 3456"
            class="w-full border-gray-300 p-2 rounded-lg text-start placeholder:text-start"
          />

          <p v-if="errors.cardNumber" class="text-red-500 text-sm">
            {{ errors.cardNumber }}
          </p>
        </div>

        <!-- Expiry Date & CVV -->
        <div class="mt-4 flex gap-4">
          <div class="flex-1">
            <label class="block text-dark font-bold text-sm mb-2">{{
              $t("cards.customPaymentCard.expiryDate")
            }}</label>
            <input
              v-model="form.expiryDate"
              @input="handleExpiryDateInput"
              maxlength="5"
              placeholder="MM/YY"
              class="w-full border-gray-300 p-2 rounded-lg text-start placeholder:text-start"
            />
            <p v-if="errors.expiryDate" class="text-red-500 text-sm">
              {{ errors.expiryDate }}
            </p>
          </div>
          <div class="flex-1">
            <label class="block text-dark font-bold text-sm mb-2">{{
              $t("cards.customPaymentCard.cvv")
            }}</label>
            <input
              v-model="form.cvv"
              placeholder="CVV"
              maxlength="3"
              @input="form.cvv = form.cvv.replace(/\D/g, '')"
              :disabled="isSubmitting"
              class="w-full border-gray-300 p-2 rounded-lg text-start placeholder:text-start"
            />
            <p v-if="errors.cvv" class="text-red-500 text-sm">
              {{ errors.cvv }}
            </p>
          </div>
        </div>
        <!-- Submit Button -->
        <div class="mt-6 text-center">
          <UButton
            type="submit"
            class="w-full bg-[#138B96] text-white font-bold py-2 rounded-lg text-center"
            color="primary"
            variant="solid"
            block
            :disabled="isSubmitting"
            :loading="isSubmitting"
          >
            {{ $t("cards.customPaymentCard.button") }}
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useDonorStore } from "@/stores/donation/donorStore";
import { useDonationStore } from "@/stores/donation/donationStore";
import Title from "@/components/ui/Title.vue";

const route = useRoute();

const donationStore = useDonationStore();
const donorStore = useDonorStore();
const { locale } = useI18n();
const icon = computed(() => {
  return locale.value === "ar"
    ? "i-heroicons-arrow-right"
    : "i-heroicons-arrow-left";
});
const form = reactive({
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  month: "",
  year: "",
  cvv: "",
});

const errors = reactive({
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  amount: "",
});

const isSubmitting = ref(false);
const paymentAmount = computed(() => {
  return Number(donorStore.selectedAmount) || Number(donorStore.customAmount);
});

const formatCardNumber = (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  let raw = inputEl.value.replace(/\D/g, "").slice(0, 16);

  const formatted = raw.replace(/(.{4})/g, "$1 ").trim();

  form.cardNumber = formatted;

  if (raw.length === 16) {
    errors.cardNumber = luhnCheck(raw) ? "" : "رقم البطاقة غير صالح";
  } else {
    errors.cardNumber = "";
  }
};

const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0;
  let isEven = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
};

const handleExpiryDateInput = (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  let input = inputEl.value;
  let cleaned = input.replace(/[^\d]/g, "");
  if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);
  if (cleaned.length > 2) {
    cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
  }

  form.expiryDate = cleaned;

  if (cleaned.length === 5) {
    const [month, year] = cleaned.split("/");
    form.month = month;
    form.year = year;
    validateExpiryDate(month, year);
  } else {
    errors.expiryDate = "";
  }

  if (cleaned.length >= 2) {
    const month = parseInt(cleaned.slice(0, 2));
    if (month < 1 || month > 12) {
      errors.expiryDate = "الشهر غير صالح";
    }
  }
};

const validateExpiryDate = (month: string, year: string) => {
  const parsedMonth = parseInt(month);
  const parsedYear = parseInt(`20${year}`);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (parsedMonth < 1 || parsedMonth > 12) {
    errors.expiryDate = "الشهر غير صالح";
  } else if (
    parsedYear < currentYear ||
    (parsedYear === currentYear && parsedMonth < currentMonth)
  ) {
    errors.expiryDate = "البطاقة منتهية الصلاحية";
  } else if (parsedYear > currentYear + 10) {
    errors.expiryDate = "سنة الانتهاء بعيدة جدًا";
  } else {
    errors.expiryDate = "";
  }
};

const handlePayment = async () => {
  Object.keys(errors).forEach((key) => (errors[key] = ""));
  if (!form.cardholderName.trim())
    errors.cardholderName = "اسم حامل البطاقة مطلوب";
  if (
    !form.cardNumber ||
    form.cardNumber.replace(/\s/g, "").length !== 16 ||
    !luhnCheck(form.cardNumber.replace(/\s/g, ""))
  ) {
    errors.cardNumber = "رقم البطاقة غير صالح";
  }
  if (!form.cvv || form.cvv.length < 3 || form.cvv.length > 4)
    errors.cvv = "رمز التحقق غير صالح";
  if (!form.month || !form.year || form.expiryDate.length !== 5) {
    errors.expiryDate = "تاريخ الانتهاء غير صالح";
  } else {
    validateExpiryDate(form.month, form.year);
  }
  if (!paymentAmount.value || paymentAmount.value <= 0) {
    errors.amount = "يرجى تحديد مبلغ تبرع صالح";
  }

  if (Object.values(errors).some((error) => error)) {
    console.log("Validation Errors:", errors);
    return;
  }

  isSubmitting.value = true;

  try {
    const tokenData = {
      publishable_api_key: "pk_test_2Ftd31JoJvPQhbYrKdmyPdr7HsfPVFZF8Q1mEs5e",
      name: form.cardholderName.trim(),
      number: form.cardNumber.replace(/\s/g, ""),
      month: form.month.padStart(2, "0"),
      year: `20${form.year.padStart(2, "0")}`,
      cvc: form.cvv,
      save_only: "true",
    };

    const response = await fetch("https://api.moyasar.com/v1/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tokenData),
    });

    const data = await response.json();

    if (data.type === "validation_error") {
      if (data.errors) {
        errors.cardholderName = data.errors.name?.[0] || "";
        errors.cardNumber = data.errors.number?.[0] || "";
        errors.expiryDate =
          data.errors.month || data.errors.year
            ? "تاريخ الانتهاء غير صالح"
            : "";
        errors.cvv = data.errors.cvc?.[0] || "";
      }
      return;
    }

    if (data.id) {
      await initiatePayment(data.id);
    } else {
      console.error("Tokenization failed:", data);
      errors.amount = "فشل في معالجة الدفع، حاول مرة أخرى";
    }
  } catch (error) {
    console.error("Error during tokenization:", error);
    errors.amount = "حدث خطأ أثناء المعالجة، حاول لاحقًا";
  } finally {
    isSubmitting.value = false;
  }
};

const initiatePayment = async (token: string) => {
  try {
    const amount = Number(paymentAmount.value * 100);
    const params = new URLSearchParams({
      token,
      amount: amount.toString(),
      currency: "SAR",
    });

    const isFromCampaign =
      route.name === "campaigns" || route.path.includes("/campaigns");
    const targetPage = isFromCampaign ? "edit" : "thanks";
    const redirectUrl = `${
      window.location.origin
    }/${targetPage}?${params.toString()}`;
    window.location.assign(redirectUrl);
  } catch (error) {
    console.error("Redirect Error:", error);
    errors.amount = "حدث خطأ أثناء إعادة التوجيه";
    isSubmitting.value = false;
  }
};
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

input::placeholder[dir="rtl"] {
  color: #9ca3af;
  text-align: right;
}
</style>
