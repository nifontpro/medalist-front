'use client';

import clsx from 'clsx';
import { getDepartmentCreateUrl, getDepartmentUrl } from '@/config/api.config';
// import ParamsIcon from '@/icons/paramsEdit.svg';
import TreeItem, {
  TreeItemContentProps,
  TreeItemProps,
  useTreeItem,
} from '@mui/lab/TreeItem';
import { SyntheticEvent, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getDepartmentEditUrl } from '@/config/api.config';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setSelectedTreeId } from '@/store/features/sidebar/sidebarTree.slice';
import { toastError } from '@/utils/toast-error';
import { toast } from 'react-toastify';
import { deptApi } from '@/api/dept/dept.api';
import { RootState } from '@/store/storage/store';

const CustomTreeNode = forwardRef(function CustomTreeNode(
  props: TreeItemContentProps,
  ref
) {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const [deleteDepartment] = deptApi.useDeleteMutation();

  const deleteAsync = async (id: number) => {
    if (typeOfUser && typeOfUser.id) {
      await deleteDepartment({
        authId: typeOfUser.id,
        deptId: id,
      })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            toastError(res.errors[0].message);
          } else {
            toast.success('Отдел успешно удален');
          }
        })
        .catch((e) => {
          toastError(e, 'Ошибка при удалении отдела');
        });
    } else {
      toastError('Ошибка удаления т.к. не удалось получить id пользователя');
    }
  };
  const dispatch = useAppDispatch();

  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const { push } = useRouter();

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: SyntheticEvent<Element, Event>) => {
    preventSelection(event);
  };
  const handleExpansionClick = (event: SyntheticEvent<Element, Event>) => {
    handleExpansion(event);
  };
  const handleSelectionClick = (event: SyntheticEvent<Element, Event>) => {
    handleSelection(event);
    dispatch(setSelectedTreeId(nodeId));
    push(getDepartmentUrl(`${nodeId}`));
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(
        className,
        classes.root,
        {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        },
        '@apply relative rounded-[12px] py-[10px]'
      )}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        onClick={handleExpansionClick}
        className={clsx(classes.iconContainer, '@apply text-white')}
      >
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component='div'
        className={clsx(classes.label, '@apply text-white')}
      >
        {label}
      </Typography>
      <EditPanelAuthBtn
        onlyRemove={false}
        handleRemove={deleteAsync}
        id={nodeId}
        getUrlEdit={getDepartmentEditUrl}
        getUrlCreate={getDepartmentCreateUrl}
      />
      {/* <ParamsIcon className={styles.editIcon} /> */}
    </div>
  );
});

export default function CustomTreeItem(props: TreeItemProps) {
  return <TreeItem ContentComponent={CustomTreeNode} {...props} />;
}
