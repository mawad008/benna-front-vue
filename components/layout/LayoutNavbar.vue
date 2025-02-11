<template>
  <div class="bg-tw-primary">
    <nuxt-link :to="localePath('/')"> {{ $t('home') }} </nuxt-link>
    <nuxt-link :to="localePath('/test')"> test </nuxt-link>
    <nuxt-link :to="changeLanguage()">
    <button > change language </button>
    </nuxt-link>
    
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
const { locale, locales , setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const changeLanguage = ()=>{
   return switchLocalePath(locale.value == 'ar' ? 'en' : 'ar');
}
watch(()=>locale.value , (val)=>{
 if(val){
  useHead({
      htmlAttrs: {
        lang: locale.value == 'en' ? "en" : 'ar',
        dir: locale.value == 'en' ? "ltr" : 'rtl',
      },
    });
 }
})
</script>
<style lang=""></style>
