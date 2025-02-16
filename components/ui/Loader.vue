<template>
<div v-if="loading" class="loader-container">
    <img src="/loader.png" class="rotating-loader" />
</div>

</template>
<script setup >
import { useLoadingStore } from '@/stores/loading';

const { loading } = useLoadingStore();

</script>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(75, 75, 75, 0.623);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.rotating-loader {
  width: 35px;
  height:35px;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>