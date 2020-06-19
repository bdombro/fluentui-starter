/**
 * Intelligent, low-sideeffect way to restore scroll position
 */
import {useEffect} from "react";
import {useLocation} from "react-router";

// TODO: Add param to indicate which element id to target.
export function useScrollRestore() {
  const location = useLocation();
  useEffect(() => {
    const intervalNumber = setInterval(setScroll, 400);
    return () => clearInterval(intervalNumber);

    function setScroll () {
      localStorage.setItem(
        `scroll-${window.location.pathname}${window.location.hash && '#' + window.location.hash}`,
        `${document.getElementById('scroll-div')?.scrollTop ?? 0}`,
      );
    }
  }, [])
  useEffect(() => {
    const scrollLast = localStorage.getItem(`scroll-${window.location.pathname}${window.location.hash && '#' + window.location.hash}`);
    document.getElementById('scroll-div').scrollTop = scrollLast ?? 0;
  }, [location]);

  return {clear: clearScroll}
}

export function clearScroll () {
  localStorage.setItem(`scroll-${window.location.pathname}${window.location.hash && '#' + window.location.hash}`, 0);
  document.getElementById('scroll-div').scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}