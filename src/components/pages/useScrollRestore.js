/**
 * Intelligent, low-sideeffect way to restore scroll position
 *
 * To use, add this somewhere next to a div that's scrollable
 *
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
 */
import React, {useEffect} from "react";

export function useScrollRestore() {
  useEffect(() => {
    const scrollLast = localStorage.getItem(`scroll-${window.location.pathname}${window.location.hash && '#' + window.location.hash}`);
    document.getElementById('scroll-div').scrollTop = scrollLast ?? 0;
  }, []);

  return {clear: clearScroll}
}

export function clearScroll () {
  localStorage.setItem(`scroll-${window.location.pathname}${window.location.hash && '#' + window.location.hash}`, 0);
  document.getElementById('scroll-div').scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}