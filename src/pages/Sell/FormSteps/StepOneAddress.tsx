import React, { memo, useCallback, useState } from 'react';

import { PropsComponentSell } from 'pages/Sell/types';

import { authorizedSelector } from 'models/user/selectors';
import { useSelector } from 'hooks/useSelector';
import { requestSelector } from 'models/steps/selectors';
import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/steps';

import InputAutocomplete from 'components/InputAutocomplete';
import useToggle from 'hooks/useToggle';
import MapModal from 'components/Modal/MapModal';
import MapContainer from 'pages/Sell/Map';
import Button from 'components/Button';
import Switcher from 'pages/Sell/Switcher';

import * as S from './Steps.styled';

const StepOneAddress = ({
  setLoad,
  load,
  step,
  setStep,
  address,
}: PropsComponentSell) => {
  const user = useSelector(authorizedSelector);
  const requestId = useSelector(requestSelector);
  const createForm = useActionWithPayload(actions.createForm);
  const updateForm = useActionWithPayload(actions.updateForm);
  const setAddress = useActionWithPayload(actions.setCreateForm);
  const [active, toggle] = useToggle(false);
  const [zoom, setZoom] = useState(14);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleNext = () => {
    if (user) {
      setLoad(true);
      if (!requestId) {
        createForm({
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          },
          step: 3,
        });
      } else {
        updateForm({
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          },
          step: 3,
        });
      }
    }
    if (!user) {
      setStep(2);
    }
  };

  const handleAccept = () => {
    toggle();
    handleNext();
  };

  const handleClose = () => {
    setLocation(null);
    setAddress({
      address: '',
    });
    toggle();
  };

  const handleChangeLocation = useCallback(
    loc => {
      setLocation({ lat: loc.lat, lng: loc.lng });
      setAddress({
        address: loc.address,
      });
      toggle();
    },
    [setAddress, toggle]
  );

  const handleChangeZoomAdd = () => {
    if (zoom < 18) {
      setZoom(zoom + 1);
    }
  };

  const handleChangeZoomSub = () => {
    if (zoom > 13) {
      setZoom(zoom - 1);
    }
  };

  return (
    <>
      <S.Root>
        <S.Title
          margin={{
            t: '0 auto 25px auto',
            m: '0 auto 139px auto',
          }}
          maxWidth={430}
        >
          Alright, what’s your address?
        </S.Title>
        <S.ContentCentered display="block" mb={{ m: 200, d: 0 }}>
          <InputAutocomplete
            maxWidth={917}
            value={address || ''}
            callback={handleChangeLocation}
          />
        </S.ContentCentered>
        <MapModal isOpen={active}>
          <MapContainer
            zoom={zoom}
            coordinates={location}
            address={address || ''}
          />
          <S.Controls>
            <S.Zooms>
              <S.Plus onClick={handleChangeZoomAdd} />
              <S.Minus onClick={handleChangeZoomSub} />
            </S.Zooms>
            <S.Buttons>
              <S.TextButton onClick={handleClose}>
                <S.PGrad>Not quite, try again</S.PGrad>
              </S.TextButton>
              <Button width={185} height={60} onClick={handleAccept}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Yes that's it
              </Button>
            </S.Buttons>
          </S.Controls>
        </MapModal>
      </S.Root>
      <Switcher
        load={load}
        notValid={!address?.trim() || false}
        step={step}
        onClickNext={handleNext}
      />
    </>
  );
};

export default memo(StepOneAddress);
