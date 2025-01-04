import React from "react";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Router } from "../src/Router/Router";
import { ThemeProvider } from "../src/context/ThemePorvider";
import { AuthProvider } from "../src/context/AuthProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyles />
        <RouterProvider router={Router} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
