import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  margin-top: 22px;
  min-height: 58vw;
  position: relative;
  padding: 0 12px 12px 12px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 2.4vw;
  margin-bottom: 3.467vw;
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 113.276vw;
`;

export const Link = styled.div``;

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
