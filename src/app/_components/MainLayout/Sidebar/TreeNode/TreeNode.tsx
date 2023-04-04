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
import { getDepartmentUrlWithUsers } from '@/config/api.config';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import EditIcon from '@/icons/edit.svg';

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
    push(getDepartmentUrlWithUsers(`${nodeId}`));
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
      <div onClick={handleExpansionClick} className={clsx(classes.iconContainer, '@apply text-white')}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component='div'
        className={clsx(classes.label, '@apply text-white')}
      >
        {label}
      </Typography>
      <ImageDefault
        src={EditIcon}
        width={20}
        height={20}
        alt={''}
        className='rounded-xl h-[24px]'
        priority={true}
      />
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
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
            <Typography
              variant='body2'
              sx={{ fontWeight: 'inherit', flexGrow: 1 }}
            >
              {node.name}
            </Typography>
            {/* <Typography variant='caption' color='inherit'>
              {node.children?.length}
            </Typography> */}
          </Box>
        }
      >
        {node.children && <Tree treeData={node.children} />}
      </CustomTreeItem>
    </div>
  );
};

export default TreeNode;
