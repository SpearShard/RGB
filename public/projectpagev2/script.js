import { data } from "./data.js";

const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector("#close-btn");
const items = document.querySelectorAll(".item");
const prevBtn = document.querySelector("#prev-img");
const nextBtn = document.querySelector("#next-img");
const thumbnailsContainer = document.querySelector("#img-thumbnails");

let currentImageIndex = 0;
let currentImages = [];

const tl = gsap.timeline({ paused: true, overwrite: "auto" });

tl.to(overlay, {
    duration: 0.5,
    bottom: "0px",
    rotation: 0,
    transformOrigin: "bottom center",
    ease: "power3.inOut",
});

items.forEach((item, index) => {
    item.addEventListener("click", () => {
        updateOverlay(data[index]);
        tl.play();
    });
});

closeBtn.addEventListener("click", () => {
    tl.reverse();
});

function updateOverlay(dataItem) {
    const itemName = document.querySelector("#item-category").previousElementSibling;
    const itemCategory = document.querySelector("#item-category");
    const itemLink = document.querySelector("#item-link");
    const itemCopy = document.querySelector("#item-copy");
    const itemImg = document.querySelector("#item-img");

    // Update text content
    itemName.textContent = dataItem.itemName;
    itemCategory.textContent = dataItem.itemCategory;
    itemLink.href = dataItem.itemLink;
    itemCopy.textContent = dataItem.itemCopy;

    // Update images
    currentImages = dataItem.itemImages || [dataItem.itemImg];
    currentImageIndex = 0;
    updateImageDisplay();
    createThumbnails();
}

function updateImageDisplay() {
    const itemImg = document.querySelector("#item-img");
    gsap.to(itemImg, {
        duration: 0.3,
        opacity: 0,
        onComplete: () => {
            itemImg.src = currentImages[currentImageIndex];
            gsap.to(itemImg, {
                duration: 0.3,
                opacity: 1
            });
        }
    });
    updateThumbnailActiveState();
}

function createThumbnails() {
    thumbnailsContainer.innerHTML = '';
    currentImages.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imgSrc;
        thumbnail.classList.add('thumbnail');
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateImageDisplay();
        });
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function updateThumbnailActiveState() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateImageDisplay();
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateImageDisplay();
});

document.addEventListener("click", (e) => {
    if (!overlay.contains(e.target) && !isItem(e.target)) {
        tl.reverse();
    }
});

function isItem(target) {
    return target.closest(".item");
}