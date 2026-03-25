# Design Document: Header Redesign

## Overview

The header redesign transforms the Learn Fatiha Academy website navigation from a text-based brand to a logo-based header with Poppins typography. The design maintains the existing fixed positioning and responsive behavior while integrating the official SVG logo, implementing local font loading, and establishing a consistent 7-item navigation structure.

The implementation focuses on minimal changes to the existing header structure in `assets/css/style.css` and the header generation logic in `assets/js/site.js`, ensuring backward compatibility with the current dark theme and responsive breakpoints.

## Architecture

### Component Structure

The header consists of three main components:

1. **Logo Component**: SVG image element linking to the home page
2. **Desktop Navigation**: Horizontal menu visible at 980px+ viewports
3. **Mobile Navigation**: Collapsible vertical menu with toggle button for <980px viewports

### File Organization

```
assets/
├── css/
│   └── style.css          # Header styles (existing, to be modified)
├── js/
│   └── site.js            # Header generation logic (existing, to be modified)
fonts/
└── Poppins/               # Local font files (existing)
    ├── Poppins-Regular.ttf
    ├── Poppins-Medium.ttf
    ├── Poppins-SemiBold.ttf
    └── Poppins-Bold.ttf
Logo/
└── logo for header/
    └── Logo For Header.svg # Logo asset (existing)
```

### Styling Strategy

The design leverages existing CSS custom properties and maintains the current styling patterns:
- Dark background: `rgba(7, 19, 28, 0.85)` with backdrop blur
- Gold accent: `var(--gold)` for active states
- Muted text: `var(--muted)` for default navigation items
- Existing responsive breakpoint: 980px

## Components and Interfaces

### Logo Component

**HTML Structure:**
```html
<a href="index.html" class="brand-logo">
  <img src="Logo/logo for header/Logo For Header.svg" alt="Learn Fatiha Academy" class="header-logo">
</a>
```

**CSS Interface:**
```css
.brand-logo {
  display: inline-flex;
  align-items: center;
  transition: opacity 0.25s ease;
}

.header-logo {
  height: 50px; /* Adjust based on logo dimensions */
  width: auto;
}
```

**Behavior:**
- Maintains aspect ratio through `width: auto`
- Provides hover feedback via opacity transition
- Links to `index.html` on click

### Navigation Menu Component

**HTML Structure:**
```html
<!-- Desktop Navigation -->
<nav class="desktop-nav">
  <a href="index.html" class="nav-link">Home</a>
  <a href="about.html" class="nav-link">About</a>
  <a href="courses.html" class="nav-link">Courses</a>
  <a href="enroll.html" class="nav-link">Enroll</a>
  <a href="pdf.html" class="nav-link">PDF</a>
  <a href="blogs.html" class="nav-link">Blogs</a>
  <a href="contact.html" class="nav-link">Contact</a>
</nav>

<!-- Mobile Navigation -->
<button class="mobile-toggle" aria-label="Toggle menu">
  <span></span>
  <span></span>
  <span></span>
</button>
<nav class="mobile-nav">
  <div class="mobile-nav-inner">
    <a href="index.html" class="mobile-nav-link">Home</a>
    <a href="about.html" class="mobile-nav-link">About</a>
    <a href="courses.html" class="mobile-nav-link">Courses</a>
    <a href="enroll.html" class="mobile-nav-link">Enroll</a>
    <a href="pdf.html" class="mobile-nav-link">PDF</a>
    <a href="blogs.html" class="mobile-nav-link">Blogs</a>
    <a href="contact.html" class="mobile-nav-link">Contact</a>
  </div>
</nav>
```

**JavaScript Interface:**
```javascript
// Active page detection
function setActiveNavLink() {
  const currentPage = document.body.dataset.page || 'home';
  const pageMap = {
    'home': 'index.html',
    'about': 'about.html',
    'courses': 'courses.html',
    'enroll': 'enroll.html',
    'pdf': 'pdf.html',
    'blogs': 'blogs.html',
    'contact': 'contact.html'
  };
  
  const currentHref = pageMap[currentPage];
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    if (link.getAttribute('href') === currentHref) {
      link.classList.add('active');
    }
  });
}

// Mobile toggle
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('is-open');
    mobileNav.classList.toggle('is-open');
    document.body.classList.toggle('menu-open');
  });
}
```

### Font Loading Component

**CSS @font-face Declarations:**
```css
@font-face {
  font-family: 'Poppins';
  src: url('../fonts/Poppins/Poppins-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Poppins';
  src: url('../fonts/Poppins/Poppins-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Poppins';
  src: url('../fonts/Poppins/Poppins-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Poppins';
  src: url('../fonts/Poppins/Poppins-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**CSS Variable Update:**
```css
:root {
  --font-header: 'Poppins', system-ui, -apple-system, sans-serif;
}
```

## Data Models

### Navigation Item Model

```typescript
interface NavigationItem {
  label: string;      // Display text
  href: string;       // Target URL
  page: string;       // Page identifier for active state
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: 'index.html', page: 'home' },
  { label: 'About', href: 'about.html', page: 'about' },
  { label: 'Courses', href: 'courses.html', page: 'courses' },
  { label: 'Enroll', href: 'enroll.html', page: 'enroll' },
  { label: 'PDF', href: 'pdf.html', page: 'pdf' },
  { label: 'Blogs', href: 'blogs.html', page: 'blogs' },
  { label: 'Contact', href: 'contact.html', page: 'contact' }
];
```

### Page State Model

```typescript
interface PageState {
  page: string;  // Current page identifier from data-page attribute
}

