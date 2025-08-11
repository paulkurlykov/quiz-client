import { Outlet, useLocation } from "react-router-dom";
import TagMain from "./TagMain";
import Header from "./Header";
import Footer from "./Footer";
import NoiseCanvas from "./NoiseCanvas";
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
