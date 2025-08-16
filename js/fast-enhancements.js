// Fast Performance-Optimized Enhancements
// Removed page loader for instant loading

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Fast Scroll to Top Button - No delays
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('title', 'Back to Top');
    document.body.appendChild(scrollToTopBtn);
    
    // Throttled scroll handler for better performance
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
    
    // Fast scroll to top
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Lightweight Photo Lightbox (only if gallery exists)
    const galleryImages = document.querySelectorAll('.gallery_item img, .ministry_image img');
    if (galleryImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">×</span>
            <div class="lightbox-content">
                <img src="" alt="Enlarged photo">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        
        // Event delegation for performance
        document.addEventListener('click', function(e) {
            if (e.target.matches('.gallery_item img, .ministry_image img')) {
                // Get full resolution image path
                let fullSrc = e.target.src;
                if (fullSrc.includes('/thumbnails/')) {
                    fullSrc = fullSrc.replace('/thumbnails/', '/').replace('_thumb', '');
                }
                lightboxImg.src = fullSrc;
                lightbox.style.display = 'flex';
            } else if (e.target === lightbox || e.target === closeBtn) {
                lightbox.style.display = 'none';
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
            }
        });
    }
    
    // Remove heavy fade-in animations - instant visibility
    const elementsToShow = document.querySelectorAll('.fade-in-on-scroll');
    elementsToShow.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
    
    // Quick Contact Widget (if not exists)
    if (!document.querySelector('.quick-contact')) {
        const quickContact = document.createElement('div');
        quickContact.className = 'quick-contact';
        quickContact.innerHTML = `
            <a href="tel:+914822212345" class="contact-btn phone" title="Call Us">📞</a>
            <a href="mailto:info@agchurchpala.org" class="contact-btn email" title="Email Us">✉️</a>
            <a href="https://maps.google.com" class="contact-btn location" title="Find Us">📍</a>
        `;
        document.body.appendChild(quickContact);
    }
    
});