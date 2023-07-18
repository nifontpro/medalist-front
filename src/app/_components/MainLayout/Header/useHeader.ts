import { setNavigationVisible } from '@/store/features/header/header.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useCallback } from 'react';

export const useHeader = () => {
  const { navigationVisible } = useAppSelector(
    (state: RootState) => state.header
  );

  const dispatch = useAppDispatch();

  const close = useCallback(() => {
    dispatch(setNavigationVisible(false));
  }, [dispatch]);

  const open = useCallback(() => {
    dispatch(setNavigationVisible(true));
  }, [dispatch]);

  return { close, open, navigationVisible };
};
