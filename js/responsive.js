// Enhanced responsive functionality for Tiya Golf Club
document.addEventListener('DOMContentLoaded', function() {
    
    // Responsive navigation handler
    function handleNavigation() {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 992) {
            // Mobile view enhancements
            navbar.classList.add('mobile-view');
            
            // Close navbar when clicking on links
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                });
            });
        } else {
            navbar.classList.remove('mobile-view');
        }
    }
    
    // Responsive text sizing
    function adjustTextSizes() {
        const screenWidth = window.innerWidth;
        const heroText = document.querySelector('.hero-section h1');
        const sectionHeadings = document.querySelectorAll('h2');
        
        if (screenWidth < 768) {
            // Mobile text adjustments
            if (heroText) {
                heroText.style.fontSize = '1.8rem';
            }
            
            sectionHeadings.forEach(heading => {
                heading.style.fontSize = '1.8rem';
            });
        } else if (screenWidth < 992) {
            // Tablet text adjustments
            if (heroText) {
                heroText.style.fontSize = '2.2rem';
            }
            
            sectionHeadings.forEach(heading => {
                heading.style.fontSize = '2rem';
            });
        } else {
            // Desktop - reset to default
            if (heroText) {
                heroText.style.fontSize = '';
            }
            
            sectionHeadings.forEach(heading => {
                heading.style.fontSize = '';
            });
        }
    }
    
    // Responsive image handling
    function handleImageResponsiveness() {
        const images = document.querySelectorAll('img');
        const screenWidth = window.innerWidth;
        
        images.forEach(img => {
            if (screenWidth < 768) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            } else {
                img.style.maxWidth = '';
                img.style.height = '';
            }
        });
    }
    
    // Responsive form adjustments
    function adjustForms() {
        const forms = document.querySelectorAll('form');
        const screenWidth = window.innerWidth;
        
        forms.forEach(form => {
            if (screenWidth < 576) {
                form.querySelectorAll('input, textarea, button').forEach(element => {
                    element.style.fontSize = '16px'; // Prevents zoom on iOS
                });
            }
        });
    }
    
    // Handle member blocks on small screens
    function adjustMemberBlocks() {
        const memberBlocks = document.querySelectorAll('.member-block');
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 768) {
            memberBlocks.forEach(block => {
                block.style.marginBottom = '2rem';
                block.style.textAlign = 'center';
            });
        } else {
            memberBlocks.forEach(block => {
                block.style.marginBottom = '';
                block.style.textAlign = '';
            });
        }
    }
    
    // Handle SVG elements responsiveness
    function adjustSVGElements() {
        const svgElements = document.querySelectorAll('svg');
        svgElements.forEach(svg => {
            svg.style.width = '100%';
            svg.style.height = 'auto';
        });
    }
    
    // Hero section height adjustment
    function adjustHeroHeight() {
        const heroSection = document.querySelector('.hero-section');
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        
        if (heroSection) {
            if (screenWidth < 768) {
                heroSection.style.minHeight = screenHeight * 0.8 + 'px';
            } else {
                heroSection.style.minHeight = '';
            }
        }
    }
    
    // Offcanvas menu adjustments
    function adjustOffcanvas() {
        const offcanvasElements = document.querySelectorAll('.offcanvas');
        const screenWidth = window.innerWidth;
        
        offcanvasElements.forEach(offcanvas => {
            if (screenWidth < 768) {
                offcanvas.style.width = '85%';
            } else {
                offcanvas.style.width = '';
            }
        });
    }
    
    // Initialize all responsive functions
    function initResponsiveFeatures() {
        handleNavigation();
        adjustTextSizes();
        handleImageResponsiveness();
        adjustForms();
        adjustMemberBlocks();
        adjustSVGElements();
        adjustHeroHeight();
        adjustOffcanvas();
        
        // Add touch-friendly class for mobile devices
        if ('ontouchstart' in window) {
            document.documentElement.classList.add('touch-device');
        }
    }
    
    // Run on load and resize
    initResponsiveFeatures();
    window.addEventListener('resize', initResponsiveFeatures);
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(initResponsiveFeatures, 250);
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            if (!img.classList.contains('lazy-loaded')) {
                imageObserver.observe(img);
                img.classList.add('lazy-loaded');
            }
        });
    }
});