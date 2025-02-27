// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import styles from "@/styles/Loader.module.scss";

// export default function Loader({ onFinish = () => {} }) {
//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setTimeout(() => {
//             setLoading(false);
//             onFinish();
//           }, 2000); // Delay for smooth transition
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 11); // Speed of loading

//     return () => clearInterval(interval);
//   }, [onFinish]);

//   return (
//     <AnimatePresence>
//       {loading && (
//         <motion.div
//           className={styles.loaderContainer}
//           initial={{ opacity: 1 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0, transition: { duration: 1 } }}
//         >
//           {/* Glowing Logo */}
//           <motion.div
//             className={styles.logo}
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           >
//             <span className={styles.glowText}>Welcome to RGB Design</span>
//           </motion.div>

//           {/* Pulsating Percentage */}
//           <motion.div
//             className={styles.percentage}
//             animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
//             transition={{ duration: 1, repeat: Infinity }}
//           >
//             {progress}%
//           </motion.div>

//           {/* Liquid Loading Bar */}
//           <motion.div className={styles.loadingBarWrapper}>
//             <motion.div
//               className={styles.loadingBar}
//               initial={{ width: "0%" }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.03, ease: "linear" }}
//             />
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/Loader.module.scss";
import Cookies from "js-cookie";

export default function Loader({ onFinish = () => {} }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(!Cookies.get("hasLoaded")); // Check if cookie exists

  useEffect(() => {
    if (!loading) {
      onFinish();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            Cookies.set("hasLoaded", "true"); // Cookie expires in 1 day
            onFinish();
          }, 1000); // Smooth transition delay
          return 100;
        }
        return prev + 1;
      });
    }, 11); // Speed of loading animation

    return () => clearInterval(interval);
  }, [loading, onFinish]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.loaderContainer}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <motion.div className={styles.logo}>
            <span className={styles.glowText}>Welcome to RGB Design</span>
          </motion.div>
          <motion.div className={styles.percentage}>{progress}%</motion.div>
          <motion.div className={styles.loadingBarWrapper}>
            <motion.div
              className={styles.loadingBar}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
