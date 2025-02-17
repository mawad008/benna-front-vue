<template>
  <div class="flex items-center gap-2">
    <UBadge
      v-if="badge"
      size="lg"
      color="primary"
      variant="outline"
      class="bg-[#138B9633] text-[#138B96] ring-0 ring-[#138B96]"
      :label="isIcon ? undefined : badge"
      :icon="isIcon ? badge : undefined"
      :trailing="false"
    />

    <h1 class="font-janna font-bold text-primary text-[20px] leading-[37.2px]">
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  badge?: string;
}>();


const isIcon = computed(() => props.badge?.startsWith("i-"));
</script>
