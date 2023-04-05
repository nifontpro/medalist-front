import { RefObject, useEffect, useRef } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  refOpen: RefObject<HTMLElement | null>,
  callback: (event: Event) => void,
  opened: boolean
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!opened) return;

    const handler: EventListener = (event) => {
      const { current: target } = ref;
      const { current: targetOpen } = refOpen;
      if (!target || targetOpen!.contains(event.target as HTMLElement)) return

      if (!target!.contains(event.target as HTMLElement)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref, refOpen, opened]);
};

export default useOutsideClick;
