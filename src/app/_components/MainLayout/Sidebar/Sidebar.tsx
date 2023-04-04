'use client';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProps } from './Sidebar.props';
import { sortTree } from '@/utils/sortTree';
import Tree from './Tree/Tree';
import { NewTree } from '@/app/_model/dept/newTree';
import { usePathname } from 'next/navigation';
import { cookieOnStringArray } from '@/utils/openTreeIdNumber';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { deptData } from '@/pages/api/dept/dept.data';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const pathName = usePathname();
  const [state, setState] = useState<string[]>([]);

  useEffect(() => {
    if (pathName == '/') {
      setState([]);
    } else {
      setState(cookieOnStringArray(getCookie('nodeIds')));
    }
  }, [pathName]);

  const treeData: NewTree[] = sortTree(deptData);

  const toggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    setCookie('nodeIds', nodeIds);
    setState(nodeIds);
  };

  return (
    <div className={className} {...props}>
      <TreeView
        aria-label='file system navigator'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={state} // Сразу открытый путь
        onNodeToggle={toggle} // Когда открываешь
        sx={{ flexGrow: 1, maxWidth: 300, overflowY: 'auto' }}
      >
        <Tree treeData={treeData} />
      </TreeView>
    </div>
  );
};

export default Sidebar;
