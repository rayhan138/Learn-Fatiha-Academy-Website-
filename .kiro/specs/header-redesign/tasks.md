# Implementation Plan: Header Redesign

## Overview

This implementation plan transforms the Learn Fatiha Academy header from a text-based brand to a logo-based navigation with Poppins typography. The work involves modifying existing CSS in `assets/css/style.css` and updating the header generation logic in `assets/js/site.js` while maintaining backward compatibility with the current dark theme and responsive behavior.

## Tasks

- [x] 1. Add Poppins font @font-face declarations to CSS
  - Add @font-face declarations for Poppins Regular (400), Medium (500), SemiBold (600), and Bold (700) weights
  - Set font paths to `../fonts/Poppins/` directory
  - Use `font-display: swap` for optimal loading performance
  - Update CSS custom property `--font-header` to use Poppins as primary font
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]* 1.1 Write property test for Poppins font loading
  - **Property 1: Font family consistency**
  - **Validates: Requirements 2.1**

- [x] 2. Update header HTML structure with logo integration
  - Modify `buildNav` function in `assets/js/site.js` to maintain current navigation structure
  - Replace `.brand` text element with `.brand-logo` link containing logo image
  - Set logo image source to `Logo/logo for header/Logo For Header.svg`
  - Add descriptive alt text "Learn Fatiha Academy" to logo image
  - Ensure logo links to `index.html`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 2.1 Write unit tests for logo component
  - Test logo links to home page
  - Test logo has correct alt text
  - Test logo image source path is correct
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 3. Update CSS styling for logo component
  - Add `.brand-logo` styles with inline-flex display and center alignment
  - Add `.header-logo` styles with height of 50px and auto width for aspect ratio
  - Add hover transition effect with 0.25s ease timing
  - Ensure logo is visible against dark background
  - _Requirements: 1.3, 1.4, 8.2_

- [x] 4. Verify and update navigation menu structure
  - Confirm navigation items array in `assets/js/site.js` contains all 7 items in correct order
  - Ensure navigation items use correct href values (Home→index.html, About→about.html, etc.)
  - Verify both desktop and mobile navigation use the same navigation data
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [ ]* 4.1 Write property test for navigation structure
  - **Property 2: Navigation structure correctness**
  - **Validates: Requirements 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**

- [ ]* 4.2 Write unit tests for navigation menu
  - Test navigation contains exactly 7 items
  - Test navigation items are in correct order
  - Test each navigation item has correct href attribute
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 5. Update header typography to use Poppins font
  - Apply Poppins font family to `.nav-link` and `.mobile-nav-link` classes
  - Ensure text color provides sufficient contrast against dark background
  - Verify font rendering across navigation elements
  - _Requirements: 2.1, 2.4, 4.2, 4.3_

- [x] 6. Enhance active page detection logic
  - Review existing active state logic in `assets/js/site.js`
  - Ensure `data-page` attribute is correctly read from document.body
  - Verify active class is applied to matching navigation items
  - Ensure gold accent color (--gold) is applied to active items
  - _Requirements: 7.1, 7.2, 7.3_

- [ ]* 6.1 Write property test for active page indication
  - **Property 4: Active page indication**
  - **Validates: Requirements 7.1**

- [ ]* 6.2 Write unit tests for active state detection
  - Test active class is applied when data-page matches navigation item
  - Test only one navigation item has active class at a time
  - Test active item displays gold color
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 7. Verify mobile menu toggle functionality
  - Review existing mobile toggle logic in `assets/js/site.js`
  - Ensure toggle button adds/removes `is-open` class on click
  - Verify mobile navigation expands and collapses correctly
  - Ensure body class `menu-open` is toggled appropriately
  - Test aria-expanded attribute updates correctly
  - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [ ]* 7.1 Write property test for mobile menu toggle
  - **Property 3: Mobile menu toggle round-trip**
  - **Validates: Requirements 6.5**

- [ ]* 7.2 Write unit tests for mobile menu interactions
  - Test toggle button click opens mobile menu
  - Test second toggle button click closes mobile menu
  - Test clicking navigation link closes mobile menu
  - Test body overflow is hidden when menu is open
  - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [x] 8. Update hover effects and transitions
  - Verify existing hover transitions on `.nav-link` and `.mobile-nav-link`
  - Ensure all navigation items have consistent 0.25s ease transitions
  - Add hover effect to logo with opacity transition
  - Test hover color changes from muted to white
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ]* 8.1 Write property test for hover state consistency
  - **Property 5: Hover state consistency**
  - **Validates: Requirements 8.1**

- [ ]* 8.2 Write unit tests for hover interactions
  - Test navigation item color changes on hover
  - Test logo opacity changes on hover
  - Test transition timing is consistent across elements
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Verify responsive layout behavior
  - Test desktop layout displays at 980px+ viewport width
  - Test mobile layout displays at <980px viewport width
  - Verify logo and navigation positioning in both layouts
  - Ensure mobile toggle button only appears in mobile layout
  - Test layout transitions smoothly when resizing viewport
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2_

- [ ]* 10.1 Write unit tests for responsive behavior
  - Test desktop navigation is visible at 980px+ viewport
  - Test mobile toggle is visible at <980px viewport
  - Test navigation items are horizontal in desktop layout
  - Test navigation items are vertical in mobile layout
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2_

- [x] 11. Verify header positioning and accessibility
  - Confirm header uses fixed positioning at top of viewport
  - Test header remains visible during page scroll
  - Verify header doesn't overlap page content
  - Check aria-label attributes on navigation elements
  - Test keyboard navigation through menu items
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ]* 11.1 Write unit tests for header positioning
  - Test header has fixed position
  - Test header z-index ensures it stays on top
  - Test header maintains spacing from viewport top
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 12. Cross-browser compatibility verification
  - Test header rendering in Chrome
  - Test header rendering in Firefox
  - Test header rendering in Safari
  - Test header rendering in Edge
  - Verify Poppins font loads correctly in all browsers
  - Test all interactive features work across browsers
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The implementation modifies existing files rather than creating new ones
- All changes maintain backward compatibility with the current dark theme
