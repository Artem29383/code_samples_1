import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserPageLayout from './UserPageLayout';

import { actions } from 'models/user';
import { useAction } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';
import { authorizedSelector } from 'models/user/selectors';
import { Routes } from '@types';
import {
  NotificationsIcon,
  PinIcon,
  SecurityIcon,
  ShowingsIcon,
  UserIcon,
  SearchesCycleIcon,
  HeartIcon,
} from 'styles/icons';

type Props = {
  children: React.ReactNode;
};

const routesPageName: {
  [key: string]: {
    title: string;
    icon: string;
  };
} = {
  [Routes.boards]: {
    title: 'Boards',
    icon: PinIcon,
  },
  [Routes.showings]: {
    title: 'Showings',
    icon: ShowingsIcon,
  },
  [Routes.editProfile]: {
    title: 'Edit Profile',
    icon: UserIcon,
  },
  [Routes.security]: {
    title: 'Security',
    icon: SecurityIcon,
  },
  [Routes.notifications]: {
    title: 'Notification',
    icon: NotificationsIcon,
  },
  [Routes.savedSearches]: {
    title: 'Saved Searches',
    icon: SearchesCycleIcon,
  },
  [Routes.favorites]: {
    title: 'Favorites',
    icon: HeartIcon,
  },
};

const UserPageLayoutContainer = ({ children }: Props) => {
  const handleSignOut = useAction(actions.signOutUser);
  const history = useHistory();
  const user = useSelector(authorizedSelector);
  const [location, setLocation] = useState('');

  const handleBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    const loc = history.location.pathname.split('/');
    setLocation(`/${loc[1]}`);
  }, [history.location.pathname]);

  return (
    <UserPageLayout
      onSignOut={handleSignOut}
      onGoBack={handleBack}
      firstName={user?.firstName || ''}
      lastName={user?.lastName || ''}
      avatarUrl={user?.avatarUrl || ''}
      location={location}
      routesName={routesPageName[location]?.title}
      routesIcon={routesPageName[location]?.icon || SecurityIcon}
    >
      {children}
    </UserPageLayout>
  );
};

export default UserPageLayoutContainer;
