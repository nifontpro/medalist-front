import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import { useTheme } from './use-theme';
import styles from './ThemeSwitcher.module.scss'

const ThemeSwitcher = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className={styles.wrapper} onClick={toggleTheme}>
      {theme === 'light' ? (
        <IoMoonOutline size='14px' />
      ) : (
        <IoMoon size='14px' />
      )}
      <span style={{ marginLeft: '0.75rem' }}>{theme}</span>
    </div>
  );
};

export default ThemeSwitcher;
