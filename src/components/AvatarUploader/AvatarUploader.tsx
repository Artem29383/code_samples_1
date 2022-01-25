import React, { memo, useCallback, useEffect } from 'react';

import { useFileWork } from 'hooks/useFileWork';

import FileInput from 'components/FileInput';
import Cross from 'components/Cross';

import * as Styled from './AvatarUploader.styled';

import { CameraIcon } from 'styles/icons';
import { useActionWithPayload } from 'hooks/useAction';
import { actions as actionsPush } from 'models/pushes';

type Props = {
  avatar: string | null;
  onRemove: () => void;
  onUpload: (p: { image: string | File }) => void;
  type?: string;
};

const AvatarUploader = ({
  avatar,
  onRemove,
  onUpload,
  type = 'standard',
}: Props) => {
  const addPush = useActionWithPayload(actionsPush.addPush);
  const { objectFile, changeHandle, setObjectFile } = useFileWork(
    'image',
    addPush
  );

  const removeAvatar = useCallback(() => {
    onRemove();
  }, [onRemove]);

  useEffect(() => {
    if (objectFile) {
      onUpload({ image: objectFile });
    }
  }, [objectFile, onUpload]);

  useEffect(() => {
    if (objectFile) {
      setObjectFile(null);
    }
  }, [setObjectFile, objectFile]);

  return type === 'standard' ? (
    <Styled.ImageSide>
      <Styled.Container>
        {avatar && (
          <Styled.Cross>
            <Cross onClick={removeAvatar} color="#6A8DFF" />
          </Styled.Cross>
        )}
        <Styled.ImageWrap isPhoto={avatar}>
          {avatar ? (
            <Styled.Image src={avatar} />
          ) : (
            <>
              <Styled.UploadPreview>
                <Styled.AvatarButton>
                  <CameraIcon />
                </Styled.AvatarButton>
              </Styled.UploadPreview>
              <FileInput onChange={changeHandle} />
            </>
          )}
        </Styled.ImageWrap>
      </Styled.Container>
    </Styled.ImageSide>
  ) : (
    <Styled.ImageSideMobile>
      {avatar && (
        <Styled.CrossMobile>
          <Cross onClick={removeAvatar} />
        </Styled.CrossMobile>
      )}
      <Styled.ImageWrapMobile isPhoto={avatar}>
        {avatar ? (
          <Styled.ImageMobile src={avatar} />
        ) : (
          <>
            <Styled.UploadPreviewMobile>
              <Styled.PlusMobile>
                <Cross color="white" onClick={removeAvatar} />
              </Styled.PlusMobile>
              <Styled.TextMobile>Change Photo</Styled.TextMobile>
            </Styled.UploadPreviewMobile>
            <FileInput onChange={changeHandle} />
          </>
        )}
      </Styled.ImageWrapMobile>
    </Styled.ImageSideMobile>
  );
};

export default memo(AvatarUploader);
