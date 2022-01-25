import styled from 'styled-components';
import { media } from 'styles/media';

export const OverFlow = styled.div<{
  margin: {
    m?: string | undefined;
    d?: string | undefined;
    md?: string | undefined;
    bd?: string | undefined;
  };
  isShadowEffect?: boolean;
}>`
  height: 100%;
  overflow-x: ${({ isShadowEffect }) => (isShadowEffect ? 'none' : 'auto')};
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    width: 0;
    display: none;
    background: transparent;
  }

  margin: ${({ margin }) => `${margin.m}`};
  
  ${media.desktop`
    // @ts-ignore
    margin: ${({ margin }) => `${margin.d}`};
  `}
  
  ${media.mediumDesktop`
    // @ts-ignore
    margin: ${({ margin }) => `${margin.md}`};
  `}
  
  ${media.bigDesktop`
    // @ts-ignore
    margin: ${({ margin }) => `${margin.bd}`};
  `}
`;

export const Root = styled.div<{
  padding: {
    m?: string | undefined;
    d?: string | undefined;
    md?: string | undefined;
    bd?: string | undefined;
  };
  width: number;
  display: string;
  alignItem: {
    m: string;
    t: string;
  };
  direction: string;
}>`
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: ${({ alignItem }) => alignItem.m};

  padding: ${({ padding }) => `${padding.m}`};

  ${media.desktop`
    // @ts-ignore
    flex-direction: ${({ direction }) => direction};
    // @ts-ignore
    justify-content: ${({ direction }) =>
      direction === 'row-reverse' ? 'flex-end' : ''};
    // @ts-ignore
    align-items: ${({ alignItem }) => alignItem.t};
    // @ts-ignore
    width: ${({ width }) => `${width}px`};
    // @ts-ignore
    display: ${({ display }) => display};
    // @ts-ignore
    padding: ${({ padding }) => `${padding.d}`};
  `}

  ${media.bigDesktop`
    // @ts-ignore
    padding: ${({ padding }) => `${padding.bd}`};`}
`;
