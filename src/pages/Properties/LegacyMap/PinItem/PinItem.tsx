/* eslint-disable no-underscore-dangle, no-new, react-hooks/exhaustive-deps */

import React from 'react';
import Swiper, { Navigation, Pagination } from 'swiper';

import {
  propertyStatusTitles,
  propertyStatusColors,
} from 'models/properties/types';
import { Image } from 'models/images/types';
import { Routes } from '@types';

import { getPropertyItem } from 'models/properties/selectors';

import Arrow from 'components/Arrow';
import Text from 'components/Text';
import Button from 'components/Button';
import {
  House2Icon,
  TownhomeIcon,
  LotIcon,
  CondoIcon,
  HeartActiveIcon,
  HeartIcon,
} from 'styles/icons';

import * as Styled from './PinItem.styled';

const imagePlaceholder = require('images/placeholder.jpg');

Swiper.use([Navigation, Pagination]);

const propertyTypesIcons = {
  house: { icon: House2Icon, width: 35 },
  townhome: { icon: TownhomeIcon, width: 32 },
  lot: { icon: LotIcon, width: 50 },
  condo: { icon: CondoIcon, width: 25 },
};

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

type Props = {
  item: ReturnType<typeof getPropertyItem>;
};

const renderItemImage = (images: Image[]) => {
  if (images.length === 0) {
    return <Styled.NoImage />;
  }

  if (images.length === 1) {
    return <Styled.Image src={images[0].url} />;
  }

  return (
    <Styled.Slider className="swiper-container">
      <div className="swiper-wrapper">
        {/* eslint-disable jsx-a11y/alt-text */}
        {images.map(image => (
          <Styled.Slide className="swiper-slide" key={image.url}>
            <img
              data-src={image.url}
              // alt={image.url}
              className="swiper-lazy"
              onError={handleImageError}
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
          </Styled.Slide>
        ))}
        {/* eslint-disable jsx-a11y/alt-text */}
      </div>
      <Arrow
        direction="left"
        position="absolute"
        size={5}
        thickness={3}
        color="white"
        className="pin-arrow pin-swiper-prev-button"
        top="50%"
        left={10}
        zIndex={1}
      />
      <Arrow
        direction="right"
        position="absolute"
        size={5}
        thickness={3}
        color="white"
        className="pin-arrow pin-swiper-next-button"
        top="50%"
        right={10}
        zIndex={1}
      />
      <Styled.ProgressBar className="pin-swiper-pagination" />
    </Styled.Slider>
  );
};

const renderSquareFeet = (item: ReturnType<typeof getPropertyItem>) => {
  if (item.propertyType === 'lot') {
    return item.formattedLotSizeSquareFeet || '-';
  }

  return item.formattedLivingSquareFeet || '-';
};

const PinItem = ({ item }: Props) => {
  return (
    <React.Fragment>
      {renderItemImage(item.images)}
      <Styled.PinInfo mb={20}>
        {(() => {
          const Icon = propertyTypesIcons[item.propertyType].icon;
          return (
            <Icon
              width={propertyTypesIcons[item.propertyType].width}
              height="auto"
              color="emperor"
              mr={10}
            />
          );
        })()}
        <div>
          <Text fontType="liberGrotesqueBold" fontSize={19} color="tundora">
            {item.bedrooms || '-'}
          </Text>
          <Text fontType="liberGrotesqueBold" fontSize={13} color="tundora">
            Beds
          </Text>
        </div>
        <div>
          <Text fontType="liberGrotesqueBold" fontSize={19} color="tundora">
            {item.bathrooms || '-'}
          </Text>
          <Text fontType="liberGrotesqueBold" fontSize={13} color="tundora">
            Baths
          </Text>
        </div>
        <div>
          <Text fontType="liberGrotesqueBold" fontSize={19} color="tundora">
            {renderSquareFeet(item)}
          </Text>
          <Text fontType="liberGrotesqueBold" fontSize={13} color="tundora">
            Sq. Ft.
          </Text>
        </div>
      </Styled.PinInfo>
      <Styled.PinInfo>
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
          >
            ${item.listPrice}
          </Text>
          <Text
            fontType="liberGrotesqueBold"
            fontSize={13}
            align="right"
            color={propertyStatusColors[item.standardStatus]}
          >
            {propertyStatusTitles[item.standardStatus]}
          </Text>
        </div>
      </Styled.PinInfo>
      <a className="listing-button" href={`${Routes.properties}/${item.id}`}>
        <Button width="100%" marginTop={10}>
          See Listing
        </Button>
      </a>
      <HeartActiveIcon
        display={item.favorite ? 'inline' : 'none'}
        position="absolute"
        className="js-map-heart-active-icon"
        top={3}
        right={20}
        width={25}
        height={25}
        cursor="pointer"
        $zIndex={3}
      />
      <HeartIcon
        display={item.favorite ? 'none' : 'inline'}
        position="absolute"
        className="js-map-heart-icon"
        top={25}
        right={25}
        width={16}
        height={15}
        cursor="pointer"
        $zIndex={3}
      />
    </React.Fragment>
  );
};

export default PinItem;
