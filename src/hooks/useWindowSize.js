import { useEffect, useState } from "react";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}
const useWindowSize = (ms = 1000) => {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const [isMobile, setIsMobile] = useState(false);
  const { width, height } = windowSize;

  useEffect(() => {
    const handleResize = debounce(function () {
      setIsMobile(window.innerWidth <= 768);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, ms);
    window.addEventListener("resize", handleResize);
    // handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowSize, width, height, isMobile };
};
export default useWindowSize;
