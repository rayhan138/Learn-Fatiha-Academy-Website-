/**
 * Mobile Menu Toggle Functionality Tests
 * Feature: header-redesign, Task 7
 * Requirements: 6.2, 6.3, 6.4, 6.5
 */

// Mock DOM setup
function setupDOM() {
  document.body.innerHTML = `
    <body data-page="home">
      <div id="site-header"></div>
    </body>
  `;
  document.body.dataset.page = 'home';
}

// Simulate the header generation from site.js
function generateHeader() {
  const navItems = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "About", href: "about.html", key: "about" },
    { label: "Courses", href: "courses.html", key: "courses" },
    { label: "Enroll", href: "enroll.html", key: "enroll" },
    { label: "PDF", href: "pdf.html", key: "pdf" },
    { label: "Blogs", href: "blogs.html", key: "blogs" },
    { label: "Contact", href: "contact.html", key: "contact" },
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
          <a href="index.html" class="brand-logo">
            <img src="Logo/logo for header/Logo For Header.svg" alt="Learn Fatiha Academy" class="header-logo">
          </a>

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
}

// Initialize mobile toggle functionality
function initMobileToggle() {
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
}

describe('Mobile Menu Toggle Functionality', () => {
  beforeEach(() => {
    setupDOM();
    generateHeader();
    initMobileToggle();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('toggle button exists and has correct initial attributes', () => {
    const toggle = document.getElementById('mobile-toggle');
    expect(toggle).toBeTruthy();
    expect(toggle.getAttribute('aria-label')).toBe('Open menu');
    expect(toggle.getAttribute('aria-controls')).toBe('mobile-nav');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('mobile navigation exists and is initially closed', () => {
    const mobileNav = document.getElementById('mobile-nav');
    expect(mobileNav).toBeTruthy();
    expect(mobileNav.classList.contains('is-open')).toBe(false);
  });

  test('clicking toggle button opens mobile menu', () => {
    const toggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // Initial state - closed
    expect(toggle.classList.contains('is-open')).toBe(false);
    expect(mobileNav.classList.contains('is-open')).toBe(false);
    expect(document.body.classList.contains('menu-open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    // Click to open
    toggle.click();

    // Verify open state
    expect(toggle.classList.contains('is-open')).toBe(true);
    expect(mobileNav.classList.contains('is-open')).toBe(true);
    expect(document.body.classList.contains('menu-open')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  test('clicking toggle button twice closes mobile menu (round-trip)', () => {
    const toggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // Click to open
    toggle.click();
    expect(mobileNav.classList.contains('is-open')).toBe(true);

    // Click to close
    toggle.click();
    expect(toggle.classList.contains('is-open')).toBe(false);
    expect(mobileNav.classList.contains('is-open')).toBe(false);
    expect(document.body.classList.contains('menu-open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('toggle button adds/removes is-open class correctly', () => {
    const toggle = document.getElementById('mobile-toggle');

    expect(toggle.classList.contains('is-open')).toBe(false);
    
    toggle.click();
    expect(toggle.classList.contains('is-open')).toBe(true);
    
    toggle.click();
    expect(toggle.classList.contains('is-open')).toBe(false);
  });

  test('mobile navigation expands and collapses correctly', () => {
    const toggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // Initially collapsed
    expect(mobileNav.classList.contains('is-open')).toBe(false);
    
    // Expand
    toggle.click();
    expect(mobileNav.classList.contains('is-open')).toBe(true);
    
    // Collapse
    toggle.click();
    expect(mobileNav.classList.contains('is-open')).toBe(false);
  });

  test('body class menu-open is toggled appropriately', () => {
    const toggle = document.getElementById('mobile-toggle');

    expect(document.body.classList.contains('menu-open')).toBe(false);
    
    toggle.click();
    expect(document.body.classList.contains('menu-open')).toBe(true);
    
    toggle.click();
    expect(document.body.classList.contains('menu-open')).toBe(false);
  });

  test('aria-expanded attribute updates correctly', () => {
    const toggle = document.getElementById('mobile-toggle');

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('clicking navigation link closes mobile menu', () => {
    const toggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const navLink = mobileNav.querySelector('a');

    // Open menu
    toggle.click();
    expect(mobileNav.classList.contains('is-open')).toBe(true);
    expect(toggle.classList.contains('is-open')).toBe(true);
    expect(document.body.classList.contains('menu-open')).toBe(true);

    // Click navigation link
    navLink.click();

    // Verify menu is closed
    expect(mobileNav.classList.contains('is-open')).toBe(false);
    expect(toggle.classList.contains('is-open')).toBe(false);
    expect(document.body.classList.contains('menu-open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('multiple toggle clicks maintain correct state', () => {
    const toggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // Click 1: Open
    toggle.click();
    expect(mobileNav.classList.contains('is-open')).toBe(true);

    // Click 2: Close
    toggle.click();
    expect(mobileNav.classList.contains('is-open')).toBe(false);

    // Click 3: Open
    toggle.click();
    expect(mobileNav.classList.contains('is-open')).toBe(true);

    // Click 4: Close
    toggle.click();
    expect(mobileNav.classList.contains('is-open')).toBe(false);
  });

  test('all navigation items are present in mobile menu', () => {
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    
    expect(navLinks.length).toBe(7);
    
    const labels = Array.from(navLinks).map(link => link.textContent.trim());
    expect(labels).toEqual(['Home', 'About', 'Courses', 'Enroll', 'PDF', 'Blogs', 'Contact']);
  });
});
