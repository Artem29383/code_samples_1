import React from 'react';
import ReactModal from 'react-modal';
import { rgba } from 'polished';

import { CommonProps } from './types';

import { Colors } from '@types';

const modalStyle = {
  overlay: {
    zIndex: 1000,
    backgroundColor: rgba(Colors.black, 0.3),
  },
};

const Modal = ({ style = {}, children, ...rest }: CommonProps) => (
  <ReactModal style={{ ...modalStyle, ...style }} {...rest}>
    {children}
  </ReactModal>
);

export default Modal;
