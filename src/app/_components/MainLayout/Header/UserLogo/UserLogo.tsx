import useOutsideClick from '@/hooks/useOutsideClick';
import { UserLogoProps } from './UserLogo.props';
import UserPanelModalWindow from './UserPanelModalWindow/UserPanelModalWindow';
import { useRef, useState } from 'react';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';

const UserLogo = ({
  user,
  className,
  ...props
}: UserLogoProps): JSX.Element => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  //Закрытие модального окна пользователя нажатием вне
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);
  return (
    <>
      <div
        className={className}
        ref={refOpen}
        {...props}
        onClick={() => setVisibleModal(!visibleModal)}
      >
        <ImageDefault
          src={
            user && user?.images.length > 0
              ? user.images[0].imageUrl
              : undefined
          }
          width={64}
          height={64}
          alt='preview image'
          objectFit='cover'
          className='rounded-[10px]'
          priority={true}
        />
      </div>
      <UserPanelModalWindow
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        user={user}
        ref={ref}
      />
    </>
  );
};

export default UserLogo;
