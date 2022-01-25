import styled, { css } from 'styled-components';
import _omit from 'lodash/omit';
import _mapValues from 'lodash/mapValues';

import {
  layout,
  margin,
  alignSelf,
  position as styledSystemPosition,
  LayoutProps,
  MarginProps,
  AlignSelfProps,
  PositionProps as StyledSystemPositonProps,
} from 'styled-system';

import { Colors, ColorsStrings, TranslateProps } from '@types';

import { translateProps } from 'styles/helpers';

const entertainIconActive = require('assets/icons/newPOI/active/entertain.svg');
const gymIconActive = require('assets/icons/newPOI/active/gym.svg');
const groceryIconActive = require('assets/icons/newPOI/active/grocery.svg');
const healthcareIconActive = require('assets/icons/newPOI/active/healthcare.svg');
const nightlifeIconActive = require('assets/icons/newPOI/active/nightlife.svg');
const diningIconActive = require('assets/icons/newPOI/active/dining.svg');
const schoolIconActive = require('assets/icons/newPOI/active/school.svg');
//-

const entertainIcon = require('assets/icons/newPOI/entertain.svg');
const gymIcon = require('assets/icons/newPOI/gym.svg');
const groceryIcon = require('assets/icons/newPOI/grocery.svg');
const healthcareIcon = require('assets/icons/newPOI/healthcare.svg');
const nightlifeIcon = require('assets/icons/newPOI/nightlife.svg');
const blendingIcon = require('assets/icons/updated/townhome.svg');
const diningIcon = require('assets/icons/newPOI/dining.svg');
const schoolIcon = require('assets/icons/newPOI/school.svg');
const dashboardIcon = require('assets/icons/dashboard.svg');
const boardsIcon = require('assets/icons/boards.svg');
const heartIcon = require('assets/icons/heart.svg');
const hearGrayIcon = require('assets/icons/heartGray.svg');
const hideIcon = require('assets/icons/hide.svg');
const shareIcon = require('assets/icons/copyIcon.svg');
const heartActiveIcon = require('assets/icons/heart-active.svg');
const searchesCycleIcon = require('assets/icons/searches-cycle.svg');
const showingsIcon = require('assets/icons/showings.svg');
const pinIcon = require('assets/icons/pin.svg');
const pinIconTransparent = require('assets/icons/pin-transparent.svg');
const settingsIcon = require('assets/icons/settings.svg');
const logoutIcon = require('assets/icons/logout.svg');
const userIcon = require('assets/icons/user.svg');
const envelopeIcon = require('assets/icons/envelope.svg');
const searchesIcon = require('assets/icons/searches.svg');
const securityIcon = require('assets/icons/security.svg');
const termsIcon = require('assets/icons/terms.svg');
const notificationsIcon = require('assets/icons/notifications.svg');
const userFatIcon = require('assets/icons/user-fat.svg');
const wifiIcon = require('assets/icons/perks/wifi.svg');
const cameraIcon = require('assets/icons/camera.svg');
const backArrow = require('assets/icons/backarrow.svg');
const signUpIcon = require('assets/icons/sign-up.svg');
const dashboardIconHead = require('assets/icons/icon-dashboard.svg');
const pencil = require('assets/icons/step-form/pencil.svg');

const calendarIcon = require('assets/icons/calendar.svg');
const poolIcon = require('assets/icons/pool.svg');
const communityPoolIcon = require('assets/icons/pool.svg');
const houseIcon = require('assets/icons/house.svg');
const house2Icon = require('assets/icons/house-2.svg');
const condoIcon = require('assets/icons/condo.svg');
const townhomeIcon = require('assets/icons/townhome.svg');
const lotIcon = require('assets/icons/lot.svg');
const filtersArrowIcon = require('assets/icons/filtersArrow.svg');

const guestHouseIcon = require('assets/icons/guest-house.svg');
const loftIcon = require('assets/icons/loft.svg');
const hoaIcon = require('assets/icons/hoa.svg');
const golfIcon = require('assets/icons/golf.svg');
const guardIcon = require('assets/icons/guard.svg');
const gateIcon = require('assets/icons/gate.svg');
const bottleNippleIcon = require('assets/icons/bottle-nipple.svg');
const noResultsIcon = require('assets/icons/no-results.svg');
const photoIcon = require('assets/icons/photo.svg');

const updatedHouse2Icon = require('assets/icons/updated/house-2.svg');
const updatedCondoIcon = require('assets/icons/updated/condo.svg');
const updatedTownhomeIcon = require('assets/icons/updated/townhome.svg');
const updatedLotIcon = require('assets/icons/updated/lot.svg');

const searchArrowIcon = require('assets/icons/search-arrow.svg');

