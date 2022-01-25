/* eslint-disable jsx-a11y/alt-text */

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useLayoutEffect,
} from 'react';
import { v4 as uuid } from 'uuid';
import SwiperCore, { Navigation, Lazy, Pagination } from 'swiper';
import { LayoutProps } from 'styled-system';
import _chunk from 'lodash/chunk';

import { ColorsStrings, Event } from '@types';
import { ActiveSortingField, SortingField } from 'models/properties/types';
import { ItemSize } from './Item/Item';

import { Sortings, PropertiesList } from 'models/properties/selectors';

import useToggle from 'hooks/useToggle';
import useLayout from 'hooks/useLayout';

import Item from './Item';
import Spinner from 'components/Spinner';
import SortButton from '../SortButton';
import Text from 'components/Text';
import BoardsModal from 'components/Modal/BoardsModal';

import Emitter from 'utils/eventEmitter';

import { NoResultsIcon } from 'styles/icons';
import { getSize } from 'styles/media';

import * as Styled from './PropertiesList.styled';

export type TopBarStyle = 'fixed' | 'static';

SwiperCore.use([Navigation, Pagination, Lazy]);

const sortingFields: Record<ActiveSortingField, [string, ColorsStrings]> = {
  daysOnMarket: ['Newest', 'dodgerBlue'],
  listPrice: ['Price', 'malibu'],
  propertyType: ['Type', 'mauve'],
};

export enum ColumnsItems {
  single = 5,
  two = 8,
  three = 12,
}

export const itemsSizesWidths: Record<ItemSize, number> = {
  small: 290,
  default: 290,
  big: 290,
  large: 290,
};

const sortButtonSize = 50;

const getColumnsItemsMode = (width: number) => {
  const availableContentWidth =
    width - (getSize(Styled.rootMinHorPadding) as number) * 2;
  const twoColumnsItemsWidth =
    itemsSizesWidths.default * 2 + Styled.itemsPairMargin;
  const threeColumnsItemsWidth =
    itemsSizesWidths.default * 3 + Styled.itemsPairMargin * 2;

  if (threeColumnsItemsWidth <= availableContentWidth) {
    return ColumnsItems.three;
  }

  if (twoColumnsItemsWidth <= availableContentWidth) {
    return ColumnsItems.two;
  }

  return ColumnsItems.two;
};

type Props = {
  list: PropertiesList;
  sortings: Sortings;
  total: number;
  onFetchItems: (perPage: number) => void;
  onFetchMoreItems: (payload: string) => void;
  onToggleToFavorites: (payload: number) => void;
  onToggleSorting: (payload: SortingField) => void;
  fetchedMoreItems: boolean;
  newItemsFetching: boolean;
  newItemsFetched: boolean;
  disabled: boolean;
  controls: React.ReactNode | null;
} & LayoutProps;

const Properties = ({
  list,
  onFetchMoreItems,
  onFetchItems,
  onToggleToFavorites,
  onToggleSorting,
  fetchedMoreItems,
  newItemsFetching,
  newItemsFetched,
  total,
  disabled,
  sortings,
  height,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  controls,
}: Props) => {
  const observer = useRef<IntersectionObserver>();
  const rootRef = useRef<HTMLDivElement>(null);
  const sortButtonRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageToBoardId = useRef<number>();
  const [columnsItemsMode, setColumnsItemsMode] = useState(ColumnsItems.single);

  const [addModalOpen, toggleAddModal] = useToggle(false);

  const layout = useLayout();

  const createLastListElementObserver = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && observer.current) {
            observer.current.unobserve(entry.target);
            onFetchMoreItems(uuid());
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      }
    );

    observer.current.observe(lastItemRef.current!);
  }, [onFetchMoreItems]);

  useEffect(() => {
    if (rootRef.current) {
      setColumnsItemsMode(getColumnsItemsMode(rootRef.current.clientWidth));
    }
  }, []);

  useEffect(() => {
    Emitter.on(Event.refreshPropertiesList, () => {
      if (rootRef.current) {
        const currentColumnsItemsMode = getColumnsItemsMode(
          rootRef.current.clientWidth
        );

        setColumnsItemsMode(currentColumnsItemsMode);
        onFetchItems(currentColumnsItemsMode);
      }
    });

    return () => {
      Emitter.off(Event.refreshPropertiesList);
    };
  }, [onFetchItems, createLastListElementObserver]);

  useEffect(() => {
    if (list.length > 0 && list.length < total) {
      if (newItemsFetched || (fetchedMoreItems && list.length !== total)) {
        createLastListElementObserver();
      }
    }
  }, [
    list,
    onFetchMoreItems,
    fetchedMoreItems,
    total,
    newItemsFetched,
    createLastListElementObserver,
  ]);

  /* eslint-disable no-underscore-dangle, react-hooks/exhaustive-deps */
  useEffect(() => {
    const scrollHandler = () => {
      window.__LIST_SCROLL__ = rootRef.current!.scrollTop;
    };

    rootRef.current!.addEventListener('scroll', scrollHandler);

    return () => {
      rootRef.current!.removeEventListener('scroll', scrollHandler);
    };
  }, [list]);
  /* eslint-disable no-underscore-dangle, react-hooks/exhaustive-deps */

  useLayoutEffect(() => {
    rootRef.current!.scrollTo(0, window.__LIST_SCROLL__ || 0);
  });

  const handleAddImageToBoardModalOpen = useCallback(
    (id: number) => {
      imageToBoardId.current = id;
      toggleAddModal();
    },
    [toggleAddModal]
  );

  const sortingItems = useMemo(
    () => sortings.filter(({ field }) => field !== 'distance'),
    [sortings]
  );

  const listItems = useMemo(() => {
    /* eslint-disable react/no-array-index-key */
    if (list.length === 0) {
      return <NoResultsIcon position="absolute" top="50%" left="50%" />;
    }

    if (columnsItemsMode === ColumnsItems.three) {
      return _chunk(list, 6).map((itemsChunk, i) => (
        <Styled.ItemsChunk key={i}>
          <Styled.ItemsPair width={itemsSizesWidths.default}>
            <Item
              layout={layout}
              item={itemsChunk[0]}
              itemRef={lastItemRef}
              type="short"
              size="default"
              onToggleToFavorites={onToggleToFavorites}
              onPinClick={handleAddImageToBoardModalOpen}
              mb={12}
            />
            {itemsChunk[3] && (
              <Item
                layout={layout}
                item={itemsChunk[3]}
                itemRef={lastItemRef}
                type="long"
                size="default"
                onToggleToFavorites={onToggleToFavorites}
                onPinClick={handleAddImageToBoardModalOpen}
              />
            )}
          </Styled.ItemsPair>
          {itemsChunk.length > 1 && (
            <Styled.ItemsPair width={itemsSizesWidths.default}>
              <Item
                layout={layout}
                item={itemsChunk[1]}
                itemRef={lastItemRef}
                type="long"
                size="default"
                onToggleToFavorites={onToggleToFavorites}
                onPinClick={handleAddImageToBoardModalOpen}
                mb={12}
              />
              {itemsChunk[4] && (
                <Item
                  layout={layout}
                  item={itemsChunk[4]}
                  itemRef={lastItemRef}
                  type="short"
                  size="default"
                  onToggleToFavorites={onToggleToFavorites}
                  onPinClick={handleAddImageToBoardModalOpen}
                />
              )}
            </Styled.ItemsPair>
          )}
          {itemsChunk.length > 2 && (
            <Styled.ItemsPair width={itemsSizesWidths.default}>
              <Item
                layout={layout}
                item={itemsChunk[2]}
                itemRef={lastItemRef}
                type="short"
                size="default"
                onToggleToFavorites={onToggleToFavorites}
                onPinClick={handleAddImageToBoardModalOpen}
                mb={12}
              />
              {itemsChunk[5] && (
                <Item
                  layout={layout}
                  item={itemsChunk[5]}
                  itemRef={lastItemRef}
                  type="long"
                  size="default"
                  onToggleToFavorites={onToggleToFavorites}
                  onPinClick={handleAddImageToBoardModalOpen}
                />
              )}
            </Styled.ItemsPair>
          )}
        </Styled.ItemsChunk>
      ));
    }

    if (columnsItemsMode === ColumnsItems.two) {
      return _chunk(list, 4).map((itemsChunk, i) => {
        return (
          <Styled.ItemsChunk key={i}>
            <Styled.ItemsPair width={itemsSizesWidths.default}>
              <Item
                layout={layout}
                item={itemsChunk[0]}
                itemRef={lastItemRef}
                type="short"
                size="default"
                onToggleToFavorites={onToggleToFavorites}
                mb={12}
                onPinClick={handleAddImageToBoardModalOpen}
              />
              {itemsChunk[2] && (
                <Item
                  layout={layout}
                  item={itemsChunk[2]}
                  itemRef={lastItemRef}
                  type="long"
                  size="default"
                  onToggleToFavorites={onToggleToFavorites}
                  onPinClick={handleAddImageToBoardModalOpen}
                />
              )}
            </Styled.ItemsPair>
            {itemsChunk.length > 1 && (
              <Styled.ItemsPair width={itemsSizesWidths.default}>
                <Item
                  layout={layout}
                  item={itemsChunk[1]}
                  itemRef={lastItemRef}
                  type="long"
                  size="default"
                  onToggleToFavorites={onToggleToFavorites}
                  mb={12}
                  onPinClick={handleAddImageToBoardModalOpen}
                />
                {itemsChunk[3] && (
                  <Item
                    layout={layout}
                    item={itemsChunk[3]}
                    itemRef={lastItemRef}
                    type="short"
                    size="default"
                    onToggleToFavorites={onToggleToFavorites}
                    onPinClick={handleAddImageToBoardModalOpen}
                  />
                )}
              </Styled.ItemsPair>
            )}
          </Styled.ItemsChunk>
        );
      });
    }

    return list.map((item, i) => (
      <Item
        layout={layout}
        key={item === 'mock' ? i : item.id}
        item={item}
        size="small"
        itemRef={lastItemRef}
        type="short"
        onToggleToFavorites={onToggleToFavorites}
        onPinClick={handleAddImageToBoardModalOpen}
        width={Styled.itemMinWidth}
        ml="auto"
        mr="auto"
        mb={12}
      />
    ));

    /* eslint-disable react/no-array-index-key */
  }, [
    list,
    handleAddImageToBoardModalOpen,
    columnsItemsMode,
    onToggleToFavorites,
  ]);

  const sortButton = useMemo(
    () => (
      /* TODO Try to create generic component for proper id passing */
      <SortButton
        mr="auto"
        zIndex={1000}
        width={sortButtonSize}
        height={sortButtonSize}
        ref={sortButtonRef}
        mode={layout === 'mobile' ? 'small' : 'default'}
        onChange={field => onToggleSorting(field as SortingField)}
        items={sortingItems.map(item => {
          const field = item.field as ActiveSortingField;
          return {
            field,
            direction: item.direction,
            title: sortingFields[field][0],
            color: sortingFields[field][1],
          };
        })}
      />
    ),
    [sortingItems, onToggleSorting, layout]
  );

  return (
    <Styled.Root ref={rootRef} disabled={disabled} height={height}>
      <BoardsModal
        isOpen={addModalOpen}
        onClose={toggleAddModal}
        imageId={imageToBoardId.current!}
      />
      <Styled.TopBar>
        {/* {controls && controls} */}
        {sortButton}
        {/* {total !== 0 && !fixedTopBar && <span>{total} Results</span>} */}
        {/* {total !== 0 && <span>{total} Results</span>} */}
      </Styled.TopBar>
      {total !== 0 && (
        <Text
          position="absolute"
          top={Styled.rootTopPadding + 20}
          right={Styled.rootMinHorPadding}
          fontType="liberGrotesqueExtraBold"
          fontSize={14}
          color="argent"
        >
          {total} Results
        </Text>
      )}
      {newItemsFetching && (
        <Spinner
          position="absolute"
          top="50%"
          left="50%"
          hor="-50%"
          vert="-50%"
        />
      )}
      {!newItemsFetching && list.length === 0 && (
        <Styled.NoResult>
          <NoResultsIcon width={200} height="auto" mb={20} />
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
            as="h3"
            fontType="liberGrotesqueBold"
            color="dovGray"
            fontSize={16}
          >
            No results found based on your search.
          </Text>
        </Styled.NoResult>
      )}
      {!newItemsFetching && list.length > 0 && (
        <Styled.List id="properties-list" ref={listRef}>
          {listItems}
        </Styled.List>
      )}
    </Styled.Root>
  );
};

export default Properties;
