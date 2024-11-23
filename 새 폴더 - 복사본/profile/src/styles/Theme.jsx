import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const theme = {
  colors: {
    primary: "rgb(29, 83, 62)",
    secondary: "#2c5f2d",
    highlight: "rgba(44, 95, 45,0.9)",
    info: "#333",
    background: "#F2F1EB",
    mainbackgtound: "#FBF7E3",
  },
  fonts: {
    primary: "Pretendard-Regular, serif",
    secondary: "Dovemayo_gothic, sans-serif",
    third: "Libre Baskerville, serif",
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

  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Noto+Sans+KR:wght@100..900&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

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
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  background: ${(props) => props.theme.colors.mainbackgtound};
  font-family: ${(props) => props.theme.fonts.primary};   
  color : #333;
  height: 100%; /* 전체 높이 설정 */
  overflow-y: scroll; /* Y축 스크롤 기능 활성화 */
}

::-webkit-scrollbar {
  width: 0px; /* 스크롤바 숨김 */
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: transparent;
}

`;

export { theme, GlobalStyles };
