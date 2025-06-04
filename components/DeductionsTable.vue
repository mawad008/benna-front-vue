<template>
  <div class="p-4">
    <div class="container bg-white rounded-lg shadow-md p-4 mb-4">
      <!-- Filters & Search -->
      <div class="flex flex-wrap justify-between items-center gap-4">
        <!-- Filters Section -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 text-gray-700 font-semibold">
            <i class="i-lucide-filter"></i>
            <span>{{ t("deductionTable.filterResult") }}</span>
          </div>
          <div class="flex gap-4">
            <!-- Status Filter -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-600 font-medium">{{
                t("deductionTable.labels.status")
              }}</label>
              <USelect
                v-model="selectedStatus"
                :options="statusOptions"
                :placeholder="t('deductionTable.placeholder.chooseSatatus')"
                color="white"
                variant="outline"
                option-attribute="label"
                value-attribute="value"
              />
            </div>
          </div>
        </div>

        <!-- Search Section -->
        <div class="flex flex-col gap-2 w-full md:w-auto">
          <div class="flex items-center gap-2 text-gray-700 font-semibold">
            <i class="i-lucide-search"></i>
            <span>{{ t("deductionTable.search") }}</span>
          </div>
          <UInput
            v-model="searchQuery"
            :placeholder="t('deductionTable.placeholder.search')"
            class="w-full max-w-md"
            color="white"
            variant="outline"
          />
        </div>
      </div>
    </div>

    <!-- Table -->
    <UTable
      sticky
      :rows="paginatedData"
      loading-color="primary"
      loading-animation="carousel"
      :loading="isLoading"
      :columns="columns"
      class="w-full"
      :sort-button="{
        icon: 'i-heroicons-sparkles-20-solid',
        color: 'white',
        variant: 'outline',
      }"
      :empty-state="{
        label: $t('deductionTable.empty'),
      }"
      @sort="handleSort"
    >
      <!-- Row Number -->
      <template #index-data="{ index }">
        <span class="text-gray-900">{{ getGlobalIndex(index) }}</span>
      </template>
      <template #amount-data="{ row }">
        <div class="flex items-center gap-1 text-start">
          {{ row.amount }}
          <img src="/unit.svg" alt="unit" class="w-4 h-4" />
        </div>
      </template>

      <!-- Status Badge -->
      <template #status-data="{ row }">
        <UBadge :color="getStatusColor(row.status)" variant="subtle">
          {{ getStatusLabel(row.status) }}
        </UBadge>
      </template>

      <!-- Action Column -->
      <template #actions-data="{ row }">
        <div class="flex items-center justify-start">
        <UDropdown v-if="row.status === 2" :items="items(row)" > 
          <UButton
            color="icon"
            variant="solid"
            icon="i-heroicons-ellipsis-vertical-20-solid"
          class="px-1"
          />
        </UDropdown>
        <span v-else class="font-bold text-lg px-2">-</span>
      </div>
      </template>
    </UTable>

    <!-- Pagination -->
    <div class="container bg-white rounded-lg shadow-md p-2 mb-4">
      <div class="flex justify-between items-center m-2">
        <div class="flex items-center gap-2">
          <UButton
            :disabled="page === 1"
            @click="page = page - 1"
            color="icon"
            class="p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </UButton>
          <span class="text-gray-600 text-sm">{{ page }}/{{ pageCount }}</span>
          <UButton
            :disabled="page === pageCount"
            @click="page = page + 1"
            color="icon"
            class="p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </UButton>
        </div>

        <div class="flex text-gray-600 text-sm gap-1">
          <span>{{ filteredData?.length }}</span>
          <span>of</span>
          <span
            >{{ (page - 1) * pageSize + 1 }}-{{
              Math.min(page * pageSize, filteredData?.length)
            }}</span
          >
        </div>
      </div>
    </div>
  </div>

  <EditPayment
    v-model:open="isEditModalOpen"
    :row="selectedRow"
    @updated="handleUpdatedPayment"
  />

  <CancelPayment
    v-if="selectedRow && selectedRow?.status === 2"
    :row-id="selectedRow?.id"
    v-model:open="isCancelModalOpen"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDeductionsStore } from "@/stores/deductions";
import EditPayment from "@/components/modals/EditPayment.vue";
import CancelPayment from "@/components/modals/CancelPayment.vue";
const { t } = useI18n();

const props = defineProps<{ deductions: any }>();
const deductions = ref(props.deductions);
const deductionsStore = useDeductionsStore();
const isLoading = ref(false);
watch(
  () => props.deductions,
  (newDeductions) => {
    deductions.value = newDeductions;
  },
  { deep: true }
);

