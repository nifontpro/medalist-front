import styles from './EditPanelAuthBtn.module.scss';
import { EditPanelAuthBtnProps } from './EditPanelAuthBtn.props';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useRef, useState } from 'react';
import EditPanel from './EditPanel/EditPanel';
import FilterEditPanel from './FilterEditPanel/FilterEditPanel';
import cn from 'classnames';
import AuthComponent from '@/store/providers/AuthComponent';

const EditPanelAuthBtn = ({
  handleRemove,
  onlyRemove,
  getUrlEdit,
  className,
  id,
  color = 'transparent',
}: EditPanelAuthBtnProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  //Закрытие модального окна нажатием вне его
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisible(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

  return (
    <AuthComponent minRole={'ADMIN'}>
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
        onMouseLeave={() => setVisible(!visible)}
        id={id}
        deleteAsync={handleRemove}
        visible={visible}
        ref={ref}
        onlyRemove={onlyRemove}
      />
      <FilterEditPanel
        getUrlEdit={getUrlEdit}
        setVisible={setVisible}
        id={id}
        deleteAsync={handleRemove}
        visible={visible}
        ref={ref}
        onlyRemove={onlyRemove}
      />
    </AuthComponent>
  );
};

export default EditPanelAuthBtn;
