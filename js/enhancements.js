// Enhanced UX JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Page Loader
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.prepend(pageLoader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            setTimeout(() => pageLoader.remove(), 500);
        }, 500);
    });
    
    // Scroll to Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('title', 'Back to Top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/Hide Scroll to Top Button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to Top Functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Photo Lightbox
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-content">
                <img src="" alt="Enlarged photo">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        
        // Add click handlers to gallery images
        const galleryImages = document.querySelectorAll('.gallery_item img, .photos_gallery img');
        galleryImages.forEach(img => {
            img.parentElement.style.cursor = 'pointer';
            img.parentElement.addEventListener('click', function(e) {
                e.preventDefault();
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || 'Church Photo';
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                closeLightbox();
            }
        });
    }
    
    // Initialize lightbox if gallery exists
    if (document.querySelector('.gallery_item, .photos_gallery')) {
        createLightbox();
    }
    
    // Fade-in Animation on Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section_title, .sermon_content, .ministries_item, .popular_item, .pastors_item');
        elements.forEach(el => {
            el.classList.add('fade-in');
        });
        
        function checkScroll() {
            elements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 50) {
                    el.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check on load
    }
    
    animateOnScroll();
    
    // Enhanced Navigation Active State
    function updateActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.main_nav a, .menu_nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveNavigation();
    
    // Smooth Scroll for Anchor Links
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
    
    // Enhanced Form Interactions (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    });
    
    // Mobile Menu Enhancement
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
    
    // Loading Animation for Images
    function addImageLoadingEffect() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.addEventListener('load', function() {
                    this.style.transition = 'opacity 0.5s ease';
                    this.style.opacity = '1';
                });
            }
        });
    }
    
    addImageLoadingEffect();
    
    // Performance: Lazy Loading for Images (simple implementation)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading if images with data-src exist
    if (document.querySelector('img[data-src]')) {
        lazyLoadImages();
    }
    
    // Add subtle parallax effect to hero sections
    function addParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-window');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    if (document.querySelectorAll('.parallax-window').length > 0) {
        addParallaxEffect();
    }
    
    // Quick Contact Widget
    const quickContact = document.createElement('div');
    quickContact.className = 'quick-contact';
    quickContact.innerHTML = `
        <a href="tel:+919847207259" class="phone-btn" title="Call Church">
            <i class="fa fa-phone"></i>
        </a>
        <a href="mailto:agchurchpala2023@gmail.com" class="email-btn" title="Email Church">
            <i class="fa fa-envelope"></i>
        </a>
        <a href="https://maps.google.com/?q=Assemblies+of+God+Church+Pala" class="location-btn" title="Find us on Map" target="_blank">
            <i class="fa fa-map-marker"></i>
        </a>
    `;
    document.body.appendChild(quickContact);
    
    console.log('🚀 Enhanced UX features loaded successfully!');
});

// Additional utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                background: #d4a574;
                color: white;
                border-radius: 5px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.show { transform: translateX(0); }
            .notification-success { background: #28a745; }
            .notification-error { background: #dc3545; }
            .notification button {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 18px;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => notification.remove(), 5000);
}
