import styled from 'styled-components';
import { Colors } from '@types';
import { textMixin } from 'styles/helpers';
import { media } from 'styles/media';

export const Root = styled.div`
  padding-left: 23px;
  padding-top: 25px;
  margin-top: 0;
  padding-bottom: 40px;

  overflow: hidden;

  ${media.desktop`
    margin-top: 40px;
    padding-top: 25px;
    padding-left: 60px;
  `}

  ${media.bigDesktop`
    padding-left: 107px;
    padding-top: 93px;
  `}
`;

export const Inputs = styled.div`
  display: flex;
  margin-left: 68px;
  align-items: flex-end;
`;

export const NearBy = styled.div`
  display: flex;
`;

export const NearByTitle = styled.div`
  font-size: 20px;
  color: ${Colors.mineShaft};
  line-height: 20px;
  font-family: bwGradualBold, sans-serif;
  
  ${media.desktop`
    font-size: 28px;
    line-height: 38px;
  `}
  
  ${media.mediumDesktop`
    font-size: 30px;
    line-height: 38px;
  `}
  
  ${media.bigDesktop`
    font-size: 38px;
    line-height: 38px;
  `}
`;

export const Input = styled.input`
  border-bottom: 4px solid ${Colors.dodgerBlue};
  max-width: 30px;
  width: 100%;
  color: ${Colors.emperor};

  ${() =>
    textMixin({
      fontType: 'liberGrotesqueBlack',
      fontSize: 18,
      lineHeight: '24px',
    })}
`;

export const Miles = styled.div`
  border-bottom: 4px solid ${Colors.dodgerBlue};
  max-width: 80px;
  width: 100%;
  font-size: 24px;
  padding-left: 5px;
  line-height: 24px;
`;

export const Gallery = styled.div`
  margin-top: 48px;
  display: flex;
  margin-left: -23px;

  ${media.tablet`
    margin-left: -30px;
  `}

  ${media.desktop`
    margin-left: -62px;
    // position: absolute;
    height: 465px;
    left: 0;
    right: 0;
  `}

  ${media.bigDesktop`
      margin-left: -145px;
  `}
`;

export const PropList = styled.div``;

export const Spinner = styled.div`
  height: 465px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
`;

export const EmptyTopic = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #acafb5;
  font-family: LiberGrotesqueBold, sans-serif;
  font-size: 17px;
`;
