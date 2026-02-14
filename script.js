/**
 * ============================================
 * PORTFOLIO WEBSITE - MAIN JAVASCRIPT
 * ============================================
 * 
 * This script handles:
 * 1. Floating photo movement between sections
 * 2. Navigation functionality (mobile menu, active states)
 * 3. Smooth scrolling
 * 4. Scroll-triggered animations
 * 5. Form handling
 * 
 * Author: Your Name
 * Version: 1.0
 */

// ============================================
// GLOBAL VARIABLES & DOM ELEMENTS
// ============================================

// Main elements
const floatingPhoto = document.getElementById('floatingPhoto');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');

// Track current section index for photo movement
let currentSectionIndex = 0;

// Array of section IDs for navigation
const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];

// Photo positions for each section (can be customized)
// These define where the photo will move to in each section
const photoPositions = {
    hero: { top: '50%', left: '75%', transform: 'translate(-50%, -50%)' },
    about: { top: '35%', left: '15%', transform: 'translate(-50%, -50%)' },
    skills: { top: '25%', left: '85%', transform: 'translate(-50%, -50%)' },
    projects: { top: '20%', left: '10%', transform: 'translate(-50%, -50%)' },
    contact: { top: '75%', left: '85%', transform: 'translate(-50%, -50%)' }
};

// ============================================
// FLOATING PHOTO FUNCTIONALITY
// ============================================

/**
 * Moves the floating photo to a specific section
 * @param {string} sectionId - The ID of the section to move to
 */
function movePhotoToSection(sectionId) {
    const position = photoPositions[sectionId];
    
    if (position && floatingPhoto) {
        // Apply the new position with smooth transition
        floatingPhoto.style.top = position.top;
        floatingPhoto.style.left = position.left;
        floatingPhoto.style.transform = position.transform;
        
        // Add a subtle bounce effect
        floatingPhoto.classList.add('moving');
        setTimeout(() => {
            floatingPhoto.classList.remove('moving');
        }, 800);
    }
}

/**
 * Handles click on the floating photo
 * Cycles through sections and moves the photo
 */
function handlePhotoClick() {
    // Mark as clicked to hide the hint
    floatingPhoto.classList.add('clicked');
    
    // Move to next section (cycle back to start if at end)
    currentSectionIndex = (currentSectionIndex + 1) % sectionIds.length;
    const targetSection = sectionIds[currentSectionIndex];
    
    // Move the photo
    movePhotoToSection(targetSection);
    
    // Scroll to the section
    const sectionElement = document.getElementById(targetSection);
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update active nav link
    updateActiveNavLink(targetSection);
}

/**
 * Initialize photo click listener
 */
function initFloatingPhoto() {
    if (floatingPhoto) {
        floatingPhoto.addEventListener('click', handlePhotoClick);
        
        // Set initial position (hero section)
        movePhotoToSection('hero');
    }
}

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

/**
 * Updates the active state of navigation links
 * @param {string} activeSection - The ID of the currently active section
 */
function updateActiveNavLink(activeSection) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
}

/**
 * Toggles the mobile navigation menu
 */
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Closes the mobile menu (used when a link is clicked)
 */
function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
}

/**
 * Handles navigation link clicks
 * @param {Event} e - The click event
 */
function handleNavLinkClick(e) {
    e.preventDefault();
    
    const targetSection = this.getAttribute('data-section');
    const sectionElement = document.getElementById(targetSection);
    
    if (sectionElement) {
        // Scroll to section
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        
        // Update current section index
        currentSectionIndex = sectionIds.indexOf(targetSection);
        
        // Move photo to section
        movePhotoToSection(targetSection);
        
        // Update active nav link
        updateActiveNavLink(targetSection);
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

/**
 * Adds/removes scrolled class to navbar based on scroll position
 */
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================

/**
 * Options for the Intersection Observer
 */
const observerOptions = {
    root: null, // Use viewport
    rootMargin: '0px',
    threshold: 0.3 // Trigger when 30% of element is visible
};

/**
 * Callback for Intersection Observer
 * Handles animations and section detection
 * @param {IntersectionObserverEntry[]} entries - Observed entries
 */
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            // Update current section index
            currentSectionIndex = sectionIds.indexOf(sectionId);
            
            // Update nav active state
            updateActiveNavLink(sectionId);
            
            // Trigger skill bar animations if in skills section
            if (sectionId === 'skills') {
                animateSkillBars();
            }
            
            // Add visible class for animations
            entry.target.classList.add('visible');
        }
    });
}

/**
 * Animates the skill progress bars
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        // Get the target width from inline style
        const targetWidth = bar.style.width;
        
        // Reset and animate
        bar.style.width = '0%';
        
        // Small delay for effect
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 200);
    });
}

/**
 * Initialize scroll observer for sections
 */
function initScrollObserver() {
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

/**
 * Handles form submission
 * Note: This is a frontend-only demo - no actual submission
 * @param {Event} e - The submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Log data (in real app, you'd send this to a server)
    console.log('Form submitted:', data);
    
    // Show success message
    showFormMessage('Thank you! Your message has been received.', 'success');
    
    // Reset form
    contactForm.reset();
}

/**
 * Shows a message after form submission
 * @param {string} message - The message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showFormMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1001;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}

/**
 * Initialize form handling
 */
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
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

/**
 * Updates photo position on window resize
 * Ensures photo stays in correct position relative to viewport
 */
const handleResize = debounce(() => {
    const currentSection = sectionIds[currentSectionIndex];
    movePhotoToSection(currentSection);
}, 250);

// ============================================
// KEYBOARD NAVIGATION
// ============================================

/**
 * Handles keyboard navigation
 * @param {KeyboardEvent} e - The keyboard event
 */
function handleKeyboardNav(e) {
    // Arrow down or Page Down - next section
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        currentSectionIndex = Math.min(currentSectionIndex + 1, sectionIds.length - 1);
        navigateToCurrentSection();
    }
    
    // Arrow up or Page Up - previous section
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
        navigateToCurrentSection();
    }
    
    // Home - first section
    if (e.key === 'Home') {
        e.preventDefault();
        currentSectionIndex = 0;
        navigateToCurrentSection();
    }
    
    // End - last section
    if (e.key === 'End') {
        e.preventDefault();
        currentSectionIndex = sectionIds.length - 1;
        navigateToCurrentSection();
    }
}

/**
 * Navigates to the current section based on currentSectionIndex
 */
function navigateToCurrentSection() {
    const targetSection = sectionIds[currentSectionIndex];
    const sectionElement = document.getElementById(targetSection);
    
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        movePhotoToSection(targetSection);
        updateActiveNavLink(targetSection);
    }
}

/**
 * Initialize keyboard navigation
 */
function initKeyboardNav() {
    document.addEventListener('keydown', handleKeyboardNav);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Main initialization function
 * Called when DOM is fully loaded
 */
function init() {
    console.log('Portfolio initialized!');
    
    // Initialize all features
    initFloatingPhoto();
    initNavigation();
    initScrollObserver();
    initContactForm();
    initKeyboardNav();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Set initial active nav link
    updateActiveNavLink('hero');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// ============================================
// OPTIONAL ENHANCEMENTS
// ============================================

/**
 * Smooth scroll polyfill for older browsers
 * This is a simplified version - consider using a full polyfill in production
 */
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Parallax effect for hero background shapes (optional)
 * Uncomment to enable
 */
/*
function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const rate = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * rate}px)`;
        });
    });
}
*/

/**
 * Custom cursor effect (optional)
 * Uncomment to enable
 */
/*
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale up on hover over interactive elements
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}
*/
