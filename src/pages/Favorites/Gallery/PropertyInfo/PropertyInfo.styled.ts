import styled from 'styled-components';
import { Colors } from '@types';
import { size } from 'polished';
import { media } from 'styles/media';
import { textMixin } from 'styles/helpers';

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 0 auto 12px auto;

  ${media.desktop`
      margin: 0 auto 26px auto;
  `}
`;

export const HouseIcon = styled.div`
  align-self: center;
  width: 7.467vw;
  height: 6.933vw;
  & path {
    stroke: ${Colors.black};
  }
  ${media.desktop`
     ${size(34, 35)}
  `}
`;

export const InfoNumber = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoNumberValue = styled.div`
  margin-right: 1.333vw;
  margin-bottom: 1.6vw;
  font-size: 3.7vw;
  color: ${Colors.mineShaft};
  font-family: liberGrotesqueExtraBold, sans-serif;
  text-align: left;

  ${media.desktop`
    font-size: 24px;
    margin-bottom: 6px;
  `}
`;

export const InfoNumberTitle = styled.div`
  font-size: 2.6vw;
  text-align: left;
  font-family: liberGrotesqueExtraBold, sans-serif;
  color: ${Colors.mineShaft};

  ${media.desktop`
    ${textMixin({
      align: 'left',
      fontType: 'liberGrotesqueExtraBold',
      fontSize: 15,
      color: 'mineShaft',
    })}
  `}
`;
