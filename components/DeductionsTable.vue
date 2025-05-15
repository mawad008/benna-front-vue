<template>
    <div class="p-4">
      <div class="container bg-white rounded-lg shadow-md p-4 mb-4">
        <!-- Filters & Search -->
        <div class="flex flex-wrap justify-between items-center gap-4">
          <!-- Filters Section -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-gray-700 font-semibold">
              <i class="i-lucide-filter"></i>
              <span>تصفية النتائج</span>
            </div>
            <div class="flex gap-4">
              <!-- Status Filter -->
              <div class="flex flex-col gap-1">
                <label class="text-sm text-gray-600 font-medium"
                  >حالة الدفع</label
                >
                <USelect
                  v-model="selectedStatus"
                  :options="statusOptions"
                  placeholder="اختر حالة الدفع"
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
              <span>البحث</span>
            </div>
            <UInput
              v-model="searchQuery"
              placeholder="بحث..."
              class="w-full max-w-md"
              color="white"
              variant="outline"
            />
          </div>
        </div>
      </div>
  
      <!-- Table -->
      <UTable
        :rows="paginatedData"
        :columns="columns"
        class="w-full"
        :sort-button="{
          icon: 'i-heroicons-sparkles-20-solid',
          color: 'white',
          variant: 'outline',
        }"
      >
        <!-- Row Number -->
        <template #index-data="{ index }">
          <span class="text-gray-900">{{ getGlobalIndex(index) }}</span>
        </template>
  
        <!-- Status Badge -->
        <template #status-data="{ row }">
          <UBadge :color="getStatusColor(row.status)" variant="subtle">
            {{ getStatusLabel(row.status) }}
          </UBadge>
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
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";


  const props = defineProps<{deductions: any}>();
  const deductions = ref(props.deductions);

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
    { key: "name", label: "اسم المستقطع" },
    { key: "campaign_name", label: "اسم الحملة" },
    { key: "amount", label: "مبلغ المستقطع", sortable: true },
    { key: "deduction_date", label: "تاريخ الاستقطاع", sortable: true },
    { key: "status", label: "حالة الاستقطاع" },
  ]);
  
  const selectedStatus = ref("");
  const statusOptions = [
    { label: "تم الدفع", value: 1 },
    { label: "فشل الدفع", value: 0 },
  ];

  const getStatusLabel = (status: number) => {
    return status === 1 ? "تم الدفع" : "فشل الدفع";
  };

  const getStatusColor = (status: number) => {
    return status === 1 ? "green" : "red";
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
      const normalizedCampaignName = normalizeArabic(row.campaign_name.toLowerCase());

      return (
        (searchQuery.value === "" ||
          normalizedName.includes(normalizedQuery) ||
          normalizedCampaignName.includes(normalizedQuery)) &&
          (selectedStatus.value === "" || row.status === Number(selectedStatus.value))
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
  