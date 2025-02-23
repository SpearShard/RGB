// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// import { Grid, Button } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';

// import styles from '@/styles/WorksShowcase.module.scss';

// export default function WorksShowcase(props) {
//     let public_url = '';
//     const router = useRouter(); // Get Next.js router

//     useEffect(() => {
//         AOS.init({
//             duration: 1000,
//             once: true,
//         });
//     }, []);

//     function renderProjectGrid() {
//         let res = [];
//         let data = props.data[props.theme];

//         data.projects.forEach((p, idx) => {
//             res.push(
//                 <Grid 
//                     item 
//                     xs={12} md={6} lg={6} 
//                     key={idx} 
//                     data-aos="fade-up" 
//                     data-aos-delay={idx * 100} 
//                 >
//                     <Link href={"/works/" + p.title}>
//                         <div className={styles.img_container} data-aos="zoom-in">
//                             <Image 
//                                 className={styles.showcase_img}
//                                 src={public_url + "/images/projects/" + data.title + "/" + p.dir + "/" + p.cover} 
//                                 width="100" 
//                                 height="100"
//                                 alt="project image"
//                             />
//                             <span className={styles.overlay} data-aos="fade-in" data-aos-delay={idx * 150}>
//                                 {p.title}
//                             </span>
//                         </div>
//                     </Link>
//                 </Grid>
//             );
//         });

//         return res;
//     }

//     return (
//         <section id={props.theme} className={styles.works_showcase}>
//             {/* ✅ "Go Back" Button Appears Only Once */}
//             {/* <div className={styles.goBackContainer} data-aos="fade-left">
//                 <Button 
//                     variant="contained" 
//                     color="primary" 
//                     onClick={() => router.back()} 
//                     className={styles.goBackButton}
//                 >
//                     Go Back
//                 </Button>
//             </div> */}

//             <h1 className={styles.category_title} data-aos="fade-up">
//                 {props.data[props.theme].title}
//             </h1>

//             <Grid container spacing={3}>
//                 {renderProjectGrid()}
//             </Grid>
//         </section>
//     );
// }


import { useMemo } from "react"; 
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import styles from "@/styles/WorksShowcase.module.scss";

export default function WorksShowcase(props) {
    let public_url = "";
    const router = useRouter();

    // ✅ Memoized Image URL Generator
    const getImageSrc = useMemo(() => {
        return (p) => `${public_url}/images/projects/${props.data[props.theme].title}/${p.dir}/${p.cover}`;
    }, [props.data, props.theme]);

    // ✅ Memoized project grid
    const projectGrid = useMemo(() => {
        return props.data[props.theme].projects.map((p, idx) => (
            <Grid item xs={12} md={6} lg={6} key={idx}>
                <Link href={`/works/${p.title}`} passHref>
                    <motion.div
                        className={styles.img_container}
                        initial={{ opacity: 0, y: 20 }} // Simpler fade-up effect
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Image
                                className={styles.showcase_img}
                                src={getImageSrc(p)}
                                width={100}
                                height={100}
                                alt="project image"
                                loading="lazy"
                            />
                        </motion.div>

                        {/* ✅ Project Title Animation */}
                        <motion.span
                            className={styles.overlay}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                        >
                            {p.title}
                        </motion.span>
                    </motion.div>
                </Link>
            </Grid>
        ));
    }, [props.data, props.theme, getImageSrc]);

    return (
        <section id={props.theme} className={styles.works_showcase} style={{ padding: "clamp(20px, 5vw, 60px)" }}> 
            {/* ✅ Title Animation */}
            <motion.h1
                className={styles.category_title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {props.data[props.theme].title}
            </motion.h1>

            {/* ✅ Project Grid */}
            <Grid container spacing={2}>
                {projectGrid}
            </Grid>
        </section>
    );
}
