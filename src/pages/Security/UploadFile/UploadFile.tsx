import React, { memo, useEffect } from 'react';

import { useActionWithPayload } from 'hooks/useAction';
import { actions as actionsPush } from 'models/pushes';

import Cross from 'components/Cross';
import FileInput from 'components/FileInput';

import { useFileWork } from 'hooks/useFileWork';

import * as Styled from './UploadFile.styled';

type Props = {
  fileName: string | null;
  url: string;
  onRemove: () => void;
  onUpload: (e: any, fileList?: Array<string> | null) => void;
  type: string;
};

const UploadFile = ({ onUpload, fileName, onRemove, type, url }: Props) => {
  const addPush = useActionWithPayload(actionsPush.addPush);
  const { changeHandle, objectFile } = useFileWork(type, addPush);

  useEffect(() => {
    if (objectFile) {
      onUpload(objectFile);
    }
  }, [objectFile, onUpload]);

  return (
    <Styled.File>
      {!fileName ? (
        <Styled.Text>UploadFile</Styled.Text>
      ) : (
        <Styled.Text>
          <a href={url} download target="_blank" rel="noopener noreferrer">
            {fileName}
          </a>
        </Styled.Text>
      )}
      {fileName && (
        <Styled.Cross>
          <Cross onClick={onRemove} color="#fff" />
        </Styled.Cross>
      )}
      {!fileName && <FileInput onChange={changeHandle} />}
    </Styled.File>
  );
};

export default memo(UploadFile);
