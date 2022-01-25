import React, { useCallback, useEffect, useState } from 'react';

import { actions } from 'models/steps';
import { useActionWithPayload } from 'hooks/useAction';

import Switcher from 'pages/Sell/Switcher';
import { PropsComponentSell } from 'pages/Sell/types';
import FileInput from 'pages/Sell/FileInput';

import { useFileWork } from 'hooks/useFileWork';
import useDebounce from 'hooks/useDebounce';

import { handleImageError } from 'utils/imageError';

import { icons } from 'styles/icons';

import * as S from 'pages/Sell/FormSteps/Steps.styled';
import { actions as actionsPush } from 'models/pushes';
import uniqueId from 'lodash/uniqueId';

const TrashIcon = icons.trash;

const MAX_UPLOAD_PHOTO = 20;

const StepEight = ({
  step,
  setStep,
  photos = [],
  token,
}: PropsComponentSell) => {
  const addPush = useActionWithPayload(actionsPush.addPush);
  const {
    changeHandle,
    objectFile,
    objectFiles,
    resetObjectFiles,
  } = useFileWork('image', addPush);
  const debounceFiles = useDebounce(objectFiles, 500);
  const requestFormData = useActionWithPayload(actions.requestFormData);
  const removePhoto = useActionWithPayload(actions.requestFormData);
  const [previews, setPreviews] = useState<
    ({ id: number; image_url: string } | File)[]
  >(photos);

  useEffect(() => {
    setPreviews(photos);
  }, [photos]);

  const handlePrev = useCallback(() => {
    setStep(step - 1);
  }, [setStep, step]);

  const handleNext = useCallback(() => {
    setStep(step + 1);
  }, [setStep, step]);

  const uploadPhotos = useCallback(
    fileList => {
      const formData = new FormData();
      const files = fileList.filter((file: { name: string }) => file.name);

      if (token) {
        formData.append('unregistered_user_identy_token', token);
      }
      if (files.length > 0) {
        files.forEach((file: string | Blob | File) => {
          // @ts-ignore
          formData.append('property_form_photos[][image]', file, file.name);
        });
      }
      return formData;
    },
    [token]
  );

  const getPreview = useCallback(fileList => {
    return fileList.map((file: { name: string; image_url: string }) => {
      let url = null;
      if (file.name) {
        url = URL.createObjectURL(file);
        return { id: null, image_url: url };
      }

      if (file.image_url) {
        url = file.image_url;
      }
      return file;
    });
  }, []);

  const handleFileRemove = useCallback(
    file => {
      const formData = new FormData();
      if (token) {
        formData.append('unregistered_user_identy_token', token);
      }
      formData.append('property_form_photos[][id]', file.id);
      formData.append('property_form_photos[][image]', '_destroy');
      // @ts-ignore
      setPreviews(previews?.filter(img => img.id !== file.id));
      removePhoto(formData);
    },
    [previews, removePhoto, token]
  );

  useEffect(() => {
    const arrayFilesNames = Object.values(photos).reduce(
      (acc: string[], obj) => {
        const stringSplit = obj.image_url.split('/');
        return [...acc, stringSplit[stringSplit.length - 1]];
      },
      []
    );
    const filteredObjectFiles = objectFiles.filter(
      obj => !arrayFilesNames.includes(obj.name.replace(' ', '_'))
    );

    if (
      debounceFiles &&
      objectFiles.length > 0 &&
      !arrayFilesNames.includes(objectFile?.name.replace(' ', '_'))
    ) {
      setPreviews([
        ...photos,
        ...filteredObjectFiles.slice(0, MAX_UPLOAD_PHOTO - photos.length),
      ]);
      requestFormData(
        uploadPhotos(
          filteredObjectFiles.slice(0, MAX_UPLOAD_PHOTO - photos.length)
        )
      );
      resetObjectFiles();
    } else if (objectFiles.length > 0) {
      resetObjectFiles();
      addPush({
        id: uniqueId('info'),
        type: 'error',
        title: 'Fail',
        message: `Already uploaded`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceFiles, requestFormData, resetObjectFiles, uploadPhotos]);

  return (
    <>
      <S.RootDynamic
        padding={{ m: '68px 9px 23px 9px', d: '78px 32px 78px 32px' }}
      >
        <S.Title
          margin={{
            t: '0 auto 25px auto',
            m: '0 auto 10px auto',
          }}
          maxWidth={{ t: 1112, m: 314 }}
        >
          Let’s see how your home looks like!
        </S.Title>
        <S.SubText
          m={{ d: '0 auto 30px auto', m: '0 auto 27px auto' }}
          maxWidth={{ t: 703, m: 291 }}
        >
          The best pictures to submit are of kitchen, backyard, bathrooms and
          any unique features. You can add or edit these later at any time.
          However we need at least 9 now.
        </S.SubText>
        <S.DropZone>
          <FileInput onChange={changeHandle} />
          <S.Counter>
            <S.Count>
              {previews?.length}/{MAX_UPLOAD_PHOTO}
            </S.Count>
          </S.Counter>
          {previews.length === 0 ? (
            <S.Drop>
              <S.ExtraPlus />
              <S.DropTitle>
                Drag and drop photos here. Or just click to upload.
              </S.DropTitle>
            </S.Drop>
          ) : (
            <S.PhotosGrid>
              {previews.length < MAX_UPLOAD_PHOTO && (
                <S.ItemAdd>
                  <FileInput onChange={changeHandle} />
                  <S.ExtraPlus />
                </S.ItemAdd>
              )}
              {getPreview(previews).map(
                (image: { image_url: string }, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <S.ImageWrapper key={index}>
                    <S.Image onError={handleImageError} src={image.image_url} />
                    <TrashIcon
                      // @ts-ignore
                      onClick={() => handleFileRemove(image)}
                      position="absolute"
                      bottom="10px"
                      left="50%"
                    />
                  </S.ImageWrapper>
                )
              )}
            </S.PhotosGrid>
          )}
        </S.DropZone>
        <S.Description>
          Photos may be a maximum of 2.5MB in file size. Recommended photos are
          horizontal, shot in natural daylight or with professional equipment.
          Renders and floorplans also welcome. Recommended upload size is
          1024×768px.
        </S.Description>
      </S.RootDynamic>
      <Switcher
        notValid={false}
        step={step}
        onClickNext={handleNext}
        onClickPrev={handlePrev}
      />
    </>
  );
};

export default StepEight;
