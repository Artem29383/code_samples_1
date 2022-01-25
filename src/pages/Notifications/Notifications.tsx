import React, { memo } from 'react';

import CheckBox from 'components/CheckBox';
import Line from 'pages/Notifications/Line';
import Text from 'components/Text';

import * as Styled from './Notifications.styled';

type Props = {
  email: string;
  phone: string;
  isSold: boolean;
  isReduced: boolean;
  onChangeSold: () => void;
  onChangeReduce: () => void;
};

const Notifications = ({
  email,
  phone,
  isSold,
  isReduced,
  onChangeSold,
  onChangeReduce,
}: Props) => (
  <Styled.Root>
    <Styled.Contact>
      <Text
        fontSize={12}
        lineHeight="12px"
        fontType="liberGrotesqueExtraBold"
        color="bombay"
        mb="35px"
      >
        CONTACT INFO
      </Text>
      <Line label="Primary Email">
        <Styled.Text>
          <Text fontSize={16} lineHeight="16px" fontType="liberGrotesqueBold">
            {email}
          </Text>
        </Styled.Text>
      </Line>
      <Line label="Cell Number">
        <Styled.Text>
          <Text fontSize={16} lineHeight="16px" fontType="liberGrotesqueBold">
            {phone}
          </Text>
        </Styled.Text>
      </Line>
    </Styled.Contact>
    <Styled.Notification>
      <Text
        fontSize={12}
        lineHeight="12px"
        fontType="liberGrotesqueExtraBold"
        color="bombay"
        mb="35px"
      >
        PHONE
      </Text>
      <Line label="A Favorited Home is Sold">
        <CheckBox isActive={isSold} onChange={onChangeSold} />
      </Line>
      <Line label="A Favorited Home’s Price is Reduced">
        <CheckBox isActive={isReduced} onChange={onChangeReduce} />
      </Line>
    </Styled.Notification>
  </Styled.Root>
);

export default memo(Notifications);
