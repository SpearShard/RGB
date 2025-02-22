// import {
//     Grid
// } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';

// import styles from '@/styles/WorksShowcase.module.scss';

// export default function WorksShowcase(props) {
//     let public_url = ''
//     // if(process.env.NODE_ENV == 'production') {
//     //     public_url = '/rgbdesign'
//     // }

//     function renderProjectGrid() {
//         let res = []
//         let data = props.data[props.theme]
//         data.projects.forEach((p, idx) => {
//             res.push(
//                 <Grid item xs={12} md={6} lg={6}>
//                     <Link href={"/works/" + p.title}>
//                         <div className={styles.img_container}>
//                             <Image 
//                                 className={styles.showcase_img}
//                                 src={public_url + "/images/projects/" + data.title + "/" + p.dir + "/" + p.cover} 
//                                 width="100" 
//                                 height="100"
//                                 alt="project image"
//                             />
//                             <span className={styles.overlay}>{p.title}</span>
//                         </div>
//                     </Link>
//                 </Grid>
//             )
//         })
//         return res
//     }

//     return (
//         <section id={props.theme} className={styles.works_showcase}>
//             <h1 className={styles.category_title}>{props.data[props.theme].title}</h1>
//             <Grid container spacing={3}>
//                 {renderProjectGrid()}
//             </Grid>
//         </section>
//     )
// }


import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Grid, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/WorksShowcase.module.scss';

export default function WorksShowcase(props) {
    let public_url = '';
    const router = useRouter(); // Get Next.js router

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    function renderProjectGrid() {
        let res = [];
        let data = props.data[props.theme];

        data.projects.forEach((p, idx) => {
            res.push(
                <Grid 
                    item 
                    xs={12} md={6} lg={6} 
                    key={idx} 
                    data-aos="fade-up" 
                    data-aos-delay={idx * 100} 
                >
                    <Link href={"/works/" + p.title}>
                        <div className={styles.img_container} data-aos="zoom-in">
                            <Image 
                                className={styles.showcase_img}
                                src={public_url + "/images/projects/" + data.title + "/" + p.dir + "/" + p.cover} 
                                width="100" 
                                height="100"
                                alt="project image"
                            />
                            <span className={styles.overlay} data-aos="fade-in" data-aos-delay={idx * 150}>
                                {p.title}
                            </span>
                        </div>
                    </Link>
                </Grid>
            );
        });

        return res;
    }

    return (
        <section id={props.theme} className={styles.works_showcase}>
            {/* ✅ "Go Back" Button Appears Only Once */}
            {/* <div className={styles.goBackContainer} data-aos="fade-left">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => router.back()} 
                    className={styles.goBackButton}
                >
                    Go Back
                </Button>
            </div> */}

            <h1 className={styles.category_title} data-aos="fade-up">
                {props.data[props.theme].title}
            </h1>

            <Grid container spacing={3}>
                {renderProjectGrid()}
            </Grid>
        </section>
    );
}
