document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const container = document.querySelector(".container");
    const scroller = document.querySelector(".scroller");
    const progressCounter = document.querySelector(".progress-counter h1");
    const progressBar = document.querySelector(".progress-bar");
    const sections = Array.from(scroller.querySelectorAll("section"));

    // Configuration
    const SCROLL_CONFIG = {
        smoothFactor: 0.3, // Reduced for smoother transitions
        touchSensitivity: 1.5, // Reduced sensitivity
        bufferSize: 2,
        velocityDecay: 0.92, // Slower decay
        velocityThreshold: 0.05, // Lower threshold
        // Responsive configuration
        isMobile: window.innerWidth <= 768,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        // Scroll configuration
        scrollThreshold: 0.2,
        scrollSnapDelay: 200,
        scrollSnapDuration: 800,
        // Section configuration
        sectionTransitionDuration: 800,
        sectionTransitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    };

    // State variables
    let targetScrollX = 0;
    let currentScrollX = 0;
    let isAnimating = false;
    let currentProgressScale = 0;
    let targetProgressScale = 0;
    let lastPercentage = 0;
    let sequenceWidth = 0;
    let lastScrollTime = 0;
    let isScrolling = false;
    let scrollTimeout = null;
    let currentSection = 0;
    let isTransitioning = false;

    // Touch state
    let isDown = false;
    let lastTouchX = 0;
    let touchVelocity = 0;
    let lastTouchTime = 0;
    let touchStartX = 0;

    // Utility functions
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const handleResize = () => {
        SCROLL_CONFIG.isMobile = window.innerWidth <= 768;
        sequenceWidth = setupScroll();
        updateProgress(sequenceWidth, true);
        progressBar.style.transform = `scaleX(${currentProgressScale})`;
    };

    const setupScroll = () => {
        // Remove any existing clone sections
        scroller
            .querySelectorAll(".clone-section")
            .forEach((clone) => clone.remove());

        const originalSections = Array.from(
            scroller.querySelectorAll("section:not(.clone-section)")
        );
        const templateSections = 
            originalSections.length > 0 ? originalSections : sections;

        // Calculate total width
        let totalWidth = 0;
        templateSections.forEach((section) => {
            totalWidth += parseFloat(window.getComputedStyle(section).width);
        });

        // Add buffer sections before
        for(let i = -SCROLL_CONFIG.bufferSize; i < 0; i++) {
            templateSections.forEach((section, index) => {
                const clone = section.cloneNode(true);
                clone.classList.add("clone-section");
                clone.setAttribute("data-clone-index", `${i}-${index}`);
                scroller.appendChild(clone);
            });
        }

        // Add original sections if none exist
        if(originalSections.length === 0) {
            templateSections.forEach((section, index) => {
                const clone = section.cloneNode(true);
                clone.setAttribute("data-clone-index", `0-${index}`);
                scroller.appendChild(clone);
            });
        }

        // Add buffer sections after
        for(let i = 1; i < SCROLL_CONFIG.bufferSize; i++) {
            templateSections.forEach((section, index) => {
                const clone = section.cloneNode(true);
                clone.classList.add("clone-section");
                clone.setAttribute("data-clone-index", `${i}-${index}`);
                scroller.appendChild(clone);
            });
        }

        // Set scroller width and initial position
        const totalScrollerWidth = totalWidth * (1 + SCROLL_CONFIG.bufferSize * 2);
        scroller.style.width = `${totalScrollerWidth}px`;
        targetScrollX = totalWidth * SCROLL_CONFIG.bufferSize;
        currentScrollX = targetScrollX;
        scroller.style.transform = `translateX(-${currentScrollX}px)`;

        return totalWidth;
    };

    const checkBoundaryAndReset = (sequenceWidth) => {
        const upperBound = sequenceWidth * (SCROLL_CONFIG.bufferSize + 0.5);
        const lowerBound = sequenceWidth * (SCROLL_CONFIG.bufferSize - 0.5);

        if(currentScrollX > upperBound) {
            targetScrollX -= sequenceWidth;
            currentScrollX -= sequenceWidth;
            scroller.style.transform = `translateX(-${currentScrollX}px)`;
            return true;
        }

        if(currentScrollX < lowerBound) {
            targetScrollX += sequenceWidth;
            currentScrollX += sequenceWidth;
            scroller.style.transform = `translateX(-${currentScrollX}px)`;
            return true;
        }

        return false;
    };

    const updateProgress = (sequenceWidth, forceReset = false) => {
        const basePosition = sequenceWidth * SCROLL_CONFIG.bufferSize;
        const currentPosition = (currentScrollX - basePosition) % sequenceWidth;
        let percentage = (currentPosition/sequenceWidth) * 100;

        if(percentage < 0) {
            percentage = 100 + percentage;
        }

        const isWrapping = 
            (lastPercentage > 80 && percentage < 20) ||
            (lastPercentage < 20 && percentage > 80) ||
            forceReset;

        progressCounter.textContent = `${Math.round(percentage)}`;
        targetProgressScale = percentage / 100;

        if(isWrapping) {
            currentProgressScale = targetProgressScale;
            progressBar.style.transform = `scaleX(${currentProgressScale})`;
        }

        lastPercentage = percentage;
    };

    const animate = (sequenceWidth, forceProgressReset = false) => {
        if (!isAnimating) return;

        const delta = targetScrollX - currentScrollX;
        const absDelta = Math.abs(delta);

        if (absDelta < 0.01) {
            isAnimating = false;
            return;
        }

        currentScrollX = lerp(currentScrollX, targetScrollX, SCROLL_CONFIG.smoothFactor);
        scroller.style.transform = `translateX(-${currentScrollX}px)`;

        updateProgress(sequenceWidth, forceProgressReset);

        if(!forceProgressReset) {
            currentProgressScale = lerp(
                currentProgressScale,
                targetProgressScale,
                SCROLL_CONFIG.smoothFactor
            );
            progressBar.style.transform = `scaleX(${currentProgressScale})`;
        }

        requestAnimationFrame(() => animate(sequenceWidth));
    };

    const handleScroll = (delta) => {
        if (isTransitioning) return;

        const now = Date.now();
        const timeSinceLastScroll = now - lastScrollTime;
        
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        isScrolling = true;
        lastScrollTime = now;

        // Calculate scroll amount with reduced sensitivity
        const scrollAmount = SCROLL_CONFIG.isMobile ? 
            delta * (timeSinceLastScroll < 50 ? 0.2 : 0.3) : 
            delta * 0.5;

        targetScrollX += scrollAmount;

        const needsReset = checkBoundaryAndReset(sequenceWidth);

        if(!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(() => animate(sequenceWidth, needsReset));
        }

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, SCROLL_CONFIG.scrollSnapDelay);
    };

    // Initialize
    sequenceWidth = setupScroll();
    updateProgress(sequenceWidth, true);
    progressBar.style.transform = `scaleX(${currentProgressScale})`;

    // Event Listeners
    window.addEventListener('resize', handleResize);

    container.addEventListener(
        "wheel",
        (e) => {
            e.preventDefault();
            handleScroll(e.deltaY);
        },
        { passive: false }
    );

    container.addEventListener("touchstart", (e) => {
        if (isTransitioning) return;
        
        isDown = true;
        lastTouchX = e.touches[0].clientX;
        touchStartX = lastTouchX;
        lastTouchTime = Date.now();
        targetScrollX = currentScrollX;
    });

    container.addEventListener("touchmove", (e) => {
        if(!isDown || isTransitioning) return;
        e.preventDefault();

        const currentTouchX = e.touches[0].clientX;
        const touchDelta = lastTouchX - currentTouchX;
        const totalDelta = touchStartX - currentTouchX;
        
        // Reduce sensitivity for smaller movements
        const sensitivity = SCROLL_CONFIG.isMobile ? 
            SCROLL_CONFIG.touchSensitivity * (Math.abs(totalDelta) < 50 ? 0.5 : 0.8) : 
            SCROLL_CONFIG.touchSensitivity;

        targetScrollX += touchDelta * sensitivity;

        const currentTime = Date.now();
        const timeDelta = currentTime - lastTouchTime;
        if(timeDelta > 0) {
            touchVelocity = (touchDelta/timeDelta) * 8; // Reduced velocity multiplier
        }

        lastTouchX = currentTouchX;
        lastTouchTime = currentTime;

        const needsReset = checkBoundaryAndReset(sequenceWidth);
        if(!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(() => animate(sequenceWidth, needsReset));
        }
    });

    container.addEventListener("touchend", () => {
        if (!isDown || isTransitioning) return;
        isDown = false;

        if(Math.abs(touchVelocity) > SCROLL_CONFIG.velocityThreshold) {
            targetScrollX += touchVelocity * (SCROLL_CONFIG.isMobile ? 8 : 12); // Reduced velocity multiplier

            const decayVelocity = () => {
                touchVelocity *= SCROLL_CONFIG.velocityDecay;

                if(Math.abs(touchVelocity) > SCROLL_CONFIG.velocityThreshold) {
                    targetScrollX += touchVelocity;
                    const needsReset = checkBoundaryAndReset(sequenceWidth);

                    if(needsReset) {
                        updateProgress(sequenceWidth, true);
                    }

                    requestAnimationFrame(decayVelocity);
                }
            };

            requestAnimationFrame(decayVelocity);
        }
    });
});