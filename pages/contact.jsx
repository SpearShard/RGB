import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/Collision";
import styles from "@/styles/Contact.module.scss";

export default function Contact() {
    return (
        <BackgroundBeamsWithCollision className={styles.contactPage}>
            <motion.div 
                className={styles.contactCard}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className={styles.title}>Contact Us</h1>
                <p className={styles.description}>We’d love to hear from you!</p>
                <div className={styles.contactInfo}>
                    <Link href="mailto:roshni@rgbdesign.in" className={styles.contactItem}>
                        <Mail size={24} /> roshni@rgbdesign.in
                    </Link>
                    <Link href="tel:+1234567890" className={styles.contactItem}>
                        <Phone size={24} /> +1 (234) 567-890
                    </Link>
                    <Link href="https://www.instagram.com/rgb.designresearch" className={styles.contactItem}>
                        <Instagram size={24} /> @rgbdesign
                    </Link>
                </div>
            </motion.div>
        </BackgroundBeamsWithCollision>
    );
}



