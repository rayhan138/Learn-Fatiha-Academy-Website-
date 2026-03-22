document.addEventListener("DOMContentLoaded", () => {
  // Surah Ar-Rahman Ayahs 1 through 23
  const ayahs = [
    "الرَّحْمَٰنُ",
    "عَلَّمَ الْقُرْآنَ",
    "خَلَقَ الْإِنسَانَ",
    "عَلَّمَهُ الْبَيَانَ",
    "الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ",
    "وَالنَّجْمُ وَالشَّجَرُ يَسْجُدَانِ",
    "وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ",
    "أَلَّا تَطْغَوْا فِي الْمِيزَانِ",
    "وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ",
    "وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ",
    "فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ",
    "وَالْحَبُّ ذُو الْعَصْفِ وَالرَّيْحَانُ",
    "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    "خَلَقَ الْإِنسَانَ مِن صَلْصَالٍ كَالْفَخَّارِ",
    "وَخَلَقَ الْجَانَّ مِن مَّارِجٍ مِّن نَّارٍ",
    "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    "رَبُّ الْمَشْرِقَيْنِ وَرَبُّ الْمَغْرِبَيْنِ",
    "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    "مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ",
    "بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ",
    "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    "يَخْرُجُ مِنْهُمَا اللُّؤْلُؤُ وَالْمَرْجَانُ",
    "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ"
  ];

  const container = document.getElementById('falling-ayahs');
  const bookGlow = document.getElementById('bookGlow');
  
  if (!container || !bookGlow) return;

  let currentIndex = 0;

  function spawnAyah() {
    const ayahDiv = document.createElement('div');
    ayahDiv.classList.add('ayah-text');
    
    ayahDiv.innerHTML = `<span>${ayahs[currentIndex]}</span>`;
    
    const randomPath = Math.floor(Math.random() * 3) + 1;
    ayahDiv.classList.add(`leaf-path-${randomPath}`);
    
    const duration = randomPath === 1 ? 9000 : (randomPath === 2 ? 10000 : 11000);
    
    container.appendChild(ayahDiv);
    
    setTimeout(() => {
      bookGlow.classList.add('burst');
      
      setTimeout(() => {
        bookGlow.classList.remove('burst');
      }, 300);

      if(container.contains(ayahDiv)) {
        container.removeChild(ayahDiv);
      }
    }, duration - 400); 
    
    currentIndex = (currentIndex + 1) % ayahs.length;
  }

  spawnAyah();

  // Spawns a new Ayah every 3 seconds
  setInterval(spawnAyah, 3000);
});
