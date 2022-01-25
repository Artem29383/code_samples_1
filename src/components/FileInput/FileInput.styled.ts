import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  cursor: pointer;
  height: 100%;
  text-align: center;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Input = styled.input<any>`
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer !important;
`;
