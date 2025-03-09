document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
    <link rel="stylesheet" href="../my-portfolio/css/nav.css">
        <nav class="main-nav">
            <div class="nav-container">
                <div class="logo-container">
                    <a href="index.html" class="logo">
                        <img src="../assets/TAZARN.png" alt="Company Logo" class="logo-img">
                    </a>
                </div>

                <button class="mobile-menu-btn" aria-label="Toggle menu">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>

                <div class="nav-links">
                    <a href="index.html" class="nav-link active">Home</a>
                    <a href="skills.html" class="nav-link">My Skills</a>
                    <a href="Achievements.html" class="nav-link">Projects & Experience</a>
                </div>
            </div>
        </nav>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Add mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Navbar scroll functionality
    const navbar = document.querySelector('.main-nav');
    let lastScrollTop = 0;
    
    // Function to handle scroll
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroSection = document.querySelector('#hero') || document.querySelector('header');
        const heroHeight = heroSection ? heroSection.offsetHeight : 300;
        
        // Add blur effect when scrolled past hero
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Handle navbar visibility (show/hide)
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // Scrolling DOWN and not at the top
            navbar.classList.add('fade-out');
            navbar.classList.remove('fade-in');
        } else {
            // Scrolling UP
            navbar.classList.add('fade-in');
            navbar.classList.remove('fade-out');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set correct state on page load
    handleScroll();

    // Highlight current section in navigation
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});