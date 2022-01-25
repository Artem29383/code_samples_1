import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import Map from 'pages/Sell/Map/Map';
import config from '@config';

import * as Styled from './Map.styled';

type Props = {
  coordinates: { lat: number; lng: number } | null;
  address: string;
  zoom: number;
};

const MapContainer = ({ zoom, coordinates, address }: Props) => {
  const $map = useRef(null);
  const map = useRef<google.maps.Map>();

  useEffect(() => {
    if (map.current) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  const initMapHandle = useCallback(() => {
    map.current = new google.maps.Map($map.current!, {
      center: coordinates,
      zoom,
      minZoom: 13,
      // @ts-ignore
      mapId: config.maps.mapKey,
      zoomControl: false,
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

    const content = ReactDOMServer.renderToString(
      <Styled.RootContentMarker>
        <Styled.Question>Is this correct?</Styled.Question>
        <Styled.Address>{address}</Styled.Address>
        <Styled.Triangle />
      </Styled.RootContentMarker>
    );

    const infowindow = new google.maps.InfoWindow({
      content,
    });
    // @ts-ignore
    const marker = new google.maps.Marker({
      position: coordinates,
      map: map.current,
      visible: false,
    });
    infowindow.open(map.current, marker);
  }, [address, coordinates, zoom]);

  useEffect(() => {
    if ($map.current) {
      if (!map.current) {
        initMapHandle();
      }
    }
  }, [map, $map, initMapHandle]);

  return <Map $map={$map} />;
};

export default MapContainer;
