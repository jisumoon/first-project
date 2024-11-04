import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const theme = {
  colors: {
    primary: "#1d533e",
    secondary: "#2c5f2d",
  },
  fonts: {
    primary: "Pretendard-Regular, serif",
    secondary: "Dovemayo_gothic, sans-serif",
  },
};

const GlobalStyles = createGlobalStyle`
  ${reset}

  /* Font Face */
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Dovemayo_gothic";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.1/Dovemayo_gothic.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul, li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    font-family: ${(props) => props.theme.fonts.primary};
   color : #333;
    background: #f9f9f9;
  }
`;

export { theme, GlobalStyles };
