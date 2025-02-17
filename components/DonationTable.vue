<template>
  <div class="p-4">
    <div class="container bg-white rounded-lg shadow-md p-4 mb-4">
      <!-- Filters & Search  -->
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
              <label class="text-sm text-gray-600 font-medium">حالة البيع</label>
              <USelect v-model="selectedStatus" :options="statusOptions" placeholder="اختر حالة البيع" color="white"
                variant="outline" />
            </div>

            <!-- Type Filter -->
            <div class="flex flex-col gap-1">
              <label class="text-sm text-gray-600 font-medium">نوع الاستقطاع</label>
              <USelect v-model="selectedType" :options="typeOptions" placeholder="اختر نوع الاستقطاع" color="white"
                variant="outline" />
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
          <UInput v-model="searchQuery" placeholder="بحث..." class="w-full max-w-md" color="white" variant="outline" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <UTable :rows="paginatedData" :columns="columns" class="w-full "
      :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: '#111928', variant: 'outline'}">
      <!-- Row Number -->
      <template #cell(index)="{ rowIndex }">
        <span class="text-gray-900">
          {{ (page - 1) * pageSize + rowIndex + 1 }}
        </span>
      </template>

      <!-- Status Badge -->
      <template #cell(status)="{ row }">
        <UBadge :color="getStatusColor(row.status)" variant="subtle">
          {{ row.status }}
        </UBadge>

      </template>

      <!-- Action Column -->
      <template #cell(actions)="{ row }">
        <div class="flex gap-2 items-center">
          <!-- Update Payment Data Button
          <UButton color="primary" variant="solid" class="text-sm" @click="updatePaymentData(row)">
            تحديث الدفع
          </UButton>

          <!-- Toggle Donation Status Button -->
          <!-- <UButton :color="row.status === 'مستمر' ? 'primary' : 'icon'" variant="solid" class="text-sm"
            @click="toggleDonationStatus(row)">
            {{ row.status === "مستمر" ? "إيقاف التبرع" : "استمرار التبرع" }}
          </UButton> -->

          <!-- <UIcon name="i-heroicons-ellipsis-vertical" class="cursor-pointer" @click="handleAction(row)" />  -->
        </div>
      </template>

      <template #action-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="icon" variant="solid" icon="i-heroicons-ellipsis-vertical-20-solid" />
        </UDropdown>
      </template>
    </UTable>

    <!-- Pagination -->
    <div class="container bg-white rounded-lg shadow-md p-2 mb-4">
      <div class="flex justify-between items-center mt-6">
        <div class="flex items-center gap-2">
          <UButton :disabled="page === 1" @click="page = page - 1" color="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>


          </UButton>
          <span class="text-gray-600 text-sm">{{ page }}/{{ pageCount }}</span>
          <UButton :disabled="page === pageCount" @click="page = page + 1" color="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>


          </UButton>
        </div>

        <div class="flex text-gray-600 text-sm gap-1">
          <span>{{ filteredData.length }} </span>
          <span> of </span>
          <span>{{ (page - 1) * pageSize + 1 }}-{{
            Math.min(page * pageSize, filteredData.length)
          }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <EditPayment v-if="isEditModalOpen" :row="selectedRow" @close="isEditModalOpen = false" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import tableData from "@/assets/data.json";
import EditPayment from "@/components/modals/EditPayment.vue";
// Search Query
const searchQuery = ref("");

// Filter Options
const selectedStatus = ref("");
const selectedType = ref("");

const statusOptions = ["الكل", "مستمر", "متوقف"];
const typeOptions = ["الكل", "يومي", "اسبوعي", "شهري"];

// Table Columns
const columns = ref([
  { key: "id", label: "#" },
  { key: "name", label: "اسم المستقطع" },
  { key: "amount", label: "مبلغ المستقطع", sortable: true },
  { key: "date", label: "تاريخ البدء", sortable: true },
  { key: "type", label: "نوع الاستقطاع" },
  { key: "status", label: "حالة البيع" },
  { key: "action", label: "الإجراءات" },
]);

const items = (row) => [
  [
    {
      label: "تحديث بيانات الدفع",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => updatePaymentData(row),
    },
    {
      label: row.status === "مستمر" ? "إيقاف التبرع" : "تفعيل التبرع",
      icon: row.status === "مستمر" ? "i-heroicons-pause-20-solid" : "i-heroicons-play-20-solid",
      click: () => toggleDonationStatus(row),
    },
  ],
];


const getStatusColor = (status: string) => {
  return status === "مستمر" ? "red" : status === "متوقف" ? "green" : "gray";
};



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

const isEditModalOpen = ref(false);
const selectedRow = ref(null);

// Update Payment Data
const updatePaymentData = (row: any) => {
  selectedRow.value = row;
  isEditModalOpen.value = true;
};

const toggleDonationStatus = (row: any) => {
  row.status = row.status === "مستمر" ? "متوقف" : "مستمر";

  localStorage.setItem("tableData", JSON.stringify(tableData));
};

</script>