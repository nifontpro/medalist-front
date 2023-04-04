'use client';

import { TreeNodeProps } from './TreeNode.props';
import Tree from '../Tree/Tree';
import styles from './TreeNode.module.scss';
import TreeItem, {
  TreeItemContentProps,
  TreeItemProps,
  useTreeItem,
} from '@mui/lab/TreeItem';
import { SyntheticEvent, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

const CustomContent = forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref
) {
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
    push(`/department/${nodeId}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component='div'
        className={classes.label}
      >
        {label}
      </Typography>
      <Typography
        className='ml-2'
        variant='caption'
        color='inherit'
        onClick={() => console.log('Edit department')}
      >
        edit
      </Typography>
    </div>
  );
});

function CustomTreeItem(props: TreeItemProps) {
  return <TreeItem ContentComponent={CustomContent} {...props} />;
}

const TreeNode = ({ node }: TreeNodeProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <CustomTreeItem
        nodeId={String(node.id)}
        label={
          // node.name
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
            {/* <Box component={'1'} color='inherit' sx={{ mr: 1 }} /> */}
            <Typography
              variant='body2'
              sx={{ fontWeight: 'inherit', flexGrow: 1 }}
            >
              {node.name}
            </Typography>
            <Typography variant='caption' color='inherit'>
              {node.children?.length}
            </Typography>
          </Box>
        }
      >
        {node.children && <Tree treeData={node.children} />}
      </CustomTreeItem>
    </div>
  );
};

export default TreeNode;
