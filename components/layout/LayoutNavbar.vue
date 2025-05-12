<template>
  <!-- <header class="absolute top-0 left-0 w-full z-50 bg-[#138b96] md:bg-transparent "> -->
    <header class="relative md:absolute top-0 left-0 w-full z-50 bg-[#138b96] md:bg-transparent">

    <nav class="flex items-center justify-between px-8 py-4 text-white">
      <div class="flex items-center space-x-6" :class="{ 'flex-row-reverse': locale === 'ar' }">
        <!-- Language Switcher (Desktop) -->
        <!-- <NuxtLink :to="changeLanguage()" class="hidden md:block">
          <button class="lang-btn">
            {{ locale === "ar" ? "EN" : "عربي" }}
          </button>
        </NuxtLink> -->

        <!-- User Avatar with Dropdown -->
        <div class="relative hidden md:flex items-center" ref="dropdownRef">
          <div @click="toggleDropdown" class="cursor-pointer bg-white rounded-full p-1 border-2 border-white">
            <img src="/user-avatar.png" alt="User Avatar" class="h-4 w-4 object-contain" />
          </div>

          <!-- Logout Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute left-2 top-8 mt-2 w-max bg-white text-black rounded-md shadow-lg"
          >
            <NuxtLink
              to="/"
              @click="handleLogout"
              class="block px-4 py-2 text-red-600 flex items-center space-x-2 hover:bg-red-50"
              :class="{ 'flex-row-reverse space-x-reverse': locale === 'ar' }"
            >
              <img src="/logout.png" alt="Logout" class="h-4 w-4" />
              <span>{{ locale === "ar" ? "تسجيل الخروج" : "Logout" }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Desktop Navbar -->
        <ul
          class="hidden md:flex space-x-6"
          :class="{ 'space-x-reverse': locale === 'ar' }"
        >
          <li v-for="route in routes" :key="route.path">
            <NuxtLink
              :to="localePath(route.path)"
              class="nav-link"
              exact-active-class="active-link"
            >
              {{ $t(route.name) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Logo -->
      <div
        class="cursor-pointer"
        :class="{ 'order-first': locale === 'ar' }"
        @click="$router.push(localePath('/home'))"
      >
        <img src="/nav-logo.png" alt="Logo" class="h-12 w-auto" />
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
        <!-- <li>
          <NuxtLink :to="changeLanguage()" class="block py-2">
            {{ locale === "ar" ? "English" : "عربي" }}
          </NuxtLink>
        </li> -->
        <!-- Logout (Mobile) -->
        <li>
          <NuxtLink
            to="/"
            @click="handleLogout"
            class="block py-2 text-red-500 flex items-center justify-center space-x-2"
            :class="{ 'flex-row-reverse space-x-reverse': locale === 'ar' }"
          >
            <img src="/logout.png" alt="Logout" class="h-4 w-4" />
            <span class="px-2">{{
              locale === "ar" ? "تسجيل الخروج" : "Logout"
            }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useLocalePath, useSwitchLocalePath } from "#i18n";
import { useHead } from "#app";
import { useRegisterStore } from "@/stores/register";

const registerStore = useRegisterStore();

const isMenuOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const isDropdownOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleLogout = () => {
  registerStore.reset();
  isDropdownOpen.value = false;
  isMenuOpen.value = false;
};

onMounted(() => {
  if (dropdownRef.value) {
    onClickOutside(dropdownRef, () => {
      isDropdownOpen.value = false;
    });
  }
});

const localePath = useLocalePath();
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const changeLanguage = () =>
  switchLocalePath(locale.value === "ar" ? "en" : "ar");

watch(locale, (val) => {
  useHead({
    htmlAttrs: {
      lang: val === "en" ? "en" : "ar",
      dir: val === "en" ? "ltr" : "rtl",
    },
  });
});

const routes = [
  { path: "/", name: "home" },
  { path: "/donate", name: "donate" },
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