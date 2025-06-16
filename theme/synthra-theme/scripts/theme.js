/* ==============================================================
   SYNTHRA PROTOCOL GITBOOK THEME - JAVASCRIPT
   Interactive enhancements for the theme
   ============================================================== */

(function() {
  'use strict';

  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Initialize theme
  ready(function() {
    initializeTheme();
    addSmoothScrolling();
    addCodeCopyButtons();
    addImageLightbox();
    addTableResponsiveness();
    addProgressIndicator();
    initializeSearchEnhancements();
    addKeyboardShortcuts();
  });

  // Theme initialization
  function initializeTheme() {
    console.log('🎨 Synthra Theme loaded successfully');
    
    // Add theme class to body
    document.body.classList.add('synthra-theme');
    
    // Add loading animation to page transitions
    addPageTransitionEffects();
    
    // Initialize theme switcher if present
    initializeThemeSwitcher();
  }

  // Smooth scrolling for anchor links
  function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          history.pushState(null, null, '#' + targetId);
        }
      });
    });
  }

  // Add copy buttons to code blocks
  function addCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
      const pre = block.parentElement;
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-btn';
      copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="m5 15-1-1v-1c0-1.1.9-2 2-2h1"></path>
        </svg>
        <span>Copy</span>
      `;
      copyButton.title = 'Copy code to clipboard';
      
      // Add styles
      copyButton.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: var(--synthra-primary);
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
      `;
      
      // Add hover effect to pre element
      pre.style.position = 'relative';
      pre.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '1';
      });
      pre.addEventListener('mouseleave', () => {
        copyButton.style.opacity = '0';
      });
      
      // Copy functionality
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(block.textContent);
          
          // Show success feedback
          const originalHTML = copyButton.innerHTML;
          copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            <span>Copied!</span>
          `;
          copyButton.style.background = 'var(--success)';
          
          setTimeout(() => {
            copyButton.innerHTML = originalHTML;
            copyButton.style.background = 'var(--synthra-primary)';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });
      
      pre.appendChild(copyButton);
    });
  }

  // Image lightbox functionality
  function addImageLightbox() {
    const images = document.querySelectorAll('.page-inner img');
    
    images.forEach(img => {
      // Skip if image is already in a link
      if (img.closest('a')) return;
      
      img.style.cursor = 'zoom-in';
      
      img.addEventListener('click', () => {
        createLightbox(img);
      });
    });
  }

  function createLightbox(img) {
    // Create lightbox overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      cursor: zoom-out;
      animation: fadeIn 0.3s ease;
    `;
    
    // Create lightbox image
    const lightboxImg = document.createElement('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 8px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      animation: zoomIn 0.3s ease;
    `;
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    overlay.appendChild(lightboxImg);
    document.body.appendChild(overlay);
    
    // Close on click or escape
    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
      document.head.removeChild(style);
    });
    
    document.addEventListener('keydown', function handleEscape(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(overlay);
        document.head.removeChild(style);
        document.removeEventListener('keydown', handleEscape);
      }
    });
  }

  // Make tables responsive
  function addTableResponsiveness() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'table-responsive';
      wrapper.style.cssText = `
        overflow-x: auto;
        margin: 1rem 0;
        border-radius: 8px;
        box-shadow: var(--shadow-md);
      `;
      
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  // Reading progress indicator
  function addProgressIndicator() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: var(--synthra-gradient-primary);
      z-index: 1000;
      transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset;
      const progress = (scrollTop / documentHeight) * 100;
      
      progressBar.style.width = Math.min(progress, 100) + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
  }

  // Enhanced search functionality
  function initializeSearchEnhancements() {
    const searchInput = document.querySelector('.book-search input');
    if (!searchInput) return;
    
    // Add search suggestions and keyboard navigation
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        // Add your custom search logic here
        enhanceSearchResults();
      }, 300);
    });
    
    // Add keyboard shortcuts for search
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  function enhanceSearchResults() {
    // Custom search result enhancement logic
    const results = document.querySelectorAll('.search-results .search-result');
    
    results.forEach((result, index) => {
      // Add result numbers
      if (!result.querySelector('.result-number')) {
        const number = document.createElement('span');
        number.className = 'result-number';
        number.textContent = (index + 1).toString();
        number.style.cssText = `
          display: inline-block;
          width: 20px;
          height: 20px;
          background: var(--synthra-primary);
          color: white;
          border-radius: 50%;
          text-align: center;
          font-size: 12px;
          line-height: 20px;
          margin-right: 8px;
        `;
        result.prepend(number);
      }
    });
  }

  // Keyboard shortcuts
  function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Only process if not in input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch(e.key) {
        case 'g':
          // g + h: Go to home
          if (e.shiftKey) {
            window.location.href = '/';
          }
          break;
        case 't':
          // t: Toggle dark/light theme (if available)
          toggleTheme();
          break;
        case '?':
          // ?: Show keyboard shortcuts help
          showKeyboardShortcuts();
          break;
      }
    });
  }

  // Theme switcher functionality
  function initializeThemeSwitcher() {
    // Check if theme switcher exists or create one
    let switcher = document.querySelector('.theme-switcher');
    
    if (!switcher) {
      switcher = document.createElement('button');
      switcher.className = 'theme-switcher';
      switcher.innerHTML = '🌙';
      switcher.title = 'Toggle theme';
      switcher.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--synthra-gradient-primary);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 100;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s ease;
      `;
      
      document.body.appendChild(switcher);
    }
    
    switcher.addEventListener('click', toggleTheme);
  }

  function toggleTheme() {
    // Theme toggle logic (if light theme is available)
    const body = document.body;
    const isLight = body.classList.contains('light-theme');
    
    if (isLight) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      localStorage.setItem('synthra-theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('synthra-theme', 'light');
    }
    
    // Update theme switcher icon
    const switcher = document.querySelector('.theme-switcher');
    if (switcher) {
      switcher.innerHTML = isLight ? '🌙' : '☀️';
    }
  }

  // Page transition effects
  function addPageTransitionEffects() {
    // Add page transition class
    document.body.classList.add('page-transitioning');
    
    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove('page-transitioning');
    }, 500);
  }

  // Show keyboard shortcuts help
  function showKeyboardShortcuts() {
    const helpModal = document.createElement('div');
    helpModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1001;
      animation: fadeIn 0.3s ease;
    `;
    
    helpModal.innerHTML = `
      <div style="
        background: var(--bg-secondary);
        border: 1px solid var(--border-primary);
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        box-shadow: var(--shadow-xl);
      ">
        <h3 style="margin-top: 0; color: var(--synthra-primary);">⌨️ Keyboard Shortcuts</h3>
        <div style="display: grid; gap: 1rem; color: var(--text-secondary);">
          <div><kbd>Ctrl+K</kbd> / <kbd>Cmd+K</kbd> - Focus search</div>
          <div><kbd>G+H</kbd> - Go to home</div>
          <div><kbd>T</kbd> - Toggle theme</div>
          <div><kbd>?</kbd> - Show this help</div>
          <div><kbd>Esc</kbd> - Close modals</div>
        </div>
        <button onclick="this.closest('div').parentElement.remove()" style="
          margin-top: 1.5rem;
          background: var(--synthra-gradient-primary);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        ">Close</button>
      </div>
    `;
    
    document.body.appendChild(helpModal);
    
    // Close on click outside
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        helpModal.remove();
      }
    });
    
    // Close on escape
    document.addEventListener('keydown', function handleEscape(e) {
      if (e.key === 'Escape') {
        helpModal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    });
  }

  // Utility functions
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  // Export functions for external use
  window.SynthraTheme = {
    toggleTheme,
    showKeyboardShortcuts,
    createLightbox,
    addCodeCopyButtons
  };

})();
