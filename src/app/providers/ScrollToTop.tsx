import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Marshrut o'zgarganda sahifani tepaga qaytaradi —
 * maketdagi `window.scrollTo(0, 0)` xatti-harakati.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
