import React, { useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { Tour } from 'models/requests/types';
import { Colors, Routes } from '@types';

import Text from 'components/Text';
import AvatarUploader from 'components/AvatarUploader/AvatarUploader';
import Calendar from 'components/Calendar';
import Favorites from 'pages/Dashboard/Widgets/Favorites';
import Boards from 'pages/Dashboard/Widgets/Boards';

import * as Styled from './MobileDashboard.styled';

import {
  BackArrowIcon,
  CalendarIcon,
  DashboardIconHead,
  HeartIcon,
  PinIcon,
  ShowingsIcon,
} from 'styles/icons';
import { useSelector } from 'hooks/useSelector';
import { authorizedSelector } from 'models/user/selectors';
import { useAction, useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/user';

type Props = {
  groupTours: { [key: number]: Tour };
  setMonth: (p: number) => void;
  isLoad: boolean;
};

const MobileDashboard = ({ setMonth, groupTours, isLoad }: Props) => {
  const user = useSelector(authorizedSelector);
  const history = useHistory();
  const updateAvatar = useActionWithPayload(actions.updateUserAvatar);
  const removeAvatar = useAction(actions.removeUserAvatar);

  const handleBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Styled.Root>
      <Styled.Controls>
        <BackArrowIcon onClick={handleBack} />
        <Styled.IconWrap>
          <DashboardIconHead />
        </Styled.IconWrap>
        <Text
          fontSize={14}
          lineHeight={1}
          fontType="liberGrotesqueRegular"
          color="white"
        >
          Dashboard
        </Text>
      </Styled.Controls>
      <Styled.Body>
        <Styled.Profile>
          <AvatarUploader
            type="dashboard"
            avatar={user?.avatarUrl || ''}
            onUpload={updateAvatar}
            onRemove={removeAvatar}
          />
          <Styled.UI>
            <Styled.WrapperText>
              <Text
                lineHeight={1}
                fontSize={22}
                color="mineShaft"
                fontType="bwGradualBold"
              >
                {user?.firstName}
              </Text>
              <Text
                lineHeight={1}
                fontSize={22}
                color="mineShaft"
                fontType="bwGradualBold"
                mb={11}
              >
                {user?.lastName}
              </Text>
            </Styled.WrapperText>
            <Text
              fontSize={14}
              lineHeight={1}
              color="mineShaft"
              fontType="liberGrotesqueExtraBold"
            >
              <NavLink to={Routes.editProfile}>Edit Profile</NavLink>
            </Text>
            <Styled.Icons>
              <NavLink to={Routes.showings}>
                <CalendarIcon color={Colors.bombay} />
              </NavLink>
              <NavLink to={Routes.showings}>
                <ShowingsIcon color={Colors.bombay} />
              </NavLink>
              <NavLink to={Routes.favorites}>
                <HeartIcon color={Colors.bombay} />
              </NavLink>
              <NavLink to={Routes.boards}>
                <PinIcon color={Colors.bombay} />
              </NavLink>
            </Styled.Icons>
          </Styled.UI>
        </Styled.Profile>
        <Styled.Wrapper>
          <Calendar
            isListView
            isLoad={isLoad}
            mt={25}
            groupTours={groupTours}
            setMonth={setMonth}
          />
        </Styled.Wrapper>
        <Favorites />
        <Styled.Wrapper>
          <Boards />
          <Styled.LinkAllBoard to={Routes.boards}>
            See All Boards
          </Styled.LinkAllBoard>
        </Styled.Wrapper>
      </Styled.Body>
    </Styled.Root>
  );
};

export default MobileDashboard;
