'use client';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProps } from './Sidebar.props';
import Tree from './Tree/Tree';
import { useSidebar } from './useSidebar';
import ExitIconSvg from '@/icons/close.svg';
import styles from './Sidebar.module.scss';
import cn from 'classnames';
import { useHeader } from '../Header/useHeader';
import Logo from '@/ui/Logo/Logo';
import { memo, useEffect, useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NewTree } from './newTree';
import { useRouter } from 'next/navigation';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const {
    expandedIds,
    selectedIds,
    toggle,
    treeData,
    expandedIdsState,
    selectedIdsState,
    parentIds,
  } = useSidebar();
  const { push } = useRouter();

  const [tree, setTree] = useState<NewTree[] | undefined>(undefined);

  useEffect(() => {
    if (treeData) setTree(treeData);
  }, [treeData]);

  // console.log(tree);

  const handleChange = (event: SelectChangeEvent) => {
    if (
      treeData?.filter((item) => item.id === Number(event.target.value))
        .length > 0
    ) {
      setTree(
        treeData?.filter((item) => item.id === Number(event.target.value))
      );
    } else {
      setTree(
        treeData[0].children?.filter(
          (item) => item.id === Number(event.target.value)
        )
      );
    }
    // setTree(treeData?.filter((item) => item.id === Number(event.target.value)));
    // push(`/department/${event.target.value}`);
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <ExitIcon />
      <Logo className={styles.logo} />

      {tree !== undefined ? (
        <>
          {/* <FormControl fullWidth>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={treeData[0]?.id.toString()}
              // defaultValue={tree.name}
              label='Организация'
              onChange={handleChange}
              className={styles.select}
            >
              <MenuItem key={treeData[0]?.id} value={treeData[0]?.id}>
                {treeData[0]?.name}
              </MenuItem>
              {treeData[0]?.children?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <TreeView
            aria-label='file system navigator'
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            // expanded={expandedIds} // Сразу открытый путь
            expanded={parentIds} // Полностью раскрытое дерево всегда
            selected={selectedIds}
            onNodeToggle={toggle} // Когда открываешь
            sx={{
              flexGrow: 1,
              maxWidth: 300,
              height: '100%',
              overflowY: 'auto',
            }}
          >
            <Tree treeData={treeData} />
            {/* <Tree treeData={tree[0]?.children} /> */}
          </TreeView>
        </>
      ) : null}
    </div>
  );
};

export default memo(Sidebar);

//Для мемоизации svg icon
const ExitIcon = memo(() => {
  const { close } = useHeader();
  return <ExitIconSvg onClick={close} className={styles.exit} />;
});
ExitIcon.displayName = 'ExitIcon';
//__________________
