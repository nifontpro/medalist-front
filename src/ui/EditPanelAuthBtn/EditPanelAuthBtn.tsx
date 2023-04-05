import styles from './EditPanelAuthBtn.module.scss';
import { EditPanelAuthBtnProps } from './EditPanelAuthBtn.props';
// import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useRef, useState } from 'react';
import EditPanel from './EditPanel/EditPanel';
import FilterEditPanel from './FilterEditPanel/FilterEditPanel';

const EditPanelAuthBtn = ({
  handleRemove,
  onlyRemove,
  getUrl,
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
    // <AuthComponent minRole={'director'}>
    <>
      <ButtonCircleIcon
        onClick={() => setVisible(!visible)}
        icon='dots'
        appearance={color}
        className={styles.dots}
        ref={refOpen}
      />
      <EditPanel
        getUrl={getUrl}
        onMouseLeave={() => setVisible(!visible)}
        id={id}
        // deleteAsync={handleRemove}
        visible={visible}
        ref={ref}
        onlyRemove={onlyRemove}
      />
      <FilterEditPanel
        getUrl={getUrl}
        setVisible={setVisible}
        id={id}
        // deleteAsync={handleRemove}
        visible={visible}
        ref={ref}
        onlyRemove={onlyRemove}
      />
    </>

    // </AuthComponent>
  );
};

export default EditPanelAuthBtn;
