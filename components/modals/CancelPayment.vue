<template>
  <UModal
    v-model="props.open"
    @ui:close="closeModal"
    :transition="true"
    :transition-props="{
      enterActiveClass: 'transition ease-out duration-300 transform',
      enterFromClass: 'opacity-0 scale-95',
      enterToClass: 'opacity-100 scale-100',
      leaveActiveClass: 'transition ease-in duration-200 transform',
      leaveFromClass: 'opacity-100 scale-100',
      leaveToClass: 'opacity-0 scale-95',
    }"
    class="flex items-center justify-center"
  >
    <div class="bg-white rounded-lg w-full p-4 text-center">
      <h2 class="text-xl font-semibold text-dark mb-4">
        {{ $t("cancelModal.title") }}
      </h2>
      <p class="text-dark mb-6">
        {{ $t("cancelModal.message") }}
      </p>
      <div class="flex justify-end justify-between">
        <UButton @click="cancelDeduction" color="red" variant="solid">
          {{ $t("cancelModal.confirm") }}
        </UButton>
        <UButton @click="closeModal" color="green" variant="outline">
          {{ $t("cancelModal.cancel") }}
        </UButton>
      </div>
    </div>
  </UModal>
</template>



<script setup lang="ts">
import { useDeductionsStore } from "@/stores/deductions";

const props = defineProps<{
  rowId: number;
  open: boolean;
}>();

const emit = defineEmits(["update:open"]);

const deductionStore = useDeductionsStore();

const cancelDeduction = async () => {
  await deductionStore.cancelPayment(props.rowId);
  emit("update:open", false);
};

const closeModal = () => {
  emit("update:open", false);
};
</script>