/* eslint-disable */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import numeral from 'numeral';
import { CSSTransition } from 'react-transition-group';

import { Property } from 'models/properties/types';

import PropertyInfo from 'pages/Property/PropertyInfo/PropertyInfo';
import { Statuses, StatusesColor } from 'pages/Property/Property';
import Text from 'components/Text';

import useBrowser from 'hooks/useBrowser';

import { cutStr } from 'utils/cutStr';

import { Viewport } from 'styles/media';

import * as Styled from 'pages/Property/PropertyList/PropertyList.styled';

const imagePlaceholder = require('images/placeholder.jpg');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

const Card = ({
  isHoverState,
  entities,
  id,
  images,
  windowWidth,
  setHoverIndex,
}: {
  isHoverState: boolean;
  entities: {
    [key: string]: Property;
  };
  id: number;
  images: { id: number; url: string }[];
  windowWidth: number;
  setHoverIndex: (p: boolean) => void;
}) => {
  const $card = useRef<HTMLDivElement | null>(null);
  const [pause, setPause] = useState(false);
  const [isHover, setHover] = useState(false);
  const [height, setHeight] = useState<null | number>(null);
  const { browser } = useBrowser();

  useEffect(() => {
    if (windowWidth < Viewport.tablet) {
      if (!isHoverState) {
        setHover(false);
      }
    }
  }, [isHoverState]);

  useEffect(() => {
    if (isHover) {
      setHoverIndex(isHover);
    } else {
      setHoverIndex(isHover);
    }
  }, [isHover, setHoverIndex]);

  const toggleHover = () => {
    if (windowWidth < Viewport.tablet) {
      if (!isHover) {
        setHover(true);
      } else {
        setHover(false);
      }
    }
  };

  useEffect(() => {
    if (pause) {
      setTimeout(() => {
        setPause(false);
      }, 450);
    }
  }, [pause]);

  const handleHoverOn = useCallback(() => {
    if (!pause) {
      setHover(true);
    }
  }, [pause]);

  const handleHoverOff = useCallback(() => {
    setHover(false);
    if (!pause) {
      setPause(true);
    }
  }, [pause]);

  useEffect(() => {
    if ($card.current) {
      if (!height) {
        setHeight($card.current?.getBoundingClientRect().height);
      }
      if (windowWidth >= Viewport.tablet) {
        $card.current?.addEventListener('mouseenter', handleHoverOn);
        $card.current?.addEventListener('mouseleave', handleHoverOff);
      }
    }
    return () => {
      $card.current?.removeEventListener('mouseenter', handleHoverOn);
      $card.current?.removeEventListener('mouseleave', handleHoverOff);
    };
  }, [$card, handleHoverOff, handleHoverOn, height, windowWidth, pause]);

  return (
    <Styled.Content
      ref={$card}
      height={height}
      isHover={isHover}
      onClick={toggleHover}
    >
      <Styled.Image>
        <Styled.SlideImage
          src={images[entities[id].images[0]]?.url}
          className="swiper-lazy"
          onError={handleImageError}
        />
      </Styled.Image>
      <Styled.Wrapper>
        <PropertyInfo item={entities[id]} />
        <CSSTransition
          classNames="fadeIn"
          timeout={450}
          in={isHover}
          unmountOnExit
        >
          <Styled.InfoLine>
            <Styled.Address title={entities[id].address}>
              <Styled.LineAddress>
                {cutStr(entities[id].fullAddress.unparsed_address, 22)}
              </Styled.LineAddress>
              <Styled.LineAddressMin>
                {`${entities[id].fullAddress.postal_city}, ${entities[id].fullAddress.state_or_province} ${entities[id].fullAddress.postal_code}`}
              </Styled.LineAddressMin>
            </Styled.Address>
            <Styled.PriceAndStatus
              width={browser.name === 'Safari' ? '40%' : '36%'}
            >
              <Styled.Price color={StatusesColor[entities[id].standardStatus]}>
                ${numeral(entities[id].listPrice).format('0,0')}
              </Styled.Price>
              <Styled.Status color={StatusesColor[entities[id].standardStatus]}>
                {Statuses[entities[id].standardStatus]}
              </Styled.Status>
            </Styled.PriceAndStatus>
          </Styled.InfoLine>
        </CSSTransition>
      </Styled.Wrapper>
      <CSSTransition
        classNames="fadeIn"
        timeout={450}
        in={isHover}
        unmountOnExit
      >
        <Styled.NavLinker to={`/properties/${id}`}>
          <Styled.Button>
            <Text
              cursor="pointer"
              fontSize={{ m: '14px', t: '20px' }}
              lineHeight={{ m: '14px', t: '20px' }}
              fontType="liberGrotesqueRegular"
              color="white"
              align="center"
            >
              See Listing
            </Text>
          </Styled.Button>
        </Styled.NavLinker>
      </CSSTransition>
    </Styled.Content>
  );
};

export default memo(Card);
