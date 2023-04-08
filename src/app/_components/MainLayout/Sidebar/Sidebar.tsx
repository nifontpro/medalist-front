'use client';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProps } from './Sidebar.props';
import { sortTree } from '@/utils/sortTree';
import Tree from './Tree/Tree';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { deptData } from '@/app/_api/dept.data';
import { NewTree } from '@/app/_model/newTree';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setArrayIds, setSelectedTreeId } from './sidebarTree.slice';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const pathName = usePathname();
  const treeData: NewTree[] = sortTree(deptData);

  const { expandedIds, selectedIds } = useAppSelector(
    (state) => state.sidebarTree
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    let localStorageTreeIds = localStorage.getItem('expandedIds');
    let localStorageSelectedId = localStorage.getItem('selectedIds');
    if (localStorageSelectedId) {
      dispatch(setSelectedTreeId(localStorageSelectedId));
    }
    if (pathName == '/') {
      dispatch(setArrayIds(['0']));
    } else {
      if (localStorageTreeIds)
        dispatch(setArrayIds(JSON.parse(localStorageTreeIds)));
    }
  }, [pathName, dispatch]);

  const toggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    dispatch(setArrayIds(nodeIds));
  };

  return (
    <div className={className} {...props}>
      <TreeView
        aria-label='file system navigator'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expandedIds} // Сразу открытый путь
        selected={selectedIds}
        onNodeToggle={toggle} // Когда открываешь
        sx={{ flexGrow: 1, maxWidth: 300, height: '100%', overflowY: 'auto' }}
      >
        <Tree treeData={treeData} />
      </TreeView>
    </div>
  );
};

export default Sidebar;
