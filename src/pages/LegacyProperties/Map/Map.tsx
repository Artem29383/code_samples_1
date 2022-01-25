/* eslint-disable no-underscore-dangle, no-new, react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { render } from 'react-dom';
import _debounce from 'lodash/debounce';
import Swiper, { Navigation, Pagination } from 'swiper';

import { Props, PropertyPoint } from './types';
import { Event, Routes } from '@types';

import config from '@config';

import Emitter from 'utils/eventEmitter';
import { getBoundsPoints } from 'utils/map';
import history from 'utils/history';
import { setZoomLevelQuery, setMapCenterQuery } from './helpers';

import Bubble from './Bubble';

import * as S from './Map.styled';

Swiper.use([Navigation, Pagination]);

const Map = ({
  onPointClick,
  onToggleToFavorites,
  bubbledProperty,
  mapLoaded,
  mapRef,
  mapSettings,
  loadingProgress,
  onSetMapSettings,
  onSetMapBubbledProperty,
  loadingBar,
  ...rest
}: Props & {
  loadingProgress: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const markersDrawnTimeout = useRef<number>();

  const map = useRef<google.maps.Map>();

  const idleListenerRef = useRef<google.maps.MapsEventListener>();
  const zoomListenerRef = useRef<google.maps.MapsEventListener>();
  const dragListenerRef = useRef<google.maps.MapsEventListener>();

  const infoPopupRef = useRef<{ id?: number; popup?: google.maps.InfoWindow }>(
    {}
  );

  const rootRef = useRef<HTMLDivElement>(null);

  const isLoadingTimeoutRef = useRef<number>();

  const resetBubble = useCallback(() => {
    if (infoPopupRef.current.popup) {
      infoPopupRef.current.popup.close();
      onSetMapBubbledProperty(null);
      infoPopupRef.current = {};
    }
  }, [onSetMapBubbledProperty]);

  const drawBubble = useCallback((point: PropertyPoint) => {
    if (infoPopupRef.current.id === point.id) {
      infoPopupRef.current.popup!.close();
      infoPopupRef.current = {};
      onSetMapBubbledProperty(null);
    } else {
      if (infoPopupRef.current.popup) {
        infoPopupRef.current.popup.close();
      }

      infoPopupRef.current.id = point.id;

      const bubbleEl = rootRef
        .current!.querySelector('#map-bubble')!
        .cloneNode(true) as HTMLDivElement;

      infoPopupRef.current.popup = new google.maps.InfoWindow({
        content: bubbleEl,
        position: new google.maps.LatLng(point.position[0], point.position[1]),
        pixelOffset: new google.maps.Size(0, -55),
      });

      infoPopupRef.current.popup.open(map.current);

      render(<Bubble item={point} />, bubbleEl);

      const listingLinks = bubbleEl.querySelectorAll(
        '#map-bubble .js-listing-link'
      );

      const heartIcon = bubbleEl.querySelector(
        '#map-bubble .js-map-heart-icon'
      )! as SVGElement;
      const heartActiveIcon = bubbleEl.querySelector(
        '#map-bubble .js-map-heart-active-icon'
      )! as SVGElement;

      heartIcon.addEventListener('click', () => {
        heartIcon.style.display = 'none';
        heartActiveIcon.style.display = 'inline';
        onToggleToFavorites(point.id);
      });

      heartActiveIcon.addEventListener('click', () => {
        heartActiveIcon.style.display = 'none';
        heartIcon.style.display = 'inline';
        onToggleToFavorites(point.id);
      });

      listingLinks.forEach(link => {
        (link as HTMLDivElement).addEventListener('click', (e: MouseEvent) => {
          if (!(e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            history.push(`${Routes.properties}/${point.id}`);
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    Emitter.on(Event.drawBubble, (point: PropertyPoint) => {
      drawBubble(point);
    });

    Emitter.on(Event.resetBubble, () => {
      resetBubble();
    });

    Emitter.on(Event.centerMap, (_center: [number, number]) => {
      if (map.current) {
        setMapCenterQuery(_center);
        map.current.setCenter({ lat: _center[0], lng: _center[1] });
      }
    });

    return () => {
      Emitter.off(Event.centerMap);
      Emitter.off(Event.drawBubble);
    };
  }, []);

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

        map.current.addListener('click', (e: { placeId?: string }) => {
          if (e.placeId) {
            onSetMapBubbledProperty(null);
          }
        });

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

        idleListenerRef.current = map.current.addListener('idle', idleListener);
      }

      zoomListenerRef.current = map.current.addListener('zoom_changed', () => {
        resetBubble();
        Emitter.emit(Event.zoomMap);
      });

      dragListenerRef.current = map.current.addListener('drag', () => {
        resetBubble();
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
    if (loadingProgress === 100) {
      // @ts-ignore
      isLoadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }

    if (loadingProgress === 0) {
      setIsLoading(true);
    }
  }, [loadingProgress]);

  useEffect(() => {
    return () => {
      clearTimeout(markersDrawnTimeout.current);
      clearTimeout(isLoadingTimeoutRef.current);
      clearTimeout(isLoadingTimeoutRef.current);

      window.__MAP_POINTS__ = undefined;
    };
  }, []);

  return (
    <div ref={rootRef}>
      {isLoading && loadingBar.show && (
        <S.LoadingProgress
          offset={loadingBar.offset}
          progress={loadingProgress}
        />
      )}
      <S.Map
        id="#map"
        customBubble={bubbledProperty !== null}
        isLoading={isLoading}
        {...rest}
      />
      <div id="map-bubble" />
    </div>
  );
};

export default Map;
