import React, { useEffect, useRef, useState, useCallback } from 'react';

import { Event } from '@types';
import { CommonProps } from './types';
import { Address } from 'models/addresses/types';
import { AddUserAddressPayload } from 'models/user/types';

import { usaBoundings } from 'data/coordinates';

import { listSelector } from 'models/addresses/selectors';
import { defaultDistanceFrom } from 'models/properties';

import Text from 'components/Text';
import Cross from 'components/Cross';

import Emitter from 'utils/eventEmitter';

import * as Styled from './Addresses.styled';

type Props = {
  mapLoaded: boolean;
  list: ReturnType<typeof listSelector>;
  onAdd: (payload: AddUserAddressPayload) => void;
  onToggleActive: (paylooad: number) => void;
  onDelete: (payload: number) => void;
} & CommonProps;

const Addresses = ({
  mapLoaded,
  list,
  onToggleActive,
  onDelete,
  onAdd,
  maxAddresses = 3,
  setActive = true,
  addTitle = 'Add more',
  ...rest
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<{
    title: string;
    location: [number, number];
  } | null>(null);

  useEffect(() => {
    if (mapLoaded) {
      const searchBox = new google.maps.places.SearchBox(inputRef.current!, {
        bounds: new google.maps.LatLngBounds(
          { lat: usaBoundings.sw[0], lng: usaBoundings.sw[1] },
          { lat: usaBoundings.ne[0], lng: usaBoundings.ne[1] }
        ),
      });

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length > 0) {
          const { location } = places[0].geometry!;

          setAddress({
            title: places[0].formatted_address || 'Address',
            location: [location.lat(), location.lng()],
          });

          Emitter.emit(Event.centerMap, [location.lat(), location.lng()]);
          Emitter.emit(Event.drawDistanceFrom, [
            location.lat(),
            location.lng(),
          ]);
        }
      });
    }
  }, [mapLoaded]);

  const handleAddAddress = useCallback(() => {
    if (address !== null) {
      onAdd({
        title: address.title,
        location: address.location,
        active: true,
      });

      inputRef.current!.value = '';
      setAddress(null);
    }
  }, [onAdd, address]);

  const handleToggleActive = useCallback(
    (item: Address) => {
      onToggleActive(item.id);

      if (!item.active) {
        Emitter.emit(Event.centerMap, item.location);
        Emitter.emit(Event.drawDistanceFrom, item.location);
      } else {
        Emitter.emit(Event.centerMap, defaultDistanceFrom);
        Emitter.emit(Event.drawDistanceFrom, defaultDistanceFrom);
      }
    },
    [onToggleActive]
  );

  const handleDeleteAddress = useCallback(
    (item: Address) => {
      if (item.active) {
        Emitter.emit(Event.centerMap, defaultDistanceFrom);
        Emitter.emit(Event.drawDistanceFrom, defaultDistanceFrom);
      }

      onDelete(item.id);
    },
    [onDelete]
  );

  return (
    <Styled.Root {...rest}>
      <Styled.Header>
        <Styled.Input ref={inputRef} disabled={list.length === maxAddresses} />
        {list.length < maxAddresses && (
          <React.Fragment>
            <Styled.AddButton
              disabled={address === null}
              onClick={handleAddAddress}
            />
            <Text
              fontType="liberGrotesqueExtraBold"
              fontSize={12}
              flexShrink={0}
              textDecoration="underline"
              color="argent"
              cursor="pointer"
              onClick={handleAddAddress}
            >
              {addTitle}
            </Text>
          </React.Fragment>
        )}
      </Styled.Header>
      <div>
        {list.length > 0 &&
          list.map(item => (
            <Styled.Address key={item.title}>
              <Styled.Title>{item.title}</Styled.Title>
              {setActive && (
                <Styled.ActiveButton
                  onClick={() => handleToggleActive(item)}
                  active={item.active}
                >
                  Active
                </Styled.ActiveButton>
              )}
              <Styled.DeleteButton onClick={() => handleDeleteAddress(item)}>
                <Cross color="malibu" thickness={2} size={8} />
              </Styled.DeleteButton>
            </Styled.Address>
          ))}
      </div>
    </Styled.Root>
  );
};

export default Addresses;
