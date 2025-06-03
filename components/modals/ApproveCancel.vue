<template>
    <UModal
      v-model="isOpen"
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
    >

<div>
    <p>
        This Deduction will not be able to resume again 
    </p>
</div>


<UButton @click="cancelDeduction">
    Cancel Deduction
</UButton>
<UButton @click="closeModal">
    Continue Deduction
</UButton>

    </UModal>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useDeductionStore } from "@/stores/deductions";

defineProps({
    rowId: {
        type: Number,
        required: true
    }
})


const cancelDeduction = async () => {
   await deductionsStore.cancelPayment(rowId);
}

const isOpen = ref(false);
const deductionStore = useDeductionStore();

const closeModal = () => {
  isOpen.value = false;
};

</script>
