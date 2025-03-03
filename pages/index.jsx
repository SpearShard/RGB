// import { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { Grid, Box } from "@mui/material";
// import Loader from "@/components/Loader";
// import Image from "next/image";
// import Link from "next/link";
// import IconButton from "@mui/material/IconButton";
// import EastIcon from "@mui/icons-material/East";

// import SDFAnimation from "@/components/SDFAnimation";
// import styles from "@/styles/Home.module.scss";
// import ProjectBox from "@/components/ProjectBox";

// import project_json from "../public/projects.json";

// export default function Home() {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const[isHovered, setIsHovered] = useState(false);

//     // ✅ Function to determine WebP or fallback image
//     const getImageSrc = (fileName) => {
//         return fileName.replace(/\.(jpg|jpeg|png)$/, ".webp");
//     };

//     // ✅ Preload WebP images if available
//     const preloadImages = () => {
//         project_json.projects_list.forEach((p) => {
//             const webpImg = new window.Image();
//             webpImg.src = getImageSrc(`/images/projects/${p.img_src}`);
//         });
//     };

//     useEffect(() => {
//         setProjects(project_json.projects_list);
//         preloadImages(); // Preload WebP images

//         setTimeout(() => {
//             setLoading(false);
//         }, 20);

//         // ✅ Initialize AOS only once
//         AOS.init({
//             duration: 400,
//             once: true,
//             easing: "ease-out",
//         });
//     }, []);

//     function renderProjectGrid() {
//         return projects.map((p, idx) => {
//             const webpSrc = getImageSrc(`/images/projects/${p.img_src}`);
//             const originalSrc = `/images/projects/${p.img_src}`;

//             return (
//                 <Grid key={idx} item xs={12} sm={6} md={4} className={styles.info_container}>
//                     <div data-aos="fade-up">
//                         <ProjectBox
//                             title={p.title}
//                             link={p.theme}
//                             img_src={webpSrc} // Use WebP version
//                             fallback={originalSrc} // Fallback for older browsers
//                             priority={idx < 4} // Preload first few images
//                             loading="lazy"
//                         />
//                     </div>
//                 </Grid>
//             );
//         });
//     }

//     return (
//         <>
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <section className={styles.home_section}>
//                     <section className={styles.hero_section}>
//                         <SDFAnimation className={`${styles.sdf_animation} sdf_animation`} data-aos="fade-up" />
//                         <div className={styles.hero_overlay}>
//                             <h1 className={styles.big_title} data-aos="fade-up">
//                                 INNOVATION.
//                             </h1>
//                             <h1 className={styles.big_title} data-aos="fade-up">
//                                 RESEARCH.
//                             </h1>
//                             <h1 className={styles.big_title} data-aos="fade-up">
//                                 DESIGN.
//                             </h1>
//                         </div>
//                     </section>

//                     <section className={styles.about_section}>
//                         <Grid container spacing={4}>
//                             <Grid item xs={12} md={6} className={styles.info_container}>
//                                 <h3 data-aos="fade-up">RGB DESIGN</h3>
//                                 <h2 data-aos="fade-up">
//                                     WHERE DESIGN, TECH, AND NATURE CONVERGE. INNOVATING SUSTAINABLE, STRIKING FUTURES.
//                                 </h2>
//                                 <IconButton size="large" edge="start" color="inherit" aria-label="menu">
//                                     <Link href="/about" style={{ color: "#ffffff" }}>
//                                         <EastIcon />
//                                     </Link>
//                                 </IconButton>
//                             </Grid>
//                             <Grid item xs={12} md={6} className={`${styles.info_container} ${styles.para}`}>
//                                 <p data-aos="fade-up">
//                                     At RGB Design, we merge Design and Technology with <br />
//                                     Natural Intelligence and Computational innovation to <br />
//                                     creatively tackle design challenges.
//                                 </p>
//                                 <p data-aos="fade-up">
//                                     <span className="highlight_green">
//                                         <b>Our mission:</b> to blend form and function, delivering sustainable,
//                                         technologically forward, and visually striking design solutions.
//                                     </span>
//                                     We're driven to inspire change and progress, crafting designs that impact both
//                                     society and the environment positively.
//                                 </p>
//                                 <p data-aos="fade-up">Welcome to the future of design!</p>
//                             </Grid>
//                         </Grid>
//                     </section>

//                     <section className={styles.work_section}>
//                         <div className={styles.title_container}>
//                             <h1 className={styles.title} data-aos="fade-up">
//                                 EXPLORE OUR WORK
//                             </h1>
//                         </div>

//                         <Grid container spacing={2}>{renderProjectGrid()}</Grid>
//                     </section>
//                 </section>
//             )}
//         </>
//     );
// }


import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Grid, Box } from "@mui/material";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import EastIcon from "@mui/icons-material/East";

import SDFAnimation from "@/components/SDFAnimation";
import styles from "@/styles/Home.module.scss";
import ProjectBox from "@/components/ProjectBox";

import project_json from "../public/projects.json";

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setProjects(project_json.projects_list);

        setTimeout(() => {
            setLoading(false);
        }, 20);

        // ✅ Initialize AOS only once
        AOS.init({
            duration: 400,
            once: true,
            easing: "ease-out",
        });
    }, []);

    function renderProjectGrid() {
        return projects.map((p, idx) => {
            const originalSrc = `/images/projects/${p.img_src}`; // Use normal images

            return (
                <Grid key={idx} item xs={12} sm={6} md={4} className={styles.info_container}>
                    <div data-aos="fade-up">
                        <ProjectBox
                            // title={p.title}
                            // link={p.theme}
                            img_src={originalSrc} // ✅ Use normal image
                            priority={idx < 4} // Preload first few images
                            loading="lazy"
                        />
                    </div>
                </Grid>
            );
        });
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
                            <h1 className={styles.big_title} data-aos="fade-up">
                                INNOVATION.
                            </h1>
                            <h1 className={styles.big_title} data-aos="fade-up">
                                RESEARCH.
                            </h1>
                            <h1 className={styles.big_title} data-aos="fade-up">
                                DESIGN.
                            </h1>
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
                                    <Link href="/about" style={{ color: "#ffffff" }}>
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
                                    <span className="highlight_green">
                                        <b>Our mission:</b> to blend form and function, delivering sustainable,
                                        technologically forward, and visually striking design solutions.
                                    </span>
                                    We're driven to inspire change and progress, crafting designs that impact both
                                    society and the environment positively.
                                </p>
                                <p data-aos="fade-up">Welcome to the future of design!</p>
                            </Grid>
                        </Grid>
                    </section>

                    <section className={styles.work_section}>
                        <div className={styles.title_container}>
                            <h1 className={styles.title} data-aos="fade-up">
                                EXPLORE OUR WORK
                            </h1>
                        </div>

                        <Grid container spacing={2}>{renderProjectGrid()}</Grid>
                    </section>
                </section>
            )}
        </>
    );
}

