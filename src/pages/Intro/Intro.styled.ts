import styled from 'styled-components';
import { rgba } from 'polished';

import { Colors } from '@types';

import { media } from 'styles/media';
import { textMixin, center } from 'styles/helpers';

export const rootPadding = 25;

export const Root = styled.div`
  position: relative;
  height: 100%;
  padding: ${rootPadding}px ${rootPadding}px 0;
`;

export const Content = styled.div`
  width: 100%;

  ${media.tablet`
    max-width: 600px;
    ${center()}
  `}
`;

export const Section = styled.section`
  &:not(:last-child) {
    padding-bottom: 20px;
    border-bottom: 1px solid ${Colors.gallery};
    margin-bottom: 30px;
  }
`;

export const Next = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  position: absolute;
  bottom: 30px;
  right: 20px;
  border-radius: 25px;
  background-color: ${Colors.white};
  box-shadow: 4px 6px 9px ${rgba(Colors.black, 0.1)};

  ${textMixin({
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 16,
  })}
`;
