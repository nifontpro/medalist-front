import { useMemo } from 'react';
import { sortTree } from '@/utils/sortTree';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { NewTree } from '@/app/_components/MainLayout/Sidebar/newTree';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import {
  setArrayIds,
  setSelectedTreeId,
} from '@/store/features/sidebar/sidebarTree.slice';
import { deptApi } from '@/api/dept/dept.api';
import { RootState } from '@/store/storage/store';

export const useSidebar = () => {
  const pathName = usePathname();
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

  return useMemo(() => {
    const toggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
      dispatch(setArrayIds(nodeIds));
    };

    return {
      expandedIds,
      selectedIds,
      toggle,
      treeData,
    };
  }, [expandedIds, selectedIds, treeData, dispatch]);
};
