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
import { memo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import P from '@/ui/P/P';
import ChangeRoleIcon from '@/icons/ownerLogo.svg';
import ArrowIcon from '@/icons/arrowDown.svg';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import Button from '@/ui/Button/Button';
import CupIcon from '@/icons/cup.svg';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const {
    selectedIds,
    toggleTreeNode,
    treeData,
    parentIds,
    typeOfUser,
    tree,
    open,
    handleToggle,
    push,
    selectedCompany,
    handleChangeSelect,
    ownerCompany,
  } = useSidebar();

  const handleClink = () => {
    if (tree) {
      tree.length > 1
        ? handleToggle
        : typeOfUser?.roles.find((item) => item == 'OWNER')
        ? handleToggle
        : () => {
            localStorage.setItem('selectCompany', tree[0].id.toString());
            push(`/department/${tree[0].id}`);
          };
    }
  };

  const handleOpen = () => {
    if (tree) {
      if (selectedCompany) {
        push(`department/${selectedCompany}`);
      } else {
        localStorage.setItem('selectCompany', tree[0].id.toString());
        push(`department/${treeData[0].id}`);
      }
    }
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <ExitIcon />
      <Logo className={styles.logo} />

      {tree && tree[0] ? (
        <>
          <FormControl fullWidth className={styles.formControl}>
            <Select
              open={
                tree.length > 1
                  ? open
                  : typeOfUser?.roles.find((item) => item == 'OWNER')
                  ? open
                  : false
              }
              onClick={handleClink}
              onClose={handleToggle}
              onOpen={handleOpen}
              value={selectedCompany ? selectedCompany : tree[0].id.toString()}
              onChange={handleChangeSelect}
              className={styles.select}
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
                    // objectFit='cover'
                    className='rounded-[10px]'
                    // priority={true}
                    forWhat='company'
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
                        push(
                          `create/department?id=${ownerCompany.id}&company=true`
                        );
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

            {tree.length > 1 ? (
              <div
                className={cn(styles.open, { [styles.openActive]: open })}
                onClick={handleToggle}
              >
                <ArrowIcon />
              </div>
            ) : typeOfUser?.roles.find((item) => item == 'OWNER') ? (
              <div
                className={cn(styles.open, { [styles.openActive]: open })}
                onClick={handleToggle}
              >
                <ArrowIcon />
              </div>
            ) : null}
          </FormControl>

          <TreeView
            aria-label='file system navigator'
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            // expanded={expandedIds} // Сразу открытый путь
            expanded={parentIds} // Полностью раскрытое дерево всегда
            selected={selectedIds}
            onNodeToggle={toggleTreeNode} // Когда открываешь
            sx={{
              flexGrow: 1,
              maxWidth: 300,
              // height: '100%',
              overflowY: 'auto',
            }}
            className='flex flex-col gap-[50px]'
          >
            <div>
              <Tree
                treeData={
                  selectedCompany
                    ? tree.find((item) => item.id == Number(selectedCompany))
                        ?.children
                    : tree[0]?.children
                }
              />
            </div>

            <Button
              onClick={() => push('/gifts')}
              appearance={'blackWhite'}
              size='l'
              className={styles.buttonGifts}
            >
              <CupIcon className={styles.icon} /> Магазин&nbsp;призов
            </Button>
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
