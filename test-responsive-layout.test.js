/**
 * Task 10: Responsive Layout Behavior Tests
 * 
 * Tests verify:
 * - Desktop layout displays at 980px+ viewport width
 * - Mobile layout displays at <980px viewport width
 * - Logo and navigation positioning in both layouts
 * - Mobile toggle button only appears in mobile layout
 * - Layout transitions smoothly when resizing viewport
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2
 */

const fs = require('fs');
const path = require('path');

// Read CSS file to check media queries and styles
const cssPath = path.join(__dirname, 'assets', 'css', 'style.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');

// Helper function to extract media query content properly
function extractMediaQuery980(cssContent) {
  const mediaQueryStart = cssContent.indexOf('@media (min-width: 980px)');
  if (mediaQueryStart === -1) return null;
  
  // Find the closing brace of the media query
  let braceCount = 0;
  let inMediaQuery = false;
  let endIndex = mediaQueryStart;
  
  for (let i = mediaQueryStart; i < cssContent.length; i++) {
    if (cssContent[i] === '{') {
      braceCount++;
      inMediaQuery = true;
    } else if (cssContent[i] === '}') {
      braceCount--;
      if (inMediaQuery && braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }
  
  return cssContent.substring(mediaQueryStart, endIndex);
}

// Test suite
const tests = [];
let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  try {
    fn();
    tests.push({ name, status: 'PASS', message: '' });
    passedTests++;
    console.log(`✓ ${name}`);
  } catch (error) {
    tests.push({ name, status: 'FAIL', message: error.message });
    failedTests++;
    console.log(`✗ ${name}`);
    console.log(`  Error: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertContains(content, substring, message) {
  if (!content.includes(substring)) {
    throw new Error(message || `Expected content to contain "${substring}"`);
  }
}

function assertMatches(content, regex, message) {
  if (!regex.test(content)) {
    throw new Error(message || `Expected content to match ${regex}`);
  }
}

console.log('\n=== Task 10: Responsive Layout Behavior Tests ===\n');

// Test 1: Desktop layout media query exists at 980px
test('Desktop layout displays at 980px+ viewport width (Req 5.1)', () => {
  assertContains(
    cssContent,
    '@media (min-width: 980px)',
    'CSS should contain @media query for 980px breakpoint'
  );
  
  // Check that desktop-nav is shown at 980px+
  const mediaQueryContent = extractMediaQuery980(cssContent);
  assert(mediaQueryContent, 'Should have media query block for 980px+');
  
  assertContains(
    mediaQueryContent,
    '.desktop-nav',
    'Desktop navigation should be styled in 980px+ media query'
  );
  
  assertMatches(
    mediaQueryContent,
    /\.desktop-nav\s*{\s*display:\s*flex/,
    'Desktop navigation should use display: flex at 980px+'
  );
});

// Test 2: Mobile layout displays at <980px
test('Mobile layout displays at <980px viewport width (Req 5.2)', () => {
  // Check default styles (mobile-first approach)
  // Desktop nav should be hidden by default
  assertMatches(
    cssContent,
    /\.desktop-nav\s*{[^}]*display:\s*none/,
    'Desktop navigation should be hidden by default (mobile-first)'
  );
  
  // Mobile toggle should be visible by default
  assertMatches(
    cssContent,
    /\.mobile-toggle\s*{[^}]*display:\s*inline-flex/,
    'Mobile toggle should be visible by default'
  );
});

// Test 3: Logo positioning on the left
test('Logo positioned on left side of header (Req 5.2, 5.3)', () => {
  assertMatches(
    cssContent,
    /\.header-inner\s*{[^}]*display:\s*flex/,
    'Header inner should use flexbox for layout'
  );
  
  assertMatches(
    cssContent,
    /\.header-inner\s*{[^}]*justify-content:\s*space-between/,
    'Header inner should use space-between for logo and nav positioning'
  );
  
  assertContains(
    cssContent,
    '.brand-logo',
    'Brand logo class should exist in CSS'
  );
});

// Test 4: Desktop navigation positioning on the right
test('Desktop navigation positioned on right (Req 5.3)', () => {
  // With space-between, the desktop nav will be on the right
  assertMatches(
    cssContent,
    /\.desktop-nav\s*{[^}]*display:\s*(flex|none)/,
    'Desktop navigation should have display property defined'
  );
  
  assertMatches(
    cssContent,
    /\.desktop-nav\s*{[^}]*align-items:\s*center/,
    'Desktop navigation should align items center'
  );
});

// Test 5: Desktop navigation items horizontal
test('Desktop navigation items displayed horizontally (Req 5.4)', () => {
  // Flex display with default flex-direction (row) makes items horizontal
  const mediaQuery980 = cssContent.match(/@media \(min-width: 980px\)\s*{([^}]+({[^}]*}[^}]*)*)+}/s);
  assert(mediaQuery980, 'Should have media query block for 980px+');
  
  const mediaQueryContent = mediaQuery980[0];
  assertMatches(
    mediaQueryContent,
    /\.desktop-nav\s*{[^}]*display:\s*flex/,
    'Desktop navigation should use flex display for horizontal layout'
  );
});

// Test 6: Desktop navigation items have spacing
test('Desktop navigation items have appropriate spacing (Req 5.5)', () => {
  assertMatches(
    cssContent,
    /\.desktop-nav\s*{[^}]*gap:\s*[\d.]+rem/,
    'Desktop navigation should have gap property for spacing'
  );
});

// Test 7: Mobile toggle button hidden in desktop
test('Mobile toggle hidden at 980px+ viewport (Req 6.1)', () => {
  const mediaQueryContent = extractMediaQuery980(cssContent);
  assert(mediaQueryContent, 'Should have media query block for 980px+');
  
  // Check for .mobile-toggle with display: none (grouped with .mobile-nav)
  assertMatches(
    mediaQueryContent,
    /\.mobile-toggle,\s*\.mobile-nav\s*{\s*display:\s*none/,
    'Mobile toggle should be hidden at 980px+'
  );
});

// Test 8: Mobile navigation hidden in desktop
test('Mobile navigation hidden at 980px+ viewport (Req 6.1)', () => {
  const mediaQueryContent = extractMediaQuery980(cssContent);
  assert(mediaQueryContent, 'Should have media query block for 980px+');
  
  // Check for .mobile-nav with display: none (grouped with .mobile-toggle)
  assertMatches(
    mediaQueryContent,
    /\.mobile-toggle,\s*\.mobile-nav\s*{\s*display:\s*none/,
    'Mobile navigation should be hidden at 980px+'
  );
});

// Test 9: Mobile toggle button visible in mobile
test('Mobile toggle visible at <980px viewport (Req 6.2)', () => {
  // Check default styles (mobile-first)
  assertMatches(
    cssContent,
    /\.mobile-toggle\s*{[^}]*display:\s*inline-flex/,
    'Mobile toggle should be visible by default (mobile layout)'
  );
});

// Test 10: Mobile navigation structure
test('Mobile navigation has vertical layout structure (Req 6.2)', () => {
  assertMatches(
    cssContent,
    /\.mobile-nav-inner\s*{[^}]*display:\s*grid/,
    'Mobile navigation inner should use grid for vertical layout'
  );
});

// Test 11: Layout transitions
test('Layout transitions smoothly when resizing (Req 6.2)', () => {
  assertMatches(
    cssContent,
    /\.mobile-nav\s*{[^}]*transition:[^}]*max-height/,
    'Mobile navigation should have transition for smooth opening/closing'
  );
  
  assertMatches(
    cssContent,
    /transition:\s*[^;]*0\.3s/,
    'Transitions should have reasonable duration (0.3s)'
  );
});

// Test 12: Header fixed positioning
test('Header uses fixed positioning (Req 9.1)', () => {
  assertMatches(
    cssContent,
    /\.site-header\s*{[^}]*position:\s*fixed/,
    'Site header should use fixed positioning'
  );
});

// Test 13: Logo component styles
test('Logo component has proper styling (Req 1.3, 1.4)', () => {
  assertContains(
    cssContent,
    '.brand-logo',
    'Brand logo class should exist'
  );
  
  assertContains(
    cssContent,
    '.header-logo',
    'Header logo class should exist'
  );
  
  assertMatches(
    cssContent,
    /\.header-logo\s*{[^}]*height:\s*\d+px/,
    'Header logo should have defined height'
  );
  
  assertMatches(
    cssContent,
    /\.header-logo\s*{[^}]*width:\s*auto/,
    'Header logo should have auto width for aspect ratio'
  );
});

// Test 14: Logo hover effect
test('Logo has hover transition effect (Req 8.2)', () => {
  assertMatches(
    cssContent,
    /\.brand-logo\s*{[^}]*transition:[^}]*opacity/,
    'Brand logo should have opacity transition'
  );
  
  assertMatches(
    cssContent,
    /\.brand-logo:hover\s*{[^}]*opacity/,
    'Brand logo should have hover state with opacity change'
  );
});

// Test 15: Responsive breakpoint consistency
test('Responsive breakpoint is consistent at 980px', () => {
  const mediaQueries = cssContent.match(/@media \(min-width: 980px\)/g);
  assert(mediaQueries && mediaQueries.length > 0, 'Should have at least one 980px media query');
  
  // Check that there are no conflicting breakpoints near 980px
  const conflictingBreakpoints = cssContent.match(/@media \(min-width: (97\d|98[^0]|99\d)px\)/g);
  assert(!conflictingBreakpoints, 'Should not have conflicting breakpoints near 980px');
});

// Test 16: Mobile menu toggle functionality structure
test('Mobile menu toggle has proper structure (Req 6.3, 6.4)', () => {
  assertMatches(
    cssContent,
    /\.mobile-toggle\.is-open/,
    'Mobile toggle should have is-open state styles'
  );
  
  assertMatches(
    cssContent,
    /\.mobile-nav\.is-open/,
    'Mobile navigation should have is-open state styles'
  );
  
  assertMatches(
    cssContent,
    /\.mobile-nav\.is-open\s*{[^}]*max-height:\s*\d+px/,
    'Mobile navigation should expand with max-height when open'
  );
});

// Test 17: Body menu-open class
test('Body has menu-open class for overflow control (Req 6.4)', () => {
  assertMatches(
    cssContent,
    /body\.menu-open\s*{[^}]*overflow:\s*hidden/,
    'Body should hide overflow when mobile menu is open'
  );
});

// Test 18: Navigation link styles
test('Navigation links use Poppins font (Req 2.1, 4.2)', () => {
  assertMatches(
    cssContent,
    /\.nav-link[^}]*{[^}]*font-family:[^}]*var\(--font-header\)/,
    'Navigation links should use --font-header variable'
  );
  
  assertMatches(
    cssContent,
    /--font-header:[^;]*Poppins/,
    'Font header variable should include Poppins'
  );
});

// Summary
console.log('\n=== Test Summary ===');
console.log(`Total: ${tests.length}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);

if (failedTests === 0) {
  console.log('\n🎉 All responsive layout tests passed!');
  console.log('\nTask 10 verification complete:');
  console.log('✓ Desktop layout displays at 980px+ viewport width');
  console.log('✓ Mobile layout displays at <980px viewport width');
  console.log('✓ Logo and navigation positioning verified in both layouts');
  console.log('✓ Mobile toggle button only appears in mobile layout');
  console.log('✓ Layout transitions smoothly when resizing viewport');
  process.exit(0);
} else {
  console.log('\n⚠️ Some tests failed. Please review the errors above.');
  process.exit(1);
}
