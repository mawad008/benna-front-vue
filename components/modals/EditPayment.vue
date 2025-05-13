<template>
<UModal v-model="isOpen" @ui:close="closeModal">

    <div class="p-6" ref="modalContent">

      <!-- Title: Edit Donation -->
      <Title title="تعديل طريقة الاستقطاع" badge="1" class="mb-4" />

      <!-- Donation Amount Selection -->
      <div class="mt-4" >
        <label class="block text-dark font-bold text-sm mb-2">اختر مبلغ المتبرع</label>
        <div class="flex flex-wrap gap-2 justify-end">
          <UButton v-for="amount in amounts" :key="amount" :label="`${amount} ر.س`" variant="outline" color="selector"
            class="px-4 py-2 rounded-lg" />

          <div class="flex flex-col">
            <UInput placeholder="مبلغ آخر" class="w-28 border-gray-300" color="white" varient="solid" />
          </div>
        </div>
      </div>

      <!-- Recurring Donation Type -->
      <div class="mt-6">
        <label class="block text-dark font-bold text-sm mb-2">نوع الاستقطاع الدوري</label>
        <div class="flex justify-end gap-2">
          <UButton v-for="type in types" :key="type.value" :label="type.label" variant="outline" color="selector"
            class="px-4 py-2 rounded-lg" />
        </div>
      </div>
<br>
      <!-- Title: Available Payment Methods -->
      <Title title="خيارات الدفع المتاحة" badge="2" class="mb-4 text-end" />

      <!-- Payment Methods -->
      <div class="flex justify-center gap-4 mb-4">
        <UButton class="h-12 w-24 flex items-center justify-center rounded-lg bg-white" color="selector"
          variant="outline">
          <img src="/visa.png" alt="Visa" />
        </UButton>
        <UButton class="h-12 w-24 flex items-center justify-center rounded-lg bg-white" color="selector"
          variant="outline">
          <img src="/mastercard.png" alt="MasterCard" />
        </UButton>
        <UButton class="h-12 w-24 flex items-center justify-center rounded-lg bg-white" color="selector"
          variant="outline">
          <img src="/mada.png" alt="Mada" />
        </UButton>
      </div>

      <!-- Cardholder Name -->
      <div class="mt-4">
        <label class="block text-dark font-bold text-sm mb-2">اسم حامل البطاقة</label>
        <UInput class="w-full border-gray-300 p-2 rounded-lg" color="white" variant="outline" />
      </div>

      <!-- Card Number -->
      <div class="mt-4">
        <label class="block text-dark font-bold text-sm mb-2">رقم البطاقة</label>
        <UInput class="w-full border-gray-300 p-2 rounded-lg" color="white" variant="outline" />
      </div>

      <!-- Expiry Date & CVV -->
      <div class="mt-4 flex gap-4">
        <div class="flex-1">
          <label class="block text-dark font-bold text-sm mb-2">تاريخ الانتهاء</label>
          <UInput placeholder="شهر/سنة" class="w-full border-gray-300 p-2 rounded-lg" color="white" variant="outline" />
        </div>
        <div class="flex-1">
          <label class="block text-dark font-bold text-sm mb-2">رمز التحقق (CVV)</label>
          <UInput placeholder="CVV" class="w-full border-gray-300 p-2 rounded-lg" color="white" variant="outline" />
        </div>
      </div>

      <!-- Buttons: Cancel and Save -->
      <div class="flex justify-end gap-2 mt-4">
        <UButton type="submit" color="primary" variant="solid" block @click="saveChanges">تطبيق الاختيارات</UButton>
      </div>

    </div>
  </UModal>
</template>

<script setup lang="ts">
import Title from "@/components/ui/Title.vue";
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from "vue";

const props = defineProps({
  row: Object,
  open: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:open"]);

const isOpen = ref(props.open);

watch(() => props.open, (newVal) => {
  isOpen.value = newVal;
});
watch(isOpen, (newVal) => {
  emit("update:open", newVal);
});


const closeModal = () => {
  isOpen.value = false;
};


const amounts = [5, 10, 50, 100];
const types = [
  { label: "شهري", value: "monthly" },
  { label: "اسبوعي", value: "weekly" },
  { label: "يومي", value: "daily" }
];

const editedRow = ref({ ...props.row });

const paymentMethods = [
  { id: "visa", name: "Visa", icon: "/visa.png" },
  { id: "mastercard", name: "MasterCard", icon: "/mastercard.png" },
  { id: "mada", name: "Mada", icon: "/mada.png" }
];

const saveChanges = () => {
  console.log("Saving changes:", editedRow.value);
  closeModal();
};
</script>
