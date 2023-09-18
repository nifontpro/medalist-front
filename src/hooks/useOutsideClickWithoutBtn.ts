import { RefObject, useCallback, useEffect, useRef } from 'react';

const useOutsideClickWithoutBtn = (
  ref: RefObject<HTMLElement | null>,
  callback: (event: Event) => void,
  opened: boolean
) => {
  const callbackRef = useRef(callback);

  const handler: EventListener = useCallback(
    (event) => {
      const { current: target } = ref;
      if (!target) return;

      if (!target!.contains(event.target as HTMLElement)) {
        callbackRef.current(event);
      }
    },
    [ref]
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!opened) return;

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref, opened, handler]);
};

export default useOutsideClickWithoutBtn;
