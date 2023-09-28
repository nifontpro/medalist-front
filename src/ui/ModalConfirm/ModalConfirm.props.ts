import { Dispatch, SetStateAction } from 'react';

export type ModalConfirmProps = {
  textBtn: string;
  title: string;
  text: string;
  openModalConfirm: boolean;
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
};
