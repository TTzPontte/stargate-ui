/**
 * Return width and height of window when resize.
 *
 * Thanks @sophiebits for sharing this elegant solution.
 * @see {@link https://stackoverflow.com/a/19014495}
 */
import { useState, useLayoutEffect } from 'react';

const useSize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);

    updateSize();

    return () => (
      window.removeEventListener('resize', updateSize)
    );
  }, []);

  return size;
}

export default useSize;
