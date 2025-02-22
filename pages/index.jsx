import { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import {
    Grid,
    Box
} from '@mui/material';
import Loader from "@/components/Loader";
import gsap from "gsap";
import Image from 'next/image';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import EastIcon from '@mui/icons-material/East';

import TextBox from '@/components/TextBox';
import SDFAnimation from '@/components/SDFAnimation';

import styles from '@/styles/Home.module.scss';
import ProjectBox from '@/components/ProjectBox';

import project_json from '../public/projects.json';

export default function Home() {
    const [projects, setProjects] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setProjects(project_json['projects_list']);

        // Simulate loader completion
        setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
                AOS.refreshHard(); // 🔥 Reinitialize AOS when Loader disappears
            }, 100); 
        }, 2500); // Adjust loader duration here

        AOS.init({
            duration: 1000, // Adjust animation speed
            once: false, // Set to true if you want animations only once
        });

    }, []);

    useEffect(() => {
        setTimeout(() => {
            gsap.to(".sdf_animation", {opacity:1, duration:1});
        }, 2500)
    }, []);

    function renderProjectGrid(projects) {
        if (projects) {
            return projects.map((p, idx) => (
                <Grid key={idx} item xs={12} md={6} lg={6} className={styles.info_container}>
                    <div data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
                        <ProjectBox
                            title={p.title}
                            link={p.theme}
                            img_src={"/images/projects/" + p.img_src}
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
                        <SDFAnimation className={styles.sdf_animation} data-aos="zoom-in" data-aos-delay="200" />
                        <div className={styles.hero_overlay}>
                            <h1 className={styles.big_title} data-aos="fade-up" data-aos-delay="100">INNOVATION.</h1>
                            <h1 className={styles.big_title} data-aos="fade-up" data-aos-delay="200">RESEARCH.</h1>
                            <h1 className={styles.big_title} data-aos="fade-up" data-aos-delay="300">DESIGN.</h1>
                        </div>
                    </section>

                    <section className={styles.about_section}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} md={6} lg={6} className={styles.info_container}>
                                <h3 data-aos="fade-right">RGB DESIGN</h3>
                                <h2 data-aos="fade-right" data-aos-delay="100">WHERE DESIGN, TECH, AND NATURE CONVERGE. INNOVATING SUSTAINABLE, STRIKING FUTURES.</h2>

                                <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                                    <Link href="/about" style={{ color: '#ffffff' }}>
                                        <EastIcon />
                                    </Link>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} className={styles.info_container + ' ' + styles.para}>
                                <p data-aos="fade-left" data-aos-delay="100">
                                    At RGB Design, we merge Design and Technology with 
                                    <br />Natural Intelligence and Computational innovation to
                                    <br />creatively tackle design challenges.
                                </p>
                                <p data-aos="fade-left" data-aos-delay="200">
                                    <span className="highlight_green"><b>Our mission:</b> to blend form and function, delivering sustainable, technologically forward, and visually striking design solutions.</span>
                                    We're driven to inspire change and progress, crafting designs that impact both society and the environment positively.
                                </p>
                                <p data-aos="fade-left" data-aos-delay="300">Welcome to the future of design!</p>
                            </Grid>
                        </Grid>
                    </section>

                    <section className={styles.work_section}>
                        <div className={styles.title_container}>
                            <h1 className={styles.title} data-aos="fade-up">EXPLORE OUR WORK</h1>
                        </div>

                        <Grid container spacing={2} rowSpacing={0}>
                            {renderProjectGrid(projects)}
                        </Grid>
                    </section>
                </section>
            )}
        </>
    );
}
