import { useLoadingStore } from '@/stores/loading';

export default defineNuxtRouteMiddleware(() => {
  const loadingStore = useLoadingStore();
  loadingStore.start();

  setTimeout(() => {
    loadingStore.stop();
  }, 1500); 
});
