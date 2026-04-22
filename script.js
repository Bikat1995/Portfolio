document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navbar = document.getElementById('navbar');
    
    if (mobileBtn && mobileMenu) {
        // Toggle menu
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if(mobileMenu.classList.contains('hidden')) {
                mobileMenuIcon.classList.remove('fa-xmark');
                mobileMenuIcon.classList.add('fa-bars');
            } else {
                mobileMenuIcon.classList.remove('fa-bars');
                mobileMenuIcon.classList.add('fa-xmark');
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuIcon.classList.remove('fa-xmark');
                mobileMenuIcon.classList.add('fa-bars');
            });
        });
    }
    
    // Changing navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

    // --- Scroll Animations (Fade-up) ---
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // --- View More Projects Toggle ---
    const viewMoreBtn = document.getElementById('view-more-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            let isShowing = false;
            hiddenProjects.forEach(project => {
                if (project.classList.contains('hidden')) {
                    project.classList.remove('hidden');
                    isShowing = true;
                } else {
                    project.classList.add('hidden');
                    isShowing = false;
                }
            });
            
            if (isShowing) {
                viewMoreBtn.textContent = 'View Less Projects';
            } else {
                viewMoreBtn.textContent = 'View More Projects';
                // Scroll back up smoothly
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

});
