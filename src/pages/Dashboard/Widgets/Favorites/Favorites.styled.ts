import styled from 'styled-components';
import { Colors } from '@types';
import { rgba, size } from 'polished';
import { center } from 'styles/helpers';
import { media } from 'styles/media';

export const Root = styled.div`
  position: relative;
  padding: 25px;
  background-color: ${Colors.white};
  border-radius: 20px;
  min-width: 660px;
  box-shadow: 0px 10px 30px ${rgba(Colors.black, 0.1)};

  ${media.desktop`
    margin-right: 20px;
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 47px;
  letter-spacing: 2px;

  svg {
    fill: ${Colors.white};
    stroke-width: 3px;
    width: 16px;
    height: 15px;
    stroke: ${Colors.bombay};
  }

  &::before,
  &::after {
    content: '';
    display: block;
    background-color: ${Colors.bombay};
    height: 1px;
    width: 35%;

    ${center(false, true)}
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  ${media.desktop`
     margin-bottom: 22px;
  `}
`;

export const Body = styled.div`
  display: flex;
  position: relative;
  height: 349px;
  justify-content: space-between;

  a {
    text-decoration: underline;
  }

  ${media.desktop`
    ${media.height(800)`
        height: 260px;
    `}
  `}
`;

export const ColumnOne = styled.div`
  display: flex;
  height: 349px;
  justify-content: space-between;

  ${media.desktop`
    ${media.height(800)`
        height: 260px;
    `}
  `}
`;
export const ColumnTwo = styled.div``;

export const Content = styled.div<{
  sizes: {
    height: {
      m: number;
      t: number;
    };
    width: {
      m: number;
      t: number;
    };
  };
}>`
  width: ${({ sizes }) => `${sizes.width.m}px`};
  height: ${({ sizes }) => `${sizes.height.m}px`};
  box-shadow: 10px 10px 15px rgba(68, 68, 68, 0.2);
  border-radius: 25px;
  background-color: ${Colors.white};
  padding: 20px 17px 0 17px;

  ${media.tablet`
  // @ts-ignore
    width: ${({ sizes }) => `${sizes.width.t}px`};
    // @ts-ignore
    height:${({ sizes }) => `${sizes.height.t}px`};
  `}
`;

export const Item = styled.div<{ mr?: number }>`
  margin-right: ${({ mr }) => `${mr}px`};
`;

export const Image = styled.div`
  height: 60%;
  border-radius: 20px;
  overflow: hidden;

  ${media.tablet`
    height: 195px;
  `}

  ${media.desktop`
    ${media.height(800)`
        height: 125px;
    `}
  `}
`;

export const ImageBig = styled.div`
  height: 60%;
  border-radius: 20px;
  overflow: hidden;

  ${media.tablet`
    height: 160px;
  `}
`;

export const Wrapper = styled.div<{ mt: number }>`
  margin-top: ${({ mt }) => `${mt}px`};
  padding: 0 20px;
`;

export const SlideImage = styled.img`
  object-position: center;
  object-fit: cover;

  ${size('100%')}
`;

export const MockImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const Text = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${Colors.bombay};
  font-family: LiberGrotesqueExtraBold, sans-serif;
`;
