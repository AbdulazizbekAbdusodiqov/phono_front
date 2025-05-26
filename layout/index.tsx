import React, { FC } from "react";
import "./layout.scss";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div className="layout-wrapper">
      <div>
        <Navbar />
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