// Set via HTML: <body data-page="home">
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Font family consistency

*For any* text element within the header component, the computed font-family should include 'Poppins' as the primary font.

**Validates: Requirements 2.1**

### Property 2: Navigation structure correctness

*For any* navigation item in the navigation menu, the href attribute should match the expected URL pattern where the label corresponds to the page (e.g., "Home" → "index.html", "About" → "about.html").

**Validates: Requirements 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**

### Property 3: Mobile menu toggle round-trip

*For any* initial mobile menu state (open or closed), clicking the toggle button twice should return the menu to its original state.

**Validates: Requirements 6.5**

### Property 4: Active page indication

*For any* page in the website, when that page is loaded, the corresponding navigation item should have the 'active' class applied and display the gold accent color.

**Validates: Requirements 7.1**

### Property 5: Hover state consistency

*For any* navigation menu item, hovering over it should trigger a color transition, and all navigation items should have identical transition properties.

**Validates: Requirements 8.1**

## Error Handling

### Font Loading Failures

**Scenario**: Poppins font files fail to load due to network issues or incorrect paths.

**Handling Strategy**:
- Use `font-display: swap` in @font-face declarations to show fallback fonts immediately
- Define fallback font stack: `'Poppins', system-ui, -apple-system, sans-serif`
- System fonts ensure text remains readable even if Poppins fails to load

**Implementation**:
```css
@font-face {
  font-family: 'Poppins';
  src: url('../fonts/Poppins/Poppins-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Show fallback immediately */
}
```

### Logo Loading Failures

**Scenario**: SVG logo fails to load due to incorrect path or file corruption.

**Handling Strategy**:
- Provide descriptive alt text: "Learn Fatiha Academy"
- Browser will display alt text if image fails to load
- CSS can style the alt text to maintain visual consistency

**Implementation**:
```html
<img src="Logo/logo for header/Logo For Header.svg" 
     alt="Learn Fatiha Academy" 
     class="header-logo"
     onerror="this.style.display='none'">
```

### JavaScript Initialization Failures

**Scenario**: JavaScript fails to load or execute, preventing mobile menu toggle and active state detection.

**Handling Strategy**:
- Ensure mobile menu is accessible via CSS-only fallback (checkbox hack as alternative)
- Use progressive enhancement: header works without JavaScript, enhanced with it
- Active state can be set server-side or via inline script in each HTML page

**Graceful Degradation**:
```html
<!-- Fallback: Each page sets active class directly in HTML -->
<body data-page="home">
  <div id="site-header">
    <nav class="desktop-nav">
      <a href="index.html" class="nav-link active">Home</a>
      <!-- ... -->
    </nav>
  </div>
</body>
```

### Viewport Detection Edge Cases

**Scenario**: Browser reports incorrect viewport width or user resizes during interaction.

**Handling Strategy**:
- Use CSS media queries for layout switching (more reliable than JavaScript)
- Add resize event debouncing to prevent excessive recalculations
- Ensure both desktop and mobile navigation are always in DOM, only visibility changes

**Implementation**:
```javascript
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recalculate layout if needed
  }, 250);
});
```

### Missing data-page Attribute

**Scenario**: HTML page lacks `data-page` attribute, preventing active state detection.

**Handling Strategy**:
- Default to 'home' if attribute is missing
- Log warning to console for debugging
- Extract page from URL pathname as fallback

**Implementation**:
```javascript
function getCurrentPage() {
  const dataPage = document.body.dataset.page;
  if (dataPage) return dataPage;
  
  // Fallback: extract from URL
  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html', '') || 'index';
  console.warn('Missing data-page attribute, inferred:', page);
  return page === 'index' ? 'home' : page;
}
```

## Testing Strategy

### Dual Testing Approach

The header redesign will be validated through both unit tests and property-based tests:

**Unit Tests** focus on:
- Specific examples: Logo links to index.html, navigation contains exactly 7 items
- Edge cases: Missing data-page attribute, viewport at exactly 980px
- Integration points: Header generation in site.js, CSS class application
- Error conditions: Font loading failures, missing logo file

**Property Tests** focus on:
- Universal properties: All text uses Poppins font, all nav items have consistent hover behavior
- Comprehensive input coverage: Testing across all pages for active state, all viewport sizes for responsive behavior
- Randomized scenarios: Random page selection, random viewport widths, random interaction sequences

### Property-Based Testing Configuration

**Library**: fast-check (JavaScript property-based testing library)

