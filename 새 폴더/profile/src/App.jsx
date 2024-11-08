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
import Mainpage from "./pages/Mainpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Mainpage /> },
      { path: "PortfolioDetail:", element: <PortfolioDetail /> },
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
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
};

export default App;
