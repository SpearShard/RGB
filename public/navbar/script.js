document.addEventListener("DOMContentLoaded", function(){
    let tl = gsap.timeline({ paused : true});

    tl.to(".menu-overlay", {
        duration: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power2.out",
    });

    tl.from(
        ".menu-link, .btn",
        {
            opacity: 0,
            y: 60,
            stagger: 0.05,
            duration: 0.75,
            ease: "power1.inOut",
        },
        "<",
    );

    tl.to(
        ".video-preview",
        {
            duration: 1,
            height: "200px",
            ease: "power2.out",
        },
        "<",
    );

    tl.to(
        ".menu-divider",
        {
            duration: 2,
            width: "100%",
            ease: "power4.out",
        },
        "<",
    );

    function openMenu() {
        document.querySelector(".menu-overlay").style.pointerEvents = "all";
        tl.play();
    }

    function closeMenu() {
        document.querySelector(".menu-overlay").style.pointerEvents = "none";
        tl.reverse();
    }

    document.querySelector(".menu-btn-open").addEventListener("click", openMenu);
    document
        .querySelector(".menu-close-btn")
        .addEventListener("click", closeMenu);
    tl.reverse();
});