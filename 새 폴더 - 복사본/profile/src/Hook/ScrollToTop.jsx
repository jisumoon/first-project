import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.history.scrollRestoration) {
      window.scrollTo(0, 0); // 스크롤 초기화 방지
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
