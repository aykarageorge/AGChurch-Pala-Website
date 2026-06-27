// Advanced Photo Gallery Optimization
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        rootMargin: '100px 0px', // Start loading 100px before image comes into view
        threshold: 0.1,
        loadingDelay: 50, // Delay between loading images to prevent overwhelming
        maxConcurrentLoads: 6, // Maximum number of images loading at once
        enableProgressiveLoading: true,
        enableImageCompression: true
    };
    
    let loadingQueue = [];
    let currentlyLoading = 0;
    let observer;
    let totalImages = 0;
    let loadedImages = 0;
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeGalleryOptimization();
    });
    
    function initializeGalleryOptimization() {
        console.log('🖼️ Initializing Gallery Optimization...');
        
        // Convert all gallery images to lazy loading
        setupLazyLoading();
        
        // Add progressive loading
        if (CONFIG.enableProgressiveLoading) {
            setupProgressiveLoading();
        }
        
        // Add performance monitoring
        setupPerformanceMonitoring();
        
        
        console.log(`📊 Gallery: ${totalImages} images ready for lazy loading`);
    }
    
    function setupLazyLoading() {
        const galleryImages = document.querySelectorAll('.ministry_image img');
        totalImages = galleryImages.length;
        
        if (totalImages === 0) return;
        
        // Setup Intersection Observer
        observer = new IntersectionObserver(handleIntersection, {
            rootMargin: CONFIG.rootMargin,
            threshold: CONFIG.threshold
        });
        
        galleryImages.forEach((img, index) => {
            // Store original src
            const originalSrc = img.src;
            
            if (originalSrc && !originalSrc.includes('data:')) {
                // Replace src with data URI and store original
                img.dataset.src = originalSrc;
                img.src = createPlaceholderDataURI(200, 200);
                img.classList.add('lazy');
                
                // Add loading skeleton
                img.parentElement.classList.add('image-skeleton');
                
                // Observe the image
                observer.observe(img);
                
                // Add error handling
                img.addEventListener('error', handleImageError);
                img.addEventListener('load', handleImageLoad);
            }
        });
    }
    
    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add to loading queue
                if (!img.dataset.queued) {
                    img.dataset.queued = 'true';
                    loadingQueue.push(img);
                    processLoadingQueue();
                }
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }
    
    function processLoadingQueue() {
        while (loadingQueue.length > 0 && currentlyLoading < CONFIG.maxConcurrentLoads) {
            const img = loadingQueue.shift();
            loadImage(img);
        }
    }
    
    function loadImage(img) {
        if (!img.dataset.src) return;
        
        currentlyLoading++;
        img.parentElement.classList.add('loading');
        
        // Create new image for preloading
        const newImg = new Image();
        
        newImg.onload = function() {
            // Image loaded successfully
            setTimeout(() => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                img.parentElement.classList.remove('loading', 'image-skeleton');
                
                currentlyLoading--;
                loadedImages++;
                
                
                // Process next in queue
                if (loadingQueue.length > 0) {
                    setTimeout(processLoadingQueue, CONFIG.loadingDelay);
                }
                
                // Add fade-in animation
                img.parentElement.classList.add('visible');
                
            }, 100); // Small delay for smooth transition
        };
        
        newImg.onerror = function() {
            handleImageError.call(img);
            currentlyLoading--;
            processLoadingQueue();
        };
        
        // Start loading
        newImg.src = img.dataset.src;
    }
    
    function handleImageLoad() {
        // Image successfully loaded and displayed
        this.removeEventListener('load', handleImageLoad);
        this.removeEventListener('error', handleImageError);
    }
    
    function handleImageError() {
        console.warn('Failed to load image:', this.dataset.src);
        
        // Remove from lazy loading
        this.classList.remove('lazy');
        this.parentElement.classList.remove('loading', 'image-skeleton');
        
        // Set placeholder or error image
        this.src = createErrorPlaceholder();
        this.alt = 'Image failed to load';
        
        loadedImages++;
    }
    
    function setupProgressiveLoading() {
        // Load critical images first (first row)
        const firstRowImages = document.querySelectorAll('.ministry_image img');
        const criticalImages = Array.from(firstRowImages).slice(0, 6);
        
        criticalImages.forEach((img, index) => {
            if (img.dataset.src) {
                // Load critical images immediately with high priority
                setTimeout(() => {
                    if (img.classList.contains('lazy')) {
                        loadImage(img);
                    }
                }, index * 100);
            }
        });
    }
    
    function setupPerformanceMonitoring() {
        // Monitor loading performance
        const startTime = performance.now();
        
        function checkLoadingComplete() {
            if (loadedImages >= totalImages || loadedImages >= totalImages * 0.8) {
                const endTime = performance.now();
                const loadTime = (endTime - startTime) / 1000;
                
                console.log(`🎯 Gallery loading completed in ${loadTime.toFixed(2)}s`);
                console.log(`📈 Loaded ${loadedImages}/${totalImages} images`);
                
                
                // Cleanup
                if (observer) {
                    observer.disconnect();
                }
            } else {
                setTimeout(checkLoadingComplete, 1000);
            }
        }
        
        setTimeout(checkLoadingComplete, 2000);
    }
    
    
    function createPlaceholderDataURI(width, height) {
        // Create a small SVG placeholder
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <rect width="100%" height="100%" fill="#f8f9fa"/>
                <circle cx="50%" cy="50%" r="20" fill="#d4a574" opacity="0.3"/>
                <text x="50%" y="55%" text-anchor="middle" fill="#666" font-size="12" font-family="Arial">Loading...</text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }
    
    function createErrorPlaceholder() {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                <rect width="100%" height="100%" fill="#f8f9fa"/>
                <path d="M50 150 L100 100 L150 150 M100 50 L100 100" stroke="#ccc" stroke-width="3" fill="none"/>
                <text x="50%" y="180" text-anchor="middle" fill="#999" font-size="10" font-family="Arial">Image not available</text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }
    
    // Utility functions for image optimization
    function optimizeImageLoading() {
        // Add image loading hints for better performance
        const galleryImages = document.querySelectorAll('.ministry_image img');
        
        galleryImages.forEach(img => {
            // Add loading attributes for modern browsers
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }
    
    // Export for debugging
    window.GalleryOptimization = {
        loadedImages: () => loadedImages,
        totalImages: () => totalImages,
        currentlyLoading: () => currentlyLoading,
        queueLength: () => loadingQueue.length,
        forceLoadAll: () => {
            loadingQueue.forEach(img => loadImage(img));
            loadingQueue = [];
        }
    };
    
})();
