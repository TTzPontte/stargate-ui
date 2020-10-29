import React from 'react';

const useVisibility = (ref, { test = false }) => {
  const [visible, setVisible] = React.useState(false);
  const [windowHeight, setWindowHeight] = React.useState(
    typeof window !== undefined ? window.innerHeight : null
  );

  const isVisible = () => {
    if (test && visible) {
      console.log('eita')
      return;
    }

    const top = ref?.current?.getBoundingClientRect().top;

    if (top >= 0 && top <= windowHeight) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    if (ref?.current) {
      setWindowHeight(window.innerHeight);
      window.addEventListener('scroll', isVisible);
    }

    return () => window.removeEventListener('scroll', isVisible);
  }, [ref]);

  return visible;
};

export default useVisibility;
