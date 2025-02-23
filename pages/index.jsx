// import { useEffect, useState } from 'react';
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { Grid, Box } from '@mui/material';
// import Loader from "@/components/Loader";
// import gsap from "gsap";
// import Image from 'next/image';
// import Link from 'next/link';
// import IconButton from '@mui/material/IconButton';
// import EastIcon from '@mui/icons-material/East';

// import SDFAnimation from '@/components/SDFAnimation';
// import styles from '@/styles/Home.module.scss';
// import ProjectBox from '@/components/ProjectBox';

// import project_json from '../public/projects.json';

// export default function Home() {
//     const [projects, setProjects] = useState(undefined);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setProjects(project_json['projects_list']);

//         // Simulate loader completion
//         setTimeout(() => {
//             setLoading(false);
//             setTimeout(() => {
//                 AOS.refreshHard(); // 🔥 Reinitialize AOS when Loader disappears
//             }, 100);
//         }, 2000); // Adjusted loader duration to 2s for faster loading

//         AOS.init({
//             duration: 800, // Reduced duration for smoother animations
//             once: true, // Prevents re-triggering animations unnecessarily
//         });

//     }, []);

//     useEffect(() => {
//         let timeout = setTimeout(() => {
//             gsap.to(".sdf_animation", { opacity: 1, duration: 1 });
//         }, 1000); // Reduced from 2500ms to 1000ms for quicker execution

//         return () => clearTimeout(timeout); // Cleanup to prevent memory leaks
//     }, []);

//     function renderProjectGrid(projects) {
//         if (projects) {
//             return projects.map((p, idx) => (
//                 <Grid key={idx} item xs={12} md={6} lg={6} className={styles.info_container}>
//                     <div data-aos="fade-up" data-aos-delay={`${Math.min(idx * 50, 300)}`}>
//                         <ProjectBox
//                             title={p.title}
//                             link={p.theme}
//                             img_src={"/images/projects/" + p.img_src}
//                             priority={idx < 2} // Load only the first 2 images immediately
//                             loading="lazy" // Defer loading for other images
//                         />
//                     </div>
//                 </Grid>
//             ));
//         }
//     }

//     return (
//         <>
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <section className={styles.home_section}>
//                     <section className={styles.hero_section}>
//                         <SDFAnimation className={styles.sdf_animation} data-aos="zoom-in" />
//                         <div className={styles.hero_overlay}>
//                             <h1 className={styles.big_title} data-aos="fade-up">INNOVATION.</h1>
//                             <h1 className={styles.big_title} data-aos="fade-up" data-aos-delay="100">RESEARCH.</h1>
//                             <h1 className={styles.big_title} data-aos="fade-up" data-aos-delay="200">DESIGN.</h1>
//                         </div>
//                     </section>

//                     <section className={styles.about_section}>
//                         <Grid container spacing={8}>
//                             <Grid item xs={12} md={6} lg={6} className={styles.info_container}>
//                                 <h3 data-aos="fade-right">RGB DESIGN</h3>
//                                 <h2 data-aos="fade-right" data-aos-delay="100">
//                                     WHERE DESIGN, TECH, AND NATURE CONVERGE. INNOVATING SUSTAINABLE, STRIKING FUTURES.
//                                 </h2>
//                                 <IconButton size="large" edge="start" color="inherit" aria-label="menu">
//                                     <Link href="/about" style={{ color: '#ffffff' }}>
//                                         <EastIcon />
//                                     </Link>
//                                 </IconButton>
//                             </Grid>
//                             <Grid item xs={12} md={6} lg={6} className={styles.info_container + ' ' + styles.para}>
//                                 <p data-aos="fade-left">
//                                     At RGB Design, we merge Design and Technology with <br />
//                                     Natural Intelligence and Computational innovation to <br />
//                                     creatively tackle design challenges.
//                                 </p>
//                                 <p data-aos="fade-left" data-aos-delay="100">
//                                     <span className="highlight_green"><b>Our mission:</b> to blend form and function, delivering sustainable, 
//                                     technologically forward, and visually striking design solutions.</span>
//                                     We're driven to inspire change and progress, crafting designs that impact both society and the environment positively.
//                                 </p>
//                                 <p data-aos="fade-left" data-aos-delay="200">Welcome to the future of design!</p>
//                             </Grid>
//                         </Grid>
//                     </section>

