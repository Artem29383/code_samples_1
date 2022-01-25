import React, { useCallback } from 'react';
import { darken } from 'polished';

import { Colors } from '@types';
import { CommonProps } from '../types';

import Modal from '../index';
import Cross from 'components/Cross';

import * as Styled from './TransparentModal.styled';

const modalStyle = {
  content: {
    border: 'none',
    inset: '0',
    background: 'none',
  },
};

export const TransparentModal = ({
  children,
  onClose = () => {},
  ...rest
}: CommonProps) => {
  const handleOverlayClick = useCallback(
    (e: React.SyntheticEvent) => {
      if ((e.target as HTMLDivElement).id === 'transparent-modal') {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Modal {...rest} style={modalStyle}>
      <Styled.ModalWrapper id="transparent-modal" onClick={handleOverlayClick}>
        <Cross
          color={darken(0.5, Colors.mischka)}
          position="absolute"
          top={60}
          right={65}
          onClick={onClose}
        />
        {children}
      </Styled.ModalWrapper>
    </Modal>
  );
};

export default TransparentModal;
