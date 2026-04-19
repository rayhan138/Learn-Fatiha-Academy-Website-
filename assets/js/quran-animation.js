document.addEventListener("DOMContentLoaded", () => {
  // Surah Ar-Rahman Ayahs 1 through 23
  const ayahs = [
    "ٱلرَّحۡمَٰنُ ١",
    "عَلَّمَ ٱلۡقُرۡءَانَ ٢",
    "خَلَقَ ٱلۡإِنسَٰنَ ٣",
    "عَلَّمَهُ ٱلۡبَيَانَ ٤",
    "ٱلشَّمۡسُ وَٱلۡقَمَرُ بِحُسۡبَانٖ ٥",
    "وَٱلنَّجۡمُ وَٱلشَّجَرُ يَسۡجُدَانِ ٦",
    "وَٱلسَّمَآءَ رَفَعَهَا وَوَضَعَ ٱلۡمِيزَانَ ٧",
    "أَلَّا تَطۡغَوۡاْ فِي ٱلۡمِيزَانِ ٨",
    "وَأَقِيمُواْ ٱلۡوَزۡنَ بِٱلۡقِسۡطِ وَلَا تُخۡسِرُواْ ٱلۡمِيزَانَ ٩",
    "وَٱلۡأَرۡضَ وَضَعَهَا لِلۡأَنَامِ ١٠",
    "فِيهَا فَٰكِهَةٞ وَٱلنَّخۡلُ ذَاتُ ٱلۡأَكۡمَامِ ١١",
    "وَٱلۡحَبُّ ذُو ٱلۡعَصۡفِ وَٱلرَّيۡحَانُ ١٢",
    "فَبِأَيِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ١٣",
    "خَلَقَ ٱلۡإِنسَٰنَ مِن صَلۡصَٰلٖ كَٱلۡفَخَّارِ ١٤",
    "وَخَلَقَ ٱلۡجَآنَّ مِن مَّارِجٖ مِّن نَّارٖ ١٥",
    "فَبِأَيِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ١٦",
    "رَبُّ ٱلۡمَشۡرِقَيۡنِ وَرَبُّ ٱلۡمَغۡرِبَيۡنِ ١٧",
    "فَبِأَيِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ١٨",
    "مَرَجَ ٱلۡبَحۡرَيۡنِ يَلۡتَقِيَانِ ١٩",
    "بَيۡنَهُمَا بَرۡزَخٞ لَّا يَبۡغِيَانِ ٢٠",
    "فَبِأَيِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ٢١",
    "يَخۡرُجُ مِنۡهُمَا ٱللُّؤۡلُؤُ وَٱلۡمَرۡجَانُ ٢٢",
    "فَبِأَيِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ٢٣"
  ];

  const container = document.getElementById('falling-ayahs');
  const bookGlow = document.getElementById('bookGlow');
  
  if (!container || !bookGlow) return;

  let currentIndex = 0;
  let animationInterval = null;
  let isPageVisible = true;

  // Detect if page is visible (pause animations when tab is hidden)
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    
    if (!isPageVisible) {
      // Pause animations when tab is hidden
      if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }
    } else {
      // Resume animations when tab is visible
      if (!animationInterval) {
        animationInterval = setInterval(spawnAyah, 3000);
      }
    }
  });

  function spawnAyah() {
    // Don't spawn if page is not visible
    if (!isPageVisible) return;

    const ayahDiv = document.createElement('div');
    ayahDiv.classList.add('ayah-text');
    
    ayahDiv.innerHTML = `<span>${ayahs[currentIndex]}</span>`;
    
    const randomPath = Math.floor(Math.random() * 3) + 1;
    ayahDiv.classList.add(`leaf-path-${randomPath}`);
    
    const duration = randomPath === 1 ? 9000 : (randomPath === 2 ? 10000 : 11000);
    
    container.appendChild(ayahDiv);
    
    // Use requestAnimationFrame for smoother animations
    const startTime = performance.now();
    
    function animateGlow(currentTime) {
      const elapsed = currentTime - startTime;
      
      if (elapsed >= duration - 400) {
        bookGlow.classList.add('burst');
        
        setTimeout(() => {
          bookGlow.classList.remove('burst');
        }, 300);

        if(container.contains(ayahDiv)) {
          container.removeChild(ayahDiv);
        }
      } else {
        requestAnimationFrame(animateGlow);
      }
    }
    
    requestAnimationFrame(animateGlow);
    
    currentIndex = (currentIndex + 1) % ayahs.length;
  }

  spawnAyah();

  // Spawns a new Ayah every 3 seconds
  animationInterval = setInterval(spawnAyah, 3000);
});
