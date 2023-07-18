import { RefObject, useCallback, useEffect, useRef } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  refOpen: RefObject<HTMLElement | null>,
  callback: (event: Event) => void,
  opened: boolean
) => {
  const callbackRef = useRef(callback);

  const handler: EventListener = useCallback((event) => {
    const { current: target } = ref;
    const { current: targetOpen } = refOpen;
    if (!target || targetOpen!.contains(event.target as HTMLElement)) return

    if (!target!.contains(event.target as HTMLElement)) {
      callbackRef.current(event);
    }
  }, [ref, refOpen]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!opened) return;

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref, refOpen, opened, handler]);
};

export default useOutsideClick;
