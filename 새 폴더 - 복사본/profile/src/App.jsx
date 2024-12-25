import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "./styles/Theme";
import Modal from "./contents/Portfolio/Modal";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Loading from "./components/Loading";

// QueryClient 설정
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

// 라우터 설정`
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
        <AboutMe />
        <Portfolio />
        <Contact />
      </>
    ),
  },
  {
    path: "/portfoliodetail/:id",
    element: <Modal />,
  },
]);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />

          {loading ? <Loading /> : <RouterProvider router={router} />}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
