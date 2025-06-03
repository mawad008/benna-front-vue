<template>
  <div class="p-4">
    <div class="container bg-white rounded-lg shadow-md p-4 mb-4">
      <!-- Filters & Search -->
      <div class="flex flex-wrap justify-between items-center gap-4">
        <!-- Filters Section -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 text-gray-700 font-semibold">
            <i class="i-lucide-filter"></i>
            <span>{{ $t("campaignTable.filterResult") }}</span>
          </div>
          <div class="flex gap-4">
            <!-- Status Filter -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-600 font-medium">{{
                $t("campaignTable.labels.status")
              }}</label>
              <USelect
                v-model="selectedStatus"
                :options="statusOptions"
                :placeholder="$t('campaignTable.placeholder.chooseSatatus')"
                color="white"
                variant="outline"
                option-attribute="label"
                value-attribute="value"
              />
            </div>

            <!-- Type Filter -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-600 font-medium">{{
                $t("campaignTable.labels.type")
              }}</label>
              <USelect
                v-model="selectedType"
                :options="typeOptions"
                :placeholder="$t('campaignTable.placeholder.chooseType')"
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
            <span>{{ $t("campaignTable.search") }}</span>
          </div>
          <UInput
            v-model="searchQuery"
            :placeholder="$t('campaignTable.placeholder.search')"
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
      :loading="isLoading"
      loading-color="primary"
      loading-animation="carousel"
      :rows="paginatedData"
      :columns="columns"
      class="w-full"
      :sort-button="{
        icon: 'i-heroicons-sparkles-20-solid',
        color: 'white',
        variant: 'outline',
      }"
      :empty-state="{
        label: $t('campaignTable.empty'),
      }"
      @sort="handleSort"
    >
      <!-- Row Number -->
      <template #index-data="{ index }">
        <span class="text-gray-900">{{ getGlobalIndex(index) }}</span>
      </template>

      <!-- Status Badge -->
      <template #status-data="{ row }">
        <UBadge :color="getStatusColor(row.status)" variant="soft">
          {{ getStatusLabel(row.status) }}
        </UBadge>
      </template>

      <!-- Start Date -->
      <template #next_time-data="{ row }">
        <div class="flex items-center justify-center gap-1">
          <span v-if="row.next_time"> {{ row.next_time }}</span>
          <span v-else> - </span>
        </div>
      </template>
      <!-- Label -->
      <template #type-data="{ row }">
        {{ getTypeLabel(row.type) }}
      </template>

      <!-- amount -->
      <template #amount-data="{ row }">
        <div class="flex items-center gap-1 justify-center">
          {{ row.amount }}
          <img src="/unit.svg" alt="unit" class="w-4 h-4" />
        </div>
      </template>

      <!-- Action Column -->
      <template #actions-data="{ row }">
        <!-- <UDropdown :items="items(row)"> -->
          <UButton
          @click="showTransactions(row)"
            color="icon"
            variant="solid"
            icon="i-heroicons-eye"
          />
        <!-- </UDropdown> -->
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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import EditPayment from "@/components/modals/EditPayment.vue";
import { useCampaignsStore } from "@/stores/compaigns";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toast = useToast();

const props = defineProps<{ campaigns: any }>();
const campaigns = ref(props.campaigns);
watch(
  () => props.campaigns,
  (newCampaigns) => {
    campaigns.value = newCampaigns;
  },
  { deep: true }
);

const router = useRouter();
const campaignsStore = useCampaignsStore();
const isLoading = ref(false);

// Pagination
const page = ref(1);
const pageSize = ref(10);

// Search and Filters
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedType = ref("");

const statusOptions = [
  { label: t("campaignTable.allStatus"), value: "all" },
  { label: t("campaignTable.status.1"), value: 1 },
  { label: t("campaignTable.status.0"), value: 0 },
  { label: t("campaignTable.status.2"), value: 2 },
];
const typeOptions = [
  { label: t("campaignTable.allStatus"), value: "all" },
  { label: t("campaignTable.type.day"), value: "day" },
  { label: t("campaignTable.type.week"), value: "week" },
  { label: t("campaignTable.type.month"), value: "month" },
];
const getGlobalIndex = (rowIndex: number) => {
  return (page.value - 1) * pageSize.value + rowIndex + 1;
};

// Table Columns
const columns = ref([
  { key: "index", label: "#" },
  { key: "campaign_name", label: t("campaignTable.columns.campaignName") },
  {
    key: "amount",
    label: t("campaignTable.columns.campaignAmount"),

  },
  {
    key: "date",
    label: t("campaignTable.columns.campaignStartDate"),
    sortable: true,
  },
  {
    key: "next_time",
    label: t("campaignTable.columns.deductionNextTime"),
    sortable: true,
  },
  { key: "type", label: t("campaignTable.columns.campaignType") },
  { key: "status", label: t("campaignTable.columns.campaignStatus") },
  { key: "actions", label: t("campaignTable.columns.campaignActions") },
]);

