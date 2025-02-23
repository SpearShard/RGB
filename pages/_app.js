import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Layout from "@/components/Layout";
import SmoothScroll from "@/components/SmoothScroll";
import AOS from "aos";
import "aos/dist/aos.css";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  useEffect(() => {
    const pageKey = `visited_${router.pathname}`;
    const hasVisited = sessionStorage.getItem(pageKey);

    AOS.init({
      duration: 1000,
      once: true, // ✅ Ensures animations only happen once per visit
      disable: hasVisited !== null, // ✅ Disable animation if page has been visited
    });

    if (!hasVisited) {
      sessionStorage.setItem(pageKey, "true"); // ✅ Mark page as visited
    }
  }, [router.pathname]);

  return (
    <SmoothScroll>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SmoothScroll>
  );
}