/* Perks icons */
const ageRestrictedPerkIcon = require('assets/icons/perks/age-restricted.svg');
const casitaPerkIcon = require('assets/icons/perks/casita.svg');
const communityPoolPerkIcon = require('assets/icons/perks/community-pool.svg');
const denOfficePerkIcon = require('assets/icons/perks/den-office.svg');
const fireplacePerkIcon = require('assets/icons/perks/fireplace.svg');
const fridgePerkIcon = require('assets/icons/perks/fridge.svg');
const gatePerkIcon = require('assets/icons/perks/gate.svg');
const golfPerkIcon = require('assets/icons/perks/golf.svg');
const guardGatePerkIcon = require('assets/icons/perks/guard-gate.svg');
const guardPerkIcon = require('assets/icons/perks/guard.svg');
const horseZonePerkIcon = require('assets/icons/perks/horse-zone.svg');
const poolPerkIcon = require('assets/icons/perks/pool.svg');
const rvParkingPerkIcon = require('assets/icons/perks/rv-parking.svg');
const solarPanelsPerkIcon = require('assets/icons/perks/solar-panels.svg');
const washerDryerPerkIcon = require('assets/icons/perks/washer-dryer.svg');
const washerPerkIcon = require('assets/icons/perks/washer.svg');
const dryerPerkIcon = require('assets/icons/perks/dryer.svg');

const sellTopIcon = require('assets/icons/top-sell.svg');
const thumb = require('assets/icons/thumb.svg');

/* step-form */
const document = require('assets/icons/step-form/document.svg');
const chemical = require('assets/icons/step-form/chemical.svg');
const foundation = require('assets/icons/step-form/foundation.svg');
const leaking = require('assets/icons/step-form/leaking.svg');
const malfunctioning = require('assets/icons/step-form/malfunctioning.svg');
const mold = require('assets/icons/step-form/mold.svg');
const plumbing = require('assets/icons/step-form/plumbing.svg');
const termits = require('assets/icons/step-form/termits.svg');

const splash = require('assets/icons/step-form/splash.svg');
const trash = require('assets/icons/step-form/trash.svg');
const svgMobileSplash = require('assets/icons/step-form/svg-mobile-group.svg');
const cursorDrawingMapIcon = require('assets/icons/cursor-drawing-map.png');

const drawUnActive = require('assets/icons/draw-unactive.svg');
const drawActive = require('assets/icons/draw-active.svg');

const cursor = require('assets/icons/cursor-drawing-map.svg');

type TransientZIndexProp = {
  $zIndex: number;
};

type PositionProps = Omit<StyledSystemPositonProps, 'zIndex'> &
  TransientZIndexProp;

type ColorProp = { color: ColorsStrings | string };

type TransientFlexAlignProp = { $alignSelf: string };

const zIndex = css<TransientZIndexProp>`
  z-index: ${p => p.$zIndex};
`;

const flexAlign = css<TransientFlexAlignProp>`
  align-self: ${p => p.$alignSelf};
`;

const position = (props: PositionProps) =>
  styledSystemPosition(_omit(props, 'zIndex'));

const handleColorProp = (p: ColorProp) =>
  p.color in Colors
    ? Colors[p.color as ColorsStrings]
    : p.color || Colors.white;

