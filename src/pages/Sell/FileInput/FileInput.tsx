import React, { useCallback, useEffect, useRef, useState } from 'react';

import * as Styled from './FileInput.styled';

type Props = {
  onChange: (e: any, fileList: Array<string> | null) => void;
};

const FileInput = ({ onChange }: Props) => {
  const $node = useRef<HTMLDivElement | null>(null);
  const [isOver, setOver] = useState(false);

  const handleOver = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (!isOver) {
        setOver(true);
      }
    },
    [isOver]
  );

  const handleLeave = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (isOver) {
        setOver(false);
      }
    },
    [isOver]
  );

  const handleDrop = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      const dt = e.dataTransfer;
      setOver(false);
      onChange(e, dt.files);
    },
    [onChange]
  );

  useEffect(() => {
    if ($node.current) {
      $node.current.addEventListener('dragover', handleOver);
      $node.current.addEventListener('drop', handleDrop);
      ['dragleave', 'dragend'].forEach(type => {
        $node.current!.addEventListener(type, handleLeave);
      });
    }
  }, [handleDrop, $node, handleOver, handleLeave]);

  return (
    <Styled.Wrapper ref={$node} isOver={isOver}>
      <Styled.Input
        type="file"
        multiple
        onChange={onChange}
        title=""
        accept=".png, .jpeg, .jpg"
        style={{ cursor: 'pointer!important' }}
      />
    </Styled.Wrapper>
  );
};

export default FileInput;
