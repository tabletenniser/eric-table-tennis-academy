// Language Toggle Functionality
class LanguageToggle {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        this.langToggleBtn = document.getElementById('lang-toggle');
        this.langDropdown = document.querySelector('.lang-dropdown');
        this.langOptions = document.querySelectorAll('.lang-option');
        this.langCurrent = document.querySelector('.lang-current');

        // Bind events
        this.langToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        this.langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedLang = e.target.dataset.lang;
                this.switchLanguage(selectedLang);
                this.closeDropdown();
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.closeDropdown();
        });

        // Initialize with stored language or default
        const storedLang = localStorage.getItem('language') || 'en';
        this.switchLanguage(storedLang);
    }

    toggleDropdown() {
        this.langDropdown.classList.toggle('active');
    }

    closeDropdown() {
        this.langDropdown.classList.remove('active');
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update button text
        this.langCurrent.textContent = lang === 'en' ? 'EN' : '中';
        
        // Update all elements with language data attributes
        document.querySelectorAll('[data-en]').forEach(element => {
            const enText = element.getAttribute('data-en');
            const zhText = element.getAttribute('data-zh');
            
            if (lang === 'zh' && zhText) {
                element.textContent = zhText;
            } else if (enText) {
                element.textContent = enText;
            }
        });

        // Handle special cases for HTML content
        document.querySelectorAll('[data-en-html]').forEach(element => {
            const enHtml = element.getAttribute('data-en-html');
            const zhHtml = element.getAttribute('data-zh-html');
            
            if (lang === 'zh' && zhHtml) {
                element.innerHTML = zhHtml;
            } else if (enHtml) {
                element.innerHTML = enHtml;
            }
        });

        // Update document language
        document.documentElement.lang = lang;
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        // Bind events
        this.navToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                this.closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Navbar Background on Scroll
class NavbarScroll {
    constructor() {
        this.init();
    }

    init() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 14, 26, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(10, 14, 26, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add fade-in class to elements that should animate
        const animatedElements = document.querySelectorAll('.membership-card, .coaching-card, .feature, .contact-item');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
}

// Form Validation (if forms are added later)
class FormValidation {
    constructor() {
        this.init();
    }

    init() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearError(field);
            }
        });

        return isValid;
    }

    showError(field, message) {
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.textContent = message;
        } else {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = '#ef4444';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorElement);
        }
        field.style.borderColor = '#ef4444';
    }

    clearError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Hide loading elements until images are loaded
        const images = document.querySelectorAll('img');
        let loadedImages = 0;

        if (images.length === 0) {
            this.onAllImagesLoaded();
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
                if (loadedImages === images.length) {
                    this.onAllImagesLoaded();
                }
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        this.onAllImagesLoaded();
                    }
                });
                
                img.addEventListener('error', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        this.onAllImagesLoaded();
                    }
                });
            }
        });
    }

    onAllImagesLoaded() {
        document.body.classList.add('loaded');
        
        // Trigger any animations that depend on images being loaded
        const event = new CustomEvent('imagesLoaded');
        document.dispatchEvent(event);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageToggle();
    new MobileNavigation();
    new SmoothScroll();
    new NavbarScroll();
    new ScrollAnimations();
    new FormValidation();
    new LoadingAnimation();
});

// Handle page visibility changes (for performance)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any intensive operations when tab is hidden
    } else {
        // Resume operations when tab becomes visible
    }
});

// Utility Functions
const utils = {
    // Debounce function for scroll events
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for high-frequency events
    throttle: (func, limit) => {
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
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utilities for use in other scripts if needed
window.utils = utils;
