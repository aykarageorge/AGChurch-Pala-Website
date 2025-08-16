// Universal Fast Loader for All Pages
// Optimized for low network areas and mobile devices

(function() {
    'use strict';
    
    // Fast scroll-to-top button
    function createScrollButton() {
        const btn = document.createElement('button');
        btn.className = 'scroll-to-top';
        btn.innerHTML = '↑';
        btn.setAttribute('title', 'Back to Top');
        btn.style.cssText = `
            position: fixed; bottom: 30px; right: 30px; background: #d4a574; color: white;
            width: 50px; height: 50px; border: none; border-radius: 50%; cursor: pointer;
            display: none; align-items: center; justify-content: center; font-size: 18px;
            z-index: 1000; transition: opacity 0.3s ease;
        `;
        document.body.appendChild(btn);
        
        // Efficient scroll handling
        let ticking = false;
        const updateScroll = () => {
            btn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, { passive: true });
        
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Ultra-lightweight lazy loading
    function initLazyLoading() {
        if (!('IntersectionObserver' in window)) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.style.opacity = '1';
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, { rootMargin: '50px' });
        
        // Convert existing images to lazy loading
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.src.includes('logo') && !img.src.includes('favicon')) {
                // Skip critical images like logos
                const rect = img.getBoundingClientRect();
                if (rect.top > window.innerHeight) { // Only lazy load below-fold images
                    img.dataset.src = img.src;
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                    img.style.opacity = '0.5';
                    img.style.transition = 'opacity 0.3s ease';
                    imageObserver.observe(img);
                }
            }
        });
    }
    
    // Fast gallery lightbox
    function initLightbox() {
        const galleryImages = document.querySelectorAll('img[src*="photos/"]');
        if (galleryImages.length === 0) return;
        
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); z-index: 9999; align-items: center; justify-content: center;
        `;
        lightbox.innerHTML = '<span style="position: absolute; top: 20px; right: 30px; color: white; font-size: 30px; cursor: pointer;">×</span><img style="max-width: 90%; max-height: 90%; object-fit: contain;">';
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('span');
        
        // Event delegation for performance
        document.addEventListener('click', (e) => {
            if (e.target.matches('img[src*="photos/"]')) {
                let fullSrc = e.target.src.replace('/thumbnails/', '/').replace('_thumb', '');
                lightboxImg.src = fullSrc;
                lightbox.style.display = 'flex';
            } else if (e.target === lightbox || e.target === closeBtn) {
                lightbox.style.display = 'none';
            }
        });
        
        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
            }
        });
    }
    
    // Remove heavy animations on mobile for better performance
    function optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // Disable parallax on mobile
            const parallaxElements = document.querySelectorAll('.parallax-window');
            parallaxElements.forEach(el => {
                el.style.backgroundAttachment = 'scroll';
            });
            
            // Reduce animation duration on mobile
            const style = document.createElement('style');
            style.textContent = `
                * { animation-duration: 0.1s !important; transition-duration: 0.1s !important; }
                .hover-effect:hover { transform: none !important; }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize everything quickly
    function init() {
        createScrollButton();
        initLazyLoading();
        initLightbox();
        optimizeForMobile();
    }
    
    // Start immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();