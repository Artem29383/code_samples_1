import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import { Colors } from '@types';
import { PropertyType } from 'models/properties/types';

import Map from 'pages/Property/Map/Map';
import * as Styled from './Map.Styled';

import { getPropertyTypeIcon } from 'utils/getPropertyTypeIcon';
import config from '@config';
import { getDistance, reformatMiles } from 'utils/getDistance';

import {
  icons as appIcons,
  DiningIcon,
  EntertainIcon,
  GroceryIcon,
  HealthCareIcon,
  NightLifeIcon,
  SchoolIcon,
  GymIcon,
} from 'styles/icons';

import createClusterMarkerClass from './custom-marker';
import { useSelector } from 'hooks/useSelector';
import { mapLoadedSelector } from 'models/app/selectors';

const groceryInsideIcon = require('assets/icons/map/grocery-1.svg');
const diningInsideIcon = require('assets/icons/map/dining-1.svg');
const schoolInsideIcon = require('assets/icons/map/school-1.svg');
const nightlifeInsideIcon = require('assets/icons/map/nightlife-1.svg');
const entertainInsideIcon = require('assets/icons/map/entertain-1.svg');
const healthcareInsideIcon = require('assets/icons/map/healthcare-1.svg');
const gymInsideIcon = require('assets/icons/map/gym-1.svg');

const buttonsPanel = [
  {
    title: 'Schools',
    type: 'school',
    types: ['school', 'primary_school', 'secondary_school', 'university'],
    keywords: 'school',
    ComponentIcon: SchoolIcon,
    ComponentIconActive: appIcons.schoolIconActive,
    bgc: Colors.emperor,
    status: false,
  },
  {
    title: 'Dining',
    type: 'restaurant',
    types: ['restaurant', 'food', 'meal_takeaway', 'cafe'],
    keywords: 'restaurant',
    ComponentIcon: DiningIcon,
    ComponentIconActive: appIcons.diningIconActive,
    bgc: Colors.burningOrange,
    status: false,
  },
  {
    title: 'Nightlife',
    type: 'nightClub',
    types: ['night_club', 'bar'],
    keywords: 'night club',
    ComponentIcon: NightLifeIcon,
    ComponentIconActive: appIcons.nightlifeIconActive,
    bgc: Colors.melrose,
    status: false,
  },
  {
    title: 'Grocery',
    type: 'grocery',
    types: [
      'supermarket',
      'grocery',
      'liquor_store',
      'shopping_mall',
      'bakery',
      'grocery_or_supermarket',
      'food',
    ],
    keywords: 'grocery',
    ComponentIcon: GroceryIcon,
    ComponentIconActive: appIcons.groceryIconActive,
    bgc: Colors.grenly,
    status: false,
  },
  {
    title: 'Medical',
    type: 'pharmacy',
    types: [
      'pharmacy',
      'hospital',
      'veterinary_care',
      'drugstore',
      'doctor',
      'dentist',
    ],
    keywords: 'pharmacy',
    ComponentIcon: HealthCareIcon,
    ComponentIconActive: appIcons.healthcareIconActive,
    bgc: Colors.terracotta,
    status: false,
  },
  {
    title: 'Fitness',
    type: 'gym',
    types: ['gym'],
    keywords: 'gym',
    ComponentIcon: GymIcon,
    ComponentIconActive: appIcons.gymIconActive,
    bgc: Colors.cornFlowerBlue,
    status: false,
  },
  {
    title: 'Fun',
    type: 'entertain',
    types: [
      'museum',
      'casino',
      'zoo',
      'movie_theater',
      'aquarium',
      'art_gallery',
    ],
    keywords: 'entertain',
    ComponentIcon: EntertainIcon,
    ComponentIconActive: appIcons.entertainIconActive,
    bgc: Colors.dodgerBlue,
    status: false,
  },
];

const iconsTypesInside: { [key: string]: string } = {
  school: schoolInsideIcon,
  restaurant: diningInsideIcon,
  nightClub: nightlifeInsideIcon,
  grocery: groceryInsideIcon,
  pharmacy: healthcareInsideIcon,
  entertain: entertainInsideIcon,
  gym: gymInsideIcon,
};

const markers: { setMap: (arg0: null) => void }[] = [];

let multiMarkers: {
  [key: string]: any;
} = {
  school: {
    markers: [],
    status: false,
  },
  restaurant: {
    markers: [],
    status: false,
  },
  nightClub: {
    markers: [],
    status: false,
  },
  grocery: {
    markers: [],
    status: false,
  },
  pharmacy: {
    markers: [],
    status: false,
  },
  entertain: {
    markers: [],
    status: false,
  },
  gym: {
    markers: [],
    status: false,
  },
};

const TRANSITION_TIMING = 1;

