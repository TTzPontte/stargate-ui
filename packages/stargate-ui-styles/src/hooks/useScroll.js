import { useState, useLayoutEffect } from 'react';

const useScroll = () => {
  const [scrollY, setScrollY] = useState([0]);

  useLayoutEffect(() => {
    const updateScrollY = () => {
      const scrollY = window.pageYOffset ?? window.scrollY;

      useScroll([scrollY]);
    };

    window.addEventListener('scroll', updateScrollY);

    updateScrollY();

    return () => (
      window.removeEventListener('scroll', updateScrollY)
    );
  }, []);

  return scrollY;
}

export default useScroll;
