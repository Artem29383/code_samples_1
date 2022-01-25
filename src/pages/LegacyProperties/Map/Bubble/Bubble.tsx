/* eslint-disable no-underscore-dangle, no-new, react-hooks/exhaustive-deps */

import React from 'react';

import {
  propertyStatusTitles,
  propertyStatusColors,
} from 'models/properties/types';
import { Image } from 'models/images/types';
import { Routes } from '@types';
import { getPropertyItem } from 'models/properties/selectors';

import Text from 'components/Text';
import Button from 'components/Button';
import ImagesSlider from 'pages/Properties/PropertiesList/Item/ImagesSlider';
import { HeartActiveIcon, HeartIcon, icons } from 'styles/icons';

import * as S from './Bubble.styled';

const propertyTypesIcons = {
  house: { icon: icons.house2, width: 35 },
  townhome: { icon: icons.townhome, width: 32 },
  lot: { icon: icons.lot, width: 50 },
  condo: { icon: icons.condo, width: 25 },
};

const renderItemImage = (images: Image[]) => {
  if (images.length === 0) {
    return <S.NoImage />;
  }

  if (images.length === 1) {
    return <S.Image src={images[0].url} />;
  }

  return (
    <ImagesSlider
      className="js-listing-link"
      images={images}
      height={150}
      take={5}
      mb={10}
    />
  );
};

const renderSquareFeet = (item: ReturnType<typeof getPropertyItem>) => {
  if (item.propertyType === 'lot') {
    return item.formattedLotSizeSquareFeet || '-';
  }

  return item.formattedLivingSquareFeet || '-';
};

type Props = {
  item: ReturnType<typeof getPropertyItem>;
};

const Bubble = ({ item }: Props) => {
  return (
    <S.Root>
      {renderItemImage(item.images)}
      <S.BubbleInfo mb={20}>
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
      </S.BubbleInfo>
      <S.BubbleInfo>
        {item.fullAddress ? (
          <div>
            <S.Address title={item.address}>
              {item.fullAddress.unparsed_address}
            </S.Address>
            <S.Address title={item.address}>
              {item.fullAddress.postal_city},&nbsp;
              {item.fullAddress.state_or_province}&nbsp;
              {item.fullAddress.postal_code}
            </S.Address>
          </div>
        ) : (
          <S.Address title={item.address}>{item.address}</S.Address>
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
      </S.BubbleInfo>
      <a className="js-listing-link" href={`${Routes.properties}/${item.id}`}>
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
    </S.Root>
  );
};

export default Bubble;
