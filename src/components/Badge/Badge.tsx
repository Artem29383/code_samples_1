import React from 'react';
import { LayoutProps, MarginProps } from 'styled-system';

import Text from 'components/Text';
import {
  PoolIcon,
  GuestHouseIcon,
  HouseIcon,
  LotIcon,
  TownhomeIcon,
  CondoIcon,
  LoftIcon,
  HOAIcon,
  GolfIcon,
  GuardIcon,
  GateIcon,
  BottleNippleIcon,
} from 'styles/icons';

import * as Styled from './Badge.styled';

const icons = {
  house: {
    icon: HouseIcon,
    size: { width: 28, height: 30 },
  },
  lot: {
    icon: LotIcon,
    size: { width: 51, height: 17 },
  },
  townhome: {
    icon: TownhomeIcon,
    size: { width: 38, height: 35 },
  },
  condo: {
    icon: CondoIcon,
    size: { width: 22, height: 30 },
  },
  pool: {
    icon: PoolIcon,
    size: { width: 42, height: 30 },
  },
  communityPool: {
    icon: PoolIcon,
    size: { width: 42, height: 30 },
  },
  guestHouse: {
    icon: GuestHouseIcon,
    size: { width: 32, height: 38 },
  },
  loft: {
    icon: LoftIcon,
    size: { width: 22, height: 36 },
  },
  hoa: {
    icon: HOAIcon,
    size: { width: 28, height: 32 },
  },
  golf: {
    icon: GolfIcon,
    size: { width: 25, height: 32 },
  },
  guard: {
    icon: GuardIcon,
    size: { width: 24, height: 32 },
  },
  gate: {
    icon: GateIcon,
    size: { width: 29, height: 29 },
  },
  bottleNipple: {
    icon: BottleNippleIcon,
    size: { width: 29, height: 28 },
  },
};

type Props = {
  id: keyof typeof icons;
  disabled?: boolean;
  title?: string;
  onClick?: () => void;
} & LayoutProps &
  MarginProps;

const Badge = ({ id, title, disabled = false, onClick, ...rest }: Props) => {
  const Icon = icons[id].icon;

  return (
    <Styled.Root mr={32} {...rest} onClick={onClick}>
      <Styled.Circle
        stoke={disabled ? '#acafb5' : 'white'}
        disabled={disabled}
        {...rest}
      >
        <Icon
          color={disabled ? 'bombay' : 'white'}
          stroke={disabled ? 'bombay' : 'white'}
          width={icons[id].size.width}
          height={icons[id].size.height}
        />
      </Styled.Circle>
      {title && (
        <Text
          fontType="liberGrotesqueBold"
          fontSize={12}
          // color={'disabled ? 'bombay' : 'mineShaft''}
          color="mineShaft"
          align="center"
        >
          {title}
        </Text>
      )}
    </Styled.Root>
  );
};

export default Badge;
