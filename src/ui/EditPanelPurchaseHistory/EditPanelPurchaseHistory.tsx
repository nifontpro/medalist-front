import styles from './EditPanelPurchaseHistory.module.scss';
import { EditPanelPurchaseHistoryProps } from './EditPanelPurchaseHistory.props';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useRef, useState } from 'react';
import EditPanel from './EditPanel/EditPanel';
import FilterEditPanel from './FilterEditPanel/FilterEditPanel';
import cn from 'classnames';
import AuthComponent from '@/store/providers/AuthComponent';

const EditPanelPurchaseHistory = ({
  handleRemove,
  handlereturn,
  onlyRemove,
  getUrlEdit,
  paycode,
  className,
  gift,
  id,
  forMyself = false,
  color = 'transparent',
}: EditPanelPurchaseHistoryProps): JSX.Element => {
  //Закрытие модального окна нажатием вне его
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisible(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

  return (
    <AuthComponent minRole={'ADMIN'} access={forMyself}>
      <ButtonCircleIcon
        onClick={() => setVisible(!visible)}
        icon='dots'
        appearance={color}
        classNameForIcon='@apply w-[30px] h-[30px]'
        className={cn(styles.dots, className)}
        ref={refOpen}
      />
      <EditPanel
        getUrlEdit={getUrlEdit}
        // onMouseLeave={() => setVisible(!visible)}
        id={id}
        deleteAsync={handleRemove}
        visible={visible}
        ref={ref}
        onlyRemove={onlyRemove}
        gift={gift}
        handlereturn1={handlereturn}
        paycode={paycode}
      />
      <FilterEditPanel
        getUrlEdit={getUrlEdit}
        setVisible={setVisible}
        id={id}
        deleteAsync={handleRemove}
        visible={visible}
        ref={ref}
        onlyRemove={onlyRemove}
        gift={gift}
        handlereturn1={handlereturn}
        paycode={paycode}
      />
    </AuthComponent>
  );
};

export default EditPanelPurchaseHistory;