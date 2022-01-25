/* eslint-disable no-underscore-dangle, no-new, react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { render } from 'react-dom';
import _debounce from 'lodash/debounce';
import Swiper, { Navigation, Pagination } from 'swiper';
import uniqueId from 'lodash/uniqueId';

import { Props, PropertyPoint } from './types';
import { Event, Routes } from '@types';

import config from '@config';

import { areasSelector } from 'models/properties/selectors';
import { authorizedSelector } from 'models/user/selectors';
import { useActionWithPayload } from 'hooks/useAction';
import { actions as actionsPush } from 'models/pushes';
import { useSelector } from 'hooks/useSelector';

import Emitter from 'utils/eventEmitter';
import { getBoundsPoints } from 'utils/map';
import history from 'utils/history';
import { setZoomLevelQuery, setMapCenterQuery } from './helpers';

import Bubble from './Bubble';
import createClusterMarkerClass from 'pages/MapDrawing/custom-marker';

import { icons } from 'styles/icons';

import * as S from './Map.styled';

const DrawUnActive = icons.drawUnActive;
const DrawActive = icons.drawActive;

Swiper.use([Navigation, Pagination]);

const cursor = require('assets/icons/map/cursor-drawing-map.svg');

const poly: { [key: string]: google.maps.Polygon | google.maps.Polyline } = {};
let coords: { [key: string]: { lat: number; lng: number }[] } = {};
const markers: { [key: string]: google.maps.Marker } = {};

const ZONE_NAME = 'area1';

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
  const current = useSelector(authorizedSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraw, setDraw] = useState(false);
  const areas = useSelector(areasSelector);
  const markersDrawnTimeout = useRef<number>();
  const bounds = useRef<{ [key: string]: google.maps.LatLngBounds }>({});
  const pathDraw = useRef();
  const MarkerClassRef = useRef<ReturnType<typeof createClusterMarkerClass>>();
  const addPush = useActionWithPayload(actionsPush.addPush);

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

  const drawBubble = useCallback(
    (point: PropertyPoint) => {
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
          position: new google.maps.LatLng(
            point.position[0],
            point.position[1]
          ),
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
          if (current === null) {
            addPush({
              id: uniqueId('info'),
              type: 'error',
              title: 'Fail',
              message: `You need to login`,
            });
            return;
          }
          heartIcon.style.display = 'none';
          heartActiveIcon.style.display = 'inline';
          onToggleToFavorites(point.id);
        });

        heartActiveIcon.addEventListener('click', () => {
          if (current === null) {
            addPush({
              id: uniqueId('info'),
              type: 'error',
              title: 'Fail',
              message: `You need to login`,
            });
            return;
          }
          heartActiveIcon.style.display = 'none';
          heartIcon.style.display = 'inline';
          onToggleToFavorites(point.id);
        });

        listingLinks.forEach(link => {
          (link as HTMLDivElement).addEventListener(
            'click',
            (e: MouseEvent) => {
              if (!(e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                if (current === null) {
                  addPush({
                    id: uniqueId('info'),
                    type: 'error',
                    title: 'Fail',
                    message: `You need to login`,
                  });
                  return;
                }
                history.push(`${Routes.properties}/${point.id}`);
              }
            }
          );
        });
      }
    },
    [current]
  );

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

  function disable() {
    map.current!.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false,
    });
  }

  function enable() {
    map.current!.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
    });
  }

  const handleReset = (uId: string) => {
    poly[uId]?.setMap(null);
    coords = {};
    delete poly[uId];
    delete markers[uId];
  };

  const handleDone = () => {
    map.current!.setOptions({
      draggableCursor: 'grab',
    });
    // Object.keys(poly).forEach(key => {
    //   poly[key].setMap(null);
    // });
    google.maps.event.clearListeners(map.current!.getDiv(), 'mousedown');
    enable();
    Object.keys(markers).forEach(key => {
      markers[key].setMap(null);
    });
    setDraw(false);
    if (coords[ZONE_NAME]) {
      Emitter.emit(Event.drawEditDone, coords);
    } else {
      Emitter.emit(Event.drawEditDone, null);
    }
    // handleReset('area1');
  };

  const drawFreeHand = () => {
    // const uId = generateId();
    const uId = `area${Object.keys(poly).length + 1}`;
    poly[uId] = new google.maps.Polyline({
      map: map.current,
      clickable: false,
    });
    poly[uId].setOptions({
      strokeWeight: 4.0,
      strokeColor: '#3D9DFF',
    });
    coords[uId] = [];
    bounds.current[uId] = new google.maps.LatLngBounds();

    const move = google.maps.event.addListener(map.current!, 'mousemove', e => {
      poly[uId].getPath().push(e.latLng);
      poly[uId].setOptions({
        strokeWeight: 4.0,
        strokeColor: '#3D9DFF',
      });
      coords[uId].push({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    });

    google.maps.event.addListenerOnce(map.current!, 'mouseup', () => {
      google.maps.event.removeListener(move);
      const path = poly[uId].getPath();
      // @ts-ignore
      pathDraw.current = path;
      coords[uId].push(coords[uId][0]);
      poly[uId].setMap(null);
      // @ts-ignore
      poly[uId] = new google.maps.Polygon({ map: map.current, path });
      poly[uId].setOptions({
        strokeWeight: 4.0,
        fillColor: '#e2f0ff',
        strokeColor: '#3D9DFF',
      });
      // google.maps.event.clearListeners(map.current!.getDiv(), 'mousedown');
      // enable();

      // to set marker in center shape zone
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < coords[uId].length; i++) {
        bounds.current[uId].extend(coords[uId][i]);
      }
      // const marker = new google.maps.Marker({
      //   position: bounds.current[uId].getCenter(),
      //   map: map.current,
      // });

      const marker = new MarkerClassRef.current!(
        bounds.current[uId].getCenter(),
        `Area ${Object.keys(markers).length + 1}`,
        uId
      );

      marker.setMap(map.current!);

      marker.addListener('click', () => {
        handleReset(uId);
        marker.setMap(null);
      });
      // @ts-ignore
      markers[uId] = marker;

      // testing feature
      marker.setMap(null);
      handleDone();
    });
  };

  const handleRemoveOutline = () => {
    Emitter.emit(Event.drawEditDone, null);
    handleReset(ZONE_NAME);
    setDraw(false);
  };

  const handleDrawStart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (current === null) {
      addPush({
        id: uniqueId('info'),
        type: 'error',
        title: 'Fail',
        message: `You need to login`,
      });
      return;
    }
    handleReset(ZONE_NAME);
    setDraw(true);
    map.current!.setOptions({
      draggableCursor: `url(${cursor}), auto`,
    });
    Emitter.emit(Event.resetMarkersMap);

    Object.keys(poly).forEach(key => {
      poly[key] = new google.maps.Polygon({
        map: map.current,
        // @ts-ignore
        path: poly[key].getPath(),
      });
      poly[key].setOptions({
        strokeWeight: 4.0,
        fillColor: '#e2f0ff',
        strokeColor: '#3D9DFF',
      });
    });

    Object.keys(markers).forEach((key, index) => {
      markers[key].setTitle(`Area ${index + 1}`);
      markers[key].setMap(map.current!);
    });

    disable();
    google.maps.event.addDomListener(
      map.current!.getDiv(),
      'mousedown',
      // @ts-ignore
      (event: Event) => {
        // @ts-ignore
        const { target } = event;
        const classString = target.className;
        if (/map-marker/.exec(classString)) return;
        drawFreeHand();
      }
    );
  };

  useEffect(() => {
    if (mapLoaded) {
      if (!map.current) {
        /* eslint-disable no-multi-assign, no-param-reassign */
        map.current = mapRef.current = new google.maps.Map(
          document.getElementById('#map') as Element,
          {
            minZoom: 6,
            zoom: mapSettings.zoom,
            // @ts-ignore
            mapId: config.maps.mapKey,
            center: {
              lat: mapSettings.center[0],
              lng: mapSettings.center[1],
            },
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }
        );
        MarkerClassRef.current = createClusterMarkerClass();
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
      {!isDraw ? (
        <S.WrapperBtn>
          {areas && areas[ZONE_NAME] && (
            <S.Circle onClick={handleRemoveOutline}>
              <S.Close />
            </S.Circle>
          )}
          <S.Button onClick={handleDrawStart}>
            <DrawUnActive />
            <S.Text color="#768efe">Draw</S.Text>
          </S.Button>
        </S.WrapperBtn>
      ) : (
        <S.WrapperBtn>
          <S.DoneButton onClick={handleDone}>
            <DrawActive />
            <S.Text color="#fff">Draw</S.Text>
          </S.DoneButton>
        </S.WrapperBtn>
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
