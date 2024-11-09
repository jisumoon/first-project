import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "./styles/Theme"; // 경로 확인
import PortfolioDetail from "./pages/PortfolioDetail";
import Mainpage from "./Mainpage";
import LoadingScreen from "./LoadingScreen";

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
    const timer = setTimeout(() => setLoading(false), 7000); // 7초 후 로딩 화면 종료
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router}></RouterProvider>
      {/* 로딩 상태에 따라 LoadingScreen 또는 RouterProvider 렌더링 */}
      {/* {loading ? <LoadingScreen /> : <RouterProvider router={router} />} */}
    </ThemeProvider>
  );
};

export default App;
