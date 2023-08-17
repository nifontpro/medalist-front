'use client';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProps } from './Sidebar.props';
import Tree from './Tree/Tree';
import { useSidebar } from './useSidebar';
import ExitIconSvg from '@/icons/close.svg';
import styles from './Sidebar.module.scss';
import cn from 'classnames';
import { useHeader } from '../Header/useHeader';
import Logo from '@/ui/Logo/Logo';
import ChangeRole from '@/ui/ChangeRole/ChangeRole';
import { memo } from 'react';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const {
    expandedIds,
    selectedIds,
    toggle,
    treeData,
    expandedIdsState,
    selectedIdsState,
    parentIds,
  } = useSidebar();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <ExitIcon />
      <Logo className={styles.logo} />
      <ChangeRole className={styles.role} />
      <TreeView
        aria-label='file system navigator'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        // expanded={expandedIds} // Сразу открытый путь
        expanded={parentIds} // Полностью раскрытое дерево
        selected={selectedIds}
        onNodeToggle={toggle} // Когда открываешь
        sx={{ flexGrow: 1, maxWidth: 300, height: '100%', overflowY: 'auto' }}
      >
        <Tree treeData={treeData} />
      </TreeView>
    </div>
  );
};

export default memo(Sidebar);

//Для мемоизации svg icon
const ExitIcon = memo(() => {
  const { close } = useHeader();
  return <ExitIconSvg onClick={close} className={styles.exit} />;
});
ExitIcon.displayName = 'ExitIcon';
//__________________