**Configuration**:
- Minimum 100 iterations per property test
- Each test references its design document property via comment tag

**Example Property Test Structure**:
```javascript
// Feature: header-redesign, Property 1: Font family consistency
test('all header text elements use Poppins font', () => {
  fc.assert(
    fc.property(fc.constantFrom(...headerTextSelectors), (selector) => {
      const element = document.querySelector(selector);
      const computedFont = window.getComputedStyle(element).fontFamily;
      return computedFont.includes('Poppins');
    }),
    { numRuns: 100 }
  );
});

// Feature: header-redesign, Property 4: Active page indication
test('active page navigation item is highlighted', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('home', 'about', 'courses', 'enroll', 'pdf', 'blogs', 'contact'),
      (page) => {
        document.body.dataset.page = page;
        setActiveNavLink();
        const pageMap = {
          'home': 'index.html',
          'about': 'about.html',
          'courses': 'courses.html',
          'enroll': 'enroll.html',
          'pdf': 'pdf.html',
          'blogs': 'blogs.html',
          'contact': 'contact.html'
        };
        const expectedHref = pageMap[page];
        const activeLink = document.querySelector('.nav-link.active');
        return activeLink && activeLink.getAttribute('href') === expectedHref;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Test Examples

**Logo Integration Tests**:
```javascript
describe('Logo Component', () => {
  test('logo links to home page', () => {
    const logo = document.querySelector('.brand-logo');
    expect(logo.getAttribute('href')).toBe('index.html');
  });

  test('logo maintains aspect ratio', () => {
    const img = document.querySelector('.header-logo');
    const styles = window.getComputedStyle(img);
    expect(styles.width).toBe('auto');
  });

  test('logo has descriptive alt text', () => {
    const img = document.querySelector('.header-logo');
    expect(img.getAttribute('alt')).toBe('Learn Fatiha Academy');
  });
});
```

**Navigation Structure Tests**:
```javascript
describe('Navigation Menu', () => {
  test('contains exactly 7 navigation items', () => {
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
    expect(navLinks.length).toBe(7);
  });

  test('navigation items are in correct order', () => {
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
    const labels = Array.from(navLinks).map(link => link.textContent);
    expect(labels).toEqual(['Home', 'About', 'Courses', 'Enroll', 'PDF', 'Blogs', 'Contact']);
  });
});
```

**Responsive Behavior Tests**:
```javascript
describe('Responsive Layout', () => {
  test('desktop navigation visible at 980px viewport', () => {
    window.innerWidth = 980;
    window.dispatchEvent(new Event('resize'));
    const desktopNav = document.querySelector('.desktop-nav');
    const styles = window.getComputedStyle(desktopNav);
    expect(styles.display).not.toBe('none');
  });

  test('mobile toggle visible at 979px viewport', () => {
    window.innerWidth = 979;
    window.dispatchEvent(new Event('resize'));
    const mobileToggle = document.querySelector('.mobile-toggle');
    const styles = window.getComputedStyle(mobileToggle);
    expect(styles.display).not.toBe('none');
  });

  test('mobile menu hidden by default', () => {
    const mobileNav = document.querySelector('.mobile-nav');
    expect(mobileNav.classList.contains('is-open')).toBe(false);
  });
});
```

**Font Loading Tests**:
```javascript
describe('Poppins Font', () => {
  test('font-face declarations exist for required weights', () => {
    const fontFaces = Array.from(document.fonts);
    const poppinsFonts = fontFaces.filter(f => f.family === 'Poppins');
    const weights = poppinsFonts.map(f => f.weight);
    expect(weights).toContain('400');
    expect(weights).toContain('500');
    expect(weights).toContain('600');
    expect(weights).toContain('700');
  });

  test('font files load from correct path', async () => {
    const fontFace = new FontFace('Poppins', 'url(../fonts/Poppins/Poppins-Regular.ttf)');
    await expect(fontFace.load()).resolves.toBeDefined();
  });
});
```

### Testing Coverage Goals

- **Unit Tests**: 90%+ code coverage for header-related JavaScript functions
- **Property Tests**: 100% coverage of identified correctness properties
- **Integration Tests**: Verify header renders correctly on all 7 pages
- **Visual Regression Tests**: Screenshot comparison for desktop and mobile layouts
- **Accessibility Tests**: ARIA labels, keyboard navigation, screen reader compatibility

### Manual Testing Checklist

- [ ] Logo displays correctly and links to home page
- [ ] All 7 navigation items are present and link to correct pages
- [ ] Active page is highlighted with gold color
- [ ] Hover effects work on all navigation items
- [ ] Desktop layout displays at 980px+ viewport
- [ ] Mobile layout displays at <980px viewport
- [ ] Mobile menu toggle opens and closes menu
- [ ] Header remains fixed during page scroll
- [ ] Poppins font loads and displays correctly
- [ ] Header works in Chrome, Firefox, Safari, and Edge
- [ ] Header is accessible via keyboard navigation
- [ ] Header works with JavaScript disabled (graceful degradation)
