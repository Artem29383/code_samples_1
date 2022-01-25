import React from 'react';
import { rgba } from 'polished';

import { Colors } from '@types';

import Layout from 'components/Layout';
import Navigator from 'components/Navigator';

import useWindowResize from 'hooks/useWindowResize';

import * as Styled from './UserPageLayout.styled';
import Text from 'components/Text';
import { BackArrowIcon } from 'styles/icons';

const bottomContentMargin = 116;
const contentPseudoBottomMargin = 33;
const contentPseudoLeftMargin = 59;

type Props = {
  children: React.ReactNode;
  onSignOut: () => void;
  onGoBack: () => void;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  routesName: string;
  routesIcon: string;
  location: string;
};

const UserPageLayout = ({
  onSignOut,
  onGoBack,
  children,
  firstName,
  lastName,
  avatarUrl,
  routesName,
  routesIcon: Icon,
  location,
}: Props) => {
  const { width: windowWidth } = useWindowResize();
  return (
    <Layout>
      <Styled.Root>
        {windowWidth < 1025 && location !== '/dashboard' && (
          <Styled.Controls>
            <BackArrowIcon onClick={onGoBack} />
            <Styled.IconWrap>
              <Icon />
            </Styled.IconWrap>
            <Text
              fontSize={14}
              lineHeight={1}
              fontType="liberGrotesqueRegular"
              color="white"
            >
              {routesName}
            </Text>
          </Styled.Controls>
        )}
        {windowWidth > 1024 && (
          <Navigator
            colorLinks={
              windowWidth > 1024 ? Colors.white : Colors.cornFlowerBlue
            }
            colorIcons={
              windowWidth > 1024 ? Colors.white : Colors.cornFlowerBlue
            }
            activeClassName="activeRoute"
            onSignOut={onSignOut}
            firstName={firstName}
            windowWidth={windowWidth}
            lastName={lastName}
            avatarUrl={avatarUrl}
          />
        )}
        {location !== '/dashboard' && (
          <Styled.Head>
            <Styled.Avatar>
              <Styled.Image src={avatarUrl} />
            </Styled.Avatar>
            <Text
              fontType="bwGradualExtraBold"
              fontSize={20}
              align="center"
              color="white"
              mb={50}
            >
              {`${firstName} ${lastName}`}
            </Text>
          </Styled.Head>
        )}
        <Styled.Content
          isDashboard={location === '/dashboard'}
          height={92}
          color={Colors.white}
          zIndex={3}
          bottom={windowWidth < 1025 ? 0 : bottomContentMargin}
          right={0}
        >
          {children}
        </Styled.Content>
        <Styled.Content
          height={95}
          hide={windowWidth < 1025}
          color={Colors.moonRaker}
          zIndex={2}
          bottom={
            windowWidth < 1025
              ? 0
              : bottomContentMargin - contentPseudoBottomMargin
          }
          right={-contentPseudoLeftMargin}
        />
        <Styled.Content
          height={98}
          hide={windowWidth < 1025}
          color={rgba(Colors.white, 0.4)}
          zIndex={1}
          bottom={
            windowWidth < 1025
              ? 0
              : bottomContentMargin - 2 * contentPseudoBottomMargin
          }
          right={-2 * contentPseudoLeftMargin}
        />
      </Styled.Root>
    </Layout>
  );
};

export default UserPageLayout;
