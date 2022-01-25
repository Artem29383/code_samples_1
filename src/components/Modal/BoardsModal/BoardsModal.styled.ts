import styled from 'styled-components';

import { Colors } from '@types';

import { center, textMixin } from 'styles/helpers';

export const AddToBoardModalContent = styled.div`
  ${center()}
`;

export const CreateBoardInput = styled.input`
  width: 100%;
  padding-bottom: 5px;
  margin-bottom: 30px;
  border-bottom: 2px solid ${Colors.bombay};

  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 18,
    color: 'mineShaft',
  })}
`;
