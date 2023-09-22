import Button from '@/ui/Button/Button';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import React from 'react';
import uniqid from 'uniqid';
import styles from './WindowWithRoles.module.scss';
import { WindowWithRolesProps } from './WindowWithRoles.props';
import { useRouter } from 'next/navigation';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';

const WindowWithRoles = ({
  handleLogoutClick,
  rolesUser,
  handleChangeRole,
  ...props
}: WindowWithRolesProps) => {
  const { push } = useRouter();
  const ownerRole = rolesUser?.filter((role) => role.roles.includes('OWNER'));
  const anotherRoles = rolesUser?.filter(
    (role) => !role.roles.includes('OWNER')
  );

  console.log(ownerRole);

  return (
    <div className={styles.wrapper} {...props}>
      <Htag tag='h1'>Медалист приветствует Вас!</Htag>

      <div>
        <P size='s'>Рады что Вы с нами!</P>
        <P size='s'>
          Решите, в какой роли вы хотите видеть себя на нашем сервисе:
        </P>
      </div>

      {ownerRole.length > 0 ? (
        <>
          <P size='s' fontstyle='thin'>
            Продолжите работу в роли владельца компании:
          </P>
          <div>
            {ownerRole!.map((role) => {
              return (
                <div
                  key={uniqid()}
                  className={styles.ownerRole}
                  onClick={() => handleChangeRole(role)}
                >
                  <ImageDefault
                    key={role.id}
                    src={role.mainImg ? role.mainImg : undefined}
                    width={40}
                    height={40}
                    alt='preview image'
                    className='rounded-[10px] mr-[15px] w-[40px] h-[40px]'
                  />
                  <P size='s' fontstyle='thin'>
                    {role.dept.name}
                  </P>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      {anotherRoles ? (
        <>
          <P size='s' fontstyle='thin'>
            Продолжите работу в роли сотрудника:
          </P>
          <div>
            {anotherRoles!.map((role) => {
              return (
                <div
                  key={uniqid()}
                  className={styles.ownerRole}
                  onClick={() => handleChangeRole(role)}
                >
                  <ImageDefault
                    key={role.id}
                    src={role.mainImg ? role.mainImg : undefined}
                    width={40}
                    height={40}
                    alt='preview image'
                    className='rounded-[10px] mr-[15px] w-[40px] h-[40px]'
                  />
                  <P size='s' fontstyle='thin'>
                    {role.dept.name} / {role.post}
                  </P>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      <Button onClick={handleLogoutClick} appearance='whiteBlack' size='l'>
        Выйти
      </Button>
    </div>
  );
};

export default WindowWithRoles;
