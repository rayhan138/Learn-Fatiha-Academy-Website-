document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("falling-letters");
  if (!container) return;

  const letters = [
    "ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر",
    "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف",
    "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"
  ];

  const layers = [
    {
      className: "letter-far",
      count: 8,
      minSize: 28,
      maxSize: 42,
      minDuration: 18,
      maxDuration: 26,
      minOpacity: 0.12,
      maxOpacity: 0.18,
    },
    {
      className: "letter-mid",
      count: 9,
      minSize: 36,
      maxSize: 54,
      minDuration: 16,
      maxDuration: 22,
      minOpacity: 0.16,
      maxOpacity: 0.24,
    },
    {
      className: "letter-near",
      count: 8,
      minSize: 44,
      maxSize: 68,
      minDuration: 14,
      maxDuration: 20,
      minOpacity: 0.18,
      maxOpacity: 0.28,
    },
  ];

  const random = (min, max) => Math.random() * (max - min) + min;
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];

  layers.forEach((layer) => {
    for (let i = 0; i < layer.count; i++) {
      const outer = document.createElement("span");
      outer.className = `falling-letter ${layer.className}`;

      outer.style.setProperty("--left", `${random(2, 95).toFixed(2)}%`);
      outer.style.setProperty("--duration", `${random(layer.minDuration, layer.maxDuration).toFixed(2)}s`);
      outer.style.setProperty("--delay", `${random(0, 10).toFixed(2)}s`);
      outer.style.setProperty("--opacity", random(layer.minOpacity, layer.maxOpacity).toFixed(2));
      outer.style.setProperty("--drift", `${random(8, 24).toFixed(0)}px`);
      outer.style.setProperty("--rotate", `${random(4, 12).toFixed(0)}deg`);

      const inner = document.createElement("span");
      inner.className = "letter-inner";
      inner.textContent = randomLetter();
      inner.style.setProperty("--size", `${random(layer.minSize, layer.maxSize).toFixed(0)}px`);
      inner.style.fontSize = `var(--size)`;
      inner.style.setProperty("--sway-duration", `${random(4.5, 8.5).toFixed(2)}s`);

      outer.appendChild(inner);
      container.appendChild(outer);
    }
  });
});