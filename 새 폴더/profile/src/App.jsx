// App.js
import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "../src/styles/Theme";
import Layout from "./Layout";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "aboutme", element: <AboutMe /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "portfolio/:id", element: <PortfolioDetail /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* {loading ? <LoadingScreen /> : <RouterProvider router={router} />} */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
