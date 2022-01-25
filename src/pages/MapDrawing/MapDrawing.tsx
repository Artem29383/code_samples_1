import React, { useCallback, useEffect, useRef, useState } from 'react';
import config from '@config';
import { useSelector } from 'hooks/useSelector';
import { mapLoadedSelector } from 'models/app/selectors';
import * as S from './MapDrawing.styled';
import Button from 'components/Button';
import createClusterMarkerClass from './custom-marker';

const generateId = () => {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2)
  );
};

const poly: { [key: string]: google.maps.Polygon } = {};
const coords: { [key: string]: { lat: number; lng: number }[] } = {};
const markers: google.maps.Marker[] = {};

const MapDrawing = () => {
  const MarkerClassRef = useRef<ReturnType<typeof createClusterMarkerClass>>();
  const mapLoaded = useSelector(mapLoadedSelector);
  const map = useRef<google.maps.Map>();
  const $map = useRef<HTMLDivElement | null>(null);
  const bounds = useRef({});
  const pathDraw = useRef();
  const [isDraw, setDraw] = useState(false);

  function disable() {
    map.current!.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false,
    });
  }

  function enable() {
    map.current.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
    });
  }

  const handleReset = (uId: string) => {
    poly[uId].setMap(null);
    delete coords[uId];
    delete poly[uId];
    delete markers[uId];
  };

  const handleDone = () => {
    Object.keys(poly).forEach(key => {
      poly[key].setMap(null);
    });
    google.maps.event.clearListeners(map.current!.getDiv(), 'mousedown');
    enable();
    Object.keys(markers).forEach(key => {
      markers[key].setMap(null);
    });
    setDraw(false);
  };

  const drawFreeHand = () => {
    const uId = generateId();
    poly[uId] = new google.maps.Polyline({
      map: map.current,
      clickable: false,
    });
    coords[uId] = [];
    bounds.current[uId] = new google.maps.LatLngBounds();

    const move = google.maps.event.addListener(map.current!, 'mousemove', e => {
      poly[uId].getPath().push(e.latLng);
      coords[uId].push({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    });

    google.maps.event.addListenerOnce(map.current!, 'mouseup', () => {
      google.maps.event.removeListener(move);
      const path = poly[uId].getPath();
      pathDraw.current = path;
      poly[uId].setMap(null);
      poly[uId] = new google.maps.Polygon({ map: map.current, path });
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
      markers[uId] = marker;
    });
  };

  const handleDrawStart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDraw(true);

    Object.keys(poly).forEach(key => {
      poly[key] = new google.maps.Polygon({
        map: map.current,
        path: poly[key].getPath(),
      });
    });

    Object.keys(markers).forEach((key, index) => {
      markers[key].setTitle(`Area ${index + 1}`);
      markers[key].setMap(map.current);
    });

    disable();
    google.maps.event.addDomListener(
      map.current!.getDiv(),
      'mousedown',
      (event: Event) => {
        const target = event.target as HTMLDivElement;
        const classString = target.className;
        if (/map-marker/.exec(classString)) return;
        drawFreeHand();
      }
    );
  };

  const initMapHandle = useCallback(() => {
    map.current = new google.maps.Map($map.current!, {
      center: { lat: 36.17215, lng: -115.14144 },
      zoom: 12,
      minZoom: 13,
      // @ts-ignore
      mapId: config.maps.mapKey,
      zoomControl: true,
      scrollwheel: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });
  }, []);

  useEffect(() => {
    if ($map.current && mapLoaded) {
      if (!map.current) {
        initMapHandle();
        MarkerClassRef.current = createClusterMarkerClass();
      }
    }
  }, [map, $map, initMapHandle, mapLoaded]);

  return (
    <S.Root>
      {!isDraw ? (
        <Button onClick={handleDrawStart} height={50} width={120}>
          Draw
        </Button>
      ) : (
        <Button onClick={handleDone} height={50} width={120}>
          Done
        </Button>
      )}
      <S.Map id="#map" ref={$map} />;
    </S.Root>
  );
};

export default MapDrawing;
