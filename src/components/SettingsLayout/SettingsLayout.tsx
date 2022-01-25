import React from 'react';

import UserPageLayout from 'components/UserPageLayout';
import Text from 'components/Text';
import SettingsEdit from 'components/SettingsEdit';

import * as Styled from './SettingsLayout.styled';
import useWindowResize from 'hooks/useWindowResize';

type Props = {
  children: React.ReactNode;
};

const SettingsLayout = ({ children }: Props) => {
  const { width: windowWidth } = useWindowResize();

  return (
    <UserPageLayout>
      <Styled.Root>
        {windowWidth > 1024 && (
          <Styled.LeftPart>
            <Text
              as="h1"
              fontType="bwGradualBold"
              fontSize={38}
              color="malibu"
              mb={50}
            >
              Settings
            </Text>
            <SettingsEdit />
          </Styled.LeftPart>
        )}
        <Styled.Content>{children}</Styled.Content>
      </Styled.Root>
    </UserPageLayout>
  );
};

export default SettingsLayout;
