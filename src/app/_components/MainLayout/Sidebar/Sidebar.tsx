'use client';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProps } from './Sidebar.props';
import { sortTree } from '@/utils/sortTree';
import Tree from './Tree/Tree';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { NewTree } from '@/app/_components/MainLayout/Sidebar/newTree';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import {
  setArrayIds,
  setSelectedTreeId,
} from '../../../../store/features/sidebar/sidebarTree.slice';
import { deptApi } from '@/api/dept/dept.api';
import { RootState } from '@/store/storage/store';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const pathName = usePathname();
  // const AldtreeData: NewTree[] = sortTree(deptData);
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const { expandedIds, selectedIds } = useAppSelector(
    (state: RootState) => state.sidebarTree
  );

  const { data: subTree } = deptApi.useGetAuthSubtreeQuery(
    { authId: typeOfUser?.id },
    {
      skip: !typeOfUser,
    }
  );

  const [treeData, setTreeData] = useState<NewTree[]>([]);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (subTree && subTree.data) {
      setTreeData(sortTree(subTree.data, subTree.data[0].parentId));
    }

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
  }, [pathName, dispatch, subTree]);

  const toggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    dispatch(setArrayIds(nodeIds));
  };

  console.log(treeData)
  console.log(subTree)

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
        {/* <Tree treeData={treeData} /> */}
        {/* <Tree treeData={sortTree(deptData)} /> */}
        <Tree treeData={treeData} />
      </TreeView>
    </div>
  );
};

export default Sidebar;
