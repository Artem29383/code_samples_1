import React, { memo } from 'react';
import { StyledComponent } from 'styled-components';

import { Perks as PerksType, perksTitles } from 'models/properties/types';
import { ViewportShorthands } from 'styles/media';

import { getPropertyItem } from 'models/properties/selectors';

import { icons as appIcons, IconProps } from 'styles/icons';

import * as S from './Perks.styled';

type PerkIcon = {
  icon: StyledComponent<React.FunctionComponent<IconProps>, any>;
  height: ViewportShorthands;
};

type PerkIcons<T extends string = string> = PartialRecord<
  T,
  {
    icon: StyledComponent<React.FunctionComponent<IconProps>, any>;
    height: ViewportShorthands;
  }
>;

const perksIcons: PerkIcons<PerksType> = {
  washer: { icon: appIcons.perkWasher, height: { m: 45, t: 55 } },
  pool: { icon: appIcons.perkPool, height: { m: 32, t: 40 } },
  gate: { icon: appIcons.perkGate, height: { m: 36, t: 45 } },
  communityPool: { icon: appIcons.perkCommunityPool, height: { m: 40, t: 50 } },
  golfCourse: { icon: appIcons.perkGolf, height: { m: 40, t: 50 } },
  guard: { icon: appIcons.perkGuard, height: { m: 40, t: 50 } },
  guestHouse: { icon: appIcons.perkCasita, height: { m: 36, t: 45 } },
  loft: { icon: appIcons.perkDenOffice, height: { m: 40, t: 50 } },
  rvParking: { icon: appIcons.perkRvParking, height: { m: 32, t: 40 } },
  washerDryer: { icon: appIcons.perkWasherDryer, height: { m: 36, t: 45 } },
  refrigerator: { icon: appIcons.perkFridge, height: { m: 40, t: 50 } },
};

const otherIcons: PerkIcons<'fireplace'> = {
  fireplace: { icon: appIcons.perkFireplace, height: { m: 45, t: 55 } },
};

const renderIcon = (icons: PerkIcons, key: string, title: string) => {
  const { height, icon: Icon } = icons[key]!;

  return (
    <S.Perk key={key}>
      <S.IconWrapper>
        <Icon height={height} />
      </S.IconWrapper>
      <S.PerkTitle>{title}</S.PerkTitle>
    </S.Perk>
  );
};

const renderPerkIcon = (perk: PerksType) =>
  renderIcon(perksIcons, perk, perksTitles[perk]);

const renderOtherIcon = (icon: keyof typeof otherIcons, title: string) =>
  renderIcon(otherIcons, icon, title);

const renderIconsList = (perks: PerksType[]) =>
  perks.filter(key => perksIcons[key]).map(key => renderPerkIcon(key));

const shouldRenderPerks = (perks: PerksType[]) =>
  perks.length > 0 && perks.some(key => perksIcons[key]);

const Perks = ({
  homePerks,
  communityPerks,
  roomTypes,
  otherStructures,
  hasFireplace,
}: ReturnType<typeof getPropertyItem>) => (
  <S.Root>
    {shouldRenderPerks(homePerks) && (
      <S.Perks mr={S.perksListGap} mb={50}>
        <S.Header>Home Perks</S.Header>
        <S.List>
          {renderIconsList(homePerks)}
          {roomTypes.includes('Loft') && renderPerkIcon('loft')}
          {otherStructures.includes('GuestHouse') &&
            renderPerkIcon('guestHouse')}
          {hasFireplace && renderOtherIcon('fireplace', 'Fireplace')}
        </S.List>
      </S.Perks>
    )}
    {shouldRenderPerks(communityPerks) && (
      <S.Perks mb={60}>
        <S.Header>Community Perks</S.Header>
        <S.List>{renderIconsList(communityPerks)}</S.List>
      </S.Perks>
    )}
  </S.Root>
);

export default memo(Perks);
