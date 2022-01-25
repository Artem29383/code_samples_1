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

  & path {
    stroke: ${Colors.black};
  }

  ${size(26, 28)}

  ${media.tablet`
     ${size(34, 35)}
  `}
`;

export const InfoNumber = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoNumberValue = styled.div`
  margin-right: 5px;
  ${textMixin({
    align: 'left',
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 14,
    color: 'mineShaft',
  })}

  ${media.tablet`
  margin-right: 0;
  ${textMixin({
    align: 'left',
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 24,
    color: 'mineShaft',
  })}
  `}
`;

export const InfoNumberTitle = styled.div`
  ${textMixin({
    align: 'left',
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 10,
    color: 'mineShaft',
  })}

  ${media.tablet`
    ${textMixin({
      align: 'left',
      fontType: 'liberGrotesqueExtraBold',
      fontSize: 15,
      color: 'mineShaft',
    })}
  `}
`;
