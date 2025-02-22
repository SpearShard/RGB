import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import Box from "@mui/material/Box";
import styles from "@/styles/Header.module.scss";

import RGBLogo from "@/public/images/logo_.svg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false); // Track when to show header
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // Delay header appearance after the loader (matches the loader duration)
    const timer = setTimeout(() => {
      setShowHeader(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "WORK", path: "/works" },
    { name: "CONTACT", path: "/contact" },
  ];

  if (!showHeader) return null; // Don't render header until loader is done

  return (
    <motion.nav
      className={styles.header_container}
      initial={{ y: -100, opacity: 0 }} // Start off-screen
      animate={{ y: 0, opacity: 1 }} // Slide down
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
    >
      <AppBar position="fixed" sx={{ backgroundColor: "#000000d0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image src={RGBLogo} alt="RGB Design Logo" width={100} height={40} priority />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box component="ul" className={styles.navLinks}>
              {navLinks.map(({ name, path }) => (
                <li key={name}>
                  <Link href={path}>{name}</Link>
                </li>
              ))}
              <Link href="https://www.instagram.com/rgb.designresearch" target="_blank">
                <InstagramIcon sx={{ fontSize: 28, marginLeft: 1 }} />
              </Link>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, padding: "20px" }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <ul className={styles.drawerMenuContainer}>
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link href={path}>{name}</Link>
              </li>
            ))}
            <Link href="https://www.instagram.com/rgb.designresearch" target="_blank">
              <InstagramIcon sx={{ fontSize: 30 }} />
            </Link>
          </ul>
        </Box>
      </Drawer>
    </motion.nav>
  );
}
