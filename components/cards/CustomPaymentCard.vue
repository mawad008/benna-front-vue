<template>
  <div class="flex justify-center md:w-[80%] lg:w-[60%] w-full h-fit mb-4">
    <div
      class="w-full lg:w-4/5 p-6 border border-gray-300 rounded-lg shadow-sm bg-white"
    >
      <!-- Title with Badge -->
      <Title title="إتمام عملية الدفع" badge="3" class="mb-4 text-end" />
      
      <p v-if="errors.amount" class="text-red-500 text-sm mb-4 text-center">
        {{ errors.amount }}
      </p>

      <!-- Form -->
      <form @submit.prevent="handlePayment" id="moyasar-token-form">
        <!-- Cardholder Name -->
        <div class="mt-4">
          <label class="block text-dark font-bold text-sm mb-2"
            >اسم حامل البطاقة</label
          >
          <UInput
            v-model="form.cardholderName"
            class="w-full border-gray-300 p-2 rounded-lg"
            color="white"
            variant="outline"
            placeholder="اسم حامل البطاقة"
            :disabled="isSubmitting"
          />
          <p v-if="errors.cardholderName" class="text-red-500 text-sm">
            {{ errors.cardholderName }}
          </p>
        </div>

        <!-- Card Number -->
        <div class="mt-4">
          <label class="block text-dark font-bold text-sm mb-2"
            >رقم البطاقة</label
          >
          <UInput
            v-model="form.cardNumber"
            class="w-full border-gray-300 p-2 rounded-lg"
            color="white"
            variant="outline"
            placeholder="1234 5678 9012 3456"
            inputmode="numeric"
            @input="formatCardNumber"
            :maxlength="16"
            :disabled="isSubmitting"
          />
          <p v-if="errors.cardNumber" class="text-red-500 text-sm">
            {{ errors.cardNumber }}
          </p>
        </div>

        <!-- Expiry Date & CVV -->
        <div class="mt-4 flex gap-4">
          <div class="flex-1">
            <label class="block text-dark font-bold text-sm mb-2"
              >تاريخ الانتهاء</label
            >
            <UInput
              v-model="form.expiryDate"
              placeholder="MM/YY"
              class="w-full border-gray-300 p-2 rounded-lg"
              color="white"
              variant="outline"
              inputmode="numeric"
              @input="handleExpiryDateInput"
              :maxlength="5"
            />
            <p v-if="errors.expiryDate" class="text-red-500 text-sm">
              {{ errors.expiryDate }}
            </p>
          </div>
          <div class="flex-1">
            <label class="block text-dark font-bold text-sm mb-2"
              >رمز التحقق (CVV)</label
            >
            <UInput
              v-model="form.cvv"
              placeholder="CVV"
              class="w-full border-gray-300 p-2 rounded-lg"
              color="white"
              variant="outline"
              inputmode="numeric"
              maxlength="4"
              @input="form.cvv = form.cvv.replace(/\D/g, '')"
              :disabled="isSubmitting"
            />
            <p v-if="errors.cvv" class="text-red-500 text-sm">
              {{ errors.cvv }}
            </p>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isSubmitting" class="mt-4 flex justify-center">
          <div class="flex items-center gap-2">
            <svg
              class="animate-spin h-5 w-5 text-[#138B96]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span class="text-[#138B96]">جاري المعالجة...</span>
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
          >
            تبرع الآن
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useDonorStore } from "@/stores/donation/donorStore";
import Title from "@/components/ui/Title.vue";

const donorStore = useDonorStore();

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
const selectedAmount = ref(donorStore.selectedAmount);

const formatCardNumber = () => {
  let value = form.cardNumber.replace(/\D/g, "").slice(0, 16);
  if (value.length <= 16) {
    form.cardNumber =
      value
        .match(/.{1,4}/g)
        ?.join(" ")
        .trim() || value;
  }
  if (value.length === 16) {
    form.cardNumber = value.match(/.{1,4}/g)!.join(" ");
    errors.cardNumber = luhnCheck(value) ? "" : "رقم البطاقة غير صالح";
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
  let input = (event.target as HTMLInputElement).value;
  let cleaned = input.replace(/\D/g, "");
  if (cleaned.length > 2) {
    cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
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

  if (cleaned.length === 2) {
    const month = parseInt(cleaned);
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
  if (!selectedAmount.value || selectedAmount.value <= 0) {
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
    const amount = Math.round(selectedAmount.value * 100);
    const params = new URLSearchParams({
      token,
      amount: amount.toString(),
      currency: "SAR",
    });
    const redirectUrl = `${window.location.origin}/thanks?${params.toString()}`;
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

input::placeholder {
  color: #9ca3af;
}
</style>