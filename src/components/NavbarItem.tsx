import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NavBarItem, NavBarTab } from "./Navbar";
import { useDarkModeContext } from "@/context/darkMode.context";


interface NavBarItemProps {
  navBarItem: NavBarItem;
  isSelected: boolean;
  handleClick: () => void;
  setActive: (value: NavBarItem["tab"]) => void;
}

function NavbarItem({
  navBarItem,
  isSelected,
  handleClick,
  setActive,
}: NavBarItemProps) {
  const { pathname } = useLocation();

  const {isDark} = useDarkModeContext();

  useEffect(() => {
    if (navBarItem?.path === pathname) {
      setActive(navBarItem.tab);
    }

    if (pathname === "/quiz") {
      setActive(null!);
    }
  }, [navBarItem, pathname]);

  const variants = {
    light: { color: "var(--textDark)" },
    dark: { color: "var(--textLightAccent)" },
    activeDark: { color: "#8DFFF9" },
    activeLight: { color: "#4DCCC9" },
  };

  return (
    <motion.li
      onClick={handleClick}
      className=" flex flex-col relative font-extrabold justify-center items-center gap-[5px] mx-[.5rem]" 
      variants={variants}
      initial={isDark ? "dark" : "light"}
      animate={isSelected ? (isDark ? "activeDark" : "activeLight") : (isDark ? "dark" : "light")}
    >
      <a className="block w-full" href="#">
        {navBarItem.tab}
      </a>
      {isSelected && <ActiveLine />}
    </motion.li>
  );
}

export default NavbarItem;

function ActiveLine() {
  return (
    <motion.div
    className={`w-full h-[4px] absolute -bottom-[6px] bg-accentHover dark:bg-accent `}
      layoutId="activeTab"
    ></motion.div>
  );
}
