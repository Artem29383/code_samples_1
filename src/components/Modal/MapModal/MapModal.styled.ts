import styled from 'styled-components';
import { Colors } from '@types';

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: ${Colors.white};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
