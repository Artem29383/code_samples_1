import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { StyledComponent } from 'styled-components';

import { animationMenu, Colors, Routes } from '@types';

import Text from 'components/Text';
import AppLink from 'components/AppLink';

import {
  DashboardIcon,
  HeartIcon,
  LogoutIcon,
  PinIcon,
  SearchesCycleIcon,
  SettingsIcon,
  ShowingsIcon,
} from 'styles/icons';

import * as Styled from './Navigator.styled';

const imagePlaceholder = require('images/placeholder2.png');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

const topNavItems = [
  {
    title: 'Dashboard',
    link: Routes.dashboard,
    icon: DashboardIcon,
  },
  {
    title: 'Showings',
    link: Routes.showings,
    icon: ShowingsIcon,
  },
  {
    title: 'Favorites',
    link: Routes.favorites,
    icon: HeartIcon,
  },
  {
    title: 'Boards',
    link: Routes.boards,
    icon: PinIcon,
  },
  {
    title: 'Searches',
    link: Routes.savedSearches,
    icon: SearchesCycleIcon,
  },
];

const bottomNavItems = [
  {
    title: 'Settings',
    link: Routes.editProfile,
    icon: SettingsIcon,
  },
];

const renderNav = (
  items: {
    title: string;
    link: string;
    icon: StyledComponent<any, any>;
  }[],
  mb: number | string,
  windowWidth: number | undefined,
  onToggle: (() => void) | undefined,
  colorLinks: string,
  colorIcons: string,
  activeClassName: 'activeRoute' | 'activeRouteDashboard',
  onHideMenu: () => void,
  history: {
    location: {
      pathname: string;
    };
    push: (p: string) => void;
  }
) => (
  <Styled.Nav mb={mb}>
    {items.map(({ title, link, icon: Icon }) => (
      <Styled.NavItem key={title} colorText={colorLinks}>
        <AppLink width={22} height={22} mr={30} to={link}>
          <Icon width="100%" height="100%" color={colorIcons} />
        </AppLink>
        {(windowWidth as number) < 1025 && title === 'Settings' ? (
          <Text
            onClick={onToggle}
            fontSize={16}
            lineHeight="16px"
            fontType="liberGrotesqueBold"
            color="white"
          >
            {title}
          </Text>
        ) : (
          <Styled.Link
            to={link}
            onClick={e => {
              if ((windowWidth as number) < 1025) {
                onHideMenu();
                e.preventDefault();
                setTimeout(() => {
                  history.push(link);
                }, animationMenu.animationTimeout);
              }
              if ((windowWidth as number) > 1024) {
                history.push(link);
              }
            }}
            activeClassNameBoolean={link === history.location.pathname}
            colorLinks={colorLinks}
          >
            {title}
          </Styled.Link>
        )}
      </Styled.NavItem>
    ))}
  </Styled.Nav>
);

type Props = {
  onSignOut: () => void;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  windowWidth?: number;
  onToggle?: () => void;
  colorLinks: string;
  colorIcons: string;
  activeClassName: 'activeRoute' | 'activeRouteDashboard';
  onHideMenu?: () => void;
};

const Navigator = ({
  onSignOut,
  onHideMenu,
  firstName,
  lastName,
  avatarUrl,
  windowWidth,
  onToggle,
  colorLinks,
  colorIcons,
  activeClassName,
}: Props) => {
  const history = useHistory();
  const nameLength = `${firstName} ${lastName}`.length;

  return (
    <Styled.Root>
      {windowWidth! > 1024 && (
        <Styled.Avatar>
          <Styled.Image src={avatarUrl} onError={handleImageError} />
        </Styled.Avatar>
      )}
      {windowWidth! > 1024 &&
        (nameLength > 20 ? (
          <Styled.Wrapper>
            <Text
              align="left"
              maxWidth={158}
              fontType="bwGradualExtraBold"
              fontSize={22}
              color={colorLinks === Colors.white ? 'white' : 'cornFlowerBlue'}
              mb={7}
            >
              {firstName}
            </Text>
            <Text
              align="left"
              maxWidth={158}
              fontType="bwGradualExtraBold"
              fontSize={22}
              color={colorLinks === Colors.white ? 'white' : 'cornFlowerBlue'}
              mb={47}
            >
              {lastName}
            </Text>
          </Styled.Wrapper>
        ) : (
          <Text
            align="left"
            maxWidth={210}
            fontType="bwGradualExtraBold"
            fontSize={22}
            color={colorLinks === Colors.white ? 'white' : 'cornFlowerBlue'}
            mb={47}
          >
            {firstName} {lastName}
          </Text>
        ))}
      {renderNav(
        topNavItems,
        'auto',
        windowWidth,
        onToggle,
        colorLinks,
        colorIcons,
        activeClassName,
        onHideMenu!,
        history
      )}
      {renderNav(
        bottomNavItems,
        0,
        windowWidth,
        onToggle,
        colorLinks,
        colorIcons,
        activeClassName,
        onHideMenu!,
        history
      )}
      <Styled.NavItem
        onClick={onSignOut}
        cursor="pointer"
        colorText={colorLinks}
      >
        <LogoutIcon mr={30} width={22} height={22} color={colorIcons} />
        Logout
      </Styled.NavItem>
    </Styled.Root>
  );
};

export default memo(Navigator);
