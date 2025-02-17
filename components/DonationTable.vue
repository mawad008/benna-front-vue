<template>
  <div class="p-4">
    <div class="container bg-white rounded-lg shadow-md p-4 mb-4">
      <!-- Filters & Search Row -->
      <div class="flex flex-wrap justify-between items-center gap-4">
        <!-- Filters Section -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 text-gray-700 font-semibold">
            <i class="i-lucide-filter"></i>
            <!-- Filter Icon -->
            <span>تصفية النتائج</span>
          </div>
          <div class="flex gap-4">
            <!-- Status Filter -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-600 font-medium"
                >حالة البيع</label
              >
              <USelect
                v-model="selectedStatus"
                :options="statusOptions"
                placeholder="اختر حالة البيع"
                color="primary"
                variant="outline"
              />
            </div>

            <!-- Type Filter -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-600 font-medium"
                >نوع الاستقطاع</label
              >
              <USelect
                v-model="selectedType"
                :options="typeOptions"
                placeholder="اختر نوع الاستقطاع"
                color="primary"
                variant="outline"
              />
            </div>
          </div>
        </div>

        <!-- Search Section -->
        <div class="flex flex-col gap-2 w-full md:w-auto">
          <div class="flex items-center gap-2 text-gray-700 font-semibold">
            <i class="i-lucide-search"></i>
            <!-- Search Icon -->
            <span>البحث</span>
          </div>
          <UInput
            v-model="searchQuery"
            placeholder="بحث..."
            class="w-full max-w-md"
            :ui="{
              base: 'rounded-lg shadow-sm focus:ring-2 focus:ring-[#138B96] focus:border-[#138B96]',
              color: { white: { outline: 'border-gray-300' } },
            }"
          />
        </div>
      </div>
    </div>

    <!-- Table -->
    <UTable
      :rows="paginatedData"
      :columns="columns"
      class="w-full text-left text-sm text-gray-700"
      :ui="{
        wrapper: 'rounded-lg shadow-md overflow-hidden',
        base: 'min-w-full divide-y divide-gray-200',
        thead: 'bg-gray-50',
        th: {
          padding: 'px-6 py-3',
          font: 'font-medium',
          size: 'text-xs',
          color: 'text-gray-500 uppercase tracking-wider',
        },
        td: { padding: 'px-6 py-4', color: 'text-gray-900', size: 'text-sm' },
        tr: { active: 'hover:bg-gray-50 transition-colors duration-200' },
      }"
    >
      <!-- Row Number -->
      <template #cell(index)="{ rowIndex }">
        <span class="text-gray-900">
          {{ (page - 1) * pageSize + rowIndex + 1 }}
        </span>
      </template>

      <!-- Status Badge -->
      <template #cell(status)="{ row }">
        <UBadge :color="row.status === 'مستمر' ? 'emerald' : 'orange'" variant="subtle">
          {{ row.status }}
        </UBadge>
      </template>

      <!-- Action Column -->
      <template #cell(actions)="{ row }">
        <div class="flex gap-2 items-center">
          <!-- Update Payment Data Button -->
          <UButton
            color="primary"
            variant="solid"
            class="text-sm"
            @click="updatePaymentData(row)"
          >
            تحديث الدفع
          </UButton>

          <!-- Toggle Donation Status Button -->
          <UButton
            :color="row.status === 'مستمر' ? 'primary' : 'icon'"
            variant="solid"
            class="text-sm"
            @click="toggleDonationStatus(row)"
          >
            {{ row.status === "مستمر" ? "إيقاف التبرع" : "استمرار التبرع" }}
          </UButton>

          <!-- Three-Dot Icon -->
          <UIcon name="i-heroicons-ellipsis-vertical" class="cursor-pointer" @click="handleAction(row)" />
        </div>
      </template>
    </UTable>

    <!-- Pagination -->
    <div class="container bg-white rounded-lg shadow-md p-2 mb-4">
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
          <span> of </span>
          <span
            >{{ (page - 1) * pageSize + 1 }}-{{
              Math.min(page * pageSize, filteredData.length)
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import tableData from "@/assets/data.json";

// Search Query
const searchQuery = ref("");

// Filter Options
const selectedStatus = ref("");
const selectedType = ref("");

const statusOptions = ["الكل", "مستمر", "متوقف"];
const typeOptions = ["الكل", "يومي", "اسبوعي", "شهري"];

// Table Columns
const columns = ref([
  { key: "index", label: "#" },
  { key: "name", label: "اسم المستقطع" },
  { key: "amount", label: "مبلغ المستقطع", sortable: true },
  { key: "date", label: "تاريخ البدء", sortable: true },
  { key: "type", label: "نوع الاستقطاع" },
  { key: "status", label: "حالة البيع" },
  { key: "actions", label: "الإجراءات" },
]);

// Pagination Variables
const page = ref(1);
const pageSize = ref(10);

// Sorting Variables
const sorting = ref<{ key: string; order: "asc" | "desc" } | null>(null);

// Computed - Filtered Data
const filteredData = computed(() => {
  return tableData.filter(
    (row) =>
      (searchQuery.value === "" ||
        row.name.includes(searchQuery.value) ||
        row.type.includes(searchQuery.value)) &&
      (selectedStatus.value === "الكل" ||
        selectedStatus.value === "" ||
        row.status === selectedStatus.value) &&
      (selectedType.value === "الكل" ||
        selectedType.value === "" ||
        row.type === selectedType.value)
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

// Dropdown Items
const getDropdownItems = (row: any) => {
  return [
    [
      {
        label: "تحديث بيانات الدفع",
        icon: "i-heroicons-pencil-square",
        click: () => updatePaymentData(row),
      },
      {
        label: row.status === "مستمر" ? "إيقاف التبرع" : "استمرار التبرع",
        icon: row.status === "مستمر" ? "i-heroicons-pause" : "i-heroicons-play",
        click: () => toggleDonationStatus(row),
      },
    ],
  ];
};

// Update Payment Data
const updatePaymentData = (row: any) => {
  console.log("Update Payment Data for:", row);
};

// Toggle Donation Status
const toggleDonationStatus = (row: any) => {
  row.status = row.status === "مستمر" ? "متوقف" : "مستمر";
  console.log("Toggled Donation Status for:", row);
};
</script>