// Pagination
const page = ref(1);
const pageSize = ref(10);

// Search and Filters
const searchQuery = ref("");

const getGlobalIndex = (rowIndex: number) => {
  return (page.value - 1) * pageSize.value + rowIndex + 1;
};

// Table Columns
const columns = ref([
  { key: "index", label: "#" },
  { key: "name", label: t("deductionTable.columns.name") },
  { key: "campaign_name", label: t("deductionTable.columns.campaignName") },
  { key: "amount", label: t("deductionTable.columns.amount") },
  {
    key: "deduction_date",
    label: t("deductionTable.columns.deductionDate"),
    sortable: true,
  },
  { key: "status", label: t("deductionTable.columns.status") },
  { key: "actions", label: t("campaignTable.columns.campaignActions") },
]);

const items = (row: any) => {
  const baseItems = [
    {
      label: t("campaignTable.actions.update"),
      icon: "i-heroicons-pencil-square",
      color: "info",
      class: "dark:text-[#138B96] text-[#138B96]",
      click: () => updatePaymentData(row),
    },
  ];

  if (row.status === 2) {
    baseItems.push({
      label: t("campaignTable.actions.pause"),
      icon: "i-heroicons-pause",
      color: "danger",
      class: "text-[#F23030] dark:text-[#F23030]",
      click: () => cancelDonation(row),
    });
  }

  return [baseItems];
};

const isCancelModalOpen = ref(false);
const cancelDonation = (row: any) => {
  selectedRow.value = row;
  isCancelModalOpen.value = true;
};

const isEditModalOpen = ref(false);
const selectedRow = ref(null);

// Update Payment Data
const updatePaymentData = (row: any) => {
  if (row.status === 2) {
    selectedRow.value = row;
    isEditModalOpen.value = true;
  }
};

const handleUpdatedPayment = (updatedRow: any) => {
  const index = deductions.value.findIndex((c) => c.id === updatedRow.id);
  if (index !== -1) deductions.value[index] = { ...updatedRow };
};

const selectedStatus = ref("");
const statusOptions = [
{ label: t("campaignTable.allStatus"), value: "all" },
  { label: t("deductionTable.status.0"), value: 0 },
  { label: t("deductionTable.status.1"), value: 1 },
  { label: t("deductionTable.status.2"), value: 2 },
  { label: t("deductionTable.status.3"), value: 3 },
];

const getStatusLabel = (status: number) => {
  return status === 1
    ? t("deductionTable.status.1")
    : status === 2
    ? t("deductionTable.status.2")
    : status === 3
    ? t("deductionTable.status.3")
    : t("deductionTable.status.0");
};

const getStatusColor = (status: number) => {
  return status === 1
    ? "green"
    : status === 2
    ? "yellow"
    : status === 3
    ? "red"
    : "black";
};

// Sorting Variables
const sorting = ref<{ key: string; order: "asc" | "desc" } | null>(null);

// Arabic Normalization Function
const normalizeArabic = (text: string) => {
  return text.replace(/[أآإ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه");
};

const filteredData = computed(() => {
  const normalizedQuery = normalizeArabic(searchQuery.value.toLowerCase());
  return deductions?.value?.filter((row: any) => {
    const normalizedName = normalizeArabic(row.name.toLowerCase());
    const normalizedCampaignName = normalizeArabic(
      row.campaign_name.toLowerCase()
    );

    return (
      (searchQuery.value === "" ||
        normalizedName.includes(normalizedQuery) ||
        normalizedCampaignName.includes(normalizedQuery)) &&
      (selectedStatus.value === "" ||
        selectedStatus.value === "all" ||
        row.status === Number(selectedStatus.value))
    );
  });
});


// Sorted Data
const sortedData = computed(() => {
  if (!sorting.value) return filteredData.value;

  const { key, order } = sorting.value;
  return [...filteredData.value].sort((a, b) => {
    const valueA = a[key as keyof typeof a];
    const valueB = b[key as keyof typeof b];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    return order === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });
});

// Paginated Data
const paginatedData = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return sortedData.value?.slice(start, start + pageSize.value);
});

// Page Count
const pageCount = computed(() =>
  Math.ceil(filteredData.value?.length / pageSize.value)
);

// Sorting Handler
const handleSort = (key: string, order: "asc" | "desc" | null) => {
  sorting.value = order ? { key, order } : null;
};
</script>
