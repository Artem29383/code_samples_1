/* eslint-disable jsx-a11y/alt-text */

import React, { useCallback, MutableRefObject, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { SpaceProps, LayoutProps } from 'styled-system';

import { getPropertyItem } from 'models/properties/selectors';
import { Image } from 'models/images/types';
import {
  propertyStatusTitles,
  propertyStatusColors,
} from 'models/properties/types';
import { ViewportKey } from 'styles/media';

import { renderSquareFeet } from 'utils/properties';

import { HeartIcon, HeartActiveIcon, icons } from 'styles/icons';
import PinButton from '../../PinButton';
import Text from 'components/Text';
import ImagesSlider from './ImagesSlider';

import * as Styled from './Item.styled';

const imagePlaceholder = require('images/placeholder.jpg');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

export type ItemSize = 'small' | 'default' | 'big' | 'large';
export type ItemType = 'long' | 'short';

const sliderHeight: Record<ItemType, PartialRecord<ItemSize, number>> = {
  short: {
    small: 147,
    default: 170,
    // large: 227,
  },
  long: {
    small: 310,
    default: 310,
    // large: 413,
  },
};

const propertyTypesIcons = {
  house: { icon: icons.house2, width: 35 },
  townhome: { icon: icons.townhome, width: 32 },
  lot: { icon: icons.lot, width: 50 },
  condo: { icon: icons.condo, width: 25 },
};

const getSliderHeight = (itemType: ItemType, itemSize: ItemSize) =>
  sliderHeight[itemType][itemSize] || sliderHeight[itemType].default!;

type Props = {
  item: ReturnType<typeof getPropertyItem> | 'mock';
  itemRef: MutableRefObject<HTMLDivElement | null>;
  type: ItemType;
  layout: ViewportKey;
  size: ItemSize;
  onToggleToFavorites: (payload: number) => void;
  onPinClick: (id: number) => void;
} & SpaceProps &
  LayoutProps;

const Item = ({
  item,
  onToggleToFavorites,
  onPinClick,
  type,
  size,
  layout,
  itemRef,
  ...rest
}: Props) => {
  const pinClicked = useRef(false);
  const handleItemClick = useCallback(
    (e: React.SyntheticEvent<HTMLElement>) => {
      if (pinClicked.current) {
        e.preventDefault();
        pinClicked.current = false;
      }
    },
    []
  );

  const renderItemImage = useCallback(
    (images: Image[]) => {
      if (images.length === 0) {
        return <Styled.NoImages height={getSliderHeight(type, size)} />;
      }

      if (images.length === 1) {
        return (
          <Styled.Image
            src={images[0].url}
            height={getSliderHeight(type, size)}
          />
        );
      }

      if (layout === 'mobile' || layout === 'tablet') {
        return (
          <Styled.Slider
            lazy
            tag="li"
            height={getSliderHeight(type, size)}
            pagination={{
              el: '.swiper-pagination',
              type: 'progressbar',
            }}
            navigation={{
              nextEl: '.swiper-next-button',
              prevEl: '.swiper-prev-button',
            }}
          >
            {images.map(image => (
              <SwiperSlide key={image.url470}>
                <img
                  data-src={image.url470}
                  className="swiper-lazy"
                  onError={handleImageError}
                />
                <PinButton
                  position="absolute"
                  top={7}
                  left={7}
                  width={30}
                  height={30}
                  zIndex={3}
                  onClick={() => {
                    pinClicked.current = true;
                    onPinClick(image.id);
                  }}
                />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
              </SwiperSlide>
            ))}
            <Styled.SliderNavPrev className="swiper-prev-button" />
            <Styled.SliderNavNext className="swiper-next-button" />
            <Styled.ProgressBar className="swiper-pagination" />
          </Styled.Slider>
        );
      }

      return (
        <ImagesSlider
          height={getSliderHeight(type, size)}
          images={images}
          take={5}
          mb={10}
        />
      );
    },
    [type, size, onPinClick, layout]
  );

  if (item === 'mock' || item === null) {
    return (
      <Styled.Mock {...rest}>
        <Styled.MockSlider height={getSliderHeight(type, size)} />
      </Styled.Mock>
    );
  }

  return (
    <Styled.Root ref={itemRef} key={item.id} {...rest}>
      <Link to={`/properties/${item.id}`} onClick={handleItemClick}>
        {renderItemImage(item.images)}
      </Link>
      <Styled.Info>
        <Styled.InfoLine>
          {(() => {
            const Icon = propertyTypesIcons[item.propertyType].icon;
            return (
              <Icon
                width={propertyTypesIcons[item.propertyType].width}
                height="auto"
                alignSelf="flex-end"
                color="emperor"
                mr={20}
              />
            );
          })()}
          <Styled.InfoValue>
            <Styled.InfoItem fontSize={22} mb={5}>
              {item.bedrooms || '-'}
            </Styled.InfoItem>
            <Styled.InfoItem fontSize={14}>Beds</Styled.InfoItem>
          </Styled.InfoValue>
          <Styled.InfoValue>
            <Styled.InfoItem fontSize={22} mb={5}>
              {item.bathrooms || '-'}
            </Styled.InfoItem>
            <Styled.InfoItem fontSize={14}>Baths</Styled.InfoItem>
          </Styled.InfoValue>
          <Styled.InfoValue>
            <Styled.InfoItem fontSize={22} mb={5}>
              {renderSquareFeet(item)}
            </Styled.InfoItem>
            <Styled.InfoItem fontSize={14}>Sq. Ft.</Styled.InfoItem>
          </Styled.InfoValue>
        </Styled.InfoLine>
        <Styled.InfoLine justify="space-between">
          {item.fullAddress ? (
            <div>
              <Styled.Address title={item.address}>
                {item.fullAddress.unparsed_address}
              </Styled.Address>
              <Styled.Address title={item.address}>
                {item.fullAddress.postal_city},&nbsp;
                {item.fullAddress.state_or_province}&nbsp;
                {item.fullAddress.postal_code}
              </Styled.Address>
            </div>
          ) : (
            <Styled.Address title={item.address}>{item.address}</Styled.Address>
          )}
          <div>
            <Text
              fontType="liberGrotesqueBold"
              fontSize={18}
              color={propertyStatusColors[item.standardStatus]}
              mb={5}
            >
              ${item.listPrice}
            </Text>
            <Text
              fontType="liberGrotesqueBold"
              fontSize={12}
              color={propertyStatusColors[item.standardStatus]}
              align="right"
            >
              {propertyStatusTitles[item.standardStatus]}
            </Text>
          </div>
        </Styled.InfoLine>
      </Styled.Info>
      {item.favorite ? (
        <HeartActiveIcon
          position="absolute"
          top={3}
          right={20}
          width={25}
          height={25}
          cursor="pointer"
          $zIndex={3}
          onClick={() => onToggleToFavorites(item.id)}
        />
      ) : (
        <HeartIcon
          position="absolute"
          top={25}
          right={25}
          width={16}
          height={15}
          cursor="pointer"
          $zIndex={3}
          onClick={() => onToggleToFavorites(item.id)}
        />
      )}
    </Styled.Root>
  );
};

export default Item;
