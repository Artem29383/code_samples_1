import React from 'react';

import { CommonProps } from 'components/Modal/types';

import Modal from 'components/Modal/ModalContainer';

import * as Styled from './MapModal.styled';
import useWindowResize from 'hooks/useWindowResize';

const modalStyle = {
  content: {
    border: 'none',
    inset: '0',
    padding: '28px 120px',
    background: 'none',
  },
};

const modalStyleMobile = {
  content: {
    border: 'none',
    inset: '0',
    padding: '10px',
    background: 'none',
  },
};

const MapModal = ({ children, ...rest }: CommonProps) => {
  const { width: windowWidth } = useWindowResize();
  return (
    <Modal
      {...rest}
      style={windowWidth >= 1024 ? modalStyle : modalStyleMobile}
    >
      <Styled.ModalWrapper>{children}</Styled.ModalWrapper>
    </Modal>
  );
};

export default MapModal;
