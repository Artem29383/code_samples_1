/* eslint-disable no-underscore-dangle, no-new, react-hooks/exhaustive-deps */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from 'react';
import MarkerCluster from '@googlemaps/markerclustererplus';
import _debounce from 'lodash/debounce';
import createPopupClass from './Popup';
import Swiper, { Navigation, Pagination } from 'swiper';
import { LayoutProps } from 'styled-system';

import createPropertyMarkerClass, {
  PropertyMarkerInterface,
} from './property-marker';
import { Event, Routes } from '@types';
import { PropertyType } from 'models/properties/types';
import { actions } from 'models/properties';

/* eslint-disable import/no-unresolved */
import { Cluster } from '@googlemaps/markerclustererplus/dist/cluster';
/* eslint-disable import/no-unresolved */

import {
  PinItem as PinItemType,
  mapSettingsSelector,
} from 'models/properties/selectors';
import Spinner from 'components/Spinner';
import PinItem from './PinItem';

import config from '@config';

import Emitter from 'utils/eventEmitter';
import { getBoundsPoints } from 'utils/map';
import history from 'utils/history';
import {
  createClusterOptions,
  setZoomLevelQuery,
  setMapCenterQuery,
  createClusterCalculator,
} from './helpers';

import * as Styled from './Map.styled';

const houseIcon = require('assets/icons/map/house.svg');
const lotIcon = require('assets/icons/map/lot.svg');
const townhomeIcon = require('assets/icons/map/townhome.svg');
const condoIcon = require('assets/icons/map/condo.svg');
const distanceFromIcon = require('assets/icons/map/distance-from.svg');

const townhomeHeartIcon = require('assets/icons/map/townhome-heart.svg');
const lotHeartIcon = require('assets/icons/map/lot-heart.svg');
const houseHeartIcon = require('assets/icons/map/house-heart.svg');
const condoHeartIcon = require('assets/icons/map/condo-heart.svg');

Swiper.use([Navigation, Pagination]);

type Props = {
  onToggleToFavorites: (payload: number) => void;
  onSetMapSettings: ActionType<typeof actions.setMapSettings>;
  onPointClick: (payload: number) => void;
  onResetPinItem: () => void;
  pointsSet: boolean;
  mapLoaded: boolean;
  mapSettings: ReturnType<typeof mapSettingsSelector>;
  distanceFrom: [number, number];
  mapRef: MutableRefObject<google.maps.Map | null>;
  pinItem: PinItemType;
} & LayoutProps;

const propertyTypeIcon: Record<PropertyType, string[]> = {
  house: [houseIcon, houseHeartIcon],
  townhome: [townhomeIcon, townhomeHeartIcon],
  lot: [lotIcon, lotHeartIcon],
  condo: [condoIcon, condoHeartIcon],
};

const clusterOptions = createClusterOptions(60, 18, 5);
const clusterCalculator = createClusterCalculator(clusterOptions);

const getClusterMarkers = (cluster: Cluster) =>
  cluster.getMarkers() as PropertyMarkerInterface[];

