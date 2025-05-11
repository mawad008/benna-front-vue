
<template>
    <div class="flex justify-center md:w-[80%] lg:w-[60%] w-full h-fit mb-4">
      <div
        class="w-full lg:w-4/5 p-6 border border-gray-300 rounded-lg shadow-sm bg-white"
      >
        <!-- Title with Badge -->
        <Title title="إتمام عملية الدفع" badge="3" class="mb-4 text-end" />
  
        <!-- Error for Invalid Amount -->
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
              placeholder="رقم البطاقة"
              @input="formatCardNumber"
              @update:modelValue="formatCardNumber"

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
                placeholder="شهر/سنة"
                class="w-full border-gray-300 p-2 rounded-lg"
                color="white"
                variant="outline"
                @input="handleExpiryDateInput"
                maxlength="5"
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
                maxlength="4"
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
            >
              تبرع الآن
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from "vue";
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

onMounted(() => {

  console.log("Mounted - Selected Amount:", selectedAmount.value);
});

  
  const formatCardNumber = () => {
    let value = form.cardNumber.replace(/\D/g, "");
    value = value.slice(0, 16);
    form.cardNumber = value.replace(/(.{4})/g, "$1 ").trim();
  };
  
  const handleExpiryDateInput = () => {
  let raw = form.expiryDate.replace(/\D/g, "").slice(0, 4);

  if (raw.length >= 3) {
    const month = raw.slice(0, 2);
    const year = raw.slice(2, 4);
    form.month = month;
    form.year = year;
    form.expiryDate = `${month}/${year}`;
  } else if (raw.length >= 1) {
    form.month = raw;
    form.year = "";
    form.expiryDate = raw;
  } else {
    form.month = "";
    form.year = "";
    form.expiryDate = "";
  }
  const parsedMonth = parseInt(form.month);
  if (form.month && (parsedMonth < 1 || parsedMonth > 12)) {
    errors.expiryDate = "الشهر غير صالح";
  } else {
    errors.expiryDate = "";
  }

  console.log("Expiry Input:", {
    expiryDate: form.expiryDate,
    month: form.month,
    year: form.year,
  });
};



  
  const handlePayment = async () => {
    errors.cardholderName = "";
    errors.cardNumber = "";
    errors.expiryDate = "";
    errors.cvv = "";
    errors.amount = "";
  
    console.log("Handle Payment - Selected Amount:", selectedAmount.value);
  
    if (!form.cardholderName) errors.cardholderName = "اسم حامل البطاقة مطلوب";
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, "").length < 16)
      errors.cardNumber = "رقم البطاقة غير صالح";
    if (!form.cvv || form.cvv.length < 3 || form.cvv.length > 4)
      errors.cvv = "رمز التحقق غير صالح";
    if (!form.month || !form.year || form.expiryDate.length < 5) {
      errors.expiryDate = "تاريخ الانتهاء غير صالح";
    } else {
      const month = parseInt(form.month);
      const year = parseInt(`20${form.year.padStart(2, "0")}`);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
  
      console.log("Validation:", { month, year, currentYear, currentMonth });
  
      if (month < 1 || month > 12) {
        errors.expiryDate = "الشهر غير صالح";
      } else if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        errors.expiryDate = "البطاقة منتهية الصلاحية";
      } else if (year > currentYear + 10) {
        errors.expiryDate = "سنة الانتهاء بعيدة جدًا";
      }
    }
  
    if (!selectedAmount.value) {
  errors.amount = "يرجى تحديد مبلغ التبرع";
}
  
    if (Object.values(errors).some((error) => error)) {
      console.log("Validation Errors:", errors);
      return;
    }
  
    isSubmitting.value = true;
  
    try {
      const tokenData = {
        publishable_api_key: "pk_test_2Ftd31JoJvPQhbYrKdmyPdr7HsfPVFZF8Q1mEs5e",
        name: form.cardholderName,
        number: form.cardNumber.replace(/\s/g, ""),
        month: form.month.padStart(2, "0"),
        year: form.year.length === 2 ? `20${form.year}` : form.year,
        cvc: form.cvv,
        save_only: "true",
      };
  
      console.log("Token Data:", tokenData);
  
      const response = await fetch("https://api.moyasar.com/v1/tokens", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tokenData),
      });
  
      const data = await response.json();
      console.log("Tokenization Response:", data);
  
      if (data.type === "validation_error") {
        if (data.errors) {
          if (data.errors.name) errors.cardholderName = data.errors.name[0];
          if (data.errors.number) errors.cardNumber = data.errors.number[0];
          if (data.errors.month || data.errors.year)
            errors.expiryDate = "تاريخ الانتهاء غير صالح";
          if (data.errors.cvc) errors.cvv = data.errors.cvc[0];
        }
        console.log("Moyasar Validation Error:", data);
        isSubmitting.value = false;
        return;
      }
  
      if (data.id) {
        console.log("Tokenization Successful:", data);
        await initiatePayment(data.id);
      } else {
        console.error("Tokenization failed:", data);
      }
    } catch (error) {
      console.error("Error during tokenization:", error);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const initiatePayment = async (token: string) => {
    try {
      console.log(
        "Initiate Payment - Selected Amount:",
        selectedAmount.value
      );
      console.log("Token:", token);
   const amount = selectedAmount.value;
      const params = new URLSearchParams({
        token,
        amount,
        currency: "SAR",
        
      });
      const redirectUrl = `http://localhost:3000/thanks?${params.toString()}`;
      console.log("Redirecting to:", redirectUrl);
      window.location.assign(redirectUrl);
    } catch (error) {
      console.error("Redirect Error:", error);
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