import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';

import styles from '@/styles/Contact.module.scss';

export default function Contact() {
    return (
        <section className={styles.contact_container}>
            <h2>Contact</h2>
            <Link href="mailto:roshni@rgbdesign.in">
                <h3>roshni@rgbdesign.in</h3>
            </Link>
            <div className={styles.follow}>Follow us on</div> 
            <Link href="https://www.instagram.com/rgb.designresearch">
                <InstagramIcon/>
            </Link>
            
        </section>
    )
}
