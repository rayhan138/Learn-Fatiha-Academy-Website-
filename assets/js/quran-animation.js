document.addEventListener("DOMContentLoaded", () => {
  // Surah Ar-Rahman Ayahs 1 through 23
  const ayahs = [
    { text: "ﱧ ﱨ", page: 531 },
    { text: "ﱩ ﱪ ﱫ", page: 531 },
    { text: "ﱬ ﱭ ﱮ", page: 531 },
    { text: "ﱯ ﱰ ﱱ", page: 531 },
    { text: "ﱲ ﱳ ﱴ ﱵ", page: 531 },
    { text: "ﱶ ﱷ ﱸ ﱹ", page: 531 },
    { text: "ﱺ ﱻ ﱼ ﱽ ﱾ", page: 531 },
    { text: "ﱿ ﲀ ﲁ ﲂ ﲃ", page: 531 },
    { text: "ﲄ ﲅ ﲆ ﲇ ﲈ ﲉ ﲊ", page: 531 },
    { text: "ﲋ ﲌ ﲍ ﲎ", page: 531 },
    { text: "ﲏ ﲐ ﲑ ﲒ ﲓ ﲔ", page: 531 },
    { text: "ﲕ ﲖ ﲗ ﲘ ﲙ", page: 531 },
    { text: "ﲚ ﲛ ﲜ ﲝ ﲞ", page: 531 },
    { text: "ﲟ ﲠ ﲡ ﲢ ﲣ ﲤ", page: 531 },
    { text: "ﲥ ﲦ ﲧ ﲨ ﲩ ﲪ ﲫ", page: 531 },
    { text: "ﲬ ﲭ ﲮ ﲯ ﲰ", page: 531 },
    { text: "ﲱ ﲲ ﲳ ﲴ ﲵ", page: 531 },
    { text: "ﲶ ﲷ ﲸ ﲹ ﲺ", page: 531 },
    { text: "ﱁ ﱂ ﱃ ﱄ", page: 532 },
    { text: "ﱅ ﱆ ﱇ ﱈ ﱉ", page: 532 },
    { text: "ﱊ ﱋ ﱌ ﱍ ﱎ", page: 532 },
    { text: "ﱏ ﱐ ﱑ ﱒ ﱓ", page: 532 },
    { text: "ﱔ ﱕ ﱖ ﱗ ﱘ", page: 532 }
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
    
    const ayahData = ayahs[currentIndex];
    ayahDiv.innerHTML = `<span>${ayahData.text}</span>`;
    ayahDiv.style.fontFamily = `p${ayahData.page}, Arial, sans-serif`;
    
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
