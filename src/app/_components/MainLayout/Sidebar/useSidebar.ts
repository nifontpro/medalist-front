import { useCallback, useEffect } from 'react';
import { sortTree } from '@/utils/sortTree';
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
import { setTreeDepts } from '@/store/features/treeDepts/treeDepts.slice';
import { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';

export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const [treeData, setTreeData] = useState<NewTree[]>([]);
  const [expandedIdsState, setExpandedIdsState] = useState<string[]>([]);
  const [selectedIdsState, setSelectedIdsState] = useState<string>('');
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const { expandedIds, selectedIds } = useAppSelector(
    (state: RootState) => state.sidebarTree
  );

  //Получаем отделы возможные для просмотра
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
  //_________________________

  //_____________ Ниже код для того, чтобы дерево всегда было раскрыто полностью ____________
  function getParentIds(arr: Dept[] | undefined) {
    if (!arr) return [];
    return arr.map((obj) => String(obj.parentId));
  }
  const parentIds = getParentIds(subTree?.data);
  //_________________________

  //Меняем данные для отображения дерева
  useEffect(() => {
    if (subTree?.data) {
      dispatch(setTreeDepts(subTree.data));

      //Проверка на то, что если остался только 1 отдел и он же корневой - его показывает в сайдменю. В противном случае не показывает, чтобы не было ошибок
      if (subTree.data.length == 1 && subTree.data[0].parentId == 1) {
        setTreeData(
          sortTree(
            subTree.data,
            subTree.data[findMinParentIdOnTree(subTree.data)].parentId
          )
        );
      } else {
        let arrWithLevelMoraThan2 = subTree.data.filter(
          (item) => item.level >= 2
        );
        setTreeData(
          sortTree(
            arrWithLevelMoraThan2,
            arrWithLevelMoraThan2[findMinParentIdOnTree(subTree.data)]?.parentId
          )
        );
      }

      if (expandedIds) {
        setExpandedIdsState(expandedIds);
      }

      if (selectedIds) {
        setSelectedIdsState(selectedIds);
      }
    }
  }, [expandedIds, selectedIds, dispatch, subTree]);
  //_____________________

  const toggleTreeNode = useCallback(
    (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
      dispatch(setArrayIds(nodeIds));
    },
    [dispatch]
  );

  let ownerCompany = subTree?.data?.find((item) => item.parentId === 1);

  const [tree, setTree] = useState<NewTree[] | undefined>(undefined);

  useEffect(() => {
    if (treeData) setTree(treeData);
  }, [treeData]);

  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    localStorage.getItem('selectCompany')
  );

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setTree(treeData?.filter((item) => item.id === Number(event.target.value)));
    localStorage.setItem('selectCompany', event.target.value);
    setSelectedCompany(event.target.value);
    dispatch(setSelectedTreeId(''));
    push(`/department/${event.target.value}`);
  };

  // Сделал чтобы открывать нажатием на иконку стрелки. Она стала не кликабельна из-за уменьшения поля текста
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  //_______________________________

  return {
    expandedIds,
    selectedIds,
    toggleTreeNode,
    treeData,
    expandedIdsState,
    selectedIdsState,
    parentIds,
    subTree,
    typeOfUser,
    tree,
    open,
    handleToggle,
    push,
    dispatch,
    selectedCompany,
    handleChangeSelect,
    ownerCompany,
  };
};
