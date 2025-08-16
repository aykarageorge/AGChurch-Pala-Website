# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML website for Assemblies of God Church, Pala (agchurchpala.org). It's a traditional multi-page website built with vanilla HTML, CSS, and JavaScript, featuring Bootstrap 4 for responsive layout and various jQuery plugins for interactive elements.

## Development Commands

This is a static HTML website with no build process. Development is done by directly editing HTML, CSS, and JavaScript files and opening them in a browser.

**Local Development:**
- Open `index.html` in a browser to view the homepage
- Use a local HTTP server for best experience: `python -m http.server 8000` or `npx serve`
- No compilation or build steps required

**Image Optimization:**
- `./optimize-images.sh` - Shell script for batch image optimization (currently empty)
- Manual image optimization tools available in `js/image-optimizer-tool.js`

**Deployment:**
- Simply upload files to web server (currently hosted on GitHub Pages)
- Ensure CNAME file contains correct domain

## Architecture & Code Structure

### Page Architecture
**Multi-page Structure:** Each major section is a separate HTML file:
- `index.html` - Homepage with church overview, services, activities
- `Our Church.html` / `Our-Belief.html` - Church information and beliefs
- `Pastors.html` / `CA.html` - Leadership and church administration
- `Photos.html` / `Videos.html` - Media galleries
- `Sermons.html` - Sermon archive and audio content
- `Contact.html` / `Downloads.html` - Contact info and document downloads
- Ministry pages: `Sunday-School.html`, `Women-Missionary.html`, etc.

### CSS Architecture
**Layered Styling Approach:**
- `css/bootstrap.min.css` - Bootstrap 4 framework
- `css/main_styles.css` - Core website styles and layout
- `css/style.css` - Additional styling and customizations
- `css/responsive.css` - Mobile responsiveness
- Page-specific CSS: `css/ministries.css`, `css/sermons.css`, etc.
- **Enhancement Layer:** Modern UX improvements added via:
  - `css/enhancements.css` - Scroll-to-top, animations, hover effects
  - `css/gallery-optimization.css` - Lazy loading for photo galleries
  - `css/quote-global-fixes.css` - Quote section alignment fixes
  - `css/index-mobile-fixes.css` - Critical mobile layout fixes

### JavaScript Architecture
**jQuery-based with Progressive Enhancement:**
- `js/jquery-3.2.1.min.js` - Core jQuery library
- `js/custom.js` - Main site functionality (sliders, navigation, timers)
- Page-specific JS: `js/blog_custom.js`, `js/contact_custom.js`, etc.
- Third-party plugins: `js/owl.carousel.js`, `js/parallax.min.js`
- **Modern Enhancements:**
  - `js/enhancements.js` - Scroll-to-top, page loader, lightbox functionality
  - `js/gallery-optimization.js` - Advanced lazy loading and image management

### Key Technical Patterns

**Responsive Images:**
- Multiple image directories: `assets/`, `photos/`, `images_backup/`
- Lazy loading implementation for gallery pages
- Image optimization tools and scripts

**Navigation Pattern:**
- Consistent header/navigation across all pages
- Bootstrap responsive navigation with custom styling
- Mobile-friendly hamburger menu

**Content Structure:**
- Bootstrap grid system for responsive layouts
- Consistent section-based content organization
- Quote sections with decorative elements across pages

## Important Files & Locations

**Core Layout Files:**
- All HTML files include consistent header/footer structure
- Navigation menu in each HTML file (not templated)
- Logo and branding: `assets/logo_large.png`

**Enhancement Documentation:**
- `ENHANCEMENTS.md` - Detailed list of modern UX improvements added
- `sitemap.xml` / `robots.txt` - SEO optimization files

**Media Management:**
- `photos/` - Current optimized gallery images
- `images_backup/` - Backup/original images
- `downloads/` - PDF documents for download

## Working with This Codebase

**Adding New Features:**
1. Follow the existing pattern of page-specific CSS/JS files
2. Include enhancement files (`enhancements.css`, `enhancements.js`) for modern UX
3. Maintain Bootstrap 4 grid structure for responsiveness
4. Test across different screen sizes due to mobile-specific fixes

**Modifying Existing Pages:**
1. Each HTML page includes its own CSS/JS dependencies
2. Changes to navigation require updates across all HTML files
3. Mobile fixes are critical - test responsive behavior thoroughly
4. Quote sections have special global styling considerations

**Performance Considerations:**
- Gallery pages use lazy loading - preserve this functionality
- Image optimization is important due to large photo collections
- Mobile performance is prioritized with conditional effects