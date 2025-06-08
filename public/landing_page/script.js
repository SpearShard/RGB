import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2
});

// Force scroll to top after Lenis initialization
setTimeout(() => {
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
}, 0);

// Integrate Lenis with GSAP
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize animations
function initAnimations() {
    // Split text elements
    const splitTextElements = document.querySelectorAll('h1, h2, .outro-copy p');
    splitTextElements.forEach(element => {
        const split = new SplitType(element, { types: 'chars, words' });
        
        // Create wrapper for each element
        const wrapper = document.createElement('div');
        wrapper.classList.add('split-wrapper');
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);

        // Animate each element
        gsap.from(split.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Nav animation
    gsap.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Intro section animations
    const headerRows = document.querySelectorAll('.header-row');
    headerRows.forEach((row, index) => {
        gsap.from(row, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Archive section animations
    const archiveItems = document.querySelectorAll('.archive-item');
    archiveItems.forEach((item, index) => {
        gsap.from(item, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Outro section animations
    const outroElements = document.querySelectorAll('.outro-copy h2, .outro-copy p');
    outroElements.forEach((element, index) => {
        gsap.from(element, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Footer animation
    gsap.from('.footer', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Call initAnimations after DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations);

// Debug: Check if Three.js is loaded
console.log('THREE:', THREE);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
console.log('Scene created');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
console.log('Camera created');

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});

renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;

// Debug: Check if model container exists
const modelContainer = document.querySelector(".model");
console.log('Model container:', modelContainer);

if (modelContainer) {
    modelContainer.appendChild(renderer.domElement);
    console.log('Renderer appended to container');
} else {
    console.error('Model container not found!');
}

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Add a subtle rim light
const rimLight = new THREE.DirectionalLight(0xffffff, 0.1);
rimLight.position.set(-5, 5, -5);
scene.add(rimLight);

// Set initial camera position
console.log('Camera position set');

function basicAnimate() {
    renderer.render(scene, camera);
    requestAnimationFrame(basicAnimate);
}
basicAnimate();
console.log('Basic animation started');

let model;
const loader = new GLTFLoader();
console.log('Starting to load model...');

loader.load(
    "./rgb_cube.glb",
    // onLoad callback
    function(gltf) {
        console.log('Model loaded successfully');
        model = gltf.scene;
        model.traverse((node) => {
            if (node.isMesh) {
                if (node.material) {
                    node.material.metalness = 0.1;
                    node.material.roughness = 1.0;
                    node.material.envMapIntensity = 0.8;
                }
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);
        console.log('Model added to scene');

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = maxDim * 1.75;
        console.log('Camera adjusted to model size');

        model.rotation.set(0, 0, 0);
        playInitialRotation();

        cancelAnimationFrame(basicAnimate);
        animate();
    },
    // onProgress callback
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // onError callback
    function(error) {
        console.error('Error loading model:', error);
    }
);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function playInitialRotation() {
    gsap.to(model.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.inOut"
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate model based on scroll position
    if (model) {
        const scrollProgress = lenis.scroll / (document.body.scrollHeight - window.innerHeight);
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // New mobile animation sequence
            // Circular motion with scale
            const angle = scrollProgress * Math.PI * 2;
            const radius = 1.5;
            
            // Circular path
            model.position.x = Math.cos(angle) * radius;
            model.position.y = Math.sin(angle) * radius;
            
            // Rotation follows the circular path
            model.rotation.y = angle;
            model.rotation.z = angle * 0.5;
            
            // Scale pulses with the motion
            const scale = 0.8 + Math.sin(angle) * 0.2;
            model.scale.set(scale, scale, scale);
        } else {
            // Desktop animation (unchanged)
            model.rotation.y = scrollProgress * Math.PI * 4; // Two full rotations
            model.rotation.x = scrollProgress * Math.PI * 0.5; // Slight tilt
        }
    }
    
    renderer.render(scene, camera);
}