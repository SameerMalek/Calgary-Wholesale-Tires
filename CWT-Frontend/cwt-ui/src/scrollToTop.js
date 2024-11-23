import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  }, [pathname]); // Runs whenever the route changes

  return null;
};

export default ScrollToTop;
