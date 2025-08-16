// Fast Performance-Optimized JavaScript
(function() {
    'use strict';
    
    // Remove page loader - instant loading
    // No more artificial delays
    
    // Lightweight scroll-to-top
    const createScrollButton = () => {
        const btn = document.createElement('button');
        btn.className = 'scroll-to-top';
        btn.innerHTML = '↑';
        btn.setAttribute('title', 'Back to Top');
        btn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
        document.body.appendChild(btn);
        
        // Show/hide on scroll - throttled for performance
        let ticking = false;
        const updateButton = () => {
            btn.classList.toggle('show', window.pageYOffset > 300);
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateButton);
                ticking = true;
            }
        }, {passive: true});
    };
    
    // Fast thumbnail-based gallery
    const initGallery = () => {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        if (galleryImages.length === 0) return;
        
        // Create lightweight lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<span class="lightbox-close">×</span><img src="" alt="Gallery image">';
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        
        // Event delegation for better performance
        document.addEventListener('click', (e) => {
            if (e.target.matches('.gallery-item img')) {
                // Use full resolution image, not thumbnail
                const fullSrc = e.target.src.replace('/thumbnails/', '/').replace('_thumb', '');
                lightboxImg.src = fullSrc;
                lightbox.classList.add('active');
            } else if (e.target === lightbox || e.target === closeBtn) {
                lightbox.classList.remove('active');
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    };
    
    // Ultra-fast lazy loading for images
    const initLazyLoading = () => {
        if (!('IntersectionObserver' in window)) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('lazy-loaded');
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('lazy-loading');
            imageObserver.observe(img);
        });
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        createScrollButton();
        initGallery();
        initLazyLoading();
    }
    
})();