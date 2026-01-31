/* ========================================
   GAJENDRA PORTFOLIO - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPreloader();
    initCustomCursor();
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initPortfolio();
    initTestimonials();
    initContactForm();
    initVideoModal();
    initSmoothScroll();
    initParallax();
});

/* ========================================
   PRELOADER
   ======================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Trigger hero animations after preloader
            animateHeroElements();
        }, 1500);
    });
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
    });
}

/* ========================================
   NAVBAR
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ========================================
   HERO ANIMATIONS
   ======================================== */
function initHeroAnimations() {
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(num => statsObserver.observe(num));
}

function animateHeroElements() {
    // Add staggered animations to hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta');
    
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${0.3 + index * 0.15}s`;
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    // Reveal animation observer
    const revealElements = document.querySelectorAll(
        '.section-header, .about-content, .service-card, .portfolio-item, .skill-card, .testimonial-card, .contact-content'
    );
    
    revealElements.forEach(el => el.classList.add('reveal'));
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate skill bars
                const skillBar = entry.target.querySelector('.skill-progress');
                if (skillBar) {
                    const progress = skillBar.getAttribute('data-progress');
                    setTimeout(() => {
                        skillBar.style.width = progress + '%';
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Image lazy loading
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
}

/* ========================================
   PORTFOLIO
   ======================================== */
function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioVideos = document.querySelectorAll('.portfolio-video');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Video hover play
    portfolioItems.forEach(item => {
        const video = item.querySelector('.portfolio-video');
        
        if (video) {
            item.addEventListener('mouseenter', () => {
                video.play().catch(() => {});
            });
            
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
}

/* ========================================
   TESTIMONIALS SLIDER
   ======================================== */
function initTestimonials() {
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (!slider || cards.length === 0) return;
    
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }
    
    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 30; // Card width + gap
        const offset = currentIndex * cardWidth * cardsPerView;
        slider.style.transform = `translateX(-${offset}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto-slide
    let autoSlide = setInterval(nextSlide, 5000);
    
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        updateSlider();
    });
}

/* ========================================
   CONTACT FORM
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        let isValid = true;
        const inputs = form.querySelectorAll('.form-input[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--accent-red)';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = originalText;
        }, 2000);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-text">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        padding: '16px 24px',
        background: type === 'success' ? '#22c55e' : '#ef4444',
        color: 'white',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    });
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animation styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

/* ========================================
   VIDEO MODAL
   ======================================== */
function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalClose = document.getElementById('modal-close');
    const showreelBtn = document.getElementById('showreel-btn');
    const portfolioPlayBtns = document.querySelectorAll('.portfolio-play');
    
    if (!modal || !modalVideo) return;
    
    function openModal(videoSrc) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (videoSrc) {
            modalVideo.src = videoSrc;
            modalVideo.play().catch(() => {});
        }
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        modalVideo.pause();
        modalVideo.src = '';
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Showreel button
    if (showreelBtn) {
        showreelBtn.addEventListener('click', () => {
            // Use a sample video for showreel
            openModal('https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-702-large.mp4');
        });
    }
    
    // Portfolio play buttons
    portfolioPlayBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = btn.closest('.portfolio-item');
            const video = item.querySelector('.portfolio-video source');
            if (video) {
                openModal(video.src);
            }
        });
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   PARALLAX EFFECTS
   ======================================== */
function initParallax() {
    const heroVideo = document.querySelector('.hero-video');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        // Parallax for hero video
        if (heroVideo && scrollY < window.innerHeight) {
            heroVideo.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    });
}

/* ========================================
   ADDITIONAL UTILITIES
   ======================================== */

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('loading')) return;
        
        // Add subtle click animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Console welcome message
console.log(
    '%c🎬 Gajendra Portfolio',
    'color: #d4af37; font-size: 24px; font-weight: bold;'
);
console.log(
    '%cCrafting Stories Through Motion & Vision',
    'color: #a1a1aa; font-size: 14px;'
);
