'use client';

import { TreeNodeProps } from './TreeNode.props';
import Tree from '../Tree/Tree';
import styles from './TreeNode.module.scss';
import { Box, Typography } from '@mui/material';
import CustomTreeItem from '../CustomTreeNode/CustomTreeNode';
import React from 'react';

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

export default React.memo(TreeNode);
