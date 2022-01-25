const houseIcon = require('assets/icons/map/house-stroke.svg');
const condoIcon = require('assets/icons/map/condo-stroke.svg');
const townhomeIcon = require('assets/icons/map/townhome-stroke.svg');
const lotIcon = require('assets/icons/map/lot-stroke.svg');
const houseIconSvg = require('assets/icons/updated/house-2.svg');
const condoIconSvg = require('assets/icons/updated/condo.svg');
const townhomeIconSvg = require('assets/icons/updated/townhome.svg');
const lotIconSvg = require('assets/icons/updated/lot.svg');

const iconsHome: {
  [key: string]: string;
} = {
  house: houseIcon,
  lot: lotIcon,
  townhome: townhomeIcon,
  condo: condoIcon,
};

const iconsHomeSvg: {
  [key: string]: string;
} = {
  house: houseIconSvg,
  lot: lotIconSvg,
  townhome: townhomeIconSvg,
  condo: condoIconSvg,
};

export const getPropertyTypeIcon = (type: string, map = true): any => {
  return map ? iconsHome[type || 'house'] : iconsHomeSvg[type || 'house'];
};
