import { EditPanelImgBtnProps } from './EditPanelImgBtn.props';
import useOutsideClick from '@/hooks/useOutsideClick';
import { memo, useCallback, useRef, useState } from 'react';
import EditPanel from './EditPanel/EditPanel';
import FilterEditPanel from './FilterEditPanel/FilterEditPanel';
import AuthComponent from '@/store/providers/AuthComponent';
import ButtonEdit from '../ButtonEdit/ButtonEdit';

const EditPanelImgBtn = ({
  gallery,
  onChangeImages,
}: EditPanelImgBtnProps): JSX.Element => {
  //Закрытие модального окна нажатием вне его
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = useCallback(() => {
    setVisible(false);
  }, []);
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

  return (
    <AuthComponent minRole={'ADMIN'}>
      <ButtonEdit
        onClick={(e) => {
          e.preventDefault();
          setVisible(!visible);
        }}
        icon='upload'
        ref={refOpen}
      />
      <EditPanel
        onMouseLeave={() => setVisible(!visible)}
        visible={visible}
        ref={ref}
        gallery={gallery}
        onChange={onChangeImages}
      />
      <FilterEditPanel
        setVisible={setVisible}
        visible={visible}
        ref={ref}
        gallery={gallery}
        onChange={onChangeImages}
      />
    </AuthComponent>
  );
};

export default memo(EditPanelImgBtn)
