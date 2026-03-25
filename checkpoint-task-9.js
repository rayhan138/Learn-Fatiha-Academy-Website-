/**
 * Task 9 Checkpoint: Comprehensive Verification
 * Verifies all completed tasks (1-8) meet their requirements
 */

const fs = require('fs');
const path = require('path');

// Read files
const cssPath = path.join(__dirname, 'assets', 'css', 'style.css');
const jsPath = path.join(__dirname, 'assets', 'js', 'site.js');
const cssContent = fs.readFileSync(cssPath, 'utf-8');
const jsContent = fs.readFileSync(jsPath, 'utf-8');

// Test results
const results = {
  passed: [],
  failed: []
};

function addPass(task, message) {
  results.passed.push({ task, message });
}

function addFail(task, message) {
  results.failed.push({ task, message });
}

console.log('='.repeat(70));
console.log('TASK 9 CHECKPOINT: Comprehensive Verification');
console.log('='.repeat(70));
console.log('');

// ============================================================================
// TASK 1: Poppins Font Integration
// ============================================================================
console.log('Task 1: Poppins Font Integration');
console.log('-'.repeat(70));

// Check @font-face declarations
const fontFaceRegular = /@font-face\s*\{[^}]*font-family:\s*['"]Poppins['"][^}]*font-weight:\s*400/s;
const fontFaceMedium = /@font-face\s*\{[^}]*font-family:\s*['"]Poppins['"][^}]*font-weight:\s*500/s;
const fontFaceSemiBold = /@font-face\s*\{[^}]*font-family:\s*['"]Poppins['"][^}]*font-weight:\s*600/s;
const fontFaceBold = /@font-face\s*\{[^}]*font-family:\s*['"]Poppins['"][^}]*font-weight:\s*700/s;

if (fontFaceRegular.test(cssContent)) {
  addPass('1.1', 'Poppins Regular (400) @font-face declaration exists');
} else {
  addFail('1.1', 'Missing Poppins Regular (400) @font-face declaration');
}

if (fontFaceMedium.test(cssContent)) {
  addPass('1.2', 'Poppins Medium (500) @font-face declaration exists');
} else {
  addFail('1.2', 'Missing Poppins Medium (500) @font-face declaration');
}

if (fontFaceSemiBold.test(cssContent)) {
  addPass('1.3', 'Poppins SemiBold (600) @font-face declaration exists');
} else {
  addFail('1.3', 'Missing Poppins SemiBold (600) @font-face declaration');
}

if (fontFaceBold.test(cssContent)) {
  addPass('1.4', 'Poppins Bold (700) @font-face declaration exists');
} else {
  addFail('1.4', 'Missing Poppins Bold (700) @font-face declaration');
}

// Check font-display: swap
const fontDisplaySwap = /@font-face\s*\{[^}]*font-display:\s*swap/s;
if (fontDisplaySwap.test(cssContent)) {
  addPass('1.5', 'font-display: swap is used for optimal loading');
} else {
  addFail('1.5', 'Missing font-display: swap');
}

// Check --font-header variable
const fontHeaderVar = /--font-header:\s*['"]?Poppins['"]?/;
if (fontHeaderVar.test(cssContent)) {
  addPass('1.6', '--font-header CSS variable uses Poppins');
} else {
  addFail('1.6', '--font-header CSS variable does not use Poppins');
}

console.log('');

// ============================================================================
// TASK 2: Logo Integration
// ============================================================================
console.log('Task 2: Logo Integration');
console.log('-'.repeat(70));

// Check logo in JavaScript
const logoHtml = /brand-logo.*Logo For Header\.svg.*Learn Fatiha Academy/s;
if (logoHtml.test(jsContent)) {
  addPass('2.1', 'Logo HTML structure exists in site.js');
} else {
  addFail('2.1', 'Logo HTML structure missing in site.js');
}

// Check logo links to index.html
const logoLink = /<a href="index\.html" class="brand-logo">/;
if (logoLink.test(jsContent)) {
  addPass('2.2', 'Logo links to index.html');
} else {
  addFail('2.2', 'Logo does not link to index.html');
}

// Check alt text
const logoAlt = /alt="Learn Fatiha Academy"/;
if (logoAlt.test(jsContent)) {
  addPass('2.3', 'Logo has descriptive alt text');
} else {
  addFail('2.3', 'Logo missing descriptive alt text');
}

console.log('');

// ============================================================================
// TASK 3: CSS Styling for Logo
// ============================================================================
console.log('Task 3: CSS Styling for Logo');
console.log('-'.repeat(70));

// Check .brand-logo styles
const brandLogoStyles = /\.brand-logo\s*\{[^}]*display:\s*inline-flex[^}]*align-items:\s*center/s;
if (brandLogoStyles.test(cssContent)) {
  addPass('3.1', '.brand-logo has inline-flex display and center alignment');
} else {
  addFail('3.1', '.brand-logo missing correct display/alignment styles');
}

// Check .header-logo styles
const headerLogoHeight = /\.header-logo\s*\{[^}]*height:\s*50px/s;
const headerLogoWidth = /\.header-logo\s*\{[^}]*width:\s*auto/s;
if (headerLogoHeight.test(cssContent) && headerLogoWidth.test(cssContent)) {
  addPass('3.2', '.header-logo has height: 50px and width: auto');
} else {
  addFail('3.2', '.header-logo missing correct dimensions');
}

// Check logo hover transition
const logoTransition = /\.brand-logo\s*\{[^}]*transition:[^}]*0\.25s\s+ease/s;
if (logoTransition.test(cssContent)) {
  addPass('3.3', 'Logo has 0.25s ease transition');
} else {
  addFail('3.3', 'Logo missing transition effect');
}

console.log('');

// ============================================================================
// TASK 4: Navigation Menu Structure
// ============================================================================
console.log('Task 4: Navigation Menu Structure');
console.log('-'.repeat(70));

// Check navigation items array
const navItems = [
  { label: 'Home', href: 'index.html', key: 'home' },
  { label: 'About', href: 'about.html', key: 'about' },
  { label: 'Courses', href: 'courses.html', key: 'courses' },
  { label: 'Enroll', href: 'enroll.html', key: 'enroll' },
  { label: 'PDF', href: 'pdf.html', key: 'pdf' },
  { label: 'Blogs', href: 'blogs.html', key: 'blogs' },
  { label: 'Contact', href: 'contact.html', key: 'contact' }
];

let allNavItemsPresent = true;
navItems.forEach(item => {
  const pattern = new RegExp(`label:\\s*["']${item.label}["'].*href:\\s*["']${item.href}["']`, 's');
  if (!pattern.test(jsContent)) {
    allNavItemsPresent = false;
    addFail('4.1', `Navigation item "${item.label}" → "${item.href}" not found`);
  }
});

if (allNavItemsPresent) {
  addPass('4.1', 'All 7 navigation items present with correct hrefs');
}

// Check buildNav function exists
if (jsContent.includes('function buildNav')) {
  addPass('4.2', 'buildNav function exists');
} else {
  addFail('4.2', 'buildNav function missing');
}

console.log('');

// ============================================================================
// TASK 5: Typography with Poppins
// ============================================================================
console.log('Task 5: Typography with Poppins');
console.log('-'.repeat(70));

// Check navigation links use Poppins
const navLinkFont = /\.nav-link,\s*\.mobile-nav-link\s*\{[^}]*font-family:\s*var\(--font-header\)/s;
if (navLinkFont.test(cssContent)) {
  addPass('5.1', 'Navigation links use var(--font-header) for Poppins font');
} else {
  addFail('5.1', 'Navigation links do not use Poppins font');
}

// Check text color
const navLinkColor = /\.nav-link,\s*\.mobile-nav-link\s*\{[^}]*color:\s*var\(--muted\)/s;
if (navLinkColor.test(cssContent)) {
  addPass('5.2', 'Navigation links have sufficient contrast color');
} else {
  addFail('5.2', 'Navigation links missing proper color');
}

console.log('');

// ============================================================================
// TASK 6: Active Page Detection
// ============================================================================
console.log('Task 6: Active Page Detection');
console.log('-'.repeat(70));

// Check data-page attribute reading
if (jsContent.includes('document.body.dataset.page')) {
  addPass('6.1', 'data-page attribute is read from document.body');
} else {
  addFail('6.1', 'data-page attribute not being read');
}

// Check active class application
if (jsContent.includes('classList.add("active")')) {
  addPass('6.2', 'Active class is applied to matching navigation items');
} else {
  addFail('6.2', 'Active class not being applied');
}

// Check gold color for active items
const activeGoldColor = /\.nav-link\.active,\s*\.mobile-nav-link\.active\s*\{[^}]*color:\s*var\(--gold\)/s;
if (activeGoldColor.test(cssContent)) {
  addPass('6.3', 'Active items display gold accent color');
} else {
  addFail('6.3', 'Active items missing gold color');
}

console.log('');

// ============================================================================
// TASK 7: Mobile Menu Toggle
// ============================================================================
console.log('Task 7: Mobile Menu Toggle');
console.log('-'.repeat(70));

// Check toggle button exists
if (jsContent.includes('mobile-toggle')) {
  addPass('7.1', 'Mobile toggle button exists');
} else {
  addFail('7.1', 'Mobile toggle button missing');
}

// Check is-open class toggle
if (jsContent.includes('classList.toggle("is-open")')) {
  addPass('7.2', 'is-open class is toggled on click');
} else {
  addFail('7.2', 'is-open class toggle missing');
}

// Check menu-open body class
if (jsContent.includes('"menu-open"') && jsContent.includes('body.classList')) {
  addPass('7.3', 'menu-open body class is toggled');
} else {
  addFail('7.3', 'menu-open body class toggle missing');
}

// Check aria-expanded attribute
if (jsContent.includes('setAttribute("aria-expanded"')) {
  addPass('7.4', 'aria-expanded attribute updates correctly');
} else {
  addFail('7.4', 'aria-expanded attribute not being updated');
}

console.log('');

// ============================================================================
// TASK 8: Hover Effects and Transitions
// ============================================================================
console.log('Task 8: Hover Effects and Transitions');
console.log('-'.repeat(70));

// Check navigation link transitions
const navTransition = /\.nav-link,\s*\.mobile-nav-link\s*\{[^}]*transition:\s*color\s+0\.25s\s+ease,\s*background-color\s+0\.25s\s+ease/s;
if (navTransition.test(cssContent)) {
  addPass('8.1', 'Navigation links have correct transition properties');
} else {
  addFail('8.1', 'Navigation links missing correct transitions');
}

// Check consistent timing
const consistentTiming = /0\.25s\s+ease/g;
const timingMatches = cssContent.match(consistentTiming);
if (timingMatches && timingMatches.length >= 3) {
  addPass('8.2', 'Consistent 0.25s ease transitions across elements');
} else {
  addFail('8.2', 'Inconsistent transition timing');
}

// Check logo hover effect
const logoHover = /\.brand-logo:hover\s*\{[^}]*opacity:\s*0\.8/s;
if (logoHover.test(cssContent)) {
  addPass('8.3', 'Logo has opacity hover effect');
} else {
  addFail('8.3', 'Logo missing hover effect');
}

// Check hover color changes
const hoverColor = /\.nav-link:hover,\s*\.mobile-nav-link:hover\s*\{[^}]*color:\s*#fff/s;
if (hoverColor.test(cssContent)) {
  addPass('8.4', 'Hover color changes from muted to white');
} else {
  addFail('8.4', 'Hover color change missing');
}

console.log('');

// ============================================================================
// SUMMARY
// ============================================================================
console.log('='.repeat(70));
console.log('SUMMARY');
console.log('='.repeat(70));
console.log('');

if (results.failed.length > 0) {
  console.log('FAILED TESTS:');
  console.log('-'.repeat(70));
  results.failed.forEach(({ task, message }) => {
    console.log(`✗ ${task}: ${message}`);
  });
  console.log('');
}

console.log('PASSED TESTS:');
console.log('-'.repeat(70));
results.passed.forEach(({ task, message }) => {
  console.log(`✓ ${task}: ${message}`);
});
console.log('');

console.log('='.repeat(70));
const totalTests = results.passed.length + results.failed.length;
const passRate = ((results.passed.length / totalTests) * 100).toFixed(1);
console.log(`RESULT: ${results.passed.length}/${totalTests} tests passed (${passRate}%)`);
console.log('='.repeat(70));

if (results.failed.length > 0) {
  console.log('');
  console.log('⚠️  Some tests failed. Please review the failed tests above.');
  process.exit(1);
} else {
  console.log('');
  console.log('✅ All tests passed! Ready to proceed to Task 10.');
  process.exit(0);
}
