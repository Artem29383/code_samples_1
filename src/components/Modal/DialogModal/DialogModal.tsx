import React from 'react';

import PopupModal from '../PopupModal';
import Button from 'components/Button';

import * as S from './DialogModal.styled';

import { CommonProps } from '../types';

type Props = {
  onApprove: () => void;
} & CommonProps;

export const DialogModal = ({
  children,
  onApprove,
  onClose,
  ...rest
}: Props) => {
  return (
    <PopupModal onClose={onClose} {...rest}>
      {children}
      <S.Buttons>
        <Button onClick={onApprove} color="default" marginRight={20}>
          Confirm
        </Button>
        <Button color="mischka" onClick={onClose}>
          Cancel
        </Button>
      </S.Buttons>
    </PopupModal>
  );
};

export default DialogModal;
