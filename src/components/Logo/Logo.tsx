import React from 'react';

import { LayoutProps, PositionProps } from 'styled-system';

import * as Styled from './Logo.styled';

type Props = { $white?: boolean; $zIndex?: number } & PositionProps &
  LayoutProps;

/* TODO Check logo in Safari. Invalid color */
const Logo = (props: Props) => <Styled.Root {...props} />;

export default Logo;