// const items = (row: any) => [
//   [
//     {
//       label: t("campaignTable.actions.update"),
//       icon: "i-heroicons-pencil-square",
//       color: "info",
//       class: "dark:text-[#138B96] text-[#138B96]",
//       click: () => updatePaymentData(row),
//     },
//     {
//       label:
//         row.status === 1
//           ? t("campaignTable.actions.pause")
//           : row.status === 2
//           ? t("campaignTable.actions.pause")
//           : t("campaignTable.actions.resume"),
//       icon:
//         row.status === 1
//           ? "i-heroicons-pause"
//           : row.status === 2
//           ? "i-heroicons-pause"
//           : "i-heroicons-play",
//       color:
//         row.status === 1 ? "danger" : row.status === 2 ? "warning" : "success",
//       class:
//         row.status === 1
//           ? "text-[#F23030] dark:text-[#F23030] "
//           : row.status === 2
//           ? "text-[#F23030] dark:text-[#F23030] "
//           : "text-[#22AD5C] dark:text-[#22AD5C] ",
//       click: () => toggleDonationStatus(row),
//     },
//     {
//       label: t("campaignTable.actions.showTransactions"),
//       icon: "i-heroicons-eye",
//       color: "neutral",
//       class: "dark:text-[#111928] text-[#111928]",
//       click: () => showTransactions(row),
//     },
//   ],
// ];

const toggleDonationStatus = async (row: any) => {
  isLoading.value = true;
  try {
    let updatedCampaign;
    if (row.status === 1 || row.status === 2) {
      updatedCampaign = await campaignsStore.cancelPayment(row.campaign_id);
    } else {
      updatedCampaign = await campaignsStore.activePayment(row.campaign_id);
    }
    const index = campaigns.value.findIndex(
      (c) => c.campaign_id === row.campaign_id
    );
    if (index !== -1) {
      campaigns.value[index] = {
        ...campaigns.value[index],
        status: updatedCampaign.data.status,
        next_time: updatedCampaign.data.next_time,
      };
    }

    isLoading.value = false;
  } catch (error) {
    console.error("Failed to update status:", error);
    isLoading.value = false;
  }
};

const showTransactions = (row: any) => {
  router.push(`/deductions/${row.campaign_id}`);
};
const getStatusLabel = (status: number) => {
  return status === 1
    ? t("campaignTable.status.1")
    : status === 2
    ? t("campaignTable.status.2")
    : t("campaignTable.status.0");
};

const getTypeLabel = (type: string) => {
  return type === "day"
    ? t("campaignTable.type.day")
    : type === "week"
    ? t("campaignTable.type.week")
    : t("campaignTable.type.month");
};

const getStatusColor = (status: number) => {
  return status === 1 ? "blue" : status === 2 ? "yellow" : "red";
};

// Sorting Variables
const sorting = ref<{ key: string; order: "asc" | "desc" } | null>(null);

// Arabic Normalization Function
const normalizeArabic = (text: string) => {
  return text.replace(/[أآإ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه");
};

const filteredData = computed(() => {
  const normalizedQuery = normalizeArabic(searchQuery.value.toLowerCase());
  return campaigns?.value?.filter((row: any) => {
    const normalizedName = normalizeArabic(row.campaign_name.toLowerCase());
    const normalizedType = normalizeArabic(row.type.toLowerCase());
    return (
      (searchQuery.value === "" ||
        normalizedName.includes(normalizedQuery) ||
        normalizedType.includes(normalizedQuery)) &&
      (selectedStatus.value === "" ||
        selectedStatus.value === "all" ||
        row.status === Number(selectedStatus.value)) &&
      (selectedType.value === "" ||
        selectedType.value === "all" ||
        row.type === selectedType.value)
    );
  });
});

// Sorted Data
const sortedData = computed(() => {
  if (!sorting.value) return filteredData.value;
  const { key, order } = sorting.value;

  return [...filteredData.value].sort((a, b) => {
    let valueA = a[key as keyof typeof a];
    let valueB = b[key as keyof typeof b];

    if (key === "amount") {
      valueA = parseFloat(String(valueA).replace(/[^0-9.-]/g, "")) || 0;
      valueB = parseFloat(String(valueB).replace(/[^0-9.-]/g, "")) || 0;
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }
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

const isEditModalOpen = ref(false);
const selectedRow = ref(null);

// Update Payment Data
const updatePaymentData = (row: any) => {
  selectedRow.value = row;
  isEditModalOpen.value = true;
};
const handleUpdatedPayment = (updatedRow: any) => {
  const index = campaigns.value.findIndex(
    (c) => c.campaign_id === updatedRow.campaign_id
  );
  if (index !== -1) campaigns.value[index] = { ...updatedRow };
};
</script>
