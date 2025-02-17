<template>
    <div class="p-4">
      <div class="container bg-white rounded-lg shadow-md p-4 mb-4">
        <!-- Filters & Search -->
        <div class="flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-gray-700 font-semibold">
              <i class="pi pi-filter"></i>
              <span>تصفية النتائج</span>
            </div>
            <div class="flex gap-4">
              <!-- Status Filter -->
              <div class="flex flex-col gap-1">
                <label class="text-sm text-gray-600 font-medium">حالة البيع</label>
                <Dropdown
                  v-model="selectedStatus"
                  :options="statusOptions"
                  placeholder="اختر حالة البيع"
                  class="w-40"
                />
              </div>
  
              <!-- Type Filter -->
              <div class="flex flex-col gap-1">
                <label class="text-sm text-gray-600 font-medium">نوع الاستقطاع</label>
                <Dropdown
                  v-model="selectedType"
                  :options="typeOptions"
                  placeholder="اختر نوع الاستقطاع"
                  class="w-40"
                />
              </div>
            </div>
          </div>
  
          <!-- Search -->
          <div class="flex flex-col gap-2 w-full md:w-auto">
            <div class="flex items-center gap-2 text-gray-700 font-semibold">
              <i class="pi pi-search"></i>
              <span>البحث</span>
            </div>
            <InputText v-model="searchQuery" placeholder="بحث..." class="p-inputtext-sm w-full md:w-72" />
          </div>
        </div>
      </div>
  
      <!-- Data Table -->
      <DataTable
        :value="paginatedData"
        responsiveLayout="scroll"
        class="p-datatable-sm shadow-md rounded-lg"
        :paginator="true"
        :rows="pageSize"
        :totalRecords="filteredData.length"
        @page="handlePageChange"
      >
        <Column field="index" header="#" :sortable="false">
          <template #body="{ data, index }">
            {{ (page - 1) * pageSize + index + 1 }}
          </template>
        </Column>
        <Column field="name" header="اسم المستقطع"></Column>
        <Column field="amount" header="مبلغ المستقطع" sortable></Column>
        <Column field="date" header="تاريخ البدء" sortable></Column>
        <Column field="type" header="نوع الاستقطاع"></Column>
        <Column field="status" header="حالة البيع">
          <template #body="{ data }">
            <Tag :severity="data.status === 'مستمر' ? 'success' : 'warning'">
              {{ data.status }}
            </Tag>
          </template>
        </Column>
        <Column header="الإجراءات">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button label="تحديث الدفع" icon="pi pi-refresh" class="p-button-sm p-button-primary" @click="updatePaymentData(data)" />
              <Button
                :label="data.status === 'مستمر' ? 'إيقاف التبرع' : 'استمرار التبرع'"
                :icon="data.status === 'مستمر' ? 'pi pi-pause' : 'pi pi-play'"
                :class="data.status === 'مستمر' ? 'p-button-warning' : 'p-button-success'"
                class="p-button-sm"
                @click="toggleDonationStatus(data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import tableData from "@/assets/data.json";
  import { DataTable, Column } from "primevue/datatable";
  import { Dropdown } from "primevue/dropdown";
  import { InputText } from "primevue/inputtext";
  import { Button } from "primevue/button";
  import { Tag } from "primevue/tag";
  
  // Filters
  const searchQuery = ref("");
  const selectedStatus = ref("");
  const selectedType = ref("");
  const statusOptions = ["الكل", "مستمر", "متوقف"];
  const typeOptions = ["الكل", "يومي", "اسبوعي", "شهري"];
  
  // Pagination
  const page = ref(1);
  const pageSize = ref(10);
  
  // Filtered Data
  const filteredData = computed(() =>
    tableData.filter(
      (row) =>
        (!searchQuery.value ||
          row.name.includes(searchQuery.value) ||
          row.type.includes(searchQuery.value)) &&
        (!selectedStatus.value || selectedStatus.value === "الكل" || row.status === selectedStatus.value) &&
        (!selectedType.value || selectedType.value === "الكل" || row.type === selectedType.value)
    )
  );
  
  // Paginated Data
  const paginatedData = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    return filteredData.value.slice(start, start + pageSize.value);
  });
  
  // Handle Pagination
  const handlePageChange = (event: any) => {
    page.value = event.page + 1;
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
  
  <style>
  /* Custom Styling */
  .p-datatable .p-datatable-thead th {
    text-align: right;
    background: #f9fafb;
  }
  
  .p-datatable .p-datatable-tbody td {
    text-align: right;
  }
  
  .p-datatable .p-datatable-header {
    background: white;
  }
  
  .p-inputtext-sm {
    border-radius: 8px;
    padding: 6px 10px;
  }
  
  .p-button-sm {
    font-size: 0.875rem;
    padding: 6px 12px;
  }
  </style>
  