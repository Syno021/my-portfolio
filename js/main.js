
document.addEventListener("DOMContentLoaded", function() {
    const titleFirst = document.getElementById("title-first");
    const titleSecond = document.getElementById("title-second");
    const tagline = document.querySelector(".animated-tagline");

    // Split titles into letters
    const splitText = (element) => {
        element.innerHTML = element.textContent
            .split("")
            .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
            .join("");
        return element.querySelectorAll("span");
    };

    // Process both title elements and get their spans
    const firstSpans = splitText(titleFirst);
    const secondSpans = splitText(titleSecond);
    
    // Combine all title spans for sequential animation
    const allTitleSpans = [...firstSpans, ...secondSpans];

    // Split tagline into words while keeping spaces
    tagline.innerHTML = tagline.innerHTML
        .split("&nbsp;")
        .map((word) => `<span>${word}&nbsp;</span>`)
        .join("");

    // Start animations
    setTimeout(() => {
        // Apply animation to all title spans in sequence
        allTitleSpans.forEach((span, index) => {
            span.style.animation = `slideUp 0.8s ease-out forwards ${index * 0.1}s`;
        });

        // Delay tagline animation
        setTimeout(() => {
            document.querySelectorAll(".animated-tagline span").forEach((span, index) => {
                span.style.animation = `slideLeft 0.3s ease-out forwards ${index * 0.05 + 1.2}s`;
            });
        }, 1200); 
    }, 100);

    // About Card Typing Animation
    const aboutContent = document.getElementById("aboutContent");
    const typingText = document.getElementById("typingText");
    const readMoreBtn = document.getElementById("readMoreBtn");
    
    // Replace this text with your actual information
    const fullText = "Hi, I'm SYNO. I'm a passionate full-stack developer specializing in web and app development. I graduated from the University of Technology with a degree in Computer Science in 2019. Since then, I've been building innovative solutions for clients across various industries. My expertise includes React, Node.js, Flutter, and cloud infrastructures. I believe in clean code and user-centered design principles. When I'm not coding, you can find me hiking or exploring new technologies.";
    
    let charIndex = 0;
    let isExpanded = false;
    
    // Typing animation
    function typeText() {
        if (charIndex < fullText.length) {
            typingText.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 30); // Adjust typing speed here
        }
    }
    
    // Start typing animation after hero animations
    setTimeout(typeText, 2500);
    
    // Read more functionality
    readMoreBtn.addEventListener("click", function() {
        if (isExpanded) {
            aboutContent.classList.remove("expanded");
            readMoreBtn.textContent = "Read More";
        } else {
            aboutContent.classList.add("expanded");
            readMoreBtn.textContent = "Read Less";
        }
        isExpanded = !isExpanded;
    });

    // Skills cards functionality
    const skillsContainer = document.getElementById("skillsContainer");
    const scrollLeftBtn = document.getElementById("scrollLeft");
    const scrollRightBtn = document.getElementById("scrollRight");
    const skillCards = document.querySelectorAll(".skill-card");
    
    // Horizontal scrolling buttons
    scrollLeftBtn.addEventListener("click", () => {
        skillsContainer.scrollBy({
            left: -300,
            behavior: "smooth"
        });
    });
    
    scrollRightBtn.addEventListener("click", () => {
        skillsContainer.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    });
    
    // Mouse drag to scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;
    
    skillsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        skillsContainer.classList.add('grabbing');
        startX = e.pageX - skillsContainer.offsetLeft;
        scrollLeft = skillsContainer.scrollLeft;
        
        // Prevent default behavior to avoid text selection during drag
        e.preventDefault();
    });
    
    skillsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        skillsContainer.classList.remove('grabbing');
    });
    
    skillsContainer.addEventListener('mouseup', () => {
        isDown = false;
        skillsContainer.classList.remove('grabbing');
    });
    
    skillsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - skillsContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        skillsContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile devices
    skillsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - skillsContainer.offsetLeft;
        scrollLeft = skillsContainer.scrollLeft;
    }, { passive: true });
    
    skillsContainer.addEventListener('touchmove', (e) => {
        if (e.touches.length !== 1) return;
        const x = e.touches[0].pageX - skillsContainer.offsetLeft;
        const walk = (startX - x) * 1.5;
        skillsContainer.scrollLeft = scrollLeft + walk;
    }, { passive: true });
    
    // Tooltip functionality
    let activeTooltip = null;
    
    skillCards.forEach(card => {
        card.addEventListener("click", (e) => {
            // Only handle the click if we didn't just finish dragging
            if (!isDown && Math.abs(skillsContainer.scrollLeft - scrollLeft) < 10) {
                const tooltip = card.querySelector(".skill-tooltip");
                
                // If there's an active tooltip and it's not the current one, remove active state
                if (activeTooltip && activeTooltip !== tooltip) {
                    activeTooltip.classList.remove("active");
                }
                
                // Toggle active state for current tooltip
                tooltip.classList.toggle("active");
                activeTooltip = tooltip.classList.contains("active") ? tooltip : null;
                
                e.stopPropagation();
            }
        });
    });
    
    // Close tooltip when clicking elsewhere
    document.addEventListener("click", () => {
        if (activeTooltip) {
            activeTooltip.classList.remove("active");
            activeTooltip = null;
        }
    });
});