import React from "react";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolio";
import Conatact from "./pages/Contact";
import TeamProject from "./pages/TeamProject";

const HomeView = () => {
  return (
    <>
      <Home />
      <AboutMe />
      <TeamProject />
      <Portfolio />
      <Conatact />
    </>
  );
};

export default HomeView;
