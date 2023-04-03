import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss'

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  return (
    <div className={styles.wrapperMainLayout} {...props}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MainLayout;
