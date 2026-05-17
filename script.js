// Force-download CV as a blob to prevent browser from opening it inline
function downloadCV() {
    fetch("Bikat_Tilahun_Assefa_CV (2).pdf")
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Bikat_Tilahun_CV.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        });
}

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
            if (mobileMenu.classList.contains('hidden')) {
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
    const navbarContainer = document.getElementById('navbar-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
            if (navbarContainer) {
                navbarContainer.classList.remove('py-6');
                navbarContainer.classList.add('py-4');
            }
        } else {
            navbar.classList.remove('shadow-md');
            if (navbarContainer) {
                navbarContainer.classList.remove('py-4');
                navbarContainer.classList.add('py-6');
            }
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
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- Arsenal Tab Filter ---
    const tabs = document.querySelectorAll('.arsenal-tab');
    const cards = document.querySelectorAll('.arsenal-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab styles
            tabs.forEach(t => {
                t.classList.remove('bg-[#6D8196]', 'text-[#FFFFE3]');
                t.classList.add('bg-[#CBCBCB]', 'text-[#6D8196]');
            });
            tab.classList.remove('bg-[#CBCBCB]', 'text-[#6D8196]');
            tab.classList.add('bg-[#6D8196]', 'text-[#FFFFE3]');

            const selected = tab.dataset.tab;

            cards.forEach(card => {
                if (selected === 'all' || card.dataset.category === selected) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 30);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Skill Bar Animation on Scroll ---
    const skillBars = document.querySelectorAll('.skill-bar');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.transition = 'width 1s ease';
                bar.style.width = bar.dataset.width;
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => barObserver.observe(bar));

});
