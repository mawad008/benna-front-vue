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
                  >حالة البيع</label
                >
                <USelect
                  v-model="selectedStatus"
                  :options="statusOptions"
                  placeholder="اختر حالة البيع"
                  color="white"
                  variant="outline"
                  option-attribute="label"
                  value-attribute="value"
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
  
        <template #type-data="{ row }">
          {{ getTypeLabel(row.type) }}
        </template>
  
        <!-- Action Column -->
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)" >
            <UButton
              color="icon"
              variant="solid"
              icon="i-heroicons-ellipsis-vertical-20-solid"
            />
          </UDropdown>
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
  />
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import EditPayment from "@/components/modals/EditPayment.vue";
  import { useDeductionsStore } from "@/stores/deductions";
  
  const deductionsStore = useDeductionsStore();
  
  const deductions = ref(deductionsStore.deductions);
  
  // Pagination
  const page = ref(1);
  const pageSize = ref(10);
  
  
  // Search and Filters
  const searchQuery = ref("");
  const selectedStatus = ref("");
  const selectedType = ref("");
  
  
  const statusOptions = [
    { label: "مستمر", value: "continuous" },
    { label: "متوقف", value: "stopped" },
  ];
  const typeOptions = [
    { label: "يومي", value: "day" },
    { label: "أسبوعي", value: "week" },
    { label: "شهري", value: "month" },
  ];
  const getGlobalIndex = (rowIndex: number) => {
    return (page.value - 1) * pageSize.value + rowIndex + 1;
  };
  
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
  
//   const items = (row: any) => [
//     [
//       {
//         label: "تحديث بيانات الدفع",
//         icon: "i-heroicons-pencil-square-20-solid",
//         class: "text-blue-600 hover:bg-blue-50",
//         color:"success",
//         ui: {
//           color: "success",
//         },
//         click: () => updatePaymentData(row),
//       },
//       {
//         label: row.status === "continuous" ? "إيقاف التبرع" : "تفعيل التبرع",
//         icon:
//           row.status === "continuous"
//             ? "i-heroicons-pause-20-solid"
//             : "i-heroicons-play-20-solid",
//         class:
//           row.status === "continuous"
//             ? "text-red-600 hover:bg-green-50"
//             : "text-green-600 hover:bg-red-50",
//         click: () => toggleDonationStatus(row),
//       },
//     ],
//   ];
  const toggleDonationStatus = async (row: any) => {
    try {
      if(row.status === "stopped"){
        await deductionsStore.activePayment();
      }else{
        await deductionsStore.cancelPayment();
      }
      deductionsStore.fetchDeductions();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "continuous":
        return "مستمر";
      case "stopped":
        return "متوقف";
      default:
        return status;
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "day":
        return "يومي";
      case "week":
        return "أسبوعي";
      case "month":
        return "شهري";
      default:
        return type;
    }
  };
  
  const getStatusColor = (status: string) => {
    return status === "continuous" ? "green" : "red";
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
      const normalizedType = normalizeArabic(row.type.toLowerCase());
      return (
        (searchQuery.value === "" ||
          normalizedName.includes(normalizedQuery) ||
          normalizedType.includes(normalizedQuery)) &&
        (selectedStatus.value === "" || row.status === selectedStatus.value) &&
        (selectedType.value === "" || row.type === selectedType.value)
      );
    });
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
    return sortedData.value?.slice(start, start + pageSize.value);
  });
  
  // Computed - Page Count
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
  
  
  // const toggleDonationStatus = (row: any) => {
  //   row.status = row.status === "continuous" ? "stopped" : "continuous";
  //   localStorage.setItem("tableData", JSON.stringify(tableData));
  // };
  
  const emit = defineEmits(["update:deduction"]);
  
  // const toggleDonationStatus = (row: any) => {
  //   const updatedRow = {
  //     ...row,
  //     status: row.status === "مستمر" ? "متوقف" : "مستمر",
  //   };
  //   emit("update:deduction", updatedRow);
  // };
  
  </script>
  