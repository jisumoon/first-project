import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import CalenderPage from "../pages/CalenderPage";
import DiaryPage from "../pages/DiaryPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/calendar" element={<CalenderPage />} />
      <Route path="/diary" element={<DiaryPage />} />
    </Routes>
  );
};

export default Router;
