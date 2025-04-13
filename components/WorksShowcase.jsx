import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/WorksShowcase.module.scss";

export default function WorksShowcase(props) {
    let public_url = "";
    const router = useRouter();
    const [preloaded, setPreloaded] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isGridView, setIsGridView] = useState(true);
    const containerRef = useRef(null);

    const getImageSrc = useMemo(() => {
        return (p) => `${public_url}/images/projects/${props.data[props.theme].title}/${p.dir}/${p.cover}`;
    }, [props.data, props.theme]);

    useEffect(() => {
        if (!preloaded) {
            props.data[props.theme].projects.slice(0, 6).forEach((p) => {
                if (p.cover) {
                    const img = new window.Image();
                    img.src = getImageSrc(p);
                }
            });
            setPreloaded(true);
        }
    }, [props.data, props.theme, getImageSrc, preloaded]);

    // Get category-specific elements
    const getCategoryColor = () => {
        const categoryTitle = props.data[props.theme].title;
        if (categoryTitle === "Material Experiments") return "#ff3333";
        if (categoryTitle === "Interiors & Furniture Design" || categoryTitle === "Interior and Furniture Design") return "#3333ff";
        if (categoryTitle === "Computational Design") return "#33ff33";
        return "#ffffff";
    };

    const getCategoryDescription = () => {
        const categoryTitle = props.data[props.theme].title;
        const descriptions = {
            "Material Experiments": "Pushing boundaries through innovative material explorations and techniques.",
            "Interiors & Furniture Design": "Creating functional spaces and objects that enhance human experience.",
            "Computational Design": "Leveraging algorithms and digital tools to discover new design possibilities."
        };
        
        return descriptions[categoryTitle] || `Explore our collection of ${categoryTitle} projects.`;
    };

    const projectItems = useMemo(() => {
        let projects = [...props.data[props.theme].projects];

        while (projects.length < 6) {
            projects.push(...props.data[props.theme].projects);
        }

        projects = projects.slice(0, 6);
        
        return projects;
    }, [props.data, props.theme]);

    const toggleView = () => {
        setIsGridView(!isGridView);
    };

    return (
        <motion.div 
            className={styles.showcaseContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            ref={containerRef}
        >
            <div className={styles.categoryBanner} style={{ borderColor: getCategoryColor() }}>
                <motion.div 
                    className={styles.categoryIcon}
                    style={{ backgroundColor: getCategoryColor() }}
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                />
                
                <div className={styles.categoryInfo}>
                    <motion.h1 
                        className={styles.categoryTitle}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {props.data[props.theme].title}
                    </motion.h1>
                    
                    <motion.p 
                        className={styles.categoryDescription}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        {getCategoryDescription()}
                    </motion.p>
                </div>
                
                <motion.button 
                    className={styles.viewToggle}
                    onClick={toggleView}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isGridView ? "List View" : "Grid View"}
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                {isGridView ? (
                    <motion.div 
                        key="grid"
                        className={styles.projectsGrid}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {projectItems.map((project, index) => (
                            <motion.div 
                                className={styles.projectCard}
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                            >
                                <Link href={`/works/${project.title}`} passHref>
                                    <div className={styles.cardContent}>
                                        {project.cover && (
                                            <div className={styles.imageWrapper}>
                                                <Image
                                                    src={getImageSrc(project)}
                                                    alt={project.title}
                                                    width={400}
                                                    height={300}
                                                    className={styles.projectImage}
                                                    priority={index < 2}
                                                />
                                                <div className={styles.imageOverlay} style={{ backgroundColor: `${getCategoryColor()}33` }}>
                                                    <span>View Project</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className={styles.projectInfo}>
                                            <h3>{project.title}</h3>
                                            <div className={styles.projectMeta}>
                                                <span className={styles.projectYear}>{project.year || "2023"}</span>
                                                <span className={styles.projectDot} style={{ backgroundColor: getCategoryColor() }}></span>
                                                <span className={styles.projectType}>{props.data[props.theme].title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="list"
                        className={styles.projectsList}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {projectItems.map((project, index) => (
                            <motion.div 
                                className={styles.listItem}
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ x: 10, backgroundColor: `${getCategoryColor()}11` }}
                            >
                                <Link href={`/works/${project.title}`} passHref>
                                    <div className={styles.listContent}>
                                        <span className={styles.projectNumber}>{(index + 1).toString().padStart(2, '0')}</span>
                                        <h3 className={styles.projectTitle}>{project.title}</h3>
                                        <div className={styles.projectArrow}>→</div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                className={styles.showcaseFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <div className={styles.footerLine} style={{ backgroundColor: getCategoryColor() }}></div>
                <p>Explore more {props.data[props.theme].title} projects</p>
            </motion.div>
        </motion.div>
    );
}



