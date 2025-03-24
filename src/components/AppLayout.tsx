import { Outlet, useLocation } from "react-router-dom";
import TagMain from "./TagMain";
import Header from "./Header";
import Footer from "./Footer";
import AnimationLayer from "./AnimationLayer";
import CanvasBackground from "./CanvasBackground";
import NoiseCanvas from "./NoiseCanvas";
import { useState, useEffect } from "react";
function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <div className="LAYOUT items-center text-textPrimary sticky flex w-full min-h-screen flex-col font-primary transition-colors duration-200 bg-backgroundPrimary ">
        <Header />
        <NoiseCanvas />
        <TagMain>
          <Outlet />
        </TagMain>

        <Footer />
      </div>
    </>
  );
}

export default AppLayout;

// body

// root

// layout
///header
///main
///footer
