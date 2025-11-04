// Theme Management
// ==================
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
  const buttons = [
    document.getElementById('theme-toggle'),
    document.getElementById('theme-toggle-mobile')
  ];
  
  buttons.forEach(btn => {
    if (btn) {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }
  });
}

// Toggle theme function
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  
  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeButton(isDark);
}

// Mobile Menu Management
// =======================
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuButton || !mobileMenu) return;
  
  menuButton.addEventListener('click', function() {
    const isExpanded = mobileMenu.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Close menu when clicking on links
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Animated Skill Progress Bars
// ==============================
// Skill data with percentages
const skillsData = [
  {
    id: 'industrial-systems',
    label: 'Industrial Systems',
    percent: 90,
    description: 'PLC, PID, Instrumentation, Maintenance'
  },
  {
    id: 'ml-data',
    label: 'ML & Data Analytics',
    percent: 75,
    description: 'Predictive Analytics, Time Series, Visualization'
  },
  {
    id: 'cloud',
    label: 'Cloud Computing',
    percent: 70,
    description: 'AWS, Linux, Networking, Security'
  },
  {
    id: 'embedded',
    label: 'STM32/Embedded',
    percent: 85,
    description: 'FreeRTOS, Modbus, IoT Systems'
  },
  {
    id: 'plc',
    label: 'PLC & SCADA',
    percent: 88,
    description: 'Siemens TIA Portal, HMI, DCS'
  },
  {
    id: 'python',
    label: 'Python & Scripting',
    percent: 80,
    description: 'Automation, Data Analysis, Bash'
  }
];

// Animate a single progress bar
function animateProgressBar(element, targetPercent) {
  const bar = element.querySelector('.progress-bar');
  const counter = element.querySelector('.skill-percent-value');
  
  if (!bar || !counter) return;
  
  // Set initial state
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
      // Ensure we hit the target exactly
      counter.textContent = targetPercent;
      element.setAttribute('aria-valuenow', targetPercent);
    }
  }
  
  // Trigger CSS animation
  bar.classList.add('animate');
  
  // Start counter animation
  requestAnimationFrame(updateProgress);
}

// Initialize animated skill bars using IntersectionObserver
function initSkillBars() {
  const skillsContainer = document.getElementById('skills-progress-bars');
  
  if (!skillsContainer) return;
  
  // Create and render skill bars
  const skillBarsHTML = skillsData.map(skill => `
    <div class="skill-item mb-6 last:mb-0" 
         role="progressbar" 
         aria-valuenow="0" 
         aria-valuemin="0" 
         aria-valuemax="100"
         aria-label="${skill.label} proficiency"
         data-skill-percent="${skill.percent}">
      
      <div class="flex justify-between items-center mb-2">
        <div>
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white">${skill.label}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">${skill.description}</p>
        </div>
        <span class="text-2xl font-bold text-primary">
          <span class="skill-percent-value">0</span>%
        </span>
      </div>
      
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div class="progress-bar h-full bg-gradient-to-r from-primary to-secondary rounded-full" 
             style="width: ${skill.percent}%"></div>
      </div>
    </div>
  `).join('');
  
  skillsContainer.innerHTML = skillBarsHTML;
  
  // Set up IntersectionObserver to animate when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const targetPercent = parseInt(element.getAttribute('data-skill-percent'));
        
        // Animate with slight delay
        setTimeout(() => {
          animateProgressBar(element, targetPercent);
        }, 100);
        
        // Stop observing after animation
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.2 // Trigger when 20% visible
  });
  
  // Observe all skill items
  const skillItems = skillsContainer.querySelectorAll('.skill-item');
  skillItems.forEach(item => observer.observe(item));
}

// Fallback for browsers without IntersectionObserver
function initSkillBarsFallback() {
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    const targetPercent = parseInt(item.getAttribute('data-skill-percent'));
    animateProgressBar(item, targetPercent);
  });
}

// Smooth Scrolling
// =================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize Everything
// ======================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initTheme();
  
  // Set up theme toggle buttons
  const themeButtons = [
    document.getElementById('theme-toggle'),
    document.getElementById('theme-toggle-mobile')
  ];
  
  themeButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }
  });
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize skill bars with IntersectionObserver support check
  if ('IntersectionObserver' in window) {
    initSkillBars();
  } else {
    // Fallback: animate immediately on load
    initSkillBars();
    setTimeout(initSkillBarsFallback, 500);
  }
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Trigger hero animations on load
  const heroElements = document.querySelectorAll('#hero .opacity-0');
  heroElements.forEach(el => {
    el.style.opacity = '1';
  });
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only update if user hasn't set a preference
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
