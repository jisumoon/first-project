import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/theme";
import ToggleButton from "../src/components/Toggle";
import AppRouter from "../src/Router/Router";
import Loading from "../src/components/Loading";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 로딩 상태 관리
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3초 후 로딩 종료
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        {/* {isLoading ? (
          <Loading />
        ) : (
          <>
            <div style={{ textAlign: "center", margin: "20px" }}>
              <ToggleButton isDarkMode={isDarkMode} onToggle={toggleTheme} />
            </div> */}
        <AppRouter />

        {/* )} */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
