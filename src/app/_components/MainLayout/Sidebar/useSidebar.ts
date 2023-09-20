import { useCallback, useEffect } from 'react';
import { sortTree } from '@/utils/sortTree';
import { useState } from 'react';
import { NewTree } from '@/app/_components/MainLayout/Sidebar/newTree';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setArrayIds } from '@/store/features/sidebar/sidebarTree.slice';
import { deptApi } from '@/api/dept/dept.api';
import { RootState } from '@/store/storage/store';
import { findMinParentIdOnTree } from '@/utils/findMinParentIdOnTree';
import { Dept } from '@/types/dept/dept';
import { setTreeDepts } from '@/store/features/treeDepts/treeDepts.slice';

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

  // const { data: subTree } = deptApi.useGetAuthSubtreeQuery(
  const { data: subTree } = deptApi.useGetAuthTopLevelTreeQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser?.id : 0,
      baseRequest: {
        orders: [{ field: 'parentId' }, { field: 'name', direction: 'ASC' }],
      },
    },
    {
      skip: !typeOfUser,
    }
  );

  const transformToTree = (depts: Dept[], parentId: number): any[] => {
    const filteredDepts = depts.filter(
      (dept) => dept.level === 2 && dept.parentId === parentId
    );
    return filteredDepts.map((dept) => {
      const children = transformToTree(depts, dept.id || 0);
      return children.length > 0 ? { ...dept, children } : { ...dept };
    });
  };

  if (subTree && subTree.data) {
    const tree = transformToTree(subTree.data, 1);
    console.log(tree);
  }

  // _____________ Ниже код для того, чтобы дерево всегда было раскрыто полностью ____________
  function getParentIds(arr: Dept[] | undefined) {
    if (!arr) return [];
    return arr.map((obj) => String(obj.parentId));
  }
  const parentIds = getParentIds(subTree?.data);
  // _____________ Выше код для того, чтобы дерево всегда было раскрыто полностью ____________

  useEffect(() => {
    if (subTree?.data) {
      dispatch(setTreeDepts(subTree.data));

      setTreeData(
        sortTree(
          subTree.data,
          subTree.data[findMinParentIdOnTree(subTree.data)].parentId
        )
      );
      // setTreeData(() => {
      //   if (subTree?.data) {
      //     let arr = sortTree(
      //       subTree.data,
      //       subTree.data[findMinParentIdOnTree(subTree.data)].parentId
      //     );
      //     return arr;
      //     // return arr[0].children;
      //   }
      // });

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

  // console.log(treeData);

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
