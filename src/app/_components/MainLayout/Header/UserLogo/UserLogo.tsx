import useOutsideClick from '@/hooks/useOutsideClick';
import { UserLogoProps } from './UserLogo.props';
import UserPanelModalWindow from './UserPanelModalWindow/UserPanelModalWindow';
import { memo, useCallback, useRef, useState } from 'react';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import { useUserPanelModalWindow } from './UserPanelModalWindow/useUserPanelModalWindow';

const UserLogo = ({
  user,
  className,
  ...props
}: UserLogoProps): JSX.Element => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  //Закрытие модального окна пользователя нажатием вне
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = useCallback(() => {
    setVisibleModal(false);
  }, []);
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  const { handleLogoutClick } = useUserPanelModalWindow(setVisibleModal, user);

  return (
    <>
      {
        user ? (
          <div
            className={className}
            ref={refOpen}
            {...props}
            onClick={() => setVisibleModal(!visibleModal)}
          >
            <ImageDefault
              src={user.mainImg}
              width={64}
              height={64}
              alt='preview image'
              className='rounded-[10px]'
              priority={true}
            />
          </div>
        ) : (
          <div
            className='@apply text-white flex justify-center items-center cursor-pointer'
            onClick={handleLogoutClick}
          >
            exit
          </div>
        )
        // null
      }
      {user && (
        <UserPanelModalWindow
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          user={user}
          ref={ref}
        />
      )}
    </>
  );
};

export default memo(UserLogo);
