import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

import styles from 'styles/ProjectBox.module.scss';

export default function ProjectBox(props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={'works#' + props.link}>
                <div className={styles.project_box_section}>
                    <div className={styles.background}>
                        {isHovered && (
                            <div className={styles.tooltip}>
                                <h2>{props.title}</h2>
                                <p>Click to view more about this project.</p>
                            </div>
                        )}
                        <Image 
                            src={props.img_src} 
                            className={styles.img}
                            width={100}
                            height={100}
                            alt="project cover"
                        />
                    </div>
                    <div className={styles.overlay}></div>
                </div>
            </Link>
        </div>
    );
}
