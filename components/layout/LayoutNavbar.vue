<template>
  <!-- <header class="absolute top-0 left-0 w-full z-50 bg-[#138b96] md:bg-transparent "> -->
  <header
    class="relative md:absolute top-0 left-0 w-full z-50 bg-[#138b96] md:bg-transparent h-[60px]"
  >
    <nav
      class="flex items-center justify-between px-8 py-4 text-white sticky top-0 mb-8"
    >
      <!-- Logo -->
      <div class="cursor-pointer" @click="$router.push(localePath('/'))">
        <img src="@/assets/svg/logo.svg" alt="Logo" class="h-12 w-auto" />
      </div>
      <div class="flex items-center space-x-6 gap-4">
        <!-- Desktop Navbar -->
        <ul
          class="hidden md:flex space-x-6 justify-between items-center w-full"
        >
          <li v-for="route in routes" :key="route.path" class="px-1">
            <NuxtLink
              :to="localePath(route.path)"
              class="nav-link"
              exact-active-class="active-link"
            >
              {{ $t(route.name) }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Language Switcher (Desktop) -->
        <NuxtLink
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="nav-link hidden md:block"
        >
          {{ locale.name }}
        </NuxtLink>

        <!-- User Avatar with Dropdown -->

        <div class="relative hidden md:flex items-center" ref="dropdownRef">
          <div @click="toggleDropdown" class="cursor-pointer">
            <template v-if="userName">
              <UTooltip :text="userName">
                <UAvatar
                  :alt="userName"
                  size="sm"
                  class="dark:bg-white bg-white"
                />
              </UTooltip>
            </template>
            <template v-else>
              <UAvatar
                icon="i-lucide-user"
                size="sm"
                class="dark:bg-white bg-white"
              />
            </template>
          </div>

          <!-- Logout Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            :class="[
              'absolute top-8 mt-2 w-max bg-white text-black rounded-md shadow-lg',
              locale === 'ar' ? 'left-0' : 'right-0',
            ]"
          >
            <template v-if="isLogged">
              <NuxtLink
                to="/"
                @click="handleLogout"
                class="block px-4 py-2 text-red-600 flex items-center space-x-2 hover:bg-red-50"
                icon="i-lucide-log-out"
              > 
                <span>{{ locale === "ar" ? "تسجيل الخروج" : "Logout" }}</span>
            
              </NuxtLink>
            </template>
            <template v-else>
              <button
                @click="openLoginModal"
                class="block px-4 py-2 text-red-600 flex items-center space-x-2 hover:bg-red-50"
                icon="i-lucide-log-in"
              >
                <span>{{ locale === "ar" ? "تسجيل الدخول" : "Login" }}</span>
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-white">
        <Icon name="heroicons-outline:menu" class="w-8 h-8" />
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute top-16 left-0 w-full bg-[#138b96] md:hidden"
    >
      <ul class="flex flex-col text-white text-center py-4">
        <li v-for="route in routes" :key="route.path">
          <NuxtLink
            :to="localePath(route.path)"
            class="block py-2 relative mobile-nav-link"
            exact-active-class="active-mobile-link"
          >
            {{ $t(route.name) }}
            <span class="mobile-underline"></span>
          </NuxtLink>
        </li>
        <!-- Language Switcher (Mobile) -->

        <li v-for="locale in availableLocales" :key="locale.code">
          <NuxtLink
            :to="switchLocalePath(locale.code)"
            class="block py-2 transition-colors"
            exact-active-class="active-mobile-link"
          >
            {{ locale.name }}
          </NuxtLink>
        </li>

        <!-- Auth (Mobile) -->
        <li v-if="isLogged" class="flex items-center justify-center space-x-2">
          <NuxtLink
            to="/"
            @click="handleLogout"
            class="block py-2 text-red-800 space-x-2"
            icon="i-lucide-log-out"
          >
            <span class="px-2">{{
              locale === "ar" ? "تسجيل الخروج" : "Logout"
            }}</span>
          </NuxtLink>
        </li>
        <li v-else>
          <button
            @click="openLoginModal"
            class="block py-2 text-white space-x-2 hover:bg-red-50"
            icon="i-lucide-log-in"
          >
            <span class="px-2">{{
              locale === "ar" ? "تسجيل الدخول" : "Login"
            }}</span>
          </button>
        </li>
      </ul>
    </div>
    <LoginModal v-if="isLoginOpen" @close="isLoginOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRegisterStore } from "@/stores/register";
import { useAuthStore } from "@/stores/auth";
import LoginModal from "@/components/modals/LoginModal.vue";
import logo from "@/assets/svg/logo.svg";

const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const { locale, locales } = useI18n();

const availableLocales = computed(() => {
  return (locales.value as { code: string; name: string }[]).filter(
    (l) => l.code !== locale.value
  );
});

const toast = useToast();
const authStore = useAuthStore();
const registerStore = useRegisterStore();

const isMenuOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const isDropdownOpen = ref(false);
const isLoginOpen = ref(false);
const userName = ref("" as string);
const getUser = computed(() => authStore.user);

watch(getUser, (val) => {
  userName.value = val?.name!;
});
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const isLogged = computed(() => authStore.isLoggedIn);

const openLoginModal = () => {
  isLoginOpen.value = false;
  nextTick(() => {
    registerStore.step = 0;
    isLoginOpen.value = true;
  });
};

const handleLogout = () => {
  authStore.logout();
  registerStore.reset();
  isLoginOpen.value = false;
  isDropdownOpen.value = false;
  isMenuOpen.value = false;
  toast.add({
    title: "لقد تم تسجيل الخروج من بناء",
    description: "شكرا لك على تبرعك",
  });
};

onMounted(() => {
  onClickOutside(dropdownRef, () => {
    isDropdownOpen.value = false;
  });
});

const routes = [
  { path: "/", name: "home" },
  { path: "/campaigns", name: "campaigns" },
  { path: "/contact", name: "contact" },
  { path: "/terms", name: "terms" },
];
</script>

<style scoped>
header {
  height: 64px;
}

@media (min-width: 768px) {
  header {
    height: 80px;
  }
}
.nav-link {
  position: relative;
  padding-bottom: 2px;
  transition: color 0.3s ease-in-out;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
}

.nav-link:hover::after {
  width: 100%;
  left: 0;
}

.active-link {
  border-bottom: 2px solid white;
  font-weight: bold;
}

.mobile-nav-link {
  position: relative;
  display: inline-block;
  padding-bottom: 5px;
}

.mobile-underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
}

.mobile-nav-link:hover .mobile-underline,
.active-mobile-link .mobile-underline {
  width: 100%;
  left: 0;
}

.lang-btn {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 6px;
  transition: background 0.3s ease-in-out;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}
.space-x-reverse > :not([hidden]) ~ :not([hidden]) {
  margin-right: 1.5rem;
  margin-left: 0;
}
</style>
