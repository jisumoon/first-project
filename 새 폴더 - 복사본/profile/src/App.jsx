import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "./styles/Theme";
import Modal from "./contents/Portfolio/Modal";
import Mainpage from "./Mainpage";
import LoadingScreen from "./LoadingScreen";

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
  {
    path: "/PortfolioDetail/:id",
    element: <Modal />,
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
