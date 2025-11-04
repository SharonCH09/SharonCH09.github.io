# Reusable Code Snippets

This file contains reusable components that can be copied and adapted for other projects.

## Theme Toggle Component

### HTML (Theme Toggle Button)

```html path=null start=null
<!-- Theme Toggle Button (Desktop) -->
<button 
  id="theme-toggle" 
  aria-label="Toggle dark mode"
  aria-pressed="false"
  class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all focus-ring"
>
  <!-- Sun Icon (visible in dark mode) -->
  <svg class="w-5 h-5 text-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
  </svg>
  <!-- Moon Icon (visible in light mode) -->
  <svg class="w-5 h-5 text-gray-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
</button>
```

### JavaScript (Theme Toggle Logic)

```javascript path=null start=null
// Initialize theme based on localStorage or system preference
function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeButton(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeButton(false);
  }
}

// Update theme toggle button state
function updateThemeButton(isDark) {
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }
}

// Toggle theme function
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeButton(isDark);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  
  const themeButton = document.getElementById('theme-toggle');
  if (themeButton) {
    themeButton.addEventListener('click', toggleTheme);
  }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      document.documentElement.classList.add('dark');
      updateThemeButton(true);
    } else {
      document.documentElement.classList.remove('dark');
      updateThemeButton(false);
    }
  }
});
```

### CSS (Theme Transition Styles)

```css path=null start=null
/* Theme transition for smooth color changes */
.theme-transition {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Focus ring for accessibility */
.focus-ring:focus {
  outline: 2px solid #0891b2;
  outline-offset: 2px;
}
```

## Animated Progress Bar Component

### HTML (Progress Bar Container)

```html path=null start=null
<!-- Progress Bar Item -->
<div class="skill-item mb-6" 
     role="progressbar" 
     aria-valuenow="0" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="Skill name proficiency"
     data-skill-percent="85">
  
  <div class="flex justify-between items-center mb-2">
    <div>
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Skill Name</h4>
      <p class="text-sm text-gray-500 dark:text-gray-400">Brief description</p>
    </div>
    <span class="text-2xl font-bold text-primary">
      <span class="skill-percent-value">0</span>%
    </span>
  </div>
  
  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
    <div class="progress-bar h-full bg-gradient-to-r from-primary to-secondary rounded-full" 
         style="width: 85%"></div>
  </div>
</div>
```

### JavaScript (Progress Bar Animation)

```javascript path=null start=null
// Animate a single progress bar
function animateProgressBar(element, targetPercent) {
  const bar = element.querySelector('.progress-bar');
  const counter = element.querySelector('.skill-percent-value');
  
  if (!bar || !counter) return;
  
  let currentPercent = 0;
  const duration = 1500; // ms
  const startTime = performance.now();
  
  // Animate using requestAnimationFrame for smoothness
  function updateProgress(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeOutCubic)
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    currentPercent = Math.floor(easedProgress * targetPercent);
    
    // Update counter
    counter.textContent = currentPercent;
    
    // Update ARIA attribute
    element.setAttribute('aria-valuenow', currentPercent);
    
    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      counter.textContent = targetPercent;
      element.setAttribute('aria-valuenow', targetPercent);
    }
  }
  
  // Trigger CSS animation
  bar.classList.add('animate');
  
  // Start counter animation
  requestAnimationFrame(updateProgress);
}

// Initialize with IntersectionObserver
function initProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const targetPercent = parseInt(element.getAttribute('data-skill-percent'));
        
        setTimeout(() => {
          animateProgressBar(element, targetPercent);
        }, 100);
        
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.2
  });
  
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => observer.observe(item));
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    initProgressBars();
  }
});
```

### CSS (Progress Bar Styles)

```css path=null start=null
/* Progress bar animations (GPU-friendly with transform) */
.progress-bar {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-bar.animate {
  transform: scaleX(1);
}

/* No-JS fallback */
.no-js .progress-bar {
  transform: scaleX(1);
}
```

## Micro-Interactions & Animations

### Hover Lift Effect

```css path=null start=null
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Dark mode adjustment */
.dark .hover-lift:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}
```

### Button Scale Effect

```css path=null start=null
.btn-scale {
  transition: transform 0.15s ease;
}

.btn-scale:active {
  transform: scale(0.97);
}
```

### Entrance Animations

```css path=null start=null
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Staggered animation delays */
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
```

## Usage Tips

1. **Theme Toggle**: Works with Tailwind's `darkMode: 'class'` configuration
2. **Progress Bars**: Requires data attributes and IntersectionObserver support
3. **Animations**: Use `opacity: 0` initially to prevent flash before animation
4. **Accessibility**: Always include ARIA labels and keyboard navigation support

## Browser Compatibility

- **Theme Toggle**: All modern browsers (IE11+ with polyfill)
- **Progress Bars**: Chrome 51+, Firefox 55+, Safari 12.1+
- **Animations**: All browsers supporting CSS3 animations

---

**License**: MIT  
**Attribution**: Feel free to use these snippets in your own projects!
