import React, { memo, useEffect } from 'react';

import { actions } from 'models/properties';
import { useActionWithPayload } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';
import {
  favLoadSelector,
  similarPropertySelector,
} from 'models/properties/selectors';

import Spinner from 'components/Spinner';
import PropertyList from 'pages/Property/PropertyList';

import * as Styled from './SimilarListing.styled';

type Props = {
  id: string;
  bedrooms: number;
  price: string;
};

const SimilarListing = ({ bedrooms, price, id }: Props) => {
  const isLoad = useSelector(favLoadSelector);
  const setLoad = useActionWithPayload(actions.setLoadFav);
  const { collections, ids } = useSelector(similarPropertySelector, id);
  const getSimilarProperties = useActionWithPayload(
    actions.getSimilarProperties
  );

  useEffect(() => {
    setLoad(true);
    getSimilarProperties({
      bedGt: +bedrooms - 1,
      bedLt: +bedrooms + 1,
      priceGt: String(+price.replace(',', '') - 50000),
      priceLt: String(+price.replace(',', '') + 50000),
    });
  }, [getSimilarProperties, bedrooms, price, setLoad]);

  return (
    <Styled.Root>
      <Styled.NearBy>
        <Styled.NearByTitle>Similar Listings</Styled.NearByTitle>
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
            <Styled.EmptyTopic>No property similar</Styled.EmptyTopic>
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

export default memo(SimilarListing);
