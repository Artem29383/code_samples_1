/* eslint-disable jsx-a11y/alt-text */

import React, { useCallback } from 'react';
import { LayoutProps } from 'styled-system';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import { CommonProps } from './types';
import { BoardsList } from 'models/boards/selectors';
import { AddImageToBoardParams } from 'models/boards/types';

import useToggle from 'hooks/useToggle';

import PopupModal from 'components/Modal/PopupModal';
import TransparentModal from 'components/Modal/TransparentModal';
import Button from 'components/Button';
import Text from 'components/Text';
import TransparentScrollContainer from 'components/TransparentScrollContainer';

import * as Styled from './BoardsModal.styled';

type Props = {
  boards: BoardsList;
  isOpen: boolean;
  onClose: () => void;
  // fetching: boolean;
  onAddImageToBoard: (payload: AddImageToBoardParams) => void;
} & LayoutProps &
  CommonProps;

const BoardsModal = ({
  isOpen,
  boards,
  imageId,
  onClose,
  /* fetching, */ onAddImageToBoard,
}: Props) => {
  const [addModalOpened, toggleAddModalOpened] = useToggle(false);
  const [createModalOpen, toggleCreateModal] = useToggle(false);

  const handleCloseAddModal = useCallback(() => {
    onClose();
    toggleAddModalOpened();
  }, [onClose, toggleAddModalOpened]);

  const handleAddImageToBoard = useCallback(
    (boardId: number) => {
      onAddImageToBoard({
        imageId,
        boardId,
      });

      onClose();
    },
    [onAddImageToBoard, onClose, imageId]
  );

  const handleCreateBoardAndAddImage = useCallback(
    ({ title }) => {
      onAddImageToBoard({ imageId, boardTitle: title });
      toggleCreateModal();
      onClose();
    },
    [onClose, toggleCreateModal, onAddImageToBoard, imageId]
  );

  return (
    <React.Fragment>
      <TransparentModal
        isOpen={isOpen && !createModalOpen}
        onClose={handleCloseAddModal}
        onAfterOpen={toggleAddModalOpened}
        onRequestClose={handleCloseAddModal}
      >
        <Styled.AddToBoardModalContent>
          <TransparentScrollContainer
            width={300}
            isOpen={addModalOpened}
            id="transparent-modal-inspirations"
            maxContentHeight={300}
            mb={20}
          >
            {(boards || []).map((board, i) => (
              <Button
                key={board.id}
                color={board.default ? 'default' : 'white'}
                textColor={board.default ? 'white' : 'emperor'}
                onClick={() => handleAddImageToBoard(board.id)}
                marginBottom={i === boards.length - 1 ? 0 : 15}
              >
                {board.title}
              </Button>
            ))}
          </TransparentScrollContainer>
          <Text
            color="white"
            cursor="pointer"
            fontType="liberGrotesqueExtraBold"
            fontSize={16}
            align="center"
            onClick={toggleCreateModal}
          >
            + Add new collection
          </Text>
        </Styled.AddToBoardModalContent>
      </TransparentModal>
      <PopupModal
        isOpen={createModalOpen}
        onClose={toggleCreateModal}
        shouldCloseOnOverlayClick={false}
        onRequestClose={toggleCreateModal}
      >
        <Text
          fontType="bwGradualBold"
          fontSize={22}
          mb={13}
          color="mineShaft"
          align="center"
        >
          Enter custom name
        </Text>
        <Text
          fontType="liberGrotesqueBold"
          fontSize={14}
          lineHeight="22px"
          color="emperor"
          align="center"
          mb={50}
        >
          Some common collections include: <br /> Big Yards, Pools, Garage
          Space, etc.
        </Text>
        <Formik
          onSubmit={handleCreateBoardAndAddImage}
          initialValues={{ title: '' }}
          initialErrors={{ title: '' }}
          validationSchema={Yup.object({
            title: Yup.string().required(),
          })}
        >
          {({ isValid }) => (
            <Form>
              <Field name="title">
                {({ field }: FieldProps) => (
                  <Styled.CreateBoardInput
                    {...field}
                    placeholder="Collection Name"
                  />
                )}
              </Field>
              <Button disabled={!isValid} type="submit" width={274}>
                Save & Add
              </Button>
            </Form>
          )}
        </Formik>
      </PopupModal>
    </React.Fragment>
  );
};

export default BoardsModal;