const MapContainer = ({
  propertyType,
  coordinates,
}: {
  coordinates: { lat: number; lng: number };
  propertyType: PropertyType;
}) => {
  const mapLoaded = useSelector(mapLoadedSelector);
  const map = useRef<google.maps.Map>();
  const MarkerClassRef = useRef<ReturnType<typeof createClusterMarkerClass>>();
  const $map = useRef(null);
  const [
    service,
    setService,
  ] = useState<google.maps.places.PlacesService | null>(null);
  const [buttonsPanelService, setButtonPanelService] = useState(buttonsPanel);
  const [isLoad, setLoad] = useState(false);

  const drawMarkers = useCallback(() => {
    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position: coordinates,
      icon: {
        url: getPropertyTypeIcon(propertyType),
      },
      map: map.current,
    });
  }, [coordinates, propertyType]);

  const handleGetDetailsService = useCallback(
    (placeId: string, marker: any) => {
      service!.getDetails(
        {
          placeId,
        },
        (placeResult: any, statusCallback: string) => {
          if (statusCallback === google.maps.places.PlacesServiceStatus.OK) {
            const content = ReactDOMServer.renderToString(
              <>
                <Styled.Title href={placeResult.url} target="_blank">
                  {placeResult.name}
                </Styled.Title>
                <Styled.Subtitle>{placeResult.vicinity}</Styled.Subtitle>
                <Styled.About>
                  <Styled.Long>
                    {reformatMiles(
                      getDistance(
                        coordinates,
                        placeResult.geometry.location
                      ).miles.toFixed(1)
                    )}{' '}
                    Miles
                  </Styled.Long>
                  <Styled.Rate>
                    {placeResult.rating}{' '}
                    {placeResult.rating ? <Styled.Star /> : null}
                    {placeResult.user_ratings_total
                      ? `(${placeResult.user_ratings_total})`
                      : null}
                    {placeResult.price_level ? ' · ' : ''}
                    {new Array(placeResult.price_level || 0)
                      .fill(1)
                      .map((_, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Styled.Dollar key={index}>$</Styled.Dollar>
                      ))}
                  </Styled.Rate>
                </Styled.About>
              </>
            );

            marker.onAddAfterClick(content);
          }
        }
      );
    },
    [coordinates, service]
  );

  const createMarker = useCallback(
    (place, type: string, placeId: string) => {
      const marker = new MarkerClassRef.current!(
        place.geometry.location,
        '5',
        {
          src: iconsTypesInside[type],
          size: 20,
        },
        `${place.geometry.location.lat()}${place.geometry.location.lng()}`
      );
      marker.setMap(map.current!);

      marker.addListener('click', () => {
        map.current?.setCenter(place.geometry.location);
        marker.getElement()!.classList.add('map-marker-animate-in');
        handleGetDetailsService(placeId, marker);
      });

      markers.push(marker);
    },
    [handleGetDetailsService]
  );

  const changeStatusButtonPanel = useCallback(
    (title: string) => {
      const newButtonsService = buttonsPanelService.map(btn => {
        if (btn.title === title) {
          return { ...btn, status: !btn.status };
        }
        return { ...btn, status: btn.status };
      });
      setButtonPanelService(newButtonsService);
    },
    [buttonsPanelService]
  );

  const callback = useCallback(
    (results, status: string, type: string) => {
      markers.forEach(marker => marker.setMap(null));
      if (results) {
        multiMarkers[type].markers = results;
      }
      multiMarkers[type].status = !multiMarkers[type].status;
      setLoad(false);
      if (
        status === google.maps.places.PlacesServiceStatus.OK ||
        status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
      ) {
        Object.keys(multiMarkers).forEach(keyMarkerType => {
          multiMarkers[keyMarkerType].markers.forEach(
            (result: { place_id: string }) => {
              if (multiMarkers[keyMarkerType].status) {
                createMarker(result, keyMarkerType, result.place_id);
              }
            }
          );
        });
      }
    },
    [createMarker]
  );

  const serviceNearBy = useCallback(
    (type: string, title: string, keywords: string, types: string[]) => {
      setLoad(true);
      changeStatusButtonPanel(title);
      if (multiMarkers[type].markers.length > 0) {
        callback(null, 'OK', type);
      } else {
        service!.nearbySearch(
          {
            location: coordinates,
            keyword: keywords,
            rankBy: google.maps.places.RankBy.DISTANCE,
            types,
          },
          (results, status: string) => {
            callback(results, status, type);
          }
        );
      }
    },
    [callback, changeStatusButtonPanel, coordinates, service]
  );

  const initMapHandle = useCallback(() => {
    map.current = new google.maps.Map($map.current!, {
      center: coordinates,
      zoom: 16,
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
    setService(
      new google.maps.places.PlacesService(
        map.current as HTMLDivElement | google.maps.Map<Element>
      )
    );
  }, [coordinates]);

  useEffect(() => {
    if ($map.current && mapLoaded) {
      if (!map.current) {
        initMapHandle();
        drawMarkers();
        MarkerClassRef.current = createClusterMarkerClass();
      }
    }
  }, [map, $map, initMapHandle, drawMarkers, mapLoaded]);

  useEffect(() => {
    return () => {
      multiMarkers = {
        school: {
          markers: [],
          status: false,
        },
        restaurant: {
          markers: [],
          status: false,
        },
        nightClub: {
          markers: [],
          status: false,
        },
        grocery: {
          markers: [],
          status: false,
        },
        pharmacy: {
          markers: [],
          status: false,
        },
        entertain: {
          markers: [],
          status: false,
        },
        gym: {
          markers: [],
          status: false,
        },
      };
    };
  }, []);

  return (
    <Map
      TRANSITION_TIMING={TRANSITION_TIMING}
      isLoad={isLoad}
      buttonsPanel={buttonsPanelService}
      $map={$map}
      onServiceNearBy={serviceNearBy}
    />
  );
};

export default memo(MapContainer);
