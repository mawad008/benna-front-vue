<template>
  <section
    class="relative h-[90vh] hidden md:flex items-center justify-center bg-cover bg-center px-8 "
    style="background-image: url('/hero-bg.png');"
  >
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center text-white text-center md:text-right">
      <div>
        <h1 class="font-bold text-[28px] leading-[42px] text-right">
          جمعية بناء لرعاية الأيتام تأسست الجمعية عام 2010 م ، تحت إشراف المركز الوطني لتنمية القطاع الغير ربحي بترخيص رقم 568 تساهم الجمعية برعاية وكفالة أكثر من 4500 يتيم ويتيمة
        </h1>
        <p class="font-normal text-[20px] leading-[34px] text-right mt-4">
          قالَ رَسُول اللَّه ﷺ: (مَا مِنْ يَوْمٍ يُصبِحُ العِبادُ فِيهِ إِلَّا مَلَكَانِ يَنْزِلانِ، فَيَقُولُ أَحَدُهُمَا: اللَّهُمَّ أَعْطِ مُنْفِقًا خَلَفًا، وَيَقُولُ الآخَرُ: اللَّهُمَّ أَعْطِ مُمْسِكًا تَلَفًا)
        </p>
      </div>
      <div class="flex justify-center">
        <div class="hero-image">
          <img src="/hero-image.png" alt="Hero Image" class="masked-image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-image {
  position: relative;
  width: 350px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Medication Pill Mask Effect */
/* .masked-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  
  clip-path: polygon(
    10% 10%, 90% 10%, 95% 15%, 95% 25%, 90% 30%, 10% 30%, 5% 25%, 5% 15%, 
    10% 35%, 90% 35%, 95% 40%, 95% 50%, 90% 55%, 10% 55%, 5% 50%, 5% 40%, 
    10% 60%, 90% 60%, 95% 65%, 95% 75%, 90% 80%, 10% 80%, 5% 75%, 5% 65%, 
    10% 85%, 90% 85%, 95% 90%, 95% 100%, 90% 100%, 10% 100%, 5% 95%, 5% 90%  
  );

  border-radius: 50px; 
} */
</style>
