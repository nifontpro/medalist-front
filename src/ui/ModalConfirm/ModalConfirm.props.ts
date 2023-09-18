import { Dispatch, SetStateAction } from 'react';

export type ModalConfirmProps = {
  text: string;
  openModalConfirm: boolean;
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
};
