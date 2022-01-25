import React, { memo, useCallback, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import { useHistory } from 'react-router-dom';

import { Property } from 'models/properties/types';

import Button from 'components/Button';
import Card from 'pages/Property/PropertyList/Card';
import Text from 'components/Text';

import useWindowResize from 'hooks/useWindowResize';

import { Viewport } from 'styles/media';

import * as Styled from './PropertyList.styled';

SwiperCore.use([Mousewheel]);

type Props = {
  ids: number[];
  entities: {
    [key: string]: Property;
  };
  images: { id: number; url: string }[];
  isLoad: boolean;
};

const PropertyList = ({ ids, entities, images }: Props) => {
  const [isHover, setHover] = useState(false);
  // const [slideIndex, setSlideIndex] = useState(1);
  const history = useHistory();
  const [controlledSwiper, setControlledSwiper] = useState<{
    slideTo: (index: number, speed?: number, runCallbacks?: boolean) => void;
  } | null>(null);
  const { width: windowWidth } = useWindowResize();

  const handleToProperties = useCallback(() => {
    history.push('/properties');
  }, [history]);

  return (
    <>
      <Styled.Root>
        <Styled.Slider
          onSwiper={setControlledSwiper}
          fullscreen="true"
          slidesPerView="auto"
          freeMode
          mousewheel={{
            releaseOnEdges: true,
          }}
          grabCursor
          spaceBetween={windowWidth < Viewport.tablet ? 20 : 25}
          pagination={{
            el: '.swiper-pagination-list',
            type: 'progressbar',
            clickable: true,
          }}
        >
          {ids.map((id, index) => (
            <SwiperSlide
              key={id}
              onClick={() => {
                if (windowWidth > Viewport.tablet) {
                  controlledSwiper?.slideTo(index + 1);
                }
              }}
            >
              <Card
                isHoverState={isHover}
                setHoverIndex={setHover}
                key={id}
                id={id}
                entities={entities}
                images={images}
                windowWidth={windowWidth}
              />
            </SwiperSlide>
          ))}
        </Styled.Slider>
      </Styled.Root>
      {windowWidth > Viewport.tablet && (
        <Styled.ProgressWrapper>
          <Styled.Progress>
            <Styled.ProgressBar className="swiper-pagination-list" />
          </Styled.Progress>
          <Styled.Counter>
            <Text
              fontSize={18}
              lineHeight="18px"
              color="argent"
              fontType="liberGrotesqueLight"
            >
              {ids.length} Results
            </Text>
          </Styled.Counter>
        </Styled.ProgressWrapper>
      )}
      <Styled.ButtonAbs isHover={isHover} onClick={handleToProperties}>
        <Button>
          {windowWidth > Viewport.tablet ? 'View All Results' : 'See All'}
        </Button>
      </Styled.ButtonAbs>
    </>
  );
};

export default memo(PropertyList);
