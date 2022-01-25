import React from 'react';

import { CollectionType } from 'models/favorites/types';

import Card from 'pages/Favorites/Gallery/Card';

import { chunks } from 'utils/chunks';

import * as Styled from './GalleryMobile.styled';
import { NoResultsIcon } from 'styles/icons';
import Text from 'components/Text';
import AppLink from 'components/AppLink';
import { Routes } from '@types';

type Props = {
  collection: CollectionType;
  ids: number[];
  onRedirect: (p: number) => void;
};

const imagePlaceholder = require('images/placeholder.jpg');

const GalleryMobile = ({ collection, ids, onRedirect }: Props) => {
  return (
    <Styled.Root>
      {ids.length > 0 ? (
        <>
          {chunks(ids, 4).map((nestedChunk, index) => (
            /* eslint-disable react/no-array-index-key */
            <Styled.Grid key={index}>
              <Styled.Column>
                {nestedChunk[0] && (
                  <Styled.Link
                    onClick={() =>
                      onRedirect(collection[nestedChunk[0]].property.id)
                    }
                  >
                    <Card
                      height="42.645vw"
                      heightImage="26.389vw"
                      imageUrl={
                        collection[nestedChunk[0]].property?.photo?.imageUrl ||
                        imagePlaceholder
                      }
                      id={collection[nestedChunk[0]].property.id}
                      property={collection[nestedChunk[0]].property}
                    />
                  </Styled.Link>
                )}
                {nestedChunk[1] && (
                  <Styled.Link
                    onClick={() =>
                      onRedirect(collection[nestedChunk[1]].property.id)
                    }
                  >
                    <Card
                      height="65.3vw"
                      heightImage="48.51vw"
                      imageUrl={
                        collection[nestedChunk[1]].property.photo?.imageUrl ||
                        imagePlaceholder
                      }
                      id={collection[nestedChunk[1]].property.id}
                      property={collection[nestedChunk[1]].property}
                    />
                  </Styled.Link>
                )}
              </Styled.Column>
              <Styled.Column>
                {nestedChunk[2] && (
                  <Styled.Link
                    onClick={() =>
                      onRedirect(collection[nestedChunk[2]].property.id)
                    }
                  >
                    <Card
                      height="65.3vw"
                      heightImage="48.51vw"
                      imageUrl={
                        collection[nestedChunk[2]].property.photo?.imageUrl ||
                        imagePlaceholder
                      }
                      id={collection[nestedChunk[2]].property.id}
                      property={collection[nestedChunk[2]].property}
                    />
                  </Styled.Link>
                )}
                {nestedChunk[3] && (
                  <Styled.Link
                    onClick={() =>
                      onRedirect(collection[nestedChunk[3]].property.id)
                    }
                  >
                    <Card
                      height="42.645vw"
                      heightImage="26.389vw"
                      imageUrl={
                        collection[nestedChunk[3]].property.photo?.imageUrl ||
                        imagePlaceholder
                      }
                      id={collection[nestedChunk[3]].property.id}
                      property={collection[nestedChunk[3]].property}
                    />
                  </Styled.Link>
                )}
              </Styled.Column>
            </Styled.Grid>
          ))}
        </>
      ) : (
        <Styled.Empty>
          <NoResultsIcon width={{ m: 100, t: 200 }} height="auto" mb={20} />
          <Text
            as="h3"
            fontType="bwGradualBold"
            color="mineShaft"
            fontSize={20}
            mb={10}
          >
            Womp Womp.
          </Text>
          <Text
            as="div"
            fontType="liberGrotesqueBold"
            color="dovGray"
            fontSize={16}
            mb={20}
          >
            No favorites yet.
          </Text>
          &nbsp;
          <Text
            as="span"
            fontType="liberGrotesqueBlack"
            color="cornFlowerBlue"
            fontSize={16}
            cursor="pointer"
            textDecoration="underline"
          >
            <AppLink to={`${Routes.properties}?v=map-list`}>
              Add your first favorites.
            </AppLink>
          </Text>
        </Styled.Empty>
      )}
    </Styled.Root>
  );
};

export default GalleryMobile;
