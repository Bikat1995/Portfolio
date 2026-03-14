document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle Logic ---
    const htmlElement = document.documentElement;
    const themeBtnDesktop = document.getElementById('theme-toggle-desktop');
    const themeBtnMobile = document.getElementById('theme-toggle-mobile');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

    // Apply init theme
    if (isDarkMode) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    const toggleTheme = () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    if(themeBtnDesktop) themeBtnDesktop.addEventListener('click', toggleTheme);
    if(themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navbar = document.getElementById('navbar');
    
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
    
    // Changing navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-white/95', 'dark:bg-darkbase/95');
            navbar.classList.remove('bg-white/80', 'dark:bg-darkbase/80');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-white/95', 'dark:bg-darkbase/95');
            navbar.classList.add('bg-white/80', 'dark:bg-darkbase/80');
        }
    });

    // 2. Scroll Animations (Fade-up)
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before it comes into view
        threshold: 0.1
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 3. Experience Timeline Line Animation
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineLine = document.getElementById('timeline-line');
    
    if (timelineContainer && timelineLine) {
        // Unhide line for animation
        timelineLine.classList.remove('hidden');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger from scale-y-0 to scale-y-100
                    timelineLine.style.transform = 'scaleY(1)';
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        timelineObserver.observe(timelineContainer);
    }

    // 4. Interactive Glow Effect on Project Cards
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to card boundaries
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set css variables used in the pseudo element background gradient
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 5. View More Projects Toggle
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
                // Scroll back smoothly to projects grid
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
