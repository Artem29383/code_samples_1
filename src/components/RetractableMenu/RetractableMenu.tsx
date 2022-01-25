import React, { memo } from 'react';

import useToggle from 'hooks/useToggle';

import Triangle from 'components/Triangle';

import * as Styled from './RetractableMenu.styled';

type Props = {
  label: string;
  children: React.ReactNode;
};

const RetractableMenu = ({ children, label }: Props) => {
  const [showBody, setShowBody] = useToggle(false);

  return (
    <Styled.Root>
      <Styled.Header onClick={setShowBody}>
        <Styled.Label>{label}</Styled.Label>
        <Triangle showBody={showBody} />
      </Styled.Header>
      {showBody && <Styled.Body>{children}</Styled.Body>}
    </Styled.Root>
  );
};

export default memo(RetractableMenu);
