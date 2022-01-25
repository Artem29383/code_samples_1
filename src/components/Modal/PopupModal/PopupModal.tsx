import React from 'react';

import Modal from '../index';
import Cross from 'components/Cross';

import { CommonProps } from '../types';

const modalStyle = {
  content: {
    padding: '50px 30px 18px',
    border: 'none',
    borderRadius: '20px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '335px',
    transform: 'translate(-50%, -50%)',
  },
};

type Props = {
  width?: number;
} & CommonProps;

export const PopupModal = ({
  children,
  onClose,
  width = 335,
  ...rest
}: Props) => {
  return (
    <Modal
      {...rest}
      style={{
        ...modalStyle,
        content: { ...modalStyle.content, width: `${width}px` },
      }}
    >
      <Cross position="absolute" top={20} right={20} onClick={onClose} />
      {children}
    </Modal>
  );
};

export default PopupModal;
