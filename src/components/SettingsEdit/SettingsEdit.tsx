import React, { memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { animationMenu } from '@types';

import Text from 'components/Text';
import Arrow from 'components/Arrow/Arrow.styled';

import useWindowResize from 'hooks/useWindowResize';

import * as Styled from './SettingsEdit.styled';

import { NotificationsIcon, SecurityIcon, UserIcon } from 'styles/icons';

const navItems = [
  {
    title: 'Edit profile',
    link: '/edit-profile',
    icon: UserIcon,
  },
  // {
  //   title: 'Contact information',
  //   link: '/contacts',
  //   icon: EnvelopeIcon,
  // },
  // {
  //   title: 'Saved Addresses',
  //   link: '/saved-addresses',
  //   icon: SearchesIcon,
  // },
  {
    title: 'Security',
    link: '/security',
    icon: SecurityIcon,
  },
  {
    title: 'Notifications',
    link: '/notifications',
    icon: NotificationsIcon,
  },
  // {
  //   title: 'Terms & Conditions',
  //   link: '/terms-conditions',
  //   icon: TermsIcon,
  // },
];

const SettingsEdit = ({ onClick = () => {} }: { onClick?: () => void }) => {
  const { pathname: path } = useLocation();
  const { width: windowWidth } = useWindowResize();
  const history = useHistory();

  return (
    <>
      {navItems.map(({ title, link, icon: Icon }, i) => (
        <Text
          as="li"
          key={title}
          display="flex"
          alignItems="center"
          position="relative"
          fontType="liberGrotesqueExtraBold"
          fontSize={16}
          color={path === link ? 'cornFlowerBlue' : 'mineShaft'}
          width={windowWidth > 1024 && windowWidth < 1441 ? 240 : 321}
          mb={i < navItems.length - 1 ? 22 : 0}
        >
          <Styled.NavLink
            onClick={() => {
              if (windowWidth < 1025) {
                onClick();
                setTimeout(() => {
                  history.push(link);
                }, animationMenu.animationTimeout);
              }
              if (windowWidth > 1024) {
                history.push(link);
              }
            }}
            width={path === link ? '100%' : 'auto'}
          >
            <Icon width={22} height={22} mr={22} />
            {title}
            {path === link && (
              <Arrow
                ml="auto"
                direction="right"
                size={3}
                thickness={3}
                color="cornFlowerBlue"
              />
            )}
          </Styled.NavLink>
        </Text>
      ))}
    </>
  );
};

export default memo(SettingsEdit);
