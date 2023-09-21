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
import { memo, useEffect, useRef, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NewTree } from './newTree';
import { useRouter } from 'next/navigation';
import P from '@/ui/P/P';
import ChangeRoleIcon from '@/icons/ownerLogo.svg';
import ArrowIcon from '@/icons/arrowDown.svg';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import { useAppDispatch } from '@/store/hooks/hooks';
import { setSelectedTreeId } from '@/store/features/sidebar/sidebarTree.slice';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const {
    expandedIds,
    selectedIds,
    toggle,
    treeData,
    expandedIdsState,
    selectedIdsState,
    parentIds,
    subTree,
  } = useSidebar();
  const { push } = useRouter();

  const dispatch = useAppDispatch();

  let ownerCompany = subTree?.data?.find((item) => item.parentId === 1);

  const [tree, setTree] = useState<NewTree[] | undefined>(undefined);

  useEffect(() => {
    if (treeData) setTree(treeData);
  }, [treeData]);

  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    localStorage.getItem('selectCompany')
  );

  const handleChange = (event: SelectChangeEvent) => {
    setTree(treeData?.filter((item) => item.id === Number(event.target.value)));
    localStorage.setItem('selectCompany', event.target.value);
    setSelectedCompany(event.target.value);
    dispatch(setSelectedTreeId(''));
    push(`/department/${event.target.value}`);
  };

  // Сделал чтобы открывать нажатием на иконку стрелки. Она стала не кликабельна из-за уменьшения поля текста
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <ExitIcon />
      <Logo className={styles.logo} />

      {tree && tree[0] ? (
        <>
          <FormControl fullWidth>
            <Select
              open={tree.length > 1 ? open : false}
              onClick={
                tree.length > 1
                  ? handleToggle
                  : () => push(`/department/${tree[0].id}`)
              }
              onClose={handleToggle}
              onOpen={handleToggle}
              value={selectedCompany ? selectedCompany : tree[0].id.toString()}
              onChange={handleChange}
              className={styles.select}
              IconComponent={tree.length > 1 ? ArrowIcon : ''}
              MenuProps={{
                classes: {
                  paper: styles.dropdown,
                },
              }}
            >
              {treeData.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  className={
                    item.id === Number(selectedCompany)
                      ? styles.selectedItem
                      : styles.menuItem
                  }
                >
                  <ImageDefault
                    src={item.mainImg ? item.mainImg : undefined}
                    width={40}
                    height={40}
                    alt='preview image'
                    objectFit='cover'
                    className='rounded-[10px]'
                    // priority={true}
                  />
                  {item.name}
                </MenuItem>
              ))}

              {ownerCompany ? (
                <div className={styles.bottom}>
                  <div
                    className={styles.bottomContent}
                    onClick={() => {
                      if (ownerCompany)
                        push(`create/department?id=${ownerCompany.id}`);
                    }}
                  >
                    <ChangeRoleIcon className='@apply w-[24px] mr-[10px]' />
                    <P size='xs' fontstyle='thin' color='gray'>
                      Зарегистрировать новую компанию
                    </P>
                  </div>
                </div>
              ) : null}
            </Select>
          </FormControl>

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
            <Tree
              treeData={
                selectedCompany
                  ? tree.find((item) => item.id == Number(selectedCompany))
                      ?.children
                  : tree[0]?.children
              }
            />
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
