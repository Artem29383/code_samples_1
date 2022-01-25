import React from 'react';

import * as Styled from './FileInput.styled';

type Props = {
  onChange: (e: any, fileList: Array<string> | null) => void;
};

const FileInput = ({ onChange }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.Input
        type="file"
        onChange={onChange}
        title=""
        style={{ cursor: 'pointer!important' }}
      />
    </Styled.Wrapper>
  );
};

export default FileInput;
