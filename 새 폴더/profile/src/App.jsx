import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "../src/styles/Theme";
import PortfolioDetail from "./pages/PortfolioDetail";
import Mainpage from "./Mainpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
  {
    path: "/PortfolioDetail",
    element: <PortfolioDetail />,
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
