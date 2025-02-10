import { useState, useEffect, Dispatch, SetStateAction } from "react";
import MenuItem from "./NavbarItem";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "@/context/main.context";
import { motion } from "framer-motion";
import { MotionValue } from "framer-motion";

export type NavBarTab = "Home" | "Add question" | "About" | "Manage";
type NavBarPaths = "/" | "/add" | "/about" | "/manage";

const navBarTabs: NavBarItem[] = [
  {
    tab: "Home",
    path: "/",
  },
  {
    tab: "Add question",
    path: "/add",
  },
  {
    tab: "About",
    path: "/about",
  },
  {
    tab: "Manage",
    path: "/manage",
  },
];

export interface NavBarItem {
  tab: NavBarTab;
  path: NavBarPaths;
}

function Navbar({
  textSize,
  type = "desktop",
  closeShowMenu
}: {
  textSize: MotionValue<string>;
  type?: "desktop" | "mobile";
  closeShowMenu?: Dispatch<SetStateAction<boolean>>
}) {
  const [active, setActive] = useState<NavBarTab | null>(() => null);
  const { dispatch } = useQuestions();
  const navigate = useNavigate();

  const types = {
    desktop: "hidden md:flex",
    mobile: "flex md:hidden flex-col",
  };

  return (
    <motion.ul
      style={{ fontSize: textSize }}
      className={` ${types[type]} list-none items-center justify-between gap-4 p-4 text-primary`}
    >
      {navBarTabs.map((navBarItem) => {
        return (
          <MenuItem
            key={navBarItem.tab}
            navBarItem={navBarItem}
            isSelected={active === navBarItem.tab}
            setActive={setActive}
            handleClick={() => {
              dispatch({ type: "clear" });
              setActive(navBarItem.tab);
              navigate(`${navBarItem.path}`);
              closeShowMenu && closeShowMenu(false);
            }}
          />
        );
      })}
    </motion.ul>
  );
}

export default Navbar;
