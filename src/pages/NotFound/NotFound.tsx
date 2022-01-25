import React from 'react';

import { Routes } from '@types';

import { NoResultsIcon } from 'styles/icons';
import Text from 'components/Text';
import AppLink from 'components/AppLink';

import * as S from './NotFound.styled';

const NotFound = () => (
  <S.Root>
    <S.NoResult>
      <NoResultsIcon width={{ m: 200, t: 300 }} height="auto" mb={40} />
      <Text
        as="h3"
        fontType="bwGradualBold"
        color="mineShaft"
        fontSize={26}
        mb={10}
      >
        404
      </Text>
      <Text
        as="div"
        fontType="liberGrotesqueBold"
        color="dovGray"
        fontSize={20}
        mb={20}
      >
        Page not found.
      </Text>
      &nbsp;
      <Text
        as="span"
        fontType="liberGrotesqueBlack"
        color="cornFlowerBlue"
        fontSize={16}
        cursor="pointer"
        textDecoration="underline"
      >
        <AppLink to={Routes.properties}>Move to properties listing.</AppLink>
      </Text>
    </S.NoResult>
  </S.Root>
);

export default NotFound;
