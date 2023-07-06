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
import { getDepartmentEditUrl } from '@/config/api.config';
import { useAppDispatch } from '@/store/hooks/hooks';
import { setSelectedTreeId } from '@/store/features/sidebar/sidebarTree.slice';
import { useDepartmentAdmin } from '@/api/dept/useDepartmentAdmin';
import EditPanelDeptBtn from '@/ui/EditPanelDeptBtn/EditPanelDeptBtn';
import { useHeader } from '../../Header/useHeader';

const CustomTreeNode = forwardRef(function CustomTreeNode(
  props: TreeItemContentProps,
  ref
) {
  const { deleteDepartmentAsync } = useDepartmentAdmin();

  const { close } = useHeader();

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
    close();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(
        className,
        classes.root,
        '@apply relative rounded-[16px]',
        {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        }
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
        className={clsx(classes.label, '@apply text-white hover:text-white')}
      >
        {label}
      </Typography>

      <EditPanelDeptBtn
        onlyRemove={false}
        handleRemove={deleteDepartmentAsync}
        id={nodeId}
        getUrlEdit={getDepartmentEditUrl}
        getUrlCreate={getDepartmentCreateUrl}
      />
    </div>
  );
});

export default function CustomTreeItem(props: TreeItemProps) {
  return <TreeItem ContentComponent={CustomTreeNode} {...props} />;
}
