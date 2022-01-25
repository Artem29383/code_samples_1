import React from 'react';

import Logo from 'components/Logo';

import * as Styled from './AuthLayout.styled';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <Styled.Root>
      <Logo
        $white
        position="absolute"
        left={{ m: 15, t: 40 }}
        top={{ m: 15, t: 33 }}
        width={{ m: 200, t: 282 }}
        height="auto"
      />
      <Styled.Content>{children}</Styled.Content>
    </Styled.Root>
  );
};

export default AuthLayout;
