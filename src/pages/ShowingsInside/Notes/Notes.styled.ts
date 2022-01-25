import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';

export const Notes = styled.div<{ isEdit: boolean }>`
  max-width: 93%;
  margin: 0 auto;
  position: relative;
  padding: 0 20px 0 0;
  width: 100%;

  & div {
    word-break: break-word;
  }

  ${media.desktop`
    opacity: 0.9;
  // @ts-ignore
    position: ${({ isEdit }) => (isEdit ? 'absolute' : 'static')};
    bottom: 0;
    left: 50%;
    // @ts-ignore
    transform: ${({ isEdit }) =>
      isEdit ? 'translateX(-50%)' : 'translateX(0)'};
    // @ts-ignore
    box-shadow: ${({ isEdit }) =>
      isEdit ? '10px 10px 20px rgba(0, 0, 0, 0.1)' : 'none'};
      // @ts-ignore
    background: ${({ isEdit }) => (isEdit ? 'white' : 'transparent')};
    padding: 10px;
    border-radius: 10px;
    max-width: 80%;
  `}

  & .read-more-button {
    text-decoration: underline;
    color: ${Colors.malibu};
    font-family: LiberGrotesqueExtraBold, sans-serif;
  }
`;

export const NotesEdit = styled.div<{ isEdit: boolean }>`
  max-width: 93%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  border-radius: 20px;
  padding: 18px 20px 28px 11px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);

  ${media.desktop`
    // @ts-ignore
    position: ${({ isEdit }) => (isEdit ? 'absolute' : 'static')};
    // @ts-ignore
    transform: ${({ isEdit }) =>
      isEdit ? 'translateX(-50%)' : 'translateX(0)'};
    max-width: 80%;
    bottom: 0;
    left: 50%;
    // @ts-ignore
    background: ${({ isEdit }) => (isEdit ? 'white' : 'transparent')};
  `}
`;

export const TextArea = styled.textarea`
  color: ${Colors.mineShaft};
  font-size: 14px;
  line-height: 18px;
  font-family: LiberGrotesqueExtraBold, sans-serif;
  width: 100%;
  resize: none;

  ${media.desktop`
    font-size: 16px;
    line-height: 23px;
  `}
`;

export const AutoSaving = styled.div<{ showAutoSaving: boolean }>`
  color: ${Colors.mischka};
  font-size: 10px;
  line-height: 10px;
  right: 15px;
  bottom: 10px;
  position: absolute;
  font-family: liberGrotesqueBold, sans-serif;
  opacity: ${({ showAutoSaving }) => (showAutoSaving ? 1 : 0)};
  transition: opacity 300ms ease;

  ${media.desktop`
    font-size: 14px;
    line-height: 19px;
  `}
`;

export const AddNotes = styled.div`
  font-size: 12px;
  line-height: 12px;
  position: absolute;
  text-decoration: underline;
  color: ${Colors.malibu};
  cursor: pointer;
  font-family: liberGrotesqueBold, sans-serif;

  ${media.desktop`
    font-size: 14px;
    line-height: 21px;
  `}
`;

export const Edit = styled.div`
  font-size: 14px;
  line-height: 14px;
  position: absolute;
  text-decoration: underline;
  color: ${Colors.bombay};
  cursor: pointer;
  font-family: liberGrotesqueBold, sans-serif;
  right: 0;
  bottom: 0;

  ${media.desktop`
    font-size: 16px;
    line-height: 23px;
    bottom: 0;
    padding: 5px;
    right: 15px;
  `}
`;
