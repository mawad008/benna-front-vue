<template>
  <div>
    <!-- Search Bar -->
    <UInput v-model="searchQuery" placeholder="بحث..." class="mb-4" />

    <!-- Filters -->
    <div class="flex gap-4 mb-4">
      <USelect
        v-model="selectedType"
        :options="typeOptions"
        placeholder="تصفية حسب النوع"
      />
      <USelect
        v-model="selectedStatus"
        :options="statusOptions"
        placeholder="تصفية حسب الحالة"
      />
    </div>

    <!-- Table -->
    <UTable
      :rows="paginatedData"
      :columns="columns"
      :sort="{ column: sortBy, direction: sortDesc ? 'desc' : 'asc' }"
      @sort="handleSort"
    >
      <!-- Row Number -->
      <template #cell(index)="{ rowIndex }">
        <span class="text-gray-900">
          {{ (page - 1) * pageSize + rowIndex + 1 }}
        </span>
      </template>

      <!-- Actions Column -->
      <template #cell(actions)="{ row }">
        <UDropdown :items="getDropdownItems(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-vertical"
          />
        </UDropdown>
      </template>
    </UTable>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-6">
      <div class="flex items-center gap-2">
        <UButton
          :disabled="page === 1"
          @click="page = page - 1"
          :ui="{
            base: 'rounded-lg shadow-sm',
            color: {
              primary: {
                solid: 'bg-[#138B96] text-white hover:bg-[#107b86]',
              },
            },
          }"
        >
          &lt;
        </UButton>
        <span class="text-gray-600 text-sm">{{ page }}/{{ pageCount }}</span>
        <UButton
          :disabled="page === pageCount"
          @click="page = page + 1"
          :ui="{
            base: 'rounded-lg shadow-sm',
            color: {
              primary: {
                solid: 'bg-[#138B96] text-white hover:bg-[#107b86]',
              },
            },
          }"
        >
          &gt;
        </UButton>
      </div>

      <div class="flex text-gray-600 text-sm gap-1">
        <span>{{ filteredData.length }} </span>
        <span> من </span>
        <span
          >{{ (page - 1) * pageSize + 1 }}-{{
            Math.min(page * pageSize, filteredData.length)
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useActionsStore } from "@/stores/tableAction"; 
import data from "@/assets/data.json"; 

// Define the RowData interface
interface RowData {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: string;
  status: string;
}

// Use the imported data
const tableData = ref<RowData[]>(data);

// Initialize Pinia store
const actionsStore = useActionsStore();

// Search query
const searchQuery = ref<string>("");

// Filters
const selectedType = ref<string>("");
const selectedStatus = ref<string>("");

// Sorting
const sortBy = ref<string>("");
const sortDesc = ref<boolean>(false);

// Pagination
const page = ref<number>(1);
const pageSize = ref<number>(5); // Number of rows per page

// Dynamic options for filters
const typeOptions = computed<string[]>(() => [
  ...new Set(tableData.value.map((item) => item.type)),
]);
const statusOptions = computed<string[]>(() => [
  ...new Set(tableData.value.map((item) => item.status)),
]);

// Filtered data
const filteredData = computed<RowData[]>(() => {
  return tableData.value.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    const matchesType = selectedType.value
      ? item.type === selectedType.value
      : true;
    const matchesStatus = selectedStatus.value
      ? item.status === selectedStatus.value
      : true;
    return matchesSearch && matchesType && matchesStatus;
  });
});

// Paginated data
const paginatedData = computed<RowData[]>(() => {
  const start = (page.value - 1) * pageSize.value;
  return filteredData.value.slice(start, start + pageSize.value);
});

// Page count
const pageCount = computed<number>(() =>
  Math.ceil(filteredData.value.length / pageSize.value)
);

// Table columns with Arabic titles
const columns = [
  { key: "index", label: "#" }, // Add the index column
  { key: "name", label: "اسم المستقطع", sortable: true },
  { key: "amount", label: "مبلغ المستقطع", sortable: true },
  { key: "date", label: "تاريخ البدء", sortable: true },
  { key: "type", label: "نوع الاستقطاع", sortable: true },
  { key: "status", label: "حالة البيع", sortable: true },
  { key: "actions", label: "الإجراءات" },
];

// Handle sorting
const handleSort = (column: string) => {
  if (sortBy.value === column) {
    sortDesc.value = !sortDesc.value;
  } else {
    sortBy.value = column;
    sortDesc.value = false;
  }
};

// Get dropdown items for actions
const getDropdownItems = (row: RowData) => [
  [
    {
      label: "تحويل بيانات الدفع",
      icon: "i-heroicons-pencil-square",
      click: () => actionsStore.updatePaymentData(row),
    },
    {
      label: row.status === "مستمر" ? "إيقاف التربع" : "تفعيل التربع",
      icon: row.status === "مستمر" ? "i-heroicons-pause" : "i-heroicons-play",
      click: () => actionsStore.toggleDonationStatus(row),
    },
  ],
];
</script>

<style scoped>
/* Add your styles here */
</style>