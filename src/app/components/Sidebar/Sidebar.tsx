'use client';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProps } from './Sidebar.props';
import { deptData } from '@/pages/api/dept/dept.data';
import { sortTree } from '@/utils/sortTree';
import Tree from './Tree/Tree';
import { NewTree } from '@/app/model/dept/NewTree';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const data: NewTree[] = sortTree(deptData);

  return (
    <div className={className} {...props}>
      <TreeView
        aria-label='file system navigator'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <Tree treeData={data} />
      </TreeView>
    </div>
  );
};

export default Sidebar;