const Map = ({
  onPointClick,
  onResetPinItem,
  onToggleToFavorites,
  pointsSet,
  mapLoaded,
  mapRef,
  pinItem,
  mapSettings,
  distanceFrom,
  onSetMapSettings,
  ...rest
}: Props) => {
  const [customPinActive, setCustomPinActive] = useState(false);
  const [markersDrawn, setMarkersDrawn] = useState(false);
  const markersDrawnTimeout = useRef<number>();
  const swiperIntializeTimeout = useRef<number>();

  const map = useRef<google.maps.Map>();
  const popupСlassRef = useRef<ReturnType<typeof createPopupClass>>();
  const distanceFromMarkerRef = useRef<google.maps.Marker>();
  const infoPopupRef = useRef<{ id?: number; popup?: google.maps.InfoWindow }>(
    {}
  );

  const markersRef = useRef<PropertyMarkerInterface[]>([]);
  const markersClusterRef = useRef<MarkerCluster>();
  const idleListenerRef = useRef<google.maps.MapsEventListener>();
  const zoomListenerRef = useRef<google.maps.MapsEventListener>();

  const rootRef = useRef<HTMLDivElement>(null);

  const drawMarkers = useCallback(() => {
    const PropertyMarker = createPropertyMarkerClass();

    distanceFromMarkerRef.current = new google.maps.Marker({
      position: {
        lat: distanceFrom[0],
        lng: distanceFrom[1],
      },
      icon: {
        url: distanceFromIcon,
      },
      map: map.current,
    });

    if (markersRef.current.length > 0 && markersClusterRef.current) {
      markersClusterRef.current.removeMarkers(
        markersRef.current.map(item => item)
      );

      markersRef.current.forEach(item => item.setMap(null));
    }

    markersRef.current = (window.__MAP_POINTS__ || [])
      .filter(item => item.active)
      .map(
        item =>
          new PropertyMarker({
            favorite: item.favorite,
            propertyType: item.propertyType,
            propertyId: item.propertyId,
            position: {
              lat: Number(item.coordinates[0]),
              lng: Number(item.coordinates[1]),
            },
            icon: {
              url: propertyTypeIcon[item.propertyType][item.favorite ? 1 : 0],
            },
            map: map.current,
          })
      );

    markersRef.current.forEach(marker =>
      marker.addListener('click', () => {
        if (infoPopupRef.current.id === marker.propertyId) {
          infoPopupRef.current.popup!.close();
          infoPopupRef.current = {};
          setCustomPinActive(false);
          onResetPinItem();
        } else {
          const loadingPin = document
            .querySelector('#loading-pin')!
            .cloneNode(true) as HTMLDivElement;

          loadingPin.style.display = 'flex';

          if (infoPopupRef.current.popup) {
            infoPopupRef.current.popup.close();
          }

          infoPopupRef.current.id = marker.propertyId;
          infoPopupRef.current.popup = new google.maps.InfoWindow({
            content: loadingPin.cloneNode(true),
            // pixelOffset: new google.maps.Size(0, 5),
          });

          setCustomPinActive(true);

          infoPopupRef.current.popup.open(map.current, marker);

          onPointClick(marker.propertyId);

          // For future use if creating custom popup - proper position calcualting
          /* const popupPointPosition = mapProjection.fromPointToLatLng(
            new google.maps.Point(
              markerPoint.x,
              markerPoint.y - 45 / 2 ** map.current!.getZoom()
            )
          ); */
        }
      })
    );

    markersClusterRef.current = new MarkerCluster(
      /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
      map.current as google.maps.Map,
      markersRef.current,
      {
        clusterClass: 'custom-clustericon',
        styles: clusterOptions,
        gridSize: 120,
        calculator: markers =>
          clusterCalculator(markers as PropertyMarkerInterface[]),
      }
    );
  }, []);

  const getClusterByMarker = useCallback(
    (searchMarker: PropertyMarkerInterface) =>
      markersClusterRef
        .current!.getClusters()
        .find(
          cluster =>
            getClusterMarkers(cluster).find(
              marker => marker.propertyId === searchMarker.propertyId
            )!
        )!,
    []
  );

  const drawPinItem = useCallback((id: number) => {
    const activePinItemContent = rootRef
      .current!.querySelector('#pin-item-content')!
      .cloneNode(true) as HTMLDivElement;
    activePinItemContent.id = 'pin-item-content-active';
    activePinItemContent.style.display = 'block';

    infoPopupRef.current.popup!.setContent(activePinItemContent);

    // @ts-ignore
    swiperIntializeTimeout.current = setTimeout(() => {
      new Swiper('#pin-item-content-active .swiper-container', {
        lazy: true,
        pagination: {
          el: '.pin-swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: `.pin-swiper-next-button`,
          prevEl: `.pin-swiper-prev-button`,
        },
      });
    }, 100);

    const listingButton = activePinItemContent.querySelector(
      '#pin-item-content-active .listing-button'
    )! as HTMLButtonElement;
    const heartIcon = activePinItemContent.querySelector(
      '#pin-item-content-active .js-map-heart-icon'
    )! as SVGElement;
    const heartActiveIcon = activePinItemContent.querySelector(
      '#pin-item-content-active .js-map-heart-active-icon'
    )! as SVGElement;

    heartIcon.addEventListener('click', () => {
      heartIcon.style.display = 'none';
      heartActiveIcon.style.display = 'inline';
      onToggleToFavorites(id);
    });

    heartActiveIcon.addEventListener('click', () => {
      heartActiveIcon.style.display = 'none';
      heartIcon.style.display = 'inline';
      onToggleToFavorites(id);
    });

    listingButton.addEventListener('click', (e: MouseEvent) => {
      if (!(e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        history.push(`${Routes.properties}/${id}`);
      }
    });
  }, []);

  useEffect(() => {
    Emitter.on(Event.addMarkerToFavorites, (id: number) => {
      const marker = markersRef.current.find(
        ({ propertyId }) => propertyId === id
      )!;

      const cluster = getClusterByMarker(marker);
      const noFavoriteInsideCluster = !getClusterMarkers(cluster).some(
        ({ favorite }) => favorite
      );

      marker.favorite = true;
      marker.setIcon(propertyTypeIcon[marker.propertyType][1]);

      if (noFavoriteInsideCluster) {
        // @ts-ignore
        cluster.clusterIcon_.div_.classList.add('cluster-favorite');
      }
    });

    Emitter.on(Event.removeMarkerFromFavorites, (id: number) => {
      const marker = markersRef.current.find(
        ({ propertyId }) => propertyId === id
      )!;

      marker.favorite = false;

      const cluster = getClusterByMarker(marker);
      const noFavoriteInsideCluster = !getClusterMarkers(cluster).some(
        ({ favorite }) => favorite
      );

      marker.setIcon(propertyTypeIcon[marker.propertyType][0]);

      if (noFavoriteInsideCluster) {
        // @ts-ignore
        cluster.clusterIcon_.div_.classList.remove('cluster-favorite');
      }
    });

    Emitter.on(Event.mapPointsSet, () => {
      drawMarkers();

      // @ts-ignore
      markersDrawnTimeout.current = setTimeout(() => {
        setMarkersDrawn(true);

        if (pinItem) {
          const pinItemMarker = markersRef.current.find(
            marker => marker.propertyId === pinItem.id
          );

          if (pinItemMarker) {
            setCustomPinActive(true);

            infoPopupRef.current.id = pinItem.id;
            infoPopupRef.current.popup = new google.maps.InfoWindow({});
            infoPopupRef.current.popup.open(map.current, pinItemMarker);
            drawPinItem(pinItem.id);
          }
        }
      }, 500);
    });

    Emitter.on(Event.drawPinItem, (id: number) => {
      drawPinItem(id);
    });

    Emitter.on(Event.drawDistanceFrom, (location: [number, number]) => {
      if (map.current && distanceFromMarkerRef.current) {
        distanceFromMarkerRef.current.setPosition({
          lat: location[0],
          lng: location[1],
        });
      }
    });

    Emitter.on(Event.centerMap, (_center: [number, number]) => {
      if (map.current) {
        setMapCenterQuery(_center);
        map.current.setCenter({ lat: _center[0], lng: _center[1] });
      }
    });

    Emitter.on(Event.zoomMap, (level: number) => {
      if (map.current) {
        setZoomLevelQuery(level);
      }

      if (pinItem && infoPopupRef.current.popup) {
        infoPopupRef.current.popup.close();
        infoPopupRef.current = {};
        setCustomPinActive(false);
        onResetPinItem();
      }
    });

    return () => {
      Emitter.off(Event.addMarkerToFavorites);
      Emitter.off(Event.removeMarkerFromFavorites);
      Emitter.off(Event.mapPointsSet);
      Emitter.off(Event.drawPinItem);
      Emitter.off(Event.centerMap);
      Emitter.off(Event.zoomMap);
    };
  }, [pinItem]);

  useEffect(() => {
    if (mapLoaded) {
      if (!map.current) {
        /* eslint-disable no-multi-assign, no-param-reassign */
        map.current = mapRef.current = new google.maps.Map(
          document.getElementById('#map') as Element,
          {
            zoom: mapSettings.zoom,
            // @ts-ignore
            mapId: config.maps.mapKey,
            center: {
              lat: mapSettings.center[0],
              lng: mapSettings.center[1],
            },
            // scrollwheel: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }
        );

        map.current!.addListener('click', (e: { placeId?: string }) => {
          if (e.placeId) {
            setCustomPinActive(false);
          }
        });

        popupСlassRef.current = createPopupClass();

        const idleListener = _debounce(
          () => {
            const mapCenter = map.current!.getCenter();
            const zoom = map.current!.getZoom();

            const _center: [number, number] = [
              mapCenter.lat(),
              mapCenter.lng(),
            ];

            setMapCenterQuery(_center);
            setZoomLevelQuery(zoom);

            onSetMapSettings({ center: _center, zoom });

            Emitter.emit(Event.mapIdle, getBoundsPoints(map.current!));
          },
          500,
          { leading: false }
        );

        idleListenerRef.current = map.current!.addListener(
          'idle',
          idleListener
        );
      }

      zoomListenerRef.current = map.current!.addListener('zoom_changed', () => {
        Emitter.emit(Event.zoomMap);
      });
    }

    return () => {
      if (idleListenerRef.current) {
        idleListenerRef.current.remove();
      }

      if (zoomListenerRef.current) {
        zoomListenerRef.current.remove();
      }
    };
  }, [mapLoaded]);

  useEffect(() => {
    return () => {
      clearTimeout(swiperIntializeTimeout.current);
      clearTimeout(markersDrawnTimeout.current);
      window.__MAP_POINTS__ = undefined;
    };
  }, []);

  return (
    <div ref={rootRef}>
      <Styled.Map
        id="#map"
        customPinActive={customPinActive}
        isLoading={!(pointsSet && markersDrawn)}
        clusterOptions={clusterOptions}
        {...rest}
      />
      <Styled.Pin id="loading-pin" justifyContent="center" alignItems="center">
        <Spinner />
      </Styled.Pin>
      <Styled.Pin id="pin-item-content">
        {pinItem && <PinItem item={pinItem} />}
      </Styled.Pin>
    </div>
  );
};

export default Map;
