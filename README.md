# Sharon Ngetich Portfolio Website

A modern, responsive, and accessible portfolio landing page with animated skill progress bars, dark/light theme toggle, and stylish micro-interactions.

## 🎯 What Changed

### Major Enhancements

1. **Dark/Light Theme Toggle**
   - Persistent theme selection using `localStorage`
   - Respects system preference (`prefers-color-scheme`) by default
   - Smooth theme transitions across all components
   - Accessible toggle button with ARIA labels in navigation

2. **Animated Skill Progress Bars**
   - Six core proficiency bars with animated fill and numeric counters
   - Intersection Observer API triggers animation when scrolling into view
   - GPU-optimized animations using `transform: scaleX()`
   - Accessible with `role="progressbar"` and ARIA attributes

3. **Modern Entrance Animations**
   - Staggered fade-in/slide-up animations for hero section
   - Smooth entrance effects for cards and project tiles
   - GPU-friendly using `transform` and `opacity`

4. **Micro-Interactions**
   - Hover lift effect on cards
   - Scale effect on button press
   - Enhanced focus rings for keyboard navigation
   - Smooth color transitions

5. **Improved Accessibility**
   - All interactive elements keyboard-accessible
   - ARIA labels and roles for screen readers
   - High contrast ratios meeting WCAG AA
   - Focus indicators on all interactive elements
   - Mobile menu with proper ARIA attributes

6. **Mobile-First Responsive Design**
   - Optimized for all screen sizes using Tailwind breakpoints
   - Mobile-friendly navigation with theme toggle
   - Touch-friendly buttons and links

## 📁 File Structure

```
ngetichportfolio2025/
├── index.html              # Main HTML file with enhanced markup
├── assets/
│   └── app.js              # JavaScript for theme, skills, and interactions
├── README.md               # This file
├── sharon-profile.jpg      # Profile image
└── [PDF files]             # Project reports and CV/Resume
```

## 🚀 How to Test Locally

### Basic Testing

1. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
2. Test theme toggle:
   - Click the sun/moon icon in the navigation
   - Refresh the page — theme should persist
   - Clear `localStorage` and reload to test system preference

3. Test skill progress bars:
   - Scroll down to the "Skills & Expertise" section
   - Bars should animate from 0% to their target value
   - Counter numbers should increment smoothly

4. Test keyboard navigation:
   - Press `Tab` to navigate through interactive elements
   - Press `Enter` or `Space` to activate buttons/links
   - All focused elements should show visible focus rings

5. Test mobile menu:
   - Resize browser to mobile width (<768px)
   - Click hamburger menu icon
   - Verify smooth open/close and proper keyboard navigation

### Advanced Testing

#### Lighthouse Audit (Chrome DevTools)
```bash
# Open Chrome DevTools (F12)
# Navigate to "Lighthouse" tab
# Select "Performance" and "Accessibility"
# Click "Generate report"
```

**Expected scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

#### JavaScript Disabled Test
- Open browser settings and disable JavaScript
- Progress bars should show static values (fallback)
- Theme should default to light or system preference

#### Color Contrast Test
- Use browser extension like "WAVE" or "axe DevTools"
- Verify all text passes WCAG AA (4.5:1 for normal text, 3:1 for large text)

## 🎨 Technical Details

### Technologies Used
- **Tailwind CSS CDN** - Utility-first CSS framework with dark mode support
- **Vanilla JavaScript (ES6+)** - No dependencies, no build step
- **Intersection Observer API** - Efficient scroll-based animations
- **localStorage API** - Theme persistence
- **CSS Custom Animations** - GPU-accelerated transforms

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Optimizations
- Deferred JavaScript execution
- GPU-friendly animations (`transform`, `opacity`)
- Lazy loading for images
- Minimal CSS/JS payload
- No heavy third-party dependencies

## ♿ Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard-accessible
- **Screen Readers**: ARIA labels, roles, and live regions
- **Focus Management**: Visible focus indicators with proper tab order
- **Color Contrast**: Meets WCAG AA standards in both light and dark modes
- **Responsive Text**: Scales appropriately across all screen sizes
- **No Motion Preference**: Respects `prefers-reduced-motion` (can be enhanced further)

## 📊 SEO & Meta Information

- **Title Tag**: Descriptive page title
- **Meta Description**: Clear description for search engines
- **Theme Color**: Adaptive for light/dark mode
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Alt Text**: Descriptive alt attributes for images

## 🔧 Customization

### Updating Skill Data

Edit `assets/app.js` and modify the `skillsData` array:

```javascript path=assets/app.js start=67
const skillsData = [
  {
    id: 'industrial-systems',
    label: 'Industrial Systems',
    percent: 90,
    description: 'PLC, PID, Instrumentation, Maintenance'
  },
  // Add or modify skills here
];
```

### Changing Theme Colors

Modify Tailwind config in `index.html`:

```javascript path=index.html start=13
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#0891b2",    // Change primary color
        secondary: "#0d9488",  // Change secondary color
      },
    },
  },
};
```

## 📝 Example Commit Message

```
feat(site): add animated skill bars + dark/light theme toggle, accessibility & micro-interactions

- Implement persistent dark/light theme toggle with localStorage
- Add animated skill progress bars with IntersectionObserver
- Enhance accessibility with ARIA labels, focus rings, and keyboard nav
- Add micro-interactions (hover lift, button scale, smooth transitions)
- Improve mobile responsiveness and navigation
- Add entrance animations for hero section
- Update all sections for dark mode support
- Create separate app.js for maintainability
```

## 🐛 Troubleshooting

### Progress Bars Not Animating
- Check browser console for JavaScript errors
- Ensure `assets/app.js` is properly loaded
- Verify IntersectionObserver is supported (or use fallback)

### Theme Not Persisting
- Check if cookies/localStorage are enabled in browser
- Clear browser cache and reload
- Check browser console for localStorage errors

### Animations Stuttering
- Disable browser extensions that might interfere
- Check if hardware acceleration is enabled
- Reduce animation complexity for older devices

## 📬 Contact & Support

For questions or issues:
- **Email**: sharonngetich409@gmail.com
- **LinkedIn**: [Sharon Ngetich](https://www.linkedin.com/in/sharon-chepngeno-900385202)
- **GitHub**: [SharonCH09](https://github.com/SharonCH09)

---

**Last Updated**: January 2025  
**Version**: 2.0.0
