<template>
  <UModal
    v-model="isModalOpen"
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
    prevent-close
  >
    <div class="bg-white rounded-lg w-full p-4 text-center">
      <h2 class="text-xl font-semibold text-red-600 mb-4">
        {{ $t("cancelModal.title") }}
      </h2>
      <p class="text-dark mb-6">
        {{ $t("cancelModal.message") }}
      </p>
      <div class="flex justify-around">
        <UButton
          @click="cancelPayment"
          color="red"
          variant="solid"
          :loading="isLoading"
        >
          {{ $t("cancelModal.confirm") }}
        </UButton>
        <UButton @click="closeModal" color="white" variant="outline">
          {{ $t("cancelModal.cancel") }}
        </UButton>
      </div>
    </div>
  </UModal>
</template>



<script setup lang="ts">
import { useCampaignsStore } from "@/stores/compaigns";
const props = defineProps<{
row:any;
open: boolean;
}>();

const emit = defineEmits(["update:open"]);

const campaignsStore = useCampaignsStore();
const isLoading = ref(false);


const isModalOpen = ref(props.open);


watch(() => props.open, (newVal) => {
  isModalOpen.value = newVal;
});

const closeModal = () => {
  isModalOpen.value = false;
  emit("update:open", false);
};
const cancelPayment = async () => {
  isLoading.value = true;
  await campaignsStore.cancelPayment(props.row.id);
  isLoading.value = false;
  closeModal();
};
</script>
