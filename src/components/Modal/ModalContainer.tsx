import React, { useCallback } from 'react';

import { CommonProps } from './types';

import { actions } from 'models/app';
import { useAction } from 'hooks/useAction';

import Modal from './Modal';

const ModalContainer = ({
  onAfterOpen = () => {},
  onAfterClose = () => {},
  ...rest
}: CommonProps) => {
  const toggleModalOpen = useAction(actions.toggleModalOpen);

  const handleAfterOpen = useCallback(() => {
    toggleModalOpen();
    onAfterOpen();

    document.body.classList.add('body-no-scroll');
  }, [onAfterOpen, toggleModalOpen]);

  const handleAfterClose = useCallback(() => {
    toggleModalOpen();
    onAfterClose();

    document.body.classList.remove('body-no-scroll');
  }, [onAfterClose, toggleModalOpen]);

  return (
    <Modal
      onAfterOpen={handleAfterOpen}
      onAfterClose={handleAfterClose}
      {...rest}
    />
  );
};

export default ModalContainer;
