// import { useAuthStore } from '@/stores/auth';
// import { navigateTo } from '#app';
// import { useRoute, useRouter } from "vue-router";
// const localePath = useLocalePath();

// export default defineNuxtRouteMiddleware(async (to) => {
//     const authStore = useAuthStore();
//     const route = useRoute();
//     const router = useRouter();
//     // Initialize auth state
//     // await authStore.initializeAuth();

//     // If the user is already logged in and tries to go to login or signup page, redirect to dashboard
//     if (authStore.token && to.path === '/login') {
//         const dashboardPath = localePath("/");
//         if (to.path !== dashboardPath) { 
//             return navigateTo(dashboardPath);
//         }
//     }

//     // If the user is not logged in and tries to access a protected route, redirect to login page
//     if (!authStore.isLoggedIn && to.path !== '/login') {
//         const loginPath = localePath("/login");
//         if (to.path !== loginPath) { 
//             return navigateTo(loginPath);
//         }
//     }
  
// });