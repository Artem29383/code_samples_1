import styled from 'styled-components';
import { Colors } from '@types';
import { height, HeightProps, maxWidth, MaxWidthProps } from 'styled-system';
import { FONTS } from 'styles/fonts';

export const Root = styled.div<
  { active: boolean } & MaxWidthProps & HeightProps
>`
  border-radius: 49px;
  cursor: pointer;
  border: ${({ active }) =>
    active ? `1px solid transparent` : '1px solid #d2d8df'};
  padding: 16px 20px;
  background: ${({ active }) =>
    active
      ? 'linear-gradient(283.26deg, #638CFF -21.36%, #C192FF 109.14%)'
      : 'transparent'};
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  ${maxWidth};
  ${height};

  & svg {
    stroke: ${({ active }) => (active ? '#fff' : Colors.malibu)};
  }

  & p {
    color: ${({ active }) => (active ? '#fff' : '#9592ff')};
    background: ${({ active }) =>
      active
        ? 'transparent'
        : 'linear-gradient(269.63deg, #9592ff 3.33%, #6a8dff 104.66%)'};
    -webkit-background-clip: ${({ active }) => (active ? 'initial' : 'text')};
    -webkit-text-fill-color: ${({ active }) =>
      active ? 'initial' : 'transparent'};
  }
`;

export const Svg = styled.div`
  margin-right: 12.5px;
`;

export const Text = styled.p`
  font-size: 18px;
  font-family: ${FONTS.LiberGrotesqueRegular};
  font-weight: 600;
  padding: 3px 0;
`;
