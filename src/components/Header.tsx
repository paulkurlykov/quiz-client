import Navbar from "./Navbar";
import Switch from "./Switch";
import { useState } from "react";
import { useDarkModeContext } from "@/context/darkMode.context";
import { DarkModeProvider } from "@/context/darkMode.context";
import { motion, useScroll, useTransform } from "framer-motion";
import { TbMenuDeep } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import Logo from "./Logo";
import { Divider } from "antd";
import MobileMenu from "./MobileMenu";

function Header() {

    const [showMenu, setShowMenu] = useState<boolean>(false);

  const { scrollY } = useScroll();

  // Высота хедера (от 100px до 60px)
  const height = useTransform(scrollY, [0, 100], ["100px", "60px"]);

  // Прозрачность (от 1 до 0.8)
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8]);

  // Размер шрифта (от 24px до 18px)
  const fontSize = useTransform(scrollY, [0, 100], ["30px", "22px"]);

  const boxShadow = useTransform(scrollY, [0, 100], ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 10px rgba(0,0,0,0.1)"]);

  const { isDark, toggleDarkMode } = useDarkModeContext();
  return (
    <>
    <motion.header style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        height,
        backdropFilter: "blur(10px)",
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.3s ease",
        boxShadow,
        zIndex: 1000
    }} className="h-64 px-16  md:px-48 xl:px-64 w-full text-6xl">
        <Logo/>
      <Navbar textSize={fontSize} />
      <Switch addStyles="hidden md:block" checked={isDark} onChange={toggleDarkMode} />
      <TbMenuDeep onClick={() => setShowMenu(true)} className="cursor-pointer active:scale-95 block md:hidden" />
    </motion.header>

    <MobileMenu showMenu={showMenu} onClose={setShowMenu} > <div className="absolute z-[9000] w-full h-full inset-0 flex flex-col justify-start pt-32 gap-64 items-center" >
      <Switch addStyles="block md:hidden" checked={isDark} onChange={toggleDarkMode} />
        <Navbar closeShowMenu={setShowMenu} type="mobile" textSize={fontSize} />
        </div> </MobileMenu>
          </>
  );
}

export default Header;
