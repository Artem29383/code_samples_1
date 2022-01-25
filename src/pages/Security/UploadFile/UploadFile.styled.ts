import styled from 'styled-components';

import { Colors } from '@types';

export const File = styled.div`
  width: 100%;
  position: relative;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
  cursor: pointer;
  font-family: LiberGrotesqueBlack, sans-serif;
  background: linear-gradient(
    -55deg,
    #6a8dff 0%,
    #8d8fff 41%,
    #8d8fff 41%,
    #928fff 46%,
    #928fff 47%,
    #928fff 47%,
    #c192ff 100%
  );
`;

export const Text = styled.span`
  font-size: 18px;
  color: ${Colors.white};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 65%;
`;

export const Cross = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
