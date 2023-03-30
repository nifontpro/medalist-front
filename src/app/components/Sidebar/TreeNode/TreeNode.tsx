'use client';

import { TreeNodeProps } from './TreeNode.props';
import Tree from '../Tree/Tree';
import styles from './TreeNode.module.scss';
import TreeItem from '@mui/lab/TreeItem';
import { MouseEvent } from 'react';

const TreeNode = ({ node }: TreeNodeProps): JSX.Element => {
  const handleClick = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    console.log(e.button);
  };

  return (
    <div className={styles.container}>
      <TreeItem
        nodeId={String(node.id)}
        label={node.name}
        onClick={(e) => handleClick(e)}
      >
        {node.children && <Tree treeData={node.children} />}
      </TreeItem>
    </div>
  );
};

export default TreeNode;
