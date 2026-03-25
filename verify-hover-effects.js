/**
 * Task 8 Verification Script
 * Verifies hover effects and transitions in assets/css/style.css
 */

const fs = require('fs');
const path = require('path');

// Read the CSS file
const cssPath = path.join(__dirname, 'assets', 'css', 'style.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');

// Test results
const results = {
  passed: [],
  failed: []
};

function addPass(test, message) {
  results.passed.push({ test, message });
}

function addFail(test, message) {
  results.failed.push({ test, message });
}

// Test 8.1: Verify hover transitions on .nav-link and .mobile-nav-link
function test_8_1() {
  const navLinkPattern = /\.nav-link,\s*\.mobile-nav-link\s*\{[^}]*transition:\s*color\s+0\.25s\s+ease,\s*background-color\s+0\.25s\s+ease/s;
  
  if (navLinkPattern.test(cssContent)) {
    addPass('8.1', 'Navigation links have correct transition properties (color 0.25s ease, background-color 0.25s ease)');
  } else {
    addFail('8.1', 'Navigation links missing correct transition properties');
  }
}

// Test 8.2: Ensure consistent 0.25s ease transitions
function test_8_2() {
  // Check for .nav-link and .mobile-nav-link
  const navTransitionPattern = /\.nav-link,\s*\.mobile-nav-link\s*\{[^}]*transition:[^}]*0\.25s\s+ease/s;
  
  // Check for .brand-logo
  const logoTransitionPattern = /\.brand-logo\s*\{[^}]*transition:[^}]*0\.25s\s+ease/s;
  
  const navHasConsistentTiming = navTransitionPattern.test(cssContent);
  const logoHasConsistentTiming = logoTransitionPattern.test(cssContent);
  
  if (navHasConsistentTiming && logoHasConsistentTiming) {
    addPass('8.2', 'All navigation items have consistent 0.25s ease transitions');
  } else {
    if (!navHasConsistentTiming) {
      addFail('8.2', 'Navigation links do not have consistent 0.25s ease timing');
    }
    if (!logoHasConsistentTiming) {
      addFail('8.2', 'Logo does not have consistent 0.25s ease timing');
    }
  }
}

// Test 8.3: Logo hover effect with opacity transition
function test_8_3() {
  const logoTransitionPattern = /\.brand-logo\s*\{[^}]*transition:\s*opacity\s+0\.25s\s+ease/s;
  const logoHoverPattern = /\.brand-logo:hover\s*\{[^}]*opacity:\s*0\.8/s;
  
  const hasTransition = logoTransitionPattern.test(cssContent);
  const hasHoverEffect = logoHoverPattern.test(cssContent);
  
  if (hasTransition && hasHoverEffect) {
    addPass('8.3', 'Logo has opacity transition (0.25s ease) and hover effect (opacity: 0.8)');
  } else {
    if (!hasTransition) {
      addFail('8.3', 'Logo missing opacity transition');
    }
    if (!hasHoverEffect) {
      addFail('8.3', 'Logo missing hover effect');
    }
  }
}

// Test 8.4: Hover color changes from muted to white
function test_8_4() {
  // Check default color is var(--muted)
  const defaultColorPattern = /\.nav-link,\s*\.mobile-nav-link\s*\{[^}]*color:\s*var\(--muted\)/s;
  
  // Check hover color is #fff
  const hoverColorPattern = /\.nav-link:hover,\s*\.mobile-nav-link:hover\s*\{[^}]*color:\s*#fff/s;
  
  // Check active color is var(--gold)
  const activeColorPattern = /\.nav-link\.active,\s*\.mobile-nav-link\.active\s*\{[^}]*color:\s*var\(--gold\)/s;
  
  const hasDefaultColor = defaultColorPattern.test(cssContent);
  const hasHoverColor = hoverColorPattern.test(cssContent);
  const hasActiveColor = activeColorPattern.test(cssContent);
  
  if (hasDefaultColor && hasHoverColor && hasActiveColor) {
    addPass('8.4', 'Navigation items have correct color transitions: muted → white (hover) → gold (active)');
  } else {
    if (!hasDefaultColor) {
      addFail('8.4', 'Navigation items missing default muted color');
    }
    if (!hasHoverColor) {
      addFail('8.4', 'Navigation items missing hover white color');
    }
    if (!hasActiveColor) {
      addFail('8.4', 'Navigation items missing active gold color');
    }
  }
}

// Run all tests
console.log('='.repeat(60));
console.log('Task 8: Hover Effects and Transitions Verification');
console.log('='.repeat(60));
console.log('');

test_8_1();
test_8_2();
test_8_3();
test_8_4();

// Display results
console.log('PASSED TESTS:');
console.log('-'.repeat(60));
results.passed.forEach(({ test, message }) => {
  console.log(`✓ ${test}: ${message}`);
});

console.log('');

if (results.failed.length > 0) {
  console.log('FAILED TESTS:');
  console.log('-'.repeat(60));
  results.failed.forEach(({ test, message }) => {
    console.log(`✗ ${test}: ${message}`);
  });
  console.log('');
  console.log(`RESULT: ${results.failed.length} test(s) failed`);
  process.exit(1);
} else {
  console.log('='.repeat(60));
  console.log(`RESULT: All tests passed! (${results.passed.length}/${results.passed.length})`);
  console.log('='.repeat(60));
  process.exit(0);
}
