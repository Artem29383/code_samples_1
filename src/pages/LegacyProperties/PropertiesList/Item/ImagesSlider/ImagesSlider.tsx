/* eslint-disable jsx-a11y/alt-text */

import React, { useCallback, useState, useRef } from 'react';
import _take from 'lodash/take';
import { MarginProps } from 'styled-system';

import { Image } from 'models/images/types';

import HoverSlider from 'components/HoverSlider';
import Text from 'components/Text';
import { icons } from 'styles/icons';

import * as S from './ImagesSlider.styled';

type Props = {
  images: Image[];
  height: number;
  take: number;
  className?: string;
} & MarginProps;

const ImagesSlider = ({ height, images, take, ...rest }: Props) => {
  const [lastImageActive, setLastImageActive] = useState(false);
  const firstImages = useRef(
    _take(images, take).map(image => ({
      id: image.id,
      url: image.url470,
    }))
  );

  const handleSlideChange = useCallback(
    id =>
      setLastImageActive(
        id === firstImages.current[firstImages.current.length - 1].id
      ),
    []
  );

  const PhotoIcon = icons.photo;

  const overlayEl = (
    <S.Overflow>
      <S.ShowMoreImages>
        <PhotoIcon width={55} height="auto" mb={15} />
        <Text
          fontType="liberGrotesqueBlack"
          color="white"
          fontSize={15}
          align="center"
          whiteSpace="nowrap"
        >
          {`Show the rest ${images.length - take} photos`}
        </Text>
      </S.ShowMoreImages>
    </S.Overflow>
  );

  const showLastImageOverlay = images.length > take && lastImageActive;

  return (
    <HoverSlider
      {...rest}
      onChange={handleSlideChange}
      height={height}
      overlayEl={showLastImageOverlay ? overlayEl : null}
      images={firstImages.current}
    />
  );
};

export default ImagesSlider;
