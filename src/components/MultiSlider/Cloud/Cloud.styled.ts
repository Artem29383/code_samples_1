import styled from 'styled-components';
import { FONTS } from 'styles/fonts';

export const Cloud = styled.div<{ transform?: string; isEdit: boolean }>`
  width: 76px;
  height: 42px;
  cursor: pointer;
  top: -50px;
  left: -100%;
  transform: ${({ transform }) => (transform ? `${transform}` : 'none')};
  background: ${({ isEdit }) =>
    isEdit
      ? 'linear-gradient(73.74deg, #638CFF 1.21%, #C192FF 99.06%)'
      : '#ffffff'};
  box-shadow: 0 5px 15px rgba(68, 68, 68, 0.15);
  border-radius: 45px;
  position: absolute;
  font-style: normal;
  font-weight: bold;
  color: ${({ isEdit }) => (isEdit ? '#fff' : '#638cff')};
  font-size: 16px;
  line-height: 19px;
  font-family: ${FONTS.BwGradualRegular};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Label = styled.div<{ isEdit: boolean }>`
  font-family: ${FONTS.LiberGrotesqueBold};
  font-style: normal;
  font-size: 9px;
  line-height: 11px;
  text-align: center;
  color: ${({ isEdit }) => (isEdit ? '#fff' : '#c4c4d9')};
  text-transform: uppercase;
`;

export const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    height: 10px;
    width: 10px;
    margin-left: 3px;
  }
`;

export const Text = styled.div`
  color: #638cff;
  font-size: 16px;
  line-height: 19px;
  font-family: ${FONTS.BwGradualRegular};
`;

export const InputWrapper = styled.div`
  max-width: 100%;
`;

export const InputEdit = styled.input`
  max-width: 100%;
  text-align: center;
`;
