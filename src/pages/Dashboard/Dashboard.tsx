import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import SwiperCore, { Mousewheel } from 'swiper';
import { SwiperSlide } from 'swiper/react';

import { useSelector } from 'hooks/useSelector';
import { authorizedSelector } from 'models/user/selectors';
import { useActionWithPayload } from 'hooks/useAction';
import { actions as actionsReq } from 'models/requests';
import { groupToursSelector, loadSelector } from 'models/requests/selectors';

import Text from 'components/Text';
import Calendar from 'components/Calendar';
import Boards from './Widgets/Boards';
import Favorites from 'pages/Dashboard/Widgets/Favorites';
import MobileDashboard from 'pages/Dashboard/MobileDashboard';

import useWindowResize from 'hooks/useWindowResize';

import * as Styled from './Dashboard.styled';

import { Viewport } from 'styles/media';

const year = format(new Date(), 'yyyy');

SwiperCore.use([Mousewheel]);

const Dashboard = () => {
  const { width: windowWidth, height: windowHeight } = useWindowResize();
  const user = useSelector(authorizedSelector);
  const $content = useRef<HTMLDivElement | null>(null);
  const [month, setMonth] = useState(0);
  // const handleSignOut = useAction(actions.signOutUser);
  const getGroupTours = useActionWithPayload(actionsReq.getGroupTours);
  const setGroupTours = useActionWithPayload(actionsReq.setGroupTours);
  const groupTours = useSelector(groupToursSelector);
  const setLoad = useActionWithPayload(actionsReq.setLoad);
  const isLoad = useSelector(loadSelector);

  useEffect(() => {
    setLoad(true);
  }, [setLoad, month]);

  useEffect(() => {
    getGroupTours({
      tour_month: `${year}-${
        ((month as unknown) as number) + 1 > 12 ? 1 : month + 1
      }`,
    });
    return () => {
      setGroupTours({});
    };
  }, [month, getGroupTours, setGroupTours]);

  return windowWidth > 1024 ? (
    <Styled.Root>
      <Styled.Content ref={$content}>
        <Text
          fontType="bwGradualBold"
          fontSize={38}
          color="cornFlowerBlue"
          mb={34}
        >
          Welcome back, {user?.firstName}.
        </Text>
        <Text
          fontType="liberGrotesqueNews"
          fontSize={18}
          color="cornFlowerBlue"
        >
          Hi {user?.firstName}, this is your dashboard.
        </Text>
        <Styled.Widgets>
          <Styled.Slider
            fullscreen="true"
            slidesPerView="auto"
            grabCursor
            freeMode
            mousewheel={{
              releaseOnEdges: true,
            }}
            spaceBetween={windowWidth < Viewport.tablet ? 20 : 35}
            pagination={{
              el: '.swiper-pagination-list',
              type: 'progressbar',
              clickable: true,
            }}
          >
            <SwiperSlide>
              <Styled.WrapperCalendar>
                <Calendar
                  isListView={false}
                  isLoad={isLoad}
                  setMonth={setMonth}
                  groupTours={groupTours}
                  width={windowWidth > 1024 && windowHeight < 801 ? 465 : 518}
                />
              </Styled.WrapperCalendar>
            </SwiperSlide>
            <SwiperSlide>
              <Boards />
            </SwiperSlide>
            <SwiperSlide>
              <Favorites />
            </SwiperSlide>
          </Styled.Slider>
        </Styled.Widgets>
      </Styled.Content>
    </Styled.Root>
  ) : (
    <MobileDashboard
      isLoad={isLoad}
      setMonth={setMonth}
      groupTours={groupTours}
    />
  );
};

export default Dashboard;
