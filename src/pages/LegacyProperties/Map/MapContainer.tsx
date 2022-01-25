/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import _debounce from 'lodash/debounce';

import { Event } from '@types';
import { Props as CommonProps, PropertyPoint } from './types';
import createClusterMarkerClass, {
  ClusterMarkerInterface,
} from './cluster-marker';
import createPointMarkerClass, { PointMarkerInterface } from './point-marker';
import createDistanceFromMarkerClass, {
  DistanceFromMarkerInterface,
} from './distance-from-marker';
import { Boundings, Cluster, PropertyType } from 'models/properties/types';

import { actions } from 'models/properties';
import { useActionWithPayload } from 'hooks/useAction';

import Emitter from 'utils/eventEmitter';
import {
  createClustersSizesOptions,
  getClusterOptionsIndexByCapacity,
  setZoomLevelQuery,
} from './helpers';

import Map from './Map';

const houseIcon = require('assets/icons/map/house-stroke.svg');
const lotIcon = require('assets/icons/map/lot-stroke.svg');
const townhomeIcon = require('assets/icons/map/townhome-stroke.svg');
const condoIcon = require('assets/icons/map/condo-stroke.svg');

const housePendingIcon = require('assets/icons/map/house-pending-stroke.svg');
const lotPendingIcon = require('assets/icons/map/lot-pending-stroke.svg');
const townhomePendingIcon = require('assets/icons/map/townhome-pending-stroke.svg');
const condoPendingIcon = require('assets/icons/map/condo-pending-stroke.svg');

const townhomeHeartIcon = require('assets/icons/map/townhome-heart.svg');
const lotHeartIcon = require('assets/icons/map/lot-heart.svg');
const houseHeartIcon = require('assets/icons/map/house-heart.svg');
const condoHeartIcon = require('assets/icons/map/condo-heart.svg');

const townhomeViewedIcon = require('assets/icons/map/townhome-viewed.svg');
const lotViewedIcon = require('assets/icons/map/lot-viewed.svg');
const houseViewedIcon = require('assets/icons/map/house-viewed.svg');
const condoViewedIcon = require('assets/icons/map/condo-viewed.svg');

const heartIcon = require('assets/icons/map/heart-active.svg');

const iconSize: [number, number] = [43, 55];
const heartIconSize: [number, number] = [53, 48];

type IconSettings = { icon: string; size: [number, number] };
type IconStatusSettings = {
  icon: Record<string, string>;
  size: [number, number];
};

const propertyTypeIcon: Record<
  PropertyType,
  {
    default: IconStatusSettings;
    favorite: IconSettings;
    viewed: IconSettings;
  }
> = {
  house: {
    default: {
      icon: { Active: houseIcon, ActiveUnderContract: housePendingIcon },
      size: iconSize,
    },
    favorite: { icon: houseHeartIcon, size: heartIconSize },
    viewed: { icon: houseViewedIcon, size: iconSize },
  },
  townhome: {
    default: {
      icon: { Active: townhomeIcon, ActiveUnderContract: townhomePendingIcon },
      size: iconSize,
    },
    favorite: { icon: townhomeHeartIcon, size: heartIconSize },
    viewed: { icon: townhomeViewedIcon, size: iconSize },
  },
  condo: {
    default: {
      icon: { Active: condoIcon, ActiveUnderContract: condoPendingIcon },
      size: iconSize,
    },
    favorite: { icon: condoHeartIcon, size: heartIconSize },
    viewed: { icon: condoViewedIcon, size: iconSize },
  },
  lot: {
    default: {
      icon: { Active: lotIcon, ActiveUnderContract: lotPendingIcon },
      size: iconSize,
    },
    favorite: { icon: lotHeartIcon, size: heartIconSize },
    viewed: { icon: lotViewedIcon, size: iconSize },
  },
};

const clusterSizesOptions = createClustersSizesOptions(60, 20, 5);

const maxLoadingProgress = 92;

const getStatusIcon = (status: string, iconStatus: Record<string, string>) =>
  iconStatus[status] || iconStatus.Active;

type Props = CommonProps & {
  distanceFrom: [number, number];
};

