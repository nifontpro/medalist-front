import { useCallback, useEffect, useMemo } from 'react';
import { sortTree } from '@/utils/sortTree';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NewTree } from '@/app/_components/MainLayout/Sidebar/newTree';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import {
  setArrayIds,
  setSelectedTreeId,
} from '@/store/features/sidebar/sidebarTree.slice';
import { deptApi } from '@/api/dept/dept.api';
import { RootState } from '@/store/storage/store';
import { findMinParentIdOnTree } from '@/utils/findMinParentIdOnTree';
import { Dept } from '@/types/dept/dept';

export const useSidebar = () => {
  const dispatch = useAppDispatch();

  const [treeData, setTreeData] = useState<NewTree[]>([]);

  const [expandedIdsState, setExpandedIdsState] = useState<string[]>([]);
  const [selectedIdsState, setSelectedIdsState] = useState<string>('');

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { expandedIds, selectedIds } = useAppSelector(
    (state: RootState) => state.sidebarTree
  );

  const { data: subTree } = deptApi.useGetAuthSubtreeQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser?.id : 0,
      baseRequest: undefined,
    },
    {
      skip: !typeOfUser,
    }
  );

  // _____________ Ниже код для того, чтобы дерево всегда было раскрыто полностью ____________
  function getParentIds(arr: Dept[] | undefined) {
    if (!arr) return [];
    return arr.map((obj) => String(obj.parentId));
  }
  const parentIds = getParentIds(subTree?.data);
  // _____________ Выше код для того, чтобы дерево всегда было раскрыто полностью ____________

  useEffect(() => {
    if (subTree && subTree.data) {
      setTreeData(
        sortTree(
          subTree.data,
          subTree.data[findMinParentIdOnTree(subTree.data)].parentId
        )
      );

      if (expandedIds) {
        setExpandedIdsState(expandedIds);
      }

      if (selectedIds) {
        setSelectedIdsState(selectedIds);
      }
    }
  }, [expandedIds, selectedIds, dispatch, subTree]);

  const toggle = useCallback(
    (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
      dispatch(setArrayIds(nodeIds));
    },
    [dispatch]
  );

  return {
    expandedIds,
    selectedIds,
    toggle,
    treeData,
    expandedIdsState,
    selectedIdsState,
    parentIds,
  };
};
