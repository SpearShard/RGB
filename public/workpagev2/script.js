import { interiors } from "./data.js";
import { imageLinks } from "./image-links.js";

document.addEventListener("DOMContentLoaded", function(){
    const cursor = document.querySelector(".cursor");
    const gallery = document.querySelector(".gallery");
    const numberOfItems = interiors.length;
    
    // Responsive radius calculation
    function calculateRadius() {
        const width = window.innerWidth;
        if (width <= 480) return 400;
        if (width <= 768) return 800;
        return 1200;
    }
    
    // Responsive center position calculation
    function calculateCenter() {
        const width = window.innerWidth;
        if (width <= 480) return {
            x: width * 0.3,
            y: window.innerHeight * 0.6
        };
        if (width <= 768) return {
            x: width * 0.4,
            y: window.innerHeight * 0.55
        };
        return {
            x: width / 2,
            y: window.innerHeight / 2
        };
    }
    
    let radius = calculateRadius();
    let center = calculateCenter();
    const angleIncrement = (2 * Math.PI) / numberOfItems;
    const baseRotation = Math.PI;

    for(let i = 0; i < numberOfItems; i++){
        const item = document.createElement("div");
        item.className = "item";
        const p = document.createElement("p");
        const count = document.createElement("span");
        p.textContent = interiors[i].name;
        count.textContent = `(${Math.floor(Math.random() * 50) + 1})`;
        item.appendChild(p);
        p.appendChild(count);
        gallery.appendChild(item);

        const angle = baseRotation + (i * angleIncrement);
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        const rotation = (angle * 180) / Math.PI;

        gsap.set(item, {
            x: x + "px",
            y: y + "px",
            rotation: rotation,
        });

        item.addEventListener("mousemove", function() {
            const imgSrc = imageLinks[i % 22];
            const img = document.createElement("img");
            img.src = imgSrc;
            
            // Initial state
            gsap.set(img, {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
                opacity: 0,
                scale: 0.95,
                transformOrigin: "center center",
                transform: "translateZ(0)",
            });
            
            cursor.appendChild(img);

            // Single smooth reveal animation
            gsap.to(img, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.inOut"
            });
        });

        item.addEventListener("mouseout", function() {
            const imgs = cursor.getElementsByTagName("img");
            if(imgs.length){
                const lastImg = imgs[imgs.length-1];
                Array.from(imgs).forEach((img, index) => {
                    if(img !== lastImg){
                        gsap.to(img, {
                            clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
                            opacity: 0,
                            scale: 0.95,
                            duration: 0.4,
                            ease: "power2.in",
                            onComplete: () => img.remove()
                        });
                    }
                });

                gsap.to(lastImg, {
                    clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.4,
                    ease: "power2.in",
                    delay: 0.1,
                    onComplete: () => lastImg.remove()
                });
            }
        });
    }

    function updatePosition() {
        const scrollAmount = -window.scrollY * 0.0001;
        document.querySelectorAll(".item").forEach(function (item, index){
            const angle = baseRotation + (index * angleIncrement) + scrollAmount;
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            const rotation = (angle * 180) / Math.PI;

            gsap.to(item, {
                duration: 0.05,
                x: x + "px",
                y: y + "px",
                rotation: rotation,
                ease: "elastic.out(1, 0.3)",
            });
        });
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            radius = calculateRadius();
            center = calculateCenter();
            updatePosition();
        }, 100);
    });

    updatePosition();
    document.addEventListener("scroll", updatePosition);

    document.addEventListener("mousemove", function(e){
        gsap.to(cursor, {
            x: e.clientX - 150,
            y: e.clientY - 200,
            duration: 1,
            ease: "power3.out",
        })
    })
});