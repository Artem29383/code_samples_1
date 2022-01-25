import React, { useCallback } from 'react';
import SwiperCore, { Mousewheel } from 'swiper';
import { SwiperSlide } from 'swiper/react';

import { Request, Tour } from 'models/requests/types';

import Text from 'components/Text';
import PropertyCard from 'pages/ShowingsInside/PropertyCard';
import Spinner from 'components/Spinner';
import Datepicker from 'components/DatePickerCopy';

import * as Styled from './ShowingsInside.styled';
import { Viewport } from 'styles/media';

SwiperCore.use([Mousewheel]);

type Props = {
  date: Date | null;
  setCurrentDate: (p: string) => void;
  ids: string[];
  collection: {
    [key: number]: Request;
  };
  windowWidth: number;
  isLoad: boolean;
  setCustomInterval: React.Dispatch<
    React.SetStateAction<{
      first: null | string;
      last: null | string;
      monthLeft: null | string;
      monthRight: null | string;
    }>
  >;
  currentToursGroup: {
    [key: string]: {
      [key: string]: Tour;
    };
  };
  isLoadCards: boolean;
};

let content;

const ShowingsInside = ({
  date,
  setCurrentDate,
  collection,
  ids,
  windowWidth,
  isLoad,
  setCustomInterval,
  currentToursGroup,
  isLoadCards,
}: Props) => {
  const toRenderCard = useCallback(
    () =>
      ids.map(id =>
        windowWidth > Viewport.tablet ? (
          <SwiperSlide key={id}>
            <PropertyCard
              propertyId={
                collection[(id as unknown) as number].propertyTour.property.id
              }
              forShowing={
                collection[(id as unknown) as number].propertyTour.property
                  .forShowing
              }
              key={id}
              id={id}
              note={collection[(id as unknown) as number].propertyTour.note}
              imageUrl={
                collection[(id as unknown) as number].propertyTour.property
                  .photo.imageUrl
              }
              bedroomsTotal={
                collection[(id as unknown) as number].propertyTour.property
                  .bedroomsTotal
              }
              bathroomsTotal={
                collection[(id as unknown) as number].propertyTour.property
                  .bathroomsTotal
              }
              livingAreaTotalSquareFeet={
                collection[(id as unknown) as number].propertyTour.property
                  .livingAreaTotalSquareFeet
              }
              address={
                collection[(id as unknown) as number].propertyTour.property
                  .address
              }
              listPrice={
                collection[(id as unknown) as number].propertyTour.property
                  .listPrice
              }
              status={
                collection[(id as unknown) as number].propertyTour.property
                  .standardStatus
              }
            />
          </SwiperSlide>
        ) : (
          <PropertyCard
            propertyId={
              collection[(id as unknown) as number].propertyTour.property.id
            }
            forShowing={
              collection[(id as unknown) as number].propertyTour.property
                .forShowing
            }
            key={id}
            id={id}
            note={collection[(id as unknown) as number].propertyTour.note}
            imageUrl={
              collection[(id as unknown) as number].propertyTour.property.photo
                .imageUrl
            }
            bedroomsTotal={
              collection[(id as unknown) as number].propertyTour.property
                .bedroomsTotal
            }
            bathroomsTotal={
              collection[(id as unknown) as number].propertyTour.property
                .bathroomsTotal
            }
            livingAreaTotalSquareFeet={
              collection[(id as unknown) as number].propertyTour.property
                .livingAreaTotalSquareFeet
            }
            address={
              collection[(id as unknown) as number].propertyTour.property
                .address
            }
            listPrice={
              collection[(id as unknown) as number].propertyTour.property
                .listPrice
            }
            status={
              collection[(id as unknown) as number].propertyTour.property
                .standardStatus
            }
          />
        )
      ),
    [collection, ids, windowWidth]
  );

  if (windowWidth > Viewport.tablet) {
    content = (
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
        {toRenderCard()}
      </Styled.Slider>
    );
  } else {
    content = <Styled.MobileRoot>{toRenderCard()}</Styled.MobileRoot>;
  }

  return (
    <Styled.Root>
      {windowWidth > 1024 && (
        <Text
          fontSize={38}
          lineHeight="38px"
          fontType="bwGradualBold"
          color="cornFlowerBlue"
          mb={20}
        >
          Showings
        </Text>
      )}
      {date && (
        <Styled.DatePicker>
          <Datepicker
            id="picker"
            onGetDate={setCurrentDate}
            isDetectDate
            datePick={date}
            setCustomInterval={setCustomInterval}
            currentToursGroup={currentToursGroup}
            isLoad={isLoad}
          />
        </Styled.DatePicker>
      )}
      <Styled.Tours isLoad={isLoadCards}>
        {isLoadCards ? (
          <Styled.Spinner>
            <Spinner />
          </Styled.Spinner>
        ) : (
          content
        )}
      </Styled.Tours>
    </Styled.Root>
  );
};

export default ShowingsInside;
