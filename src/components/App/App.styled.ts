import styled from 'styled-components';

import { windowHeightMixin } from 'styles/helpers';

export const Root = styled.div`
  ${windowHeightMixin}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

export const Logo = styled.img`
  height: 50px;
  float: left;
  margin-right: 10px;
`;

export const Hr = styled.hr`
  margin-bottom: 15px;
  margin-top: 15px;
  opacity: 0.15;
`;
