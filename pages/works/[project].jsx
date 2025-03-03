import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";

import projectsData from "public/projects.json";
import styles from "styles/WorksDetails.module.scss";

export default function WorksDetails() {
    const { project } = useRouter().query;
    const [projectDetails, setProjectDetails] = useState(undefined);

    useEffect(() => {
        if (project) {
            for (const [theme, data] of Object.entries(projectsData)) {
                if (theme === "projects_list") continue;
                data.projects.forEach((p) => {
                    if (p.title === project) {
                        setProjectDetails({ project: p, theme: data.title });
                    }
                });
            }
        }
    }, [project]);

    function renderProject() {
        if (!projectDetails) return null;

        let { project, theme } = projectDetails;

        return (
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                className={styles.description_container}
            >
                {/* Title & Subtitle Animations */}
                <motion.h1 variants={fadeUpVariant} className={styles.title}>
                    {project.title}
                </motion.h1>

                <motion.h2 variants={fadeUpVariant} className={styles.subtitle}>
                    {project.subtitle}
                </motion.h2>

                {/* Project Description (Staggered Text Animations) */}
                {project.description.map((d, idx) => (
                    <motion.p
                        key={idx}
                        variants={fadeUpVariant}
                        className={styles.description}
                        transition={{ delay: idx * 0.1 }}
                    >
                        {d}
                    </motion.p>
                ))}

                {/* Images Grid with Slide-Up Animation */}
                {project.images.length > 0 && (
                    <Grid container spacing={2}>
                        {project.images.map((img, idx) => (
                            <Grid key={idx} item xs={12} md={6} lg={6}>
                                <SlideUpImage
                                    src={`/images/projects/${theme}/${project.dir}/${img}`}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </motion.div>
        );
    }

    return <section className={styles.work_details_container}>{renderProject()}</section>;
}

// Framer Motion Variants for Fade-Up Effect
const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// Slide-Up Image Component
const SlideUpImage = ({ src }) => {
    return (
        <motion.div
            className={styles.imageContainer}
            variants={slideUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // Ensures animation happens only once
        >
            <Image className={styles.cover_img} src={src} width={800} height={600} alt="project image" />
        </motion.div>
    );
};

// Slide-Up Animation Variant
const slideUpVariant = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

