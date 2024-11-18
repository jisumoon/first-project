import { useEffect } from "react";

const usePreventScroll = (isPreventScroll) => {
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (isPreventScroll) {
      document.body.style.overflowY = "hidden";
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.body.style.overflowY = "auto";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      document.body.style.overflowY = "auto";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isPreventScroll]);
};

export default usePreventScroll;
