import React from 'react';
import { UserFatIcon } from 'styles/icons';

import Link from 'components/AppLink';
import Logo from 'components/Logo';

import * as Styled from './Header.styled';
import { User } from 'models/user/types';
import { Routes } from '@types';

type Props = {
  onMenuClick: () => void;
  windowWidth: number;
  onToggle: () => void;
  current?: null | User;
};

const Header = ({ onMenuClick, windowWidth, onToggle, current }: Props) => (
  <Styled.Root>
    <Link
      to="/properties"
      width={{ m: 165, t: 205 }}
      height={{ m: 22, t: 27 }}
      left={{ m: 15, t: 38 }}
      top="50%"
      position="absolute"
      vert="-50%"
    >
      <Logo />
    </Link>
    <Styled.Hamburger onClick={onMenuClick}>
      <span />
      <span />
      <span />
    </Styled.Hamburger>
    {windowWidth < 1025 ? (
      <Styled.UserLinkBtn onClick={onToggle}>
        <UserFatIcon width="100%" height="100%" />
      </Styled.UserLinkBtn>
    ) : (
      <Styled.UserLink
        to={current !== null ? Routes.dashboard : Routes.properties}
      >
        <UserFatIcon width="100%" height="100%" />
      </Styled.UserLink>
    )}
  </Styled.Root>
);

export default Header;
