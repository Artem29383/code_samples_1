import React, { useState, useRef, useCallback } from 'react';
import _pick from 'lodash/pick';
import _chunk from 'lodash/chunk';

import { Search } from 'models/searches/types';
import { Filters } from 'models/properties/types';
import { Routes } from '@types';
import { Viewport } from 'styles/media';

import { listSelector } from 'models/searches/selectors';

import { getFormattedFiltersValues } from 'utils/filters';
import useWindowResize from 'hooks/useWindowResize';

import Text from 'components/Text';
import PopupModal from 'components/Modal/PopupModal';
import DialogModal from 'components/Modal/DialogModal';
import TransparentScrollConatinerX from 'components/TransparentScrollContainerX';
import Cross from 'components/Cross';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import AppLink from 'src/components/AppLink';
import { NoResultsIcon } from 'styles/icons';

import * as S from './SavedSearches.styled';

type FormattedFiltersValuesKey = keyof ReturnType<
  typeof getFormattedFiltersValues
>;

const formattedValuesTitle: Record<FormattedFiltersValuesKey, string> = {
  budget: 'Budget',
  perks: 'Perks',
  types: 'Types',
  bedrooms: 'Bedroooms',
  bathrooms: 'Bathrooms',
  stories: 'Stories',
  squareFeet: 'Square Feet',
  lotSize: 'Lot Size',
  garage: 'Garage Size',
  yearBuilt: 'Year built',
  monthlyHOAFees: 'Monthly HOA Fees',
  daysOnMarket: 'Days on Market',
  pricePerSquareFeet: 'Price Per Square Foot',
};

type Props = {
  list: ReturnType<typeof listSelector>;
  onDelete: (payload: number) => void;
  onLaunchSearch: (search: Search) => void;
  fetching: boolean;
};

