'use client';

import { TreeNodeProps } from './TreeNode.props';
import Tree from '../Tree/Tree';
import styles from './TreeNode.module.scss';
import TreeItem from '@mui/lab/TreeItem';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

const TreeNode = ({ node }: TreeNodeProps): JSX.Element => {
  const { push } = useRouter();
  const handleClick = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    if (!node.children) {
      push(`/department/${node.id}`);
    }
  };

  return (
    <div className={styles.container}>
      <TreeItem
        nodeId={String(node.id)}
        label={node.name}
        onClick={() => handleClick(node)}
      >
        {node.children && <Tree treeData={node.children} />}
      </TreeItem>
    </div>
  );
};

export default TreeNode;