const MapContainer = ({
  mapLoaded,
  distanceFrom,
  bubbledProperty,
  onSetMapBubbledProperty,
  mapRef,
  ...rest
}: Props) => {
  const fetchClusters = useActionWithPayload(actions.fetchClusters);
  const fetchShorthandsInBoundings = useActionWithPayload(
    actions.fetchShorthandsInBoundings
  );

  const pointMarkersRef = useRef<PointMarkerInterface[]>([]);
  const clusterMarkersRef = useRef<ClusterMarkerInterface[]>([]);
  const distanceFromMarkerRef = useRef<DistanceFromMarkerInterface>(null);

  const prevLoadingProgressRef = useRef<number>(-1);
  const loadingProgressTimeoutRef = useRef<number>();
  const pointsRenderedRef = useRef<boolean>();

  const [loadingProgress, setLoadingProgress] = useState(-1);

  const propertiesInBoundings = useRef<Record<number, PropertyPoint>>({});
  const bubbledPropertyRef = useRef<number | null>(
    bubbledProperty ? bubbledProperty.id : null
  );

  const clusterMarkerClassRef = useRef<
    ReturnType<typeof createClusterMarkerClass>
  >();
  const distanceFromMarkerClassRef = useRef<
    ReturnType<typeof createDistanceFromMarkerClass>
  >();
  const pointMarkerClassRef = useRef<
    ReturnType<typeof createPointMarkerClass>
  >();

  const drawDistanceFromMarker = useCallback(
    (position: [number, number]) => {
      const marker = new distanceFromMarkerClassRef.current!(
        new google.maps.LatLng(position[0], position[1]),
        20
      );

      marker.setMap(mapRef.current);
    },
    [mapRef]
  );

  const clearMarkers = useCallback(() => {
    clusterMarkersRef.current.forEach(marker => marker.setMap(null));
    pointMarkersRef.current.forEach(marker => marker.setMap(null));
  }, []);

  const setLoadingComplete = useCallback(() => {
    setLoadingProgress(100);
    prevLoadingProgressRef.current = -1;
  }, []);

  const handleSetMapBubbledProperty = useCallback(
    (id: number | null) => {
      onSetMapBubbledProperty(id);
      bubbledPropertyRef.current = id;
    },
    [onSetMapBubbledProperty]
  );

  const createClusterMarkers = useCallback(
    (clusters: Cluster[]) => {
      if (clusters.length > 0) {
        clearMarkers();

        clusterMarkersRef.current = clusters.map(
          ({ position, ids, favorite }) => {
            const index = getClusterOptionsIndexByCapacity(
              clusterSizesOptions,
              ids.length,
              2
            );

            return new clusterMarkerClassRef.current!(
              new google.maps.LatLng(position[0], position[1]),
              String(ids.length),
              {
                size: clusterSizesOptions[index],
                fontSize: 20 + index * 0.8,
                borderWidth: clusterSizesOptions[index] + 15,
              },
              favorite ? { src: heartIcon, size: 20 + index } : null
            );
          }
        );

        clusterMarkersRef.current.forEach(marker =>
          marker.setMap(mapRef.current)
        );

        clusterMarkersRef.current.forEach(marker =>
          marker.addListener(
            'click',
            _debounce(
              () => {
                console.info('clicking');
                if (prevLoadingProgressRef.current === -1) {
                  mapRef.current!.setCenter(marker.position);
                  mapRef.current!.setZoom(mapRef.current!.getZoom() + 2);
                }
              },
              200,
              { leading: false }
            )
          )
        );

        setLoadingComplete();
      }
    },
    [clearMarkers, setLoadingComplete, mapRef]
  );

  const createPointMarkers = useCallback(
    (points: PropertyPoint[]) => {
      if (points.length > 0) {
        clearMarkers();

        propertiesInBoundings.current = points.reduce(
          (acc, item) => ({
            ...acc,
            [item.id]: item,
          }),
          {}
        );
        pointMarkersRef.current = points.map(
          ({
            position,
            propertyType,
            id,
            viewed,
            favorite,
            standardStatus,
          }) => {
            // eslint-disable-next-line no-nested-ternary
            const { icon, size } = favorite
              ? propertyTypeIcon[propertyType].favorite
              : viewed
              ? propertyTypeIcon[propertyType].viewed
              : propertyTypeIcon[propertyType].default;

            return new pointMarkerClassRef.current!(
              id,
              new google.maps.LatLng(position[0], position[1]),
              typeof icon === 'string'
                ? icon
                : getStatusIcon(standardStatus, icon),
              size
            );
          }
        );

        pointMarkersRef.current.forEach(marker =>
          marker.addListener('click', () => {
            handleSetMapBubbledProperty(marker.id);
            Emitter.emit(
              Event.drawBubble,
              propertiesInBoundings.current[marker.id]
            );
          })
        );

        pointMarkersRef.current.forEach(marker =>
          marker.setMap(mapRef.current)
        );

        setLoadingComplete();

        if (!pointsRenderedRef.current && bubbledProperty) {
          handleSetMapBubbledProperty(bubbledProperty.id);
          Emitter.emit(Event.drawBubble, bubbledProperty);
        }

        pointsRenderedRef.current = true;
      }
    },
    [
      mapRef,
      bubbledProperty,
      clearMarkers,
      setLoadingComplete,
      handleSetMapBubbledProperty,
    ]
  );

  useEffect(() => {
    if (mapLoaded) {
      clusterMarkerClassRef.current = createClusterMarkerClass();
      pointMarkerClassRef.current = createPointMarkerClass();
      distanceFromMarkerClassRef.current = createDistanceFromMarkerClass();
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (mapLoaded) {
      drawDistanceFromMarker(distanceFrom);
    }
  }, [distanceFrom, mapLoaded, drawDistanceFromMarker]);

  useEffect(() => {
    Emitter.on(Event.addMarkerToFavorites, (id: number) => {
      const marker = pointMarkersRef.current.find(item => item.id === id)!;

      const { propertyType, standardStatus } = propertiesInBoundings.current[
        marker.id
      ];

      const { icon, size } = propertyTypeIcon[propertyType].favorite;

      marker.setIcon(
        typeof icon === 'string' ? icon : getStatusIcon(standardStatus, icon),
        size
      );
    });

    Emitter.on(Event.removeMarkerFromFavorites, (id: number) => {
      const marker = pointMarkersRef.current.find(item => item.id === id)!;
      console.info(propertiesInBoundings);
      console.info(propertiesInBoundings.current[marker.id]);
      const {
        propertyType,
        standardStatus,
        viewed,
      } = propertiesInBoundings.current[marker.id];

      const { icon, size } = viewed
        ? propertyTypeIcon[propertyType].viewed
        : propertyTypeIcon[propertyType].default;

      marker.setIcon(
        typeof icon === 'string' ? icon : getStatusIcon(standardStatus, icon),
        size
      );
    });

    return () => {
      Emitter.off(Event.addMarkerToFavorites);
      Emitter.off(Event.removeMarkerFromFavorites);
    };
  }, []);

  useEffect(() => {
    if (!Emitter.eventNames().includes(Event.mapIdle)) {
      Emitter.on(Event.mapIdle, (boundings: Boundings) => {
        prevLoadingProgressRef.current = -1;
        setLoadingProgress(0);

        if (bubbledPropertyRef.current) {
          fetchShorthandsInBoundings({ boundings });
        } else {
          fetchClusters({ boundings });
        }
      });
    }
  }, [fetchClusters, fetchShorthandsInBoundings]);

  useEffect(() => {
    if (
      prevLoadingProgressRef.current < loadingProgress &&
      loadingProgress < maxLoadingProgress
    ) {
      // @ts-ignore
      loadingProgressTimeoutRef.current = setTimeout(() => {
        prevLoadingProgressRef.current = loadingProgress;
        setLoadingProgress(loadingProgress + 1);
      }, 50);
    } else {
      clearTimeout(loadingProgressTimeoutRef.current);
    }
  }, [loadingProgress]);

  useEffect(() => {
    Emitter.on(Event.zoomMap, (level: number) => {
      if (mapRef.current) {
        setZoomLevelQuery(level);

        /* TODO Reset bubble item */
      }
    });

    Emitter.on(Event.drawDistanceFrom, (location: [number, number]) => {
      if (distanceFromMarkerRef.current) {
        distanceFromMarkerRef.current.setMap(null);
        drawDistanceFromMarker(location);
      }
    });

    Emitter.on(Event.clustersFetched, (clusters: Cluster[]) => {
      createClusterMarkers(clusters);
    });

    Emitter.on(Event.mapPointsFetched, (points: PropertyPoint[]) => {
      createPointMarkers(points);
    });
  }, [
    mapRef,
    createClusterMarkers,
    createPointMarkers,
    fetchClusters,
    drawDistanceFromMarker,
  ]);

  useEffect(() => {
    return () => {
      clearTimeout(loadingProgressTimeoutRef.current);

      Emitter.off(Event.zoomMap);
      Emitter.off(Event.drawDistanceFrom);
      Emitter.off(Event.clustersFetched);
      Emitter.off(Event.mapPointsFetched);
      Emitter.off(Event.mapIdle);
    };
  }, []);

  return (
    <Map
      {...rest}
      mapRef={mapRef}
      bubbledProperty={bubbledProperty}
      onSetMapBubbledProperty={handleSetMapBubbledProperty}
      mapLoaded={mapLoaded}
      loadingProgress={loadingProgress}
    />
  );
};

export default MapContainer;
