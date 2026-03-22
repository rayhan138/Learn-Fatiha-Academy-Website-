document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page || "";

  const navItems = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "About", href: "about.html", key: "about" },
    { label: "Courses", href: "courses.html", key: "courses" },
    { label: "Enroll", href: "enroll.html", key: "enroll" },
    { label: "Contact", href: "contact.html", key: "contact" },
    { label: "PDF", href: "pdf.html", key: "pdf" },
    { label: "Blogs", href: "blogs.html", key: "blogs" },
  ];

  function buildNav(linkClass) {
    return navItems
      .map(
        (item) => `
          <a href="${item.href}" class="${linkClass}" data-nav-key="${item.key}">
            ${item.label}
          </a>
        `
      )
      .join("");
  }

  const headerRoot = document.getElementById("site-header");
  if (headerRoot) {
    headerRoot.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a href="index.html" class="brand">Learn Fatiha Academy</a>

          <nav class="desktop-nav" aria-label="Primary Navigation">
            ${buildNav("nav-link")}
          </nav>

          <button class="mobile-toggle" id="mobile-toggle" aria-label="Open menu" aria-controls="mobile-nav" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile Navigation">
          <div class="mobile-nav-inner">
            ${buildNav("mobile-nav-link")}
          </div>
        </nav>
      </header>
    `;
  }

  const footerRoot = document.getElementById("site-footer");
  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <h3 class="footer-title">Learn Fatiha Academy</h3>
            <p class="footer-subtext">Begin Your Quran Journey With Us</p>
          </div>

          <div>
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
              <li><a href="terms-of-service.html">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-heading">Connect With Us</h4>
            <ul class="footer-links">
              <li>+8801581481708</li>
              <li><a href="https://wa.me/8801581481708" target="_blank" rel="noreferrer">WhatsApp: +8801581481708</a></li>
              <li><a href="mailto:fatihalearn786@gmail.com">fatihalearn786@gmail.com</a></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-heading">Social Media Icons</h4>
            <div class="social-row">
              <a class="icon-link" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.3 0-.9-.1-1.8-.1-2.7 0-4.4 1.6-4.4 4.6V11H7v3h2.8v7h3.7z"/>
                </svg>
              </a>

              <a class="icon-link" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7zm10.5 1.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2z"/>
                </svg>
              </a>

              <a class="icon-link" href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.7-6.2L6.8 22H3.7l7.2-8.3L1 2h6.2l4.2 5.6L18.9 2zm-1.1 18h1.7L6.3 3.9H4.6L17.8 20z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="container footer-bottom">
          © 2024 Learn Fatiha Academy. All rights reserved.
        </div>
      </footer>
    `;
  }

  document.querySelectorAll("[data-nav-key]").forEach((link) => {
    if (link.dataset.navKey === currentPage) {
      link.classList.add("active");
    }
  });

  const toggle = document.getElementById("mobile-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const thankYouMessage = document.getElementById("thank-you-message");
  if (thankYouMessage) {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source");

    if (source === "enroll") {
      thankYouMessage.textContent =
        "Your enrollment request has been submitted successfully.";
    } else if (source === "contact") {
      thankYouMessage.textContent =
        "Your message has been sent successfully.";
    } else {
      thankYouMessage.textContent =
        "Your submission has been received successfully.";
    }
  }
});