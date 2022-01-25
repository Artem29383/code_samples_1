/* eslint-disable no-underscore-dangle */

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  FetchByBoundingsPayload,
  SortingField,
  Boundings,
  View,
} from 'models/properties/types';
import {
  CommonProps,
  buttonsViewVariants,
  buttonsTransitionSettings,
  halfListWidth,
  filtersViewVariants,
  filtersViewsTransitions,
  mapViewsVariants,
  visibilityVariants,
  mapViewsTransitions,
} from './types';
import { Event } from '@types';

import { LayoutSizes } from 'styles/sizes';
import { Viewport } from 'styles/media';
import {
  Sortings,
  PropertiesList,
  PinItem,
  mapSettingsSelector,
  mapBubbledPropertySelector,
} from 'models/properties/selectors';
import { defaultDistanceFrom, actions } from 'models/properties';

import { usaBoundings } from 'data/coordinates';

import useToggle from 'hooks/useToggle';
import useWindowResize from 'hooks/useWindowResize';

import PropertiesListComponent from './PropertiesList';
import MapButton from './MapButton';
import Map from './Map';
import Search from './Search';
import Filters from './Filters';
import FilterButton from './FilterButton';
import BackArrow from 'src/components/BackArrow';

import Emitter from 'utils/eventEmitter';
import { getBoundsPoints } from 'utils/map';
import history from 'utils/history';
import {
  getViewTransition,
  getViewVariant,
  setViewQuery,
  isView,
  filtersVariants,
} from './utils';

import { minContentHeightProp } from 'styles/helpers';

import * as Styled from './Properties.styled';

import { icons } from 'styles/icons';

const searchZoomLevel = 16;

type Props = {
  list: PropertiesList;
  pinItem: PinItem;
  sortings: Sortings;
  onSetMapSettings: ActionType<typeof actions.setMapSettings>;
  onSetMapBubbledProperty: ActionType<typeof actions.setMapBubbledProperty>;
  onSetView: ActionType<typeof actions.setView>;
  onFetchByBoundings: (payload: FetchByBoundingsPayload) => void;
  onFetchMoreItems: (payload: string) => void;
  onToggleToFavorites: (payload: number) => void;
  onToggleSorting: (payload: SortingField) => void;
  onFetchMapPoints: (payload: Boundings) => void;
  onFetchPinItem: (payload: number) => void;
  onResetPropertiesList: () => void;
  onFilterMapPoints: () => void;
  total: number;
  modalOpen: boolean;
  fetchedMoreItems: boolean;
  newItemsFetched: boolean;
  newItemsFetching: boolean;
  mapPointsSet: boolean;
  mapLoaded: boolean;
  view: View;
  mapSettings: ReturnType<typeof mapSettingsSelector>;
  mapBubbledProperty: ReturnType<typeof mapBubbledPropertySelector>;
} & CommonProps;

const FiltersArrowIcon = icons.filtersArrowIcon;

const Properties = ({
  list,
  pinItem,
  onFetchByBoundings,
  onToggleToFavorites,
  onFilterMapPoints,
  onFetchMoreItems,
  onFetchMapPoints,
  onToggleSorting,
  onResetPropertiesList,
  onFetchPinItem,
  onSetView,
  onSetMapBubbledProperty,
  mapBubbledProperty,
  newItemsFetching,
  newItemsFetched,
  mapPointsSet,
  mapLoaded,
  mapSettings,
  modalOpen,
  sortings,
  filters,
  view,
  activeAddress,
  ...rest
}: Props) => {
  const [filtersOpen] = useToggle(false);
  const [animating, setAnimating] = useState(false);
  const { width: windowWidth } = useWindowResize();
  const [searchActive, toggleSearchActive] = useToggle(false);
  const [fullScreenSearchActive, toggleFullScreenSearchActive] = useToggle(
    false
  );

  const prevView = useRef<View>();

  const searchRef = useRef<HTMLInputElement>(null);
  const fullScreenSearchRef = useRef<HTMLInputElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map>(null);
  const mapButtonRef = useRef<HTMLDivElement>(null);
  const prevWidth = useRef<number>(windowWidth);

  useEffect(() => {
    if (prevView.current !== view) {
      prevView.current = view;
      setViewQuery(view);
    }
  }, [view]);

  useEffect(() => {
    document.body.classList.add('properties');

    return () => {
      document.body.classList.remove('properties');
    };
  }, [view]);

  useEffect(() => {
    /* TODO Find a way to set height inside Layout component depending on route */
    (document.querySelector(
      '#layout-content'
    )! as HTMLDivElement).style.height = 'auto';
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      const searchBox = new google.maps.places.SearchBox(searchRef.current!, {
        bounds: new google.maps.LatLngBounds(
          { lat: usaBoundings.sw[0], lng: usaBoundings.sw[1] },
          { lat: usaBoundings.ne[0], lng: usaBoundings.ne[1] }
        ),
      });

      const fullScreenSearchBox = new google.maps.places.SearchBox(
        fullScreenSearchRef.current!,
        {
          bounds: new google.maps.LatLngBounds(
            { lat: usaBoundings.sw[0], lng: usaBoundings.sw[1] },
            { lat: usaBoundings.ne[0], lng: usaBoundings.ne[1] }
          ),
        }
      );

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        const { location } = places[0].geometry!;

        Emitter.emit(Event.centerMap, [location.lat(), location.lng()]);
        Emitter.emit(Event.zoomMap, searchZoomLevel);
      });

      fullScreenSearchBox.addListener('places_changed', () => {
        const places = fullScreenSearchBox.getPlaces();
        const { location } = places[0].geometry!;

        Emitter.emit(Event.centerMap, [location.lat(), location.lng()]);
        Emitter.emit(Event.zoomMap, searchZoomLevel);

        toggleFullScreenSearchActive();
        fullScreenSearchRef.current!.value = '';
      });
    }
  }, [mapLoaded, toggleFullScreenSearchActive]);

  const resizeWindowHandler = useCallback(() => {
    if (
      (window.innerWidth <= Viewport.tablet &&
        prevWidth.current > Viewport.tablet) ||
      (window.innerWidth > Viewport.tablet &&
        prevWidth.current <= Viewport.tablet)
    ) {
      onSetView('map');
    } else {
      if (view === 'map-list') {
        mapWrapperRef.current!.style.width = `${window.innerWidth -
          halfListWidth}px`;
      }

      if (view === 'list-filters') {
        listWrapperRef.current!.style.width = `${window.innerWidth -
          Styled.filtersWrapperMinWidth}px`;
      }

      if (view === 'list') {
        listWrapperRef.current!.style.width = `${window.innerWidth}px`;
      }
    }

    prevWidth.current = window.innerWidth;
  }, [view, onSetView]);

  useEffect(() => {
    window.addEventListener('resize', resizeWindowHandler);

    return () => {
      window.removeEventListener('resize', resizeWindowHandler);
    };
  }, [view, resizeWindowHandler]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!fullScreenSearchActive) {
        const notAnExternalKey = !(
          e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey
        );

        const validView =
          (view === 'map-cycle' && mapPointsSet) ||
          (view === 'map' && mapPointsSet) ||
          (view === 'map-list' && newItemsFetched && mapPointsSet);

        if (notAnExternalKey && !modalOpen && validView && !searchActive) {
          toggleFullScreenSearchActive();
        }
      } else {
        fullScreenSearchRef.current!.focus();
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [
    searchActive,
    fullScreenSearchActive,
    toggleFullScreenSearchActive,
    toggleSearchActive,
    modalOpen,
    newItemsFetched,
    mapPointsSet,
    view,
  ]);

  useEffect(() => {
    const setQuery = isView(
      view,
      'map',
      'map-cycle',
      'list',
      'map-list',
      'map-filters',
      'list-filters'
    );

    if (setQuery) {
      const query = new URLSearchParams(history.location.search);
      query.set('v', view === 'map-cycle' ? 'map' : view);
      history.replace(`${history.location.pathname}?${query}`);
    }
  }, [view]);

  const showFiltersButtonInsideListWrapper = isView(
    view,
    'to-map-list',
    'map-list'
  );

  const showFiltersButtonInsideFiltersWrapper = isView(
    view,
    'map-filters',
    'to-map-list-up',
    'to-map-list-down'
  );

  const controlsDisabled = animating || !mapPointsSet;

  const listAdditionalControl = useMemo(() => {
    if (
      isView(
        view,
        'to-map-list',
        'map-list',
        'map-list-to-map',
        'to-list-filters',
        'list-filters',
        'to-list',
        'list',
        'map'
      )
    ) {
      return (
        <MapButton
          mr={{ m: 10, t: 20 }}
          zIndex={1000}
          disabled={controlsDisabled}
          ref={mapButtonRef}
          onClick={() => {
            if (view === 'map-list') {
              onSetView('map-list-to-map');
            } else {
              onSetView('map');
            }
          }}
        />
      );
    }

    return null;
  }, [view, controlsDisabled, onSetView]);

  const mapVariants = useMemo(
    () => ({
      full: { width: '100%' },
      half: { width: windowWidth - halfListWidth },
    }),
    [windowWidth]
  );

  const handleAnimationStart = useCallback(() => {
    setAnimating(true);
  }, []);

  const handleMapAnimationComplete = useCallback(() => {
    if (view === 'to-list-filters') {
      onSetView('list-filters');
    }

    if (view === 'to-map-list') {
      onSetView('map-list');
    }

    setAnimating(false);
  }, [view, onSetView]);

  const handleListAnimationComplete = useCallback(() => {
    if (view === 'to-list') {
      Emitter.emit(Event.refreshPropertiesList);
      onSetView('list');
    }

    if (isView(view, 'map', 'map-list-to-map')) {
      onResetPropertiesList();
      onSetView('map-cycle');
    }

    if (view === 'to-map-list-up') {
      Emitter.emit(Event.refreshPropertiesList);
    }
    setAnimating(false);
  }, [view, onResetPropertiesList, onSetView]);

  const handleFetchByExistingBoundings = useCallback(
    (perPage: number) => {
      onFetchByBoundings({
        boundings: getBoundsPoints(mapRef.current!),
        perPage,
      });
    },
    [onFetchByBoundings]
  );

  const handleSaveFilters = useCallback(() => {
    Emitter.emit(Event.mapIdle, getBoundsPoints(mapRef.current!));

    if (['map-filters', 'to-map-list-down', 'to-map-list-up'].includes(view)) {
      onSetView('map');
    }

    if (isView(view, 'list-filters')) {
      onFetchByBoundings({
        boundings: getBoundsPoints(mapRef.current!),
      });
    }
  }, [view, onFetchByBoundings, onSetView]);

  const handleSearchWrapperClick = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>) => {
      // @ts-ignore
      if (e.target.id === 'full-screen-search-wrapper') {
        toggleFullScreenSearchActive();
      }
    },
    [toggleFullScreenSearchActive]
  );

  useEffect(() => {
    Emitter.on(Event.mapIdle, (boundings: Boundings) => {
      if (!window.__MAP_POINTS__) {
        onFetchMapPoints(boundings);
      }

      if (
        isView(view, 'map', 'map-cycle', 'map-list', 'list-filters', 'list') &&
        window.__MAP_POINTS__
      ) {
        // onFilterMapPoints();
      }

      if (
        isView(
          view,
          'map-list',
          'list-filters',
          'list',
          'to-map-list-up',
          'to-map-list-down'
        )
      ) {
        Emitter.emit(Event.refreshPropertiesList);
      }
    });
  }, [onFetchMapPoints, view /* list */]);

  useEffect(() => {
    return () => {
      Emitter.off(Event.mapIdle);
    };
  }, []);

  const saveFiltersTitle = isView(view, 'map', 'map-filters') ? (
    <React.Fragment>
      <BackArrow marginRight={10} />
      Apply
    </React.Fragment>
  ) : (
    'Apply'
  );

  const loadinBar = useMemo(() => {
    if (isView(view, 'map', 'map-cycle', 'map-filters')) {
      return { show: true, offset: 0 };
    }

    if (isView(view, 'to-map-list', 'map-list', 'map-list-to-map')) {
      return { show: true, offset: halfListWidth };
    }

    return { show: false, offset: 0 };
  }, [view]);

  return (
    <React.Fragment>
      <Styled.Root disabled={fullScreenSearchActive}>
        <AnimatePresence>
          {isView(view, 'map', 'map-cycle', 'map-list-to-map') && (
            <Styled.ButtonWrapper
              top={25}
              left={{ m: 20, t: 40 }}
              zIndex={2}
              disabled={controlsDisabled}
              transition={buttonsTransitionSettings}
              onClick={() => onSetView('map-filters')}
              initial={getViewVariant(view, buttonsViewVariants)}
              animate={getViewVariant(view, buttonsViewVariants)}
              exit={visibilityVariants.hidden}
            >
              <FilterButton />
            </Styled.ButtonWrapper>
          )}
        </AnimatePresence>
        <Styled.LeftSideMap
          variants={filtersVariants}
          onAnimationStart={handleAnimationStart}
          transition={getViewTransition(view, filtersViewsTransitions)}
          initial={getViewVariant(view, filtersViewVariants)}
          animate={getViewVariant(view, filtersViewVariants)}
          onAnimationComplete={handleListAnimationComplete}
        >
          <Styled.FiltersWrapper>
            {showFiltersButtonInsideFiltersWrapper && (
              <Styled.ButtonWrapper
                position="absolute"
                disabled={controlsDisabled}
                right={-60}
                top={12}
                zIndex={4}
                onClick={() => {
                  if (view === 'list-filters') {
                    onSetView('to-list');
                  } else {
                    onSetView('map');
                  }
                }}
              >
                <Styled.ButtonWr>
                  <FiltersArrowIcon />
                </Styled.ButtonWr>
              </Styled.ButtonWrapper>
            )}
            <Filters
              view={view}
              mapLoaded={mapLoaded}
              onSave={handleSaveFilters}
              saveTitle={saveFiltersTitle}
              reference={searchRef}
            />
          </Styled.FiltersWrapper>
          <Styled.ListWrapper width={halfListWidth} ref={listWrapperRef}>
            <AnimatePresence>
              {showFiltersButtonInsideListWrapper && (
                <Styled.ButtonWrapper
                  right={-25}
                  top={26}
                  zIndex={3}
                  disabled={controlsDisabled}
                  onClick={() => onSetView('to-list-filters')}
                  transition={buttonsTransitionSettings}
                  exit={visibilityVariants.hidden}
                >
                  <FilterButton />
                </Styled.ButtonWrapper>
              )}
            </AnimatePresence>
            <Styled.AnimationViewChanger
              onClick={() =>
                onSetView(
                  view === 'to-map-list-up'
                    ? 'to-map-list-down'
                    : 'to-map-list-up'
                )
              }
            >
              <Styled.ArrowPoint isUp={view === 'to-map-list-down'} />
              <Styled.TextCriteria>Search criteria</Styled.TextCriteria>
              <Styled.ArrowPoint isUp={view === 'to-map-list-down'} />
            </Styled.AnimationViewChanger>
            <PropertiesListComponent
              list={list}
              disabled={filtersOpen}
              sortings={sortings}
              newItemsFetched={newItemsFetched && mapPointsSet}
              newItemsFetching={newItemsFetching || !mapPointsSet}
              onFetchMoreItems={onFetchMoreItems}
              onToggleToFavorites={onToggleToFavorites}
              onToggleSorting={onToggleSorting}
              onFetchItems={handleFetchByExistingBoundings}
              height={minContentHeightProp}
              controls={listAdditionalControl}
              {...rest}
            />
          </Styled.ListWrapper>
        </Styled.LeftSideMap>
        <motion.div
          variants={mapVariants}
          initial={getViewVariant(view, mapViewsVariants)}
          animate={getViewVariant(view, mapViewsVariants)}
          transition={getViewTransition(view, mapViewsTransitions)}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleMapAnimationComplete}
          ref={mapWrapperRef}
        >
          <Map
            mapLoaded={mapLoaded}
            height={minContentHeightProp}
            mapRef={mapRef}
            loadingBar={loadinBar}
            onPointClick={onFetchPinItem}
            onToggleToFavorites={onToggleToFavorites}
            onSetMapBubbledProperty={onSetMapBubbledProperty}
            mapSettings={mapSettings}
            bubbledProperty={mapBubbledProperty}
            distanceFrom={
              activeAddress ? activeAddress.location : defaultDistanceFrom
            }
            {...rest}
          />
        </motion.div>
      </Styled.Root>
      <Styled.SearchWrapper
        display={fullScreenSearchActive ? 'block' : 'none'}
        onClick={handleSearchWrapperClick}
        id="full-screen-search-wrapper"
      >
        <Search
          ref={fullScreenSearchRef}
          disabled={controlsDisabled}
          onClick={toggleFullScreenSearchActive}
          open
          position="absolute"
          top="50%"
          left="50%"
          height={LayoutSizes.searchInputHeight}
          width={50}
          hor="-50%"
          vert="-50%"
          maxWidth={400}
          placeholder="Type city, zip or address"
        />
      </Styled.SearchWrapper>
    </React.Fragment>
  );
};

export default Properties;
