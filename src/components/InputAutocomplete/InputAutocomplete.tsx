import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { MaxWidthProps } from 'styled-system';

import { usaBoundings } from 'data/coordinates';

import * as S from './InputAutocomplete.styled';
import useWindowResize from 'hooks/useWindowResize';
import { useSelector } from 'hooks/useSelector';
import { mapLoadedSelector } from 'models/app/selectors';

type Props = {
  callback: (p: { address: string; lng: number; lat: number }) => void;
  value: string;
} & MaxWidthProps;

const InputAutocomplete = ({ callback, value, ...tail }: Props) => {
  const mapLoaded = useSelector(mapLoadedSelector);
  const { width: windowWidth } = useWindowResize();
  const $input = useRef<null | HTMLInputElement | google.maps.places.SearchBox>(
    null
  );
  const $node = useRef<null | HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(value);
  const [inputWidth, setInputWidth] = useState<string | number>('auto');

  useEffect(() => {
    if ($node.current) {
      setInputWidth($node.current.getBoundingClientRect().width);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (!value) {
      setInputValue('');
    } else {
      setInputValue(value);
    }
  }, [value]);

  const handleInputChange = useCallback(e => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    if ($input.current && $node.current && mapLoaded) {
      // @ts-ignore
      $input.current = new google.maps.places.SearchBox(
        ($input.current as unknown) as HTMLInputElement,
        {
          bounds: new google.maps.LatLngBounds(
            { lat: usaBoundings.sw[0], lng: usaBoundings.sw[1] },
            { lat: usaBoundings.ne[0], lng: usaBoundings.ne[1] }
          ),
        }
      );

      $input.current.addListener('places_changed', () => {
        // @ts-ignore
        const places = $input.current!.getPlaces();
        setInputValue(places[0].formatted_address as string);
        const { location } = places[0].geometry!;
        callback({
          lat: location.lat(),
          lng: location.lng(),
          address: places[0].formatted_address as string,
        });
      });
    }
  }, [callback, mapLoaded]);

  return (
    <>
      <S.Wrapper ref={$node} {...tail}>
        <S.Label>YOUR ADDRESS</S.Label>
        <S.Input
          value={inputValue}
          onChange={handleInputChange}
          ref={$input as React.RefObject<HTMLInputElement>}
          type="text"
          placeholder="What is your address?"
        />
      </S.Wrapper>
      <S.Global
        width={inputWidth === 'auto' ? inputWidth : `${inputWidth}px`}
      />
    </>
  );
};

export default memo(InputAutocomplete);
