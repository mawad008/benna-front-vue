<template>
  <div class="flex justify-center md:w-[100%] lg:w-[100%] w-full h-fit mb-4">
    <div class="w-full lg:w-4/5 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <Title :title="$t('cards.customPaymentCard.title')" badge="3" class="mb-4 text-end" />

      <div class="mysr-form" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useDonorStore } from "@/stores/donation/donorStore";
import Title from "@/components/ui/Title.vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const donorStore = useDonorStore();
const paymnetAmount = computed(() => {
  return donorStore.selectedAmount || donorStore.customAmount;
});

const cvv = ref("#mysr-cc-cvc");
const cardNumber = ref("#mysr-cc-number");
const expiryDate = ref("#mysr-cc-exp");
const cardholderName = ref("#mysr-cc-name");

const Moyasar = useRuntimeConfig().public.Moyasar;

onMounted(() => {
  window.Moyasar.init({
    element: ".mysr-form",
    amount: Number(paymnetAmount.value) * 100,
    currency: "SAR",
    description: "Donation",
    language: locale.value,
    // publishable_api_key: Moyasar.publishable_api_key,
    publishable_api_key: "pk_test_2Ftd31JoJvPQhbYrKdmyPdr7HsfPVFZF8Q1mEs5e",
    callback_url: `${window.location.origin}/`,
    methods: ["creditcard", "mada", "visa"],
    tokenize: true,
    credit_card: {
      save_card: true,
    },
    save_card: true,
    // to save id and token in BE
    on_completed: async function (payment: any) {
      await savePaymentOnBackend(payment);
    },

  });


});

async function savePaymentOnBackend(payment: any) {
  localStorage.setItem("cvv", cvv.value);
  localStorage.setItem("cardNumber", cardNumber.value);
  localStorage.setItem("expiryDate", expiryDate.value);
  localStorage.setItem("cardholderName", cardholderName.value);
  localStorage.setItem("payment", JSON.stringify(payment));
}
</script>

<style scoped></style>

<!-- http://localhost:3000/thanks?id=4ca75fec-4565-4927-a2fe-d6a28bb8b1ab&status=paid&amount=1000&message=APPROVED -->


<!-- {
  "id": "ea026195-81e8-4c53-85ae-8c7f0e3dfff8",
  "status": "initiated",
  "amount": 1000,
  "fee": 0,
  "currency": "SAR",
  "refunded": 0,
  "refunded_at": null,
  "captured": 0,
  "captured_at": null,
  "voided_at": null,
  "description": "Donation",
  "amount_format": "10.00 SAR",
  "fee_format": "0.00 SAR",
  "refunded_format": "0.00 SAR",
  "captured_format": "0.00 SAR",
  "invoice_id": null,
  "ip": "41.43.251.214",
  "callback_url": "http://localhost:3000/thanks",
  "created_at": "2025-06-10T11:35:38.483Z",
  "updated_at": "2025-06-10T11:35:38.483Z",
  "metadata": null,
  "source": {
      "type": "creditcard",
      "company": "visa",
      "name": "Hbfhfg Hbfgjn",
      "number": "4111-11XX-XXXX-1111",
      "gateway_id": "moyasar_cc_iGBGmRfgdKT25XB9hU7pUVc",
      "reference_number": null,
      "token": "token_QtK8XV16AmJehXCaqKPqcMdQqd",
      "message": null,
      "transaction_url": "https://api.moyasar.com/v1/card_auth/3dc09308-8bd0-402d-82a4-dc94227a825d/prepare"
  }
} -->