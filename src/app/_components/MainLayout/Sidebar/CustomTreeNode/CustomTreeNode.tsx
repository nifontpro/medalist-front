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
import EditPanelAuthBtn from '@/ui/EditPanelDeptBtn/EditPanelDeptBtn';
import { getDepartmentEditUrl } from '@/config/api.config';
import { useAppDispatch } from '@/store/hooks/hooks';
import { setSelectedTreeId } from '@/store/features/sidebar/sidebarTree.slice';
import { useDepartmentAdmin } from '@/app/department/useDepartmentAdmin';
import AuthComponent from '@/store/providers/AuthComponent';

const CustomTreeNode = forwardRef(function CustomTreeNode(
  props: TreeItemContentProps,
  ref
) {
  const { deleteDepartmentAsync } = useDepartmentAdmin();

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
      <AuthComponent minRole='ADMIN'>
        <EditPanelAuthBtn
          onlyRemove={false}
          handleRemove={deleteDepartmentAsync}
          id={nodeId}
          getUrlEdit={getDepartmentEditUrl}
          getUrlCreate={getDepartmentCreateUrl}
        />
      </AuthComponent>
    </div>
  );
});

export default function CustomTreeItem(props: TreeItemProps) {
  return <TreeItem ContentComponent={CustomTreeNode} {...props} />;
}
