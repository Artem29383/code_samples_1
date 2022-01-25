import { createGlobalStyle } from 'styled-components';

const AffogatoBoldWoff = require('./fonts/Affogato/Affogato-Bold.woff');
const AffogatoBoldWoff2 = require('./fonts/Affogato/Affogato-Bold.woff2');
const AffogatoMediumWoff = require('./fonts/Affogato/Affogato-Medium.woff');
const AffogatoMediumWoff2 = require('./fonts/Affogato/Affogato-Medium.woff2');

const BwGradualBoldWoff = require('./fonts/BwGradual/BwGradual-Bold.woff');
const BwGradualBoldWoff2 = require('./fonts/BwGradual/BwGradual-Bold.woff2');
const BwGradualExtraBoldWoff = require('./fonts/BwGradual/BwGradual-ExtraBold.woff');
const BwGradualExtraBoldWoff2 = require('./fonts/BwGradual/BwGradual-ExtraBold.woff2');

const LiberGrotesqueBlackWoff = require('./fonts/LiberGrotesque/LiberGrotesque-Black.woff');
const LiberGrotesqueBlackWoff2 = require('./fonts/LiberGrotesque/LiberGrotesque-Black.woff2');
const LiberGrotesqueExtraBoldWoff = require('./fonts/LiberGrotesque/LiberGrotesque-ExtraBold.woff');
const LiberGrotesqueExtraBoldWoff2 = require('./fonts/LiberGrotesque/LiberGrotesque-ExtraBold.woff2');
const LiberGrotesqueBoldWoff = require('./fonts/LiberGrotesque/LiberGrotesque-Bold.woff');
const LiberGrotesqueBoldWoff2 = require('./fonts/LiberGrotesque/LiberGrotesque-Bold.woff2');
const LiberGrotesqueLightWoff = require('./fonts/LiberGrotesque/LiberGrotesque-Light.woff');
const LiberGrotesqueLightWoff2 = require('./fonts/LiberGrotesque/LiberGrotesque-Light.woff2');
const LiberGrotesqueNewsWoff = require('./fonts/LiberGrotesque/LiberGrotesque-News.woff');
const LiberGrotesqueNewsWoff2 = require('./fonts/LiberGrotesque/LiberGrotesque-News.woff2');
const LiberGrotesqueRegularWoff = require('./fonts/LiberGrotesque/LiberGrotesque-Regular.woff');
const LiberGrotesqueRegularWoff2 = require('./fonts/LiberGrotesque/LiberGrotesque-Regular.woff2');
const LiberGrotesqueSemiBoldWoff = require('./fonts/LiberGrotesque/LiberGrotesque-SemiBold.woff');
const LiberGrotesqueSemiBoldWoff2 = require('./fonts/LiberGrotesque/LiberGrotesque-SemiBold.woff2');

export default createGlobalStyle`
  @font-face {
    font-family: 'AffogatoBold';
    src: url(${AffogatoBoldWoff}) format('woff'),
      url(${AffogatoBoldWoff2}) format('woff2');
    font-weight: 900;
  }

  @font-face {
    font-family: 'AffogatoMedium';
    src: url(${AffogatoMediumWoff}) format('woff'),
      url(${AffogatoMediumWoff2}) format('woff2');
    font-weight: 800;
  }

  @font-face {
    font-family: 'BwGradualExtraBold';
    src: url(${BwGradualExtraBoldWoff}) format('woff'),
      url(${BwGradualExtraBoldWoff2}) format('woff2');
    font-weight: 900;
  }

  @font-face {
    font-family: 'BwGradualBold';
    src: url(${BwGradualBoldWoff}) format('woff'),
      url(${BwGradualBoldWoff2}) format('woff2');
    font-weight: 800;
  }

  @font-face {
    font-family: 'LiberGrotesqueBlack';
    src: url(${LiberGrotesqueBlackWoff}) format('woff'),
      url(${LiberGrotesqueBlackWoff2}) format('woff2');
    font-weight: 900;
  }

  @font-face {
    font-family: 'LiberGrotesqueExtraBold';
    src: url(${LiberGrotesqueExtraBoldWoff}) format('woff'),
      url(${LiberGrotesqueExtraBoldWoff2}) format('woff2');
    font-weight: 800;
  }

  @font-face {
    font-family: 'LiberGrotesqueBold';
    src: url(${LiberGrotesqueBoldWoff}) format('woff'),
      url(${LiberGrotesqueBoldWoff2}) format('woff2');
    font-weight: 700;
  }

  @font-face {
    font-family: 'LiberGrotesqueSemiBold';
    src: url(${LiberGrotesqueSemiBoldWoff}) format('woff'),
      url(${LiberGrotesqueSemiBoldWoff2}) format('woff2');
    font-weight: 600;
  }

  @font-face {
    font-family: 'LiberGrotesqueRegular';
    src: url(${LiberGrotesqueRegularWoff}) format('woff'),
      url(${LiberGrotesqueRegularWoff2}) format('woff2');
    font-weight: 500;
  }

  @font-face {
    font-family: 'LiberGrotesqueLight';
    src: url(${LiberGrotesqueLightWoff}) format('woff'),
      url(${LiberGrotesqueLightWoff2}) format('woff2');
    font-weight: 400;
  }

  @font-face {
    font-family: 'LiberGrotesqueNews';
    src: url(${LiberGrotesqueNewsWoff}) format('woff'),
      url(${LiberGrotesqueNewsWoff2}) format('woff2');
    font-weight: 300;
  }
`;

export enum FONTS {
  AffogatoBold = 'AffogatoBold, sans-serif',
  AffogatoMedium = 'AffogatoMedium, sans-serif',
  BwGradualExtraBold = 'BwGradualExtraBold, sans-serif',
  BwGradualBold = 'BwGradualBold, sans-serif',
  BwGradualRegular = 'BwGradualRegular, sans-serif',
  LiberGrotesqueBlack = 'LiberGrotesqueBlack, sans-serif',
  LiberGrotesqueExtraBold = 'LiberGrotesqueExtraBold, sans-serif',
  LiberGrotesqueBold = 'LiberGrotesqueBold, sans-serif',
  LiberGrotesqueSemiBold = 'LiberGrotesqueSemiBold, sans-serif',
  LiberGrotesqueRegular = 'LiberGrotesqueRegular, sans-serif',
  LiberGrotesqueLight = 'LiberGrotesqueLight, sans-serif',
  LiberGrotesqueNews = 'LiberGrotesqueNews, sans-serif',
}
