<template>
  <Hero />
  <div class="lg:mt-10 md:mt-20 mt-10 container">
    <h1 class="text-2xl font-bold mb-4 text-primary">الشروط والأحكام</h1>

    <div class="space-y-4">
      <section>
        <h2 class="text-xl font-semibold">1. المقدمة</h2>
        <p>
          مرحبًا بك في منصة بنى. عند استخدامك لموقعنا، فإنك توافق على الامتثال
          لهذه الشروط والأحكام. إذا كنت لا توافق، يُرجى عدم استخدام الموقع.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-semibold">2. استخدام الموقع</h2>
        <ul class="list-disc pr-6">
          <li>يجب أن يكون عمرك 18 عامًا على الأقل لاستخدام خدماتنا.</li>
          <li>
            توافق على عدم استخدام الموقع لأي غرض غير قانوني أو غير مصرح به.
          </li>
          <li>
            أي انتهاك لهذه الشروط قد يؤدي إلى تعليق أو إنهاء وصولك إلى الموقع.
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold">3. الملكية الفكرية</h2>
        <p>
          جميع المحتويات، بما في ذلك الشعارات والنصوص والصور، هي ملك لبنى
          ومحميّة بموجب قوانين حقوق النشر.
        </p>
        <p>
          لا يجوز لك نسخ أو إعادة إنتاج أو توزيع أي محتوى دون إذن كتابي منا.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-semibold">4. الحسابات الشخصية</h2>
        <ul class="list-disc pr-6">
          <li>إذا قمت بإنشاء حساب، فأنت مسؤول عن الحفاظ على سريته.</li>
          <li>يجب إخطارنا فورًا بأي استخدام غير مصرح به لحسابك.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold">5. معلومات المنتجات والخدمات</h2>
        <p>
          نسعى لتقديم أوصاف دقيقة، لكننا لا نضمن أن تكون تفاصيل المنتجات كاملة
          أو خالية من الأخطاء.
        </p>
        <p>الأسعار والتوافر قابلة للتغيير دون إشعار مسبق.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold">6. تحديد المسؤولية</h2>
        <p>
          لا تتحمل بنى أي مسؤولية عن الأضرار غير المباشرة أو العَرَضية أو
          التبعية الناشئة عن استخدامك للموقع.
        </p>
        <p>لا نضمن الوصول المستمر وغير المنقطع إلى الموقع.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold">7. سياسة الخصوصية</h2>
        <p>
          باستخدامك للموقع، فإنك توافق على سياسة الخصوصية الخاصة بنا، والتي تحدد
          كيفية جمع واستخدام بياناتك.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-semibold">8. تعديلات على الشروط</h2>
        <p>نحتفظ بالحق في تحديث هذه الشروط والأحكام في أي وقت.</p>
        <p>
          استمرار استخدام الموقع بعد التعديلات يعني أنك تقبل الشروط المحدثة.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-semibold">9. اتصل بنا</h2>
        <p>
          إذا كان لديك أي استفسارات، يُرجى التواصل معنا عبر البريد الإلكتروني
          <a href="mailto:your@email.com" class="text-blue-600"
            >your@email.com</a
          >.
        </p>
      </section>
    </div>
  </div>
</template>
  
  <script setup>
import Hero from "@/components/ui/Hero.vue";
definePageMeta({
  layout: "default",
});
</script>
  
  <style scoped>

</style>
  