import React, { memo, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';

import { Property } from 'models/properties/types';

import PropertyInfo from '../PropertyInfo';
import Text from 'components/Text';

import useWindowResize from 'hooks/useWindowResize';

import { numericFormat } from 'utils/numericFormat';

import * as Styled from './PropertyList.styled';

const imagePlaceholder = require('images/placeholder.jpg');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

type Props = {
  entities: { property: Property }[];
  activeIndex: number;
  setActiveIndex: (p: number) => void;
};

let margin: number;

const PropertyList = ({ entities, setActiveIndex }: Props) => {
  const [controlledSwiper, setControlledSwiper] = useState<{
    slideTo: (index: number, speed?: number, runCallbacks?: boolean) => void;
  } | null>(null);
  const { width: windowWidth } = useWindowResize();

  if (windowWidth < 769) {
    margin = 0;
  }
  if (windowWidth < 1025 && windowWidth > 769) {
    margin = 0;
  }
  if (windowWidth > 1024) {
    margin = 50;
  }

  return (
    <Styled.Root>
      <Styled.Slider
        onSwiper={setControlledSwiper}
        fullscreen="true"
        slidesPerView="auto"
        spaceBetween={margin}
        pagination={{
          el: '.swiper-pagination-list',
          type: 'progressbar',
          clickable: true,
        }}
      >
        {entities.map((item, index) => (
          <SwiperSlide
            key={item.property.id}
            onClick={() => {
              controlledSwiper?.slideTo(index + 1);
              setActiveIndex(index);
            }}
          >
            <Styled.Content>
              <Styled.Image>
                <Styled.SlideImage
                  src={item.property.photo?.imageUrl}
                  className="swiper-lazy"
                  onError={handleImageError}
                />
              </Styled.Image>
              <Styled.Wrapper>
                <PropertyInfo
                  item={{
                    bedrooms: item.property.bedroomsTotal as number,
                    bathrooms: item.property.bathroomsTotal,
                    livingSquareFeet: Number(
                      numericFormat(
                        String(item.property.livingAreaTotalSquareFeet)
                      )
                    ),
                  }}
                />
              </Styled.Wrapper>
              <Styled.ButtonListing>
                <NavLink to={`/properties/${item.property.id}`}>
                  <Text
                    cursor="pointer"
                    fontSize={{ m: '14px', t: '20px' }}
                    lineHeight={{ m: '14px', t: '20px' }}
                    fontType="liberGrotesqueExtraBold"
                    color="white"
                    align="center"
                  >
                    See Listing
                  </Text>
                </NavLink>
              </Styled.ButtonListing>
            </Styled.Content>
          </SwiperSlide>
        ))}
      </Styled.Slider>
    </Styled.Root>
  );
};

export default memo(PropertyList);
