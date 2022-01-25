import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { actions } from 'models/properties';
import { useActionWithPayload } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';
import {
  favLoadSelector,
  paginationPropertySelector,
} from 'models/properties/selectors';

import Text from 'components/Text';
import Input from 'components/Input';
import PropertyList from 'pages/Property/PropertyList';
import Spinner from 'components/Spinner';

import useDebounce from 'hooks/useDebounce';

import * as Styled from './NearByListing.styled';
import { Viewport } from 'styles/media';

type Props = {
  id: string;
  longitude: string;
  latitude: string;
  windowWidth: number;
  bedrooms: number;
  price: string;
};

const NearByListing = ({
  longitude,
  latitude,
  windowWidth,
  bedrooms,
  price,
  id,
}: Props) => {
  const [miles, setMiles] = useState(1);
  const getPropertiesMiles = useActionWithPayload(actions.getPropertiesMiles);
  const debounceMiles = useDebounce(miles, 500);
  const { collections, ids } = useSelector(paginationPropertySelector, id);
  const isLoad = useSelector(favLoadSelector);
  const setLoad = useActionWithPayload(actions.setLoadFav);

  useEffect(() => {
    setMiles(windowWidth <= Viewport.tablet ? 10 : 1);
  }, [windowWidth, setMiles]);

  const handleMilesChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { target } = e;
      const value =
        target.value.length > 3 || Number(target.value) > 99
          ? miles
          : Number(target.value);
      setMiles(value);
    },
    [setMiles, miles]
  );

  useEffect(() => {
    if (debounceMiles) {
      setLoad(true);
      getPropertiesMiles({
        radius: debounceMiles,
        longitude,
        latitude,
        bedGt: +bedrooms - 1,
        bedLt: +bedrooms + 1,
        // @ts-ignore
        priceGt: String(+price.replaceAll(',', '') - 50000),
        // @ts-ignore
        priceLt: String(+price.replaceAll(',', '') + 50000),
      });
    }
  }, [
    bedrooms,
    debounceMiles,
    getPropertiesMiles,
    latitude,
    longitude,
    price,
    setLoad,
  ]);

  return (
    <Styled.Root>
      <Styled.NearBy>
        <Styled.NearByTitle>Nearby Listings</Styled.NearByTitle>
        {windowWidth > Viewport.tablet && (
          <Styled.Inputs>
            <Text
              fontSize={18}
              fontType="liberGrotesqueRegular"
              lineHeight="18px"
              marginBottom="8px"
              mr={15}
            >
              Within
            </Text>
            <Input
              value={String(miles)}
              division={{
                m: 2,
                t: 2,
              }}
              onChange={handleMilesChange}
              name="miles"
              isError={false}
              width={4}
              fontSize={{ m: 24, t: 24 }}
              type="number"
              onKeyEvent={() => {}}
              customInvalidChars={['-', '+', 'e', '.', 'E']}
            />
            <Styled.Miles>
              <Text>miles</Text>
            </Styled.Miles>
          </Styled.Inputs>
        )}
      </Styled.NearBy>
      {!isLoad ? (
        <Styled.Gallery>
          {ids.properties.length > 0 ? (
            <PropertyList
              isLoad={isLoad}
              ids={ids.properties}
              entities={collections.properties}
              images={
                (collections.images as unknown) as { id: number; url: string }[]
              }
            />
          ) : (
            <Styled.EmptyTopic>No property nearby</Styled.EmptyTopic>
          )}
        </Styled.Gallery>
      ) : (
        <Styled.Spinner>
          <Spinner />
        </Styled.Spinner>
      )}
    </Styled.Root>
  );
};

export default memo(NearByListing);
