// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import styles from "@/styles/WorksShowcase.module.scss";

// export default function WorksShowcase(props) {
//     let public_url = "";
//     const router = useRouter();
//     const [preloaded, setPreloaded] = useState(false);

//     // ✅ Memoized Image URL Generator
//     const getImageSrc = useMemo(() => {
//         return (p) => `${public_url}/images/projects/${props.data[props.theme].title}/${p.dir}/${p.cover}`;
//     }, [props.data, props.theme]);

//     // ✅ Prefetch Images (Only for First Few for Performance)
//     useEffect(() => {
//         if (!preloaded) {
//             props.data[props.theme].projects.slice(0, 4).forEach((p) => {
//                 if (p.cover) {
//                     const img = new window.Image();
//                     img.src = getImageSrc(p);
//                 }
//             });
//             setPreloaded(true);
//         }
//     }, [props.data, props.theme, getImageSrc, preloaded]);

//     // ✅ Memoized Project Grid
//     const projectGrid = useMemo(() => {
//         return props.data[props.theme].projects
//             .filter((p) => p.cover) // Remove empty grid spaces
//             .map((p, idx) => (
//                 <div className={styles.box} key={idx}>
//                     <Link href={`/works/${p.title}`} passHref>
//                         <motion.div
//                             className={styles.img_container}
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             whileInView={{ opacity: 1, scale: 1 }}
//                             viewport={{ once: true, amount: 0.3 }} // Lower amount improves performance
//                             transition={{ duration: 0.5, ease: "easeOut" }}
//                         >
//                             <Image
//                                 className={styles.showcase_img}
//                                 src={getImageSrc(p)}
//                                 width={300}
//                                 height={200}
//                                 alt={p.title}
//                                 {...(idx < 2 ? { priority: true } : { loading: "lazy" })} // ✅ FIXED
//                                 placeholder="blur"
//                                 blurDataURL="data:image/svg+xml;base64,..." // ✅ Improve lazy loading UX
//                                 style={{ objectFit: "cover", width: "100%", height: "100%" }}
//                             />

//                             <motion.span
//                                 className={styles.overlay}
//                                 initial={{ opacity: 0 }}
//                                 whileHover={{ opacity: 1 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 {p.title}
//                             </motion.span>
//                         </motion.div>
//                     </Link>
//                 </div>
//             ));
//     }, [props.data, props.theme, getImageSrc]);

//     return (
//         <div className={styles.con}>
//             <div className={styles.Block}>
//                 {/* Display Category Title */}
//                 <h2 className={styles.categoryTitle}>{props.data[props.theme].title}</h2>
//                 <section id={props.theme} className={styles.works_showcase}>
//                     <div className={styles.container}>
//                         <div className={styles.row}>{projectGrid}</div>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// }


import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "@/styles/WorksShowcase.module.scss";

export default function WorksShowcase(props) {
    let public_url = "";
    const router = useRouter();
    const [preloaded, setPreloaded] = useState(false);

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

    const projectGrid = useMemo(() => {
        let projects = [...props.data[props.theme].projects];

        while (projects.length < 6) {
            projects.push(...props.data[props.theme].projects); // Repeat images if less than 6
        }

        projects = projects.slice(0, 6); // Ensure exactly 6 images

        return projects.map((p, idx) => (
            <div className={styles.box} key={idx}>
                {p.cover ? (
                    <Link href={`/works/${p.title}`} passHref>
                        <motion.div
                            className={styles.img_container}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Image
                                className={styles.showcase_img}
                                src={getImageSrc(p)}
                                width={300}
                                height={200}
                                alt={p.title}
                                {...(idx < 2 ? { priority: true } : { loading: "lazy" })}
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml;base64,..." 
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />
                        </motion.div>
                    </Link>
                ) : null}
            </div>
        ));
    }, [props.data, props.theme, getImageSrc]);

    return (
        <div className={styles.con}>
            <div className={styles.Block}>
                <div className={styles.textContainer}>
                    <h2 className={styles.categoryTitle}>{props.data[props.theme].title}</h2>
                    <p className={styles.description}>
                        This category showcases projects related to {props.data[props.theme].title}. Browse through the works to explore more.
                    </p>
                </div>

                <section id={props.theme} className={styles.works_showcase}>
                    <div className={styles.container}>
                        <div className={styles.row}>{projectGrid}</div>
                    </div>
                </section>
            </div>
        </div>
    );
}