const SavedSearches = ({ list, fetching, onDelete, onLaunchSearch }: Props) => {
  const [activeSearchItem, setActiveSearchItem] = useState<Search | null>(null);
  const [toDeleteItem, setToDeleteItem] = useState<number | null>(null);
  const crossRef = useRef<HTMLDivElement>();

  const { width: windowWidth } = useWindowResize();

  const handleCrossClick = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>, id) => {
      if (e.currentTarget.dataset.el === 'cross') {
        setToDeleteItem(id);
        e.stopPropagation();
      }
    },
    []
  );

  const handleSearchModalClose = useCallback(() => {
    setActiveSearchItem(null);
  }, []);

  const handleApproveDelete = useCallback(() => {
    onDelete(toDeleteItem as number);
    setToDeleteItem(null);
  }, [onDelete, toDeleteItem]);

  const renderFormattedFiltersValues = useCallback(
    (query: Filters, keys: FormattedFiltersValuesKey[] = []) => {
      const formattedValues =
        keys.length > 0
          ? _pick(getFormattedFiltersValues(query), keys)
          : getFormattedFiltersValues(query);

      return Object.keys(formattedValues)
        .filter(
          item => formattedValues[item as FormattedFiltersValuesKey] !== ''
        )
        .map(item => (
          <S.QueryItem key={item}>
            <S.QueryTitle>
              {formattedValuesTitle[item as FormattedFiltersValuesKey]}: &nbsp;
            </S.QueryTitle>
            <S.QueryValue>
              {formattedValues[item as FormattedFiltersValuesKey]}
            </S.QueryValue>
          </S.QueryItem>
        ));
    },
    []
  );

  const searchItemsRows = _chunk(
    list,
    Math.ceil(list.length > 3 ? list.length / 3 : list.length)
  );

  const renderSearchItem = useCallback(
    (item: Search, mb = 0) => (
      <S.Item key={item.id} mb={mb} onClick={() => setActiveSearchItem(item)}>
        <Text
          fontSize={24}
          fontType="bwGradualBold"
          color="cornFlowerBlue"
          mb={20}
          cursor="pointer"
        >
          {item.title}
        </Text>
        {renderFormattedFiltersValues(item.query, ['types', 'budget'])}
        <Cross
          position="absolute"
          data-el="cross"
          top={10}
          right={10}
          size={12}
          thickness={3}
          color="mischka"
          ref={crossRef}
          onClick={e => handleCrossClick(e, item.id)}
        />
      </S.Item>
    ),
    [handleCrossClick, renderFormattedFiltersValues]
  );

  const renderSearchItemRow = useCallback(
    (row: ReturnType<typeof listSelector>) =>
      row.map(item => renderSearchItem(item)),
    [renderSearchItem]
  );

  return (
    <S.Root>
      {windowWidth > Viewport.tablet && (
        <Text
          as="h2"
          fontSize={38}
          fontType="bwGradualBold"
          color="cornFlowerBlue"
          mb={35}
        >
          Saved searches
        </Text>
      )}
      {fetching && (
        <Spinner
          position="absolute"
          top="50%"
          left="50%"
          hor="-50%"
          vert="-50%"
        />
      )}
      {!fetching && list.length === 0 && (
        <S.NoResult>
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
            No saved searches yet.
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
            <AppLink to={`${Routes.properties}?v=map-filters`}>
              Create your first saved search.
            </AppLink>
          </Text>
        </S.NoResult>
      )}
      {!fetching && list.length > 0 && (
        <React.Fragment>
          <PopupModal
            isOpen={activeSearchItem !== null}
            onClose={handleSearchModalClose}
            onRequestClose={handleSearchModalClose}
            shouldCloseOnOverlayClick
          >
            {activeSearchItem && (
              <React.Fragment>
                <Text
                  as="h3"
                  fontType="bwGradualBold"
                  fontSize={22}
                  color="cornFlowerBlue"
                  align="center"
                  mb={15}
                >
                  {activeSearchItem.title}
                </Text>
                {activeSearchItem.address && (
                  <S.QueryItem>
                    <S.QueryTitle>Around: </S.QueryTitle>
                    <S.QueryValue>
                      {activeSearchItem.address.title}
                    </S.QueryValue>
                  </S.QueryItem>
                )}
                {renderFormattedFiltersValues(activeSearchItem.query)}
                <AppLink
                  onClick={() => onLaunchSearch(activeSearchItem)}
                  to={Routes.properties}
                >
                  <Button marginTop={15}>Launch Search</Button>
                </AppLink>
              </React.Fragment>
            )}
          </PopupModal>
          <DialogModal
            isOpen={toDeleteItem !== null}
            onApprove={handleApproveDelete}
            onClose={() => setToDeleteItem(null)}
            onRequestClose={() => setToDeleteItem(null)}
            shouldCloseOnOverlayClick
          >
            <Text
              color="emperor"
              fontType="liberGrotesqueBlack"
              fontSize={18}
              mb={35}
              align="center"
            >
              Are you sure you want to delete search item?
            </Text>
          </DialogModal>
          {windowWidth > Viewport.tablet ? (
            <TransparentScrollConatinerX
              contentLeftHorOffset={S.contentLeftHorOffset}
              ml={-25}
            >
              <S.RowsContainer>
                {searchItemsRows[0] && (
                  <S.Items>{renderSearchItemRow(searchItemsRows[0])}</S.Items>
                )}
                {searchItemsRows[1] && (
                  <S.Items>{renderSearchItemRow(searchItemsRows[1])}</S.Items>
                )}
                {searchItemsRows[2] && (
                  <S.Items>{renderSearchItemRow(searchItemsRows[2])}</S.Items>
                )}
              </S.RowsContainer>
            </TransparentScrollConatinerX>
          ) : (
            list.map((item, i) =>
              renderSearchItem(
                item,
                i === list.length - 1 ? 0 : S.itemMarginBottom
              )
            )
          )}
        </React.Fragment>
      )}
    </S.Root>
  );
};

export default SavedSearches;
