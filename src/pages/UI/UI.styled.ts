import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from 'src/types';
import { center, textMixin } from 'styles/helpers';

export const Root = styled.div`
  padding: 20px;
  cursor: pointer;

  img {
    width: 100%;
  }
`;

export const BadgesBg = styled.div`
  display: flex;
  padding: 20px;
  height: 200px;
  background-color: ${Colors.mineShaft};
`;

export const Section = styled.section`
  margin-bottom: 30px;
`;

export const Header = styled.h2`
  margin-bottom: 30px;

  ${textMixin({ fontSize: 23 })}
`;

export const SubHeader = styled.h3`
  margin-bottom: 20px;

  ${textMixin({ fontSize: 21 })}
`;

export const RangeInputContainer = styled.div`
  width: 50%;
`;

export const Overflow = styled.div`
  position: absolute;
  background-color: ${rgba(Colors.emperor, 0.7)};
  width: 100%;
  height: 100%;
`;

export const ShowMoreImages = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${center()}
`;