//                     <section className={styles.work_section}>
//                         <div className={styles.title_container}>
//                             <h1 className={styles.title} data-aos="fade-up">EXPLORE OUR WORK</h1>
//                         </div>

//                         <Grid container spacing={2}>
//                             {renderProjectGrid(projects)}
//                         </Grid>
//                     </section>
//                 </section>
//             )}
//         </>
//     );
// }



import { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Grid, Box } from '@mui/material';
import Loader from "@/components/Loader";
import gsap from "gsap";
import Image from 'next/image';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import EastIcon from '@mui/icons-material/East';

import SDFAnimation from '@/components/SDFAnimation';
import styles from '@/styles/Home.module.scss';
import ProjectBox from '@/components/ProjectBox';

import project_json from '../public/projects.json';

export default function Home() {
    const [projects, setProjects] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setProjects(project_json['projects_list']);

        setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
                AOS.refreshHard();
            }, 100);
        }, 2000);

        AOS.init({
            duration: 600,
            once: true,
        });
    }, []);

    function renderProjectGrid(projects) {
        if (projects) {
            return projects.map((p, idx) => (
                <Grid key={idx} item xs={12} sm={6} md={4} className={styles.info_container}>
                    <div data-aos="fade-up">
                        <ProjectBox
                            title={p.title}
                            link={p.theme}
                            img_src={"/images/projects/" + p.img_src}
                            priority={idx < 2}
                            loading="lazy"
                        />
                    </div>
                </Grid>
            ));
        }
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <section className={styles.home_section}>
                    <section className={styles.hero_section}>
                        <SDFAnimation className={`${styles.sdf_animation} sdf_animation`} data-aos="fade-up" />
                        <div className={styles.hero_overlay}>
                            <h1 className={styles.big_title} data-aos="fade-up">INNOVATION.</h1>
                            <h1 className={styles.big_title} data-aos="fade-up">RESEARCH.</h1>
                            <h1 className={styles.big_title} data-aos="fade-up">DESIGN.</h1>
                        </div>
                    </section>

                    <section className={styles.about_section}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6} className={styles.info_container}>
                                <h3 data-aos="fade-up">RGB DESIGN</h3>
                                <h2 data-aos="fade-up">
                                    WHERE DESIGN, TECH, AND NATURE CONVERGE. INNOVATING SUSTAINABLE, STRIKING FUTURES.
                                </h2>
                                <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                                    <Link href="/about" style={{ color: '#ffffff' }}>
                                        <EastIcon />
                                    </Link>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} md={6} className={`${styles.info_container} ${styles.para}`}>
                                <p data-aos="fade-up">
                                    At RGB Design, we merge Design and Technology with <br />
                                    Natural Intelligence and Computational innovation to <br />
                                    creatively tackle design challenges.
                                </p>
                                <p data-aos="fade-up">
                                    <span className="highlight_green"><b>Our mission:</b> to blend form and function, delivering sustainable, 
                                    technologically forward, and visually striking design solutions.</span>
                                    We're driven to inspire change and progress, crafting designs that impact both society and the environment positively.
                                </p>
                                <p data-aos="fade-up">Welcome to the future of design!</p>
                            </Grid>
                        </Grid>
                    </section>

                    <section className={styles.work_section}>
                        <div className={styles.title_container}>
                            <h1 className={styles.title} data-aos="fade-up">EXPLORE OUR WORK</h1>
                        </div>

                        <Grid container spacing={2}>
                            {renderProjectGrid(projects)}
                        </Grid>
                    </section>
                </section>
            )}
        </>
    );
}


