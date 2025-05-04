// Mobile Menu Toggle
// Enhanced mobile menu with ARIA attributes
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navMenu.style.display = isExpanded ? 'none' : 'flex';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Performance optimization - Intersection Observer for lazy loading
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Form submission with error handling
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            body: new FormData(this)
        });

        if (response.ok) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        alert('There was a problem sending your message. Please try again later.');
        console.error('Error:', error);
    }
});

// Sticky Header on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});
