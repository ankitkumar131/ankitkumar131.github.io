// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections and cards
const animateElements = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .cert-card, .stat-card, .achievement-item, .split-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add fade-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Typing effect for hero section (optional enhancement)
const roles = [
    'Software Developer',
    'Web Developer (Angular / MEAN Stack)',
    'Cloud Engineer',
    'DevOps Engineer',
    'Data Engineer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleElement = document.querySelector('.role-container');

// Active section highlighting in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:zxankit24@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Opening your email client...');
        contactForm.reset();
    });
}

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            if (target % 1 !== 0) {
                element.textContent = start.toFixed(2);
            } else {
                element.textContent = Math.floor(start);
            }
        }
    }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                if (!isNaN(number)) {
                    // Keep the original format with + or other suffixes
                    const suffix = text.replace(/[0-9.]/g, '');
                    animateCounter(stat, number, 2000);
                    setTimeout(() => {
                        stat.textContent = number + suffix;
                    }, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

// Add hover effect sound (optional - commented out by default)
/*
const addHoverSound = () => {
    const audio = new Audio('hover.mp3');
    audio.volume = 0.1;
    
    document.querySelectorAll('.btn, .social-link, .project-link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            audio.currentTime = 0;
            audio.play().catch(() => {}); // Ignore errors if audio doesn't exist
        });
    });
};
*/

// Console Easter Egg
console.log('%c👋 Hello, fellow developer!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/ankitkumar131', 'color: #8b5cf6; font-size: 14px;');
console.log('%cBuilt with ❤️ by Ankit Kumar', 'color: #10b981; font-size: 14px;');

// Performance optimization: Lazy load images (if any are added later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add copy to clipboard functionality for email
const emailElement = document.querySelector('.contact-item a[href^="mailto:"]');
if (emailElement) {
    emailElement.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailElement.textContent;
        navigator.clipboard.writeText(email).then(() => {
            const originalText = emailElement.textContent;
            emailElement.textContent = 'Email copied!';
            setTimeout(() => {
                emailElement.textContent = originalText;
            }, 2000);
        });
    });
}

// Add parallax effect to hero section (subtle)
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// Add skill progress bars animation (if needed in future)
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press Escape to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add tooltip functionality for social links
const addTooltip = (element, text) => {
    element.setAttribute('data-tooltip', text);
    element.classList.add('has-tooltip');
};

document.querySelectorAll('.social-link').forEach(link => {
    const icon = link.querySelector('i');
    if (icon) {
        const platform = icon.classList.contains('fa-linkedin') ? 'LinkedIn' :
                        icon.classList.contains('fa-github') ? 'GitHub' :
                        icon.classList.contains('fa-envelope') ? 'Email' :
                        icon.classList.contains('fa-phone') ? 'Phone' : '';
        addTooltip(link, platform);
    }
});

// Add dynamic year to footer
const footerYear = document.querySelector('.footer-left p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Ankit Kumar. All rights reserved.`;
}

// Track page views (optional - for analytics)
/*
const trackPageView = () => {
    // Add your analytics code here
    console.log('Page viewed at:', new Date().toISOString());
};
trackPageView();
*/
