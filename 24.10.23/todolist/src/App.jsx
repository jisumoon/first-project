import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Home from "./page/Home";
import Detail from "./page/Detail";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Paperlogy-8ExtraBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-8ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}


  *{
    margin : 0;
    padding : 0;
    box-sizing : border-box;
  }

  ul, li{
    list-style : none;
  }

  a {
    color : inherit;
    text-decoration : none;
  }

  body{
    width: 100%;
    height: 100vh;
    background: #3AC569;
    font-family: 'Pretendard-Regular';
  }


`;

//라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyle />
    </>
  );
};

export default App;
