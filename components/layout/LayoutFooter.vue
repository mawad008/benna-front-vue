<template>
  <footer class="bg-primary text-white py-8">
    <div
      class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right"
    >
      <!-- Column 1 -->
      <div class="flex flex-col items-center justify-center">
        <img src="/nav-logo.png" alt="جمعية بناء" class="h-12 mb-2" />
        <p class="mb-4">الإدارة الرئيسية</p>
        <p class="mb-2">يمكنك تحميل التطبيق من المتاجر التالية</p>
        <div class="flex gap-4">
          <img src="/apple-store.png" alt="Apple Store" class="h-8" />
          <img src="/google-play.png" alt="Google Play" class="h-8" />
        </div>
      </div>

      <!-- Column 2 -->
      <div class="space-y-6">
        <div>
          <h3 class="font-bold text-lg">مكتب الدمام</h3>
          <p>الدمام - مكتب السحيمي - مجمع أسواق التميمي</p>
          <p>هاتف: 0138185532</p>
          <p>من الساعة 04:00 الى الساعة 10 مساء</p>
        </div>

        <div>
          <h3 class="font-bold text-lg">فرع الدمام</h3>
          <p>
            البريد الإلكتروني:
            <a href="mailto:hadba@ebenaa.org.sa" class="text-white underline"
              >hadba@ebenaa.org.sa</a
            >
          </p>
          <p>مدير الفرع: عبد الله بن عبد السحيمي</p>
          <p>هاتف: 0138107677</p>
          <p>من الأحد إلى الخميس 9:00 صباحًا - 10:00 مساء</p>
        </div>
      </div>

      <!-- Column 3 -->
      <div class="space-y-6">
        <div>
          <h3 class="font-bold text-lg">فرع الظهران</h3>
          <p>شارع عبدالله بن عباس</p>
          <p>مدير الفرع: عزيز بن أحمد العماري</p>
          <p>هاتف: 0138355978</p>
          <p>من الساعة 09:00 صباحًا الى 10:00 مساء</p>
        </div>

        <div>
          <h3 class="font-bold text-lg">مكتب 22</h3>
          <p>الخبر - شارع النمر - تقاطع 22</p>
          <p>هاتف: 0138411674</p>
          <p>من الساعة 04:00 الى الساعة 10 مساء</p>
        </div>
      </div>
    </div>
  </footer>
</template>
  
  <script setup>
</script>
  
  <style scoped>
.bg-primary {
  background-color: #138b96;
}
</style>
  