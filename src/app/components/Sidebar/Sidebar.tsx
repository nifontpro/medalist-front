'use client';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProps } from './Sidebar.props';
import { sortTree } from '@/utils/sortTree';
import Tree from './Tree/Tree';
import { NewTree } from '@/app/model/dept/NewTree';
import { IDept } from '@/app/model/dept/dept';
import { SvgIcon, SvgIconProps } from '@mui/material';

const deptData: IDept[] = [
  // Корень
  { id: 1, parent_id: 0, name: 'ROOT', code: 'R' },

  // Уровень владельцев
  { id: 2, parent_id: 1, name: 'Denis', code: 'O' },
  { id: 3, parent_id: 1, name: 'Test', code: 'O' },

  // Компании Дениса
  { id: 4, parent_id: 2, name: 'Нектарин', code: 'D' },
  { id: 5, parent_id: 2, name: 'Медиа Сервис', code: 'D' },

  // Отделы Нектарин
  { id: 6, parent_id: 4, name: 'Маркетинга', code: 'D' },
  { id: 7, parent_id: 4, name: 'Продаж', code: 'D' },
  { id: 8, parent_id: 4, name: 'Программирования', code: 'D' },

  // Подотделы программирования
  { id: 9, parent_id: 8, name: 'Бэкенд', code: 'D' },
  { id: 10, parent_id: 8, name: 'Фронтенд', code: 'D' },
  { id: 11, parent_id: 8, name: 'Тестирования', code: 'D' },
  { id: 12, parent_id: 8, name: 'DevOps', code: 'D' },

  // Подотделы DevOps
  { id: 13, parent_id: 12, name: 'Dev', code: 'D' },
  { id: 14, parent_id: 12, name: 'Ops', code: 'D' },

  // Отделы Медиа Сервис
  { id: 15, parent_id: 5, name: 'Бухгалтерия', code: 'D' },
  { id: 16, parent_id: 5, name: 'Продаж', code: 'D' },
  { id: 17, parent_id: 5, name: 'Программирования', code: 'D' },

  // Подотделы программирования
  { id: 18, parent_id: 8, name: 'Бэкенд', code: 'D' },
  { id: 19, parent_id: 8, name: 'Фронтенд', code: 'D' },
  { id: 20, parent_id: 8, name: 'Дизайн', code: 'D' },
  { id: 21, parent_id: 8, name: 'DevOps', code: 'D' },

  // Подотделы DevOps
  { id: 22, parent_id: 12, name: 'Dev', code: 'D' },
  { id: 23, parent_id: 12, name: 'Ops', code: 'D' },
];

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const treeData: NewTree[] = sortTree(deptData);

  // const toggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
  //   console.log('toggle');
  // };
  // const select = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
  //   console.log(nodeIds);
  // };

  return (
    <div className={className} {...props}>
      <TreeView
        aria-label='file system navigator'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        // onNodeToggle={toggle} // Когда открываешь 
        // onNodeSelect={select} // Когда выбираешь, срабатывает когда открываешь и когда выбираешь
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <Tree treeData={treeData} />
      </TreeView>
    </div>
  );
};

export default Sidebar;
