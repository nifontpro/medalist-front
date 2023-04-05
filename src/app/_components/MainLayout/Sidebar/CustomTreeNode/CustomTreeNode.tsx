'use client';

import clsx from 'clsx';
import { getDepartmentUrlWithUsers } from '@/config/api.config';
// import ParamsIcon from '@/icons/paramsEdit.svg';
import TreeItem, {
  TreeItemContentProps,
  TreeItemProps,
  useTreeItem,
} from '@mui/lab/TreeItem';
import { SyntheticEvent, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';
import styles from './CustomTreeNode.module.scss';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getDepartmentEditUrl } from '@/config/api.config';

const CustomTreeNode = forwardRef(function CustomTreeNode(
  props: TreeItemContentProps,
  ref
) {
  const deleteAsync = (id: string) => {};
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
    push(getDepartmentUrlWithUsers(`${nodeId}`));
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx( className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      }, '@apply relative rounded-[12px] py-[10px]') }
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
        getUrl={getDepartmentEditUrl(nodeId)}
      />
      {/* <ParamsIcon className={styles.editIcon} /> */}
    </div>
  );
});

export default function CustomTreeItem(props: TreeItemProps) {
  return <TreeItem ContentComponent={CustomTreeNode} {...props} />;
}
