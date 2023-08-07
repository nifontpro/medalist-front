import { RefObject, useEffect, useState } from 'react';

export const useOnScreen = (ref: RefObject<Element>) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  let options = {
    root: ref.current,
    rootMargin: '0px',
    threshold: 0.1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
  });
  return isIntersecting;
};