export const SignUpIcon = styled(signUpIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const HouseIcon = styled(houseIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-house-fill {
    fill: ${handleColorProp};
    stroke: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const House2Icon = styled(house2Icon)<
  LayoutProps & PositionProps & MarginProps & ColorProp & TransientFlexAlignProp
>`
  & .icon-house2-fill-storke {
    fill: ${handleColorProp};
    stroke: ${handleColorProp};
  }

  ${flexAlign}
  ${layout}
  ${position}
  ${margin}
`;

export const CondoIcon = styled(condoIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp & TransientFlexAlignProp
>`
  & .icon-condo-fill {
    fill: ${handleColorProp};
  }

  ${flexAlign}
  ${layout}
  ${position}
  ${margin}
`;

export const LotIcon = styled(lotIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp & TransientFlexAlignProp
>`
  & .icon-lot-fill {
    fill: ${handleColorProp};
  }

  & .icon-lot-stroke {
    stroke: ${handleColorProp};
  }

  ${flexAlign}
  ${layout}
  ${position}
  ${margin}
`;

export const TownhomeIcon = styled(townhomeIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp & TransientFlexAlignProp
>`
  & .icon-townhome-fill {
    fill: ${handleColorProp};
  }

  ${flexAlign}
  ${layout}
  ${position}
  ${margin}
`;

export const DashboardIcon = styled(dashboardIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-dashboard-stroke {
    stroke: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const DashboardIconHead = styled(dashboardIconHead)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-dashboard-stroke {
    stroke: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const HeartIcon = styled(heartIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`

  & .icon-heart-stroke {
    stroke: ${handleColorProp};
  }

  ${layout}
  ${margin}
  ${position}
  ${zIndex}
`;

export const HeartActiveIcon = styled(heartActiveIcon)<
  LayoutProps & PositionProps & MarginProps & { cursor: 'default' | 'pointer' }
>`
  cursor: ${p => p.cursor || 'default'};

  ${layout}
  ${position}
  ${margin}
  ${zIndex}
`;

export const BackArrowIcon = styled(backArrow)<
  LayoutProps & PositionProps & MarginProps & { cursor: 'default' | 'pointer' }
>`
  cursor: ${p => p.cursor || 'default'};

  ${layout}
  ${position}
  ${margin}
  ${zIndex}
`;

export const GymIcon = styled(gymIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-searches-cycle-fill{
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const CameraIcon = styled(cameraIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-searches-cycle-fill{
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const SearchesCycleIcon = styled(searchesCycleIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-searches-cycle-fill{
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const ShowingsIcon = styled(showingsIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`

  & .icon-showings-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const PinIcon = styled(pinIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-pin-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const PinIconTransparent = styled(pinIconTransparent)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-pin-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const BlendingIcon = styled(blendingIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-pin-fill {
    fill: ${handleColorProp};
    stroke: #c192ff;
  }
  stroke: #c192ff;

  ${layout}
  ${position}
  ${margin}
`;

export const BoardsIcon = styled(boardsIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const SettingsIcon = styled(settingsIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-settings-fill-stroke {
    fill: ${handleColorProp};
    stroke: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const LogoutIcon = styled(logoutIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-logout-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const CalendarIcon = styled(calendarIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-calendar-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const UserIcon = styled(userIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const EnvelopeIcon = styled(envelopeIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const SearchesIcon = styled(searchesIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const SecurityIcon = styled(securityIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const NotificationsIcon = styled(notificationsIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const TermsIcon = styled(termsIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const UserFatIcon = styled(userFatIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const PoolIcon = styled(poolIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-pool-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const CommunityPoolIcon = styled(communityPoolIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-pool-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const EntertainIcon = styled(entertainIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const GuestHouseIcon = styled(guestHouseIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-guest-house-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const GroceryIcon = styled(groceryIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const LoftIcon = styled(loftIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-loft-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const HealthCareIcon = styled(healthcareIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const HOAIcon = styled(hoaIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-hoa-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const NightLifeIcon = styled(nightlifeIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const GolfIcon = styled(golfIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-golf-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const DiningIcon = styled(diningIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const GuardIcon = styled(guardIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-guard-stroke {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const SchoolIcon = styled(schoolIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const GateIcon = styled(gateIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-gate-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const HeartGrayIcon = styled(hearGrayIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const ShareIcon = styled(shareIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  cursor: pointer;
  ${layout}
  ${position}
  ${margin}
`;

export const BottleNippleIcon = styled(bottleNippleIcon)<
  LayoutProps & PositionProps & MarginProps & ColorProp
>`
  & .icon-bottle-nipple-fill {
    fill: ${handleColorProp};
  }

  ${layout}
  ${position}
  ${margin}
`;

export const HideIcon = styled(hideIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const WifiIcon = styled(wifiIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export const NoResultsIcon = styled(noResultsIcon)<
  LayoutProps & PositionProps & MarginProps
>`
  ${layout}
  ${position}
  ${margin}
`;

export type IconProps = LayoutProps &
  TranslateProps &
  StyledSystemPositonProps &
  MarginProps &
  AlignSelfProps & { color?: ColorsStrings };

export const icons = _mapValues(
  {
    house2: updatedHouse2Icon,
    lot: updatedLotIcon,
    condo: updatedCondoIcon,
    townhome: updatedTownhomeIcon,
    searchArrow: searchArrowIcon,
    photo: photoIcon,
    perkAgeRestricted: ageRestrictedPerkIcon,
    perkCasita: casitaPerkIcon,
    perkCommunityPool: communityPoolPerkIcon,
    perkDenOffice: denOfficePerkIcon,
    perkFireplace: fireplacePerkIcon,
    perkFridge: fridgePerkIcon,
    perkGate: gatePerkIcon,
    perkGuard: guardPerkIcon,
    perkGolf: golfPerkIcon,
    perkGuardGate: guardGatePerkIcon,
    perkHorseZone: horseZonePerkIcon,
    perkPool: poolPerkIcon,
    perkRvParking: rvParkingPerkIcon,
    perkSolarPanels: solarPanelsPerkIcon,
    perkWasher: washerPerkIcon,
    perkDryer: dryerPerkIcon,
    perkWasherDryer: washerDryerPerkIcon,
    sellTop: sellTopIcon,
    thumb,
    documentIcon: document,
    splashIcon: splash,
    chemical,
    foundation,
    leaking,
    malfunctioning,
    mold,
    plumbing,
    termits,
    trash,
    svgMobileSplash,
    pencil,
    entertainIconActive,
    diningIconActive,
    groceryIconActive,
    nightlifeIconActive,
    schoolIconActive,
    healthcareIconActive,
    gymIconActive,
    cursorDrawingMapIcon,
    drawUnActive,
    drawActive,
    cursor,
    filtersArrowIcon,
  },
  icon => styled(icon as React.FunctionComponent<IconProps>).withConfig({
    shouldForwardProp: prop =>
      !['height', 'zIndex', 'alignSelf'].includes(String(prop)),
  })`
      ${layout}
      ${styledSystemPosition}
      ${margin}
      ${alignSelf}
      ${translateProps}
  
      & .icon-fill {
        fill: ${p =>
          p.color && Colors[p.color] ? Colors[p.color] : 'emperor'};
      }
  
      & .icon-stroke {
        stroke: ${p =>
          p.color && Colors[p.color] ? Colors[p.color] : 'emperor'};
      }
    `
);
