<template>
   <header class="absolute top-0 left-0 w-full z-50 bg-[#138b96] md:bg-transparent">
    <nav class="flex items-center justify-between px-8 py-4 text-white">
      <!-- Left Side -->
      <div class="flex items-center space-x-6" :class="{ 'flex-row-reverse': locale === 'ar' }">
          <!-- Language Switcher -->
          <NuxtLink :to="changeLanguage()" class="hidden md:block">
          <button class="lang-btn">{{ locale === 'ar' ? 'EN' : 'عربي' }}</button>
        </NuxtLink>

        <!-- User Avatar -->
        <div class="hidden md:flex items-center justify-center bg-white rounded-full p-1 border-2 border-white">
          <img src="/user-avatar.png" alt="User Avatar" class="h-4 w-4" />
        </div>
        <ul class="hidden md:flex space-x-6" :class="{ 'space-x-reverse': locale === 'ar' }">
          <li>
            <NuxtLink :to="localePath('/home')" class="nav-link" exact-active-class="active-link">
              {{ $t('home') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/donate')" class="nav-link" exact-active-class="active-link">
              {{ $t('donate') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/contact')" class="nav-link" exact-active-class="active-link">
              {{ $t('contact') }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Logo  -->
      <div class="text-xl font-bold" :class="{ 'order-first': locale === 'ar' }">
        <img src="/nav-logo.png" alt="Logo" class="h-15 w-[100%]" />
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-white">
        <Icon name="heroicons-outline:menu" class="w-8 h-8" />
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="absolute top-16 left-0 w-full bg-[#138b96] bg-opacity-80 md:hidden">
      <ul class="flex flex-col text-white text-center py-4">
        <li>
          <NuxtLink :to="localePath('/home')" class="block py-2"  exact-active-class="active-link">{{ $t('home') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/donate')" class="block py-2"  exact-active-class="active-link">{{ $t('donate') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/contact')" class="block py-2"  exact-active-class="active-link">{{ $t('contact') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="changeLanguage()" class="block py-2">
            {{ locale === 'ar' ? 'English' : 'عربي' }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useLocalePath, useSwitchLocalePath } from "#i18n";
import { useHead } from "#app";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const localePath = useLocalePath();
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const changeLanguage = () => switchLocalePath(locale.value === "ar" ? "en" : "ar");

watch(locale, (val) => {
  useHead({
    htmlAttrs: {
      lang: val === "en" ? "en" : "ar",
      dir: val === "en" ? "ltr" : "rtl",
    },
  });
});
</script>

<style scoped>
.nav-link {
  transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
  padding-bottom: 2px;
}

.active-link {
  border-bottom: 2px solid white;
  font-weight: bold;
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

</style>
