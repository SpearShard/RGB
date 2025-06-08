"use client";

import React, {useState, useRef, useEffect} from 'react';
import Link from "next/link";
import "./menu.css";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import { useRouter } from 'next/navigation';

const Menu = () => {
    const container = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tl = useRef();
    const router = useRouter();

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true })
            .to(".menu-overlay", {
                duration: 1,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                ease: "power2.out",
            })
            .from(
                ".menu-link, .btn",
                {
                    opacity: 0,
                    y: 60,
                    stagger: 0.05,
                    duration: 0.75,
                    ease: "power1.inOut",
                },
                "<"
            )
            .to(
                ".video-preview",
                {
                    duration: 1,
                    height: "200px",
                    ease: "power2.out",
                },
                "<"
            )
            .to(
                ".menu-divider",
                {
                    duration: 2,
                    width: "100%",
                    ease: "power4.out",
                },
                "<"
            );
    }, { scope: container });

    useEffect(() => {
        if (isMenuOpen) {
            document.querySelector(".menu-overlay").style.pointerEvents = "all";
            tl.current.play();
        } else {
            document.querySelector(".menu-overlay").style.pointerEvents = "none";
            tl.current.reverse();
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        setIsMenuOpen(false);
        
        // Wait for the animation to complete before navigating
        setTimeout(() => {
            router.push(href);
        }, 1000); // Match this with your animation duration
    };

    return (
        <div className="container" ref={container}>
            <nav>
                <div className="logo">RGB-Design</div>
                <div className="menu-btn-open" onClick={toggleMenu}>Menu</div>
            </nav>

            <div className="menu-overlay">
                <div className="menu-nav">
                    <div className="menu-logo">RGB-Design</div>
                    <div className="menu-close-btn" onClick={toggleMenu}>Close</div>
                </div>
                <div className="menu-cols">
                    <div className="col">
                        <div className="video">
                            <div className="video-preview"></div>
                            <div className="video-details">
                                <p><i className="ph-fill ph-play-circle"></i> Play reel</p>
                                <p>-01:18</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="menu-link">
                            <Link href="/" onClick={(e) => handleLinkClick(e, '/')}>Home</Link>
                        </div>
                        <div className="menu-link">
                            <Link href="/work" onClick={(e) => handleLinkClick(e, '/work')}>Work</Link>
                        </div>
                        <div className="menu-link">
                            <Link href="/about" onClick={(e) => handleLinkClick(e, '/about')}>About</Link>
                        </div>
                        <div className="menu-link">
                            <Link href="/contact" onClick={(e) => handleLinkClick(e, '/contact')}>Contact</Link>
                        </div>
                        <div className="menu-link">
                            <Link href="/projects" onClick={(e) => handleLinkClick(e, '/projects')}>Projects</Link>
                        </div>
                        <div className="btn">
                            <Link href="/take-a-seat" onClick={(e) => handleLinkClick(e, '/take-a-seat')}>Take a seat</Link>
                        </div>
                    </div>
                </div>
                <div className="menu-footer">
                    <div className="menu-divider">
                        <div className="menu-footer-copy">
                            <div className="slogan"><p>Tomorrow's Brands, Today</p></div>
                            <div className="socials">
                                <a href="#">Twitter</a>
                                <a href="#">Instagram</a>
                                <a href="#">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;