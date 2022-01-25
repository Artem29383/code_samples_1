import React, { useCallback } from 'react';
import { LinkProps, useLocation } from 'react-router-dom';
import { PositionProps, MarginProps, LayoutProps } from 'styled-system';

import { TranslateProps } from '@types';

import isExternalLink from 'utils/isExternalLink';

import * as Styled from './AppLink.styled';

type Props = LinkProps &
  PositionProps &
  MarginProps &
  LayoutProps &
  TranslateProps;

const AppLink = ({ children, to, onClick, ...rest }: Props) => {
  const { pathname } = useLocation();

  const handleClick = useCallback(
    (e: React.SyntheticEvent) => {
      if (pathname === to || pathname === `${to}/`) {
        e.preventDefault();
      }
    },
    [pathname, to]
  );

  if (typeof to === 'string' && isExternalLink(to)) {
    return (
      <Styled.ExternalLink target="_blank" href={to} {...rest}>
        {children}
      </Styled.ExternalLink>
    );
  }

  return (
    <Styled.AppLink to={to} onClick={handleClick} {...rest}>
      {children}
    </Styled.AppLink>
  );
};

export default AppLink;
