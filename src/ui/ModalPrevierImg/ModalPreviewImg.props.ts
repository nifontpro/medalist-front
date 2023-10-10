import { Dispatch, SetStateAction } from 'react';

export type ModalPreviewImgProps = {
  // textBtn: string;
  // title: string;
  // text: string;
  openModalConfirm: boolean;
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>;
  // onConfirm: () => void;
  srcImg?: string;
};
