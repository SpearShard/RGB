// import Link from 'next/link';
// import InstagramIcon from '@mui/icons-material/Instagram';

// import styles from '@/styles/Contact.module.scss';

// export default function Contact() {
//     return (
//         <section className={styles.contact_container}>
//             <h2>Contact</h2>
//             <Link href="mailto:roshni@rgbdesign.in">
//                 <h3>roshni@rgbdesign.in</h3>
//             </Link>
//             <div className={styles.follow}>Follow us on</div> 
//             <Link href="https://www.instagram.com/rgb.designresearch">
//                 <InstagramIcon/>
//             </Link>
            
//         </section>
//     )
// }


"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import styles from "@/styles/Contact.module.scss";
import { useState, useEffect } from "react";

export default function Contact() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: (event.clientY / window.innerHeight) * 2 - 1,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className={styles.background}>
            {/* Animated Glow Overlay */}
            <div className={styles.glow}></div>

            <motion.div
                className={styles.contact_container}
                initial={{ opacity: 0, scale: 0.8, rotateX: 10, rotateY: -10 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotateX: mousePos.y * 5,
                    rotateY: mousePos.x * 5,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    className={styles.contact_block}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.h2
                        className={styles.glowing_text}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        Get In Touch
                    </motion.h2>
                    <Link href="mailto:roshni@rgbdesign.in">
                        <motion.h3
                            whileHover={{ scale: 1.1, color: "#CDE9C1" }}
                            transition={{ duration: 0.3 }}
                        >
                            roshni@rgbdesign.in
                        </motion.h3>
                    </Link>
                    <motion.div
                        className={styles.follow}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    >
                        Follow us on
                    </motion.div>
                    <Link href="https://www.instagram.com/rgb.designresearch">
                        <motion.div whileHover={{ scale: 1.2, color: "#E1306C" }} transition={{ duration: 0.3 }}>
                            <Instagram size={40} />
                        </motion.div>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
