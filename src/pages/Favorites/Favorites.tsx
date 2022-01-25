import React from 'react';

import { CollectionType } from 'models/favorites/types';

import Text from 'components/Text';
import Gallery from 'pages/Favorites/Gallery';
import Filters from 'pages/Favorites/Filters';
import Filter from 'pages/Favorites/Filters/Filter';
import GalleryMobile from 'pages/Favorites/GalleryMobile';
import Spinner from 'components/Spinner';
import ToolBar from './ToolBar';

import { Viewport } from 'styles/media';

import * as Styled from './Favorites.styled';

type Props = {
  isLoad: boolean;
  collection: CollectionType;
  ids: number[];
  propertyTypes: string;
  windowWidth: number;
  onChangePropertyTypes: (p: string) => void;
  onRedirect: (p: number) => void;
};

const Favorites = ({
  isLoad,
  collection,
  ids,
  propertyTypes,
  windowWidth,
  onChangePropertyTypes,
  onRedirect,
}: Props) => (
  <Styled.Root>
    {windowWidth > Viewport.tablet && (
      <Styled.Header>
        <Text
          color="cornFlowerBlue"
          fontSize="38px"
          lineHeight="38px"
          fontType="bwGradualBold"
        >
          Favorites
        </Text>
        <ToolBar
          onChangePropertyTypes={onChangePropertyTypes}
          typeProperty={propertyTypes}
        />
      </Styled.Header>
    )}
    {windowWidth <= Viewport.tablet && (
      <ToolBar
        onChangePropertyTypes={onChangePropertyTypes}
        typeProperty={propertyTypes}
      />
    )}
    <Styled.Filters>
      <Filters>
        <Filter path="house" typeProperty={propertyTypes}>
          Houses
        </Filter>
        <Filter path="townhome" typeProperty={propertyTypes}>
          Townhomes
        </Filter>
        <Filter path="condo" typeProperty={propertyTypes}>
          Condos
        </Filter>
        <Filter path="lot" typeProperty={propertyTypes}>
          Land
        </Filter>
        <Filter path="" typeProperty={propertyTypes}>
          All
        </Filter>
      </Filters>
    </Styled.Filters>
    {isLoad ? (
      <Styled.Spinner>
        <Spinner />
      </Styled.Spinner>
    ) : (
      <>
        {windowWidth > Viewport.tablet ? (
          <Gallery collection={collection} ids={ids} />
        ) : (
          <GalleryMobile
            collection={collection}
            ids={ids}
            onRedirect={onRedirect}
          />
        )}
      </>
    )}
  </Styled.Root>
);

export default Favorites;
