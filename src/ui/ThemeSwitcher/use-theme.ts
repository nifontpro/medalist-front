import { SelectTheme } from '@/store/features/theme/theme-selectors';
import { Theme, setTheme } from '@/store/features/theme/theme.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useTheme = (): [Theme, () => void] => {
  const dispatch = useDispatch();
  const theme = useSelector(SelectTheme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return [theme, toggleTheme];
};
