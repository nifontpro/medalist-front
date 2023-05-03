import { setNavigationVisible } from '@/store/features/header/header.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

export const useHeader = () => {
  const { navigationVisible } = useAppSelector(
    (state: RootState) => state.header
  );
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(setNavigationVisible(false));
  };

  const open = () => {
    dispatch(setNavigationVisible(true));
  };

  return { close, open, navigationVisible };
};
