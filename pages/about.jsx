import {
    Grid
} from '@mui/material';

import TextBox from '@/components/TextBox';
import WorksBox from '@/components/WorksBox';

import materialLogo from '@/public/images/icons/material.svg';
import computationLogo from '@/public/images/icons/computation.svg';
import intelligenceLogo from '@/public/images/icons/natural_intelligence.svg';

import styles from '@/styles/About.module.scss';

export default function About() {
    return (
        <section className={styles.works_container} color="blue">
            <Grid container spacing={3} gap="1em" justifyContent="center">
                <Grid item xs={12} md={4} lg={4} className={`${styles.worksBox} ${styles.red}`}>
                    <WorksBox
                        title={'Material Experiments'}
                        description={"Embarking on a journey of material innovation at RGB Design! From pioneering research to hands-on experimentation, we're committed to pushing boundaries and harnessing the full potential of every material. Join us as we explore new frontiers in design and unleash the power of innovation, one molecule at a time."}
                        img_src={materialLogo}
                        style={'red'}
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4} className={`${styles.worksBox} ${styles.green}`}
                >
                    <WorksBox
                        title={'Computational Design'}
                        description={"Fueling design excellence with computational prowess and digital fabrication: Our workflow thrives on the use of cutting edge technology, leveraging computational design to optimize efficiency and drive innovation."}
                        img_src={computationLogo}
                        style={'green'}
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4} className={`${styles.worksBox} ${styles.blue}`}
                >
                    <WorksBox
                        title={'Multi Disciplinary Design'}
                        description={"As multi-disciplinary designers and design enthusiasts, we thrive on exploring the endless possibilities within every realm of design. Whether it's crafting captivating spaces, sculpting furniture, dreaming up innovative products, or even shaping exquisite jewelry, we're all about pushing boundaries. Join us on this journey of creativity and exploration!"}
                        img_src={intelligenceLogo}
                        style={'blue'}
                    />
                </Grid>
            </Grid>

            <section className={styles.about}>
                <h1>Designing Futures</h1>
                <h2 className={styles.about_text}>
                    RGB Design stands at the forefront of innovation, where the fusion of design, technology,
                    natural systems, and computational design converges to craft creative and sustainable solutions
                    to global challenges.
                </h2>
                <h2 className={styles.about_text}>
                    Our mission is to harness the power of these disciplines, blending aesthetics with functionality,
                    to develop projects that are not only visually compelling but also environmentally responsible
                    and technologically advanced.
                </h2>
                <h2 className={styles.about_text}>
                    At RGB Design, we believe in the transformative power of design to inspire change, drive progress,
                    and create a better future for our planet.
                </h2>
            </section>

        </section>
    )
}
