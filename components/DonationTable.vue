<template>
  <div class="p-4">
    <!-- Search Input -->
    <UInput
      v-model="searchQuery"
      placeholder="بحث..."
      class="mb-4 w-full max-w-md"
      :ui="{
        base: 'rounded-lg shadow-sm focus:ring-2 focus:ring-[#138B96] focus:border-[#138B96]',
        color: { white: { outline: 'border-gray-300' } },
      }"
    />

    <!-- Table -->
    <UTable
      :rows="paginatedData"
      :columns="columns"
      class="relative overflow-x-auto text-gray-900 bg-white rounded-lg shadow-md"
      @sort="handleSort"
      :ui="{
        wrapper: 'rounded-lg shadow-md',
        base: 'min-w-full table-fixed',
        thead: 'bg-[#138B96] text-white',
        th: { padding: 'px-6 py-4', font: 'font-semibold', size: 'text-sm' },
        td: { padding: 'px-6 py-4', color: 'text-gray-700', size: 'text-sm' },
        tr: { active: 'hover:bg-gray-50 transition-colors duration-200' },
      }"
    >
      <!-- Row Number -->
      <template #cell(index)="{ rowIndex }">
        <span class="text-dark">{{
          (page - 1) * pageSize + rowIndex + 1
        }}</span>
      </template>

      <!-- Status Badge -->
      <template #cell(status)="{ row }">
        <div class="bg-gray-100 p-2">
          <UBadge
            :color="row.status === 'مستمر' ? 'green' : 'red'"
            variant="subtle"
          >
            {{ row.status }}
          </UBadge>
        </div>
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
              primary: { solid: 'bg-[#138B96] text-white hover:bg-[#107b86]' },
            },
          }"
        >
          &lt;
          <!-- Left Arrow -->
        </UButton>
        <span class="text-gray-600 text-sm">{{ page }}/{{ pageCount }}</span>
        <UButton
          :disabled="page === pageCount"
          @click="page = page + 1"
          :ui="{
            base: 'rounded-lg shadow-sm',
            color: {
              primary: { solid: 'bg-[#138B96] text-white hover:bg-[#107b86]' },
            },
          }"
        >
          &gt;
          <!-- Right Arrow -->
        </UButton>
      </div>

      <div class="flex text-gray-600 text-sm gap-1">
        <span>{{ filteredData.length }} </span>
        <span> of </span>
        <span
          >{{ (page - 1) * pageSize + 1 }}-{{
            Math.min(page * pageSize, filteredData.length)
          }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" >
import { ref, computed } from "vue";

// Search Query
const searchQuery = ref("");

// Table Data
const tableData = ref([
  {
    id: 1,
    name: "أحمد يوسف",
    amount: 50,
    date: "2024-12-01",
    type: "يومي",
    status: "مستمر",
  },
  {
    id: 2,
    name: "محمد احمد يوسف",
    amount: 100,
    date: "2024-11-15",
    type: "اسبوعي",
    status: "متوقف",
  },
  {
    id: 3,
    name: "يوسف",
    amount: 75,
    date: "2024-10-10",
    type: "شهري",
    status: "مستمر",
  },
  {
    id: 4,
    name: "احمد ف",
    amount: 200,
    date: "2024-09-20",
    type: "يومي",
    status: "متوقف",
  },
  {
    id: 5,
    name: "محمد",
    amount: 125,
    date: "2024-08-05",
    type: "اسبوعي",
    status: "مستمر",
  },
  {
    id: 6,
    name: "عبدالله",
    amount: 300,
    date: "2024-07-01",
    type: "شهري",
    status: "مستمر",
  },
  {
    id: 7,
    name: "علي حسن",
    amount: 90,
    date: "2024-06-15",
    type: "اسبوعي",
    status: "متوقف",
  },
  {
    id: 8,
    name: "خالد",
    amount: 150,
    date: "2024-05-22",
    type: "يومي",
    status: "مستمر",
  },
  {
    id: 9,
    name: "ياسر",
    amount: 220,
    date: "2024-04-30",
    type: "شهري",
    status: "متوقف",
  },
  {
    id: 10,
    name: "سعيد",
    amount: 130,
    date: "2024-03-18",
    type: "اسبوعي",
    status: "مستمر",
  },
  {
    id: 11,
    name: "مروان",
    amount: 180,
    date: "2024-02-10",
    type: "يومي",
    status: "متوقف",
  },
]);

// Table Columns
const columns = ref([
  { key: "index", label: "#" },
  { key: "name", label: "اسم المستقطع" },
  { key: "amount", label: "مبلغ المستقطع", sortable: true },
  { key: "date", label: "تاريخ البدء", sortable: true },
  { key: "type", label: "نوع الاستقطاع" },
  { key: "status", label: "حالة البيع" },
]);

// Pagination Variables
const page = ref(1);
const pageSize = ref(10);

// Sorting Variables
const sorting = ref<{ key: string; order: "asc" | "desc" } | null>(null);

// Computed - Filtered Data
const filteredData = computed(() => {
  return tableData.value.filter(
    (row) =>
      row.name.includes(searchQuery.value) ||
      row.type.includes(searchQuery.value)
  );
});

// Computed - Sorted Data
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

// Computed - Paginated Data
const paginatedData = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return sortedData.value.slice(start, start + pageSize.value);
});

// Computed - Page Count
const pageCount = computed(() =>
  Math.ceil(filteredData.value.length / pageSize.value)
);

// Sorting Handler
const handleSort = (key: string, order: "asc" | "desc" | null) => {
  sorting.value = order ? { key, order } : null;
};
</script>