import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "./styles/Theme";
import Modal from "./contents/Portfolio/Modal";
import HomeView from "./HomeView";
import { Provider } from "react-redux";
import store from "./store";

// QueryClient 설정
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {/* {loading ? <LoadingScreen /> : <RouterProvider router={router} />} */}
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
