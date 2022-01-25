import styled, { css, keyframes } from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';
import { FONTS } from 'styles/fonts';

export const Root = styled.div`
  display: flex;
  //max-width: 1000px;
  width: 100%;
  margin-top: 22px;
  justify-content: space-between;
  height: 630px;
  position: relative;

  ${media.desktop`
      height: 644px;
  align-items: center;
    margin-top: 65px;
  `}

  ${media.bigDesktop`
     margin-top: 110px;
  `}
`;

export const Panel = styled.div`
  padding: 14px 7px;
  height: 67%;
  overflow: hidden;
  margin-right: 55px;
  border-radius: 76px;
  box-shadow: -13px 12px 30px rgba(0, 0, 0, 0.101961);
  position: absolute;
  z-index: 123;
  background-color: ${Colors.white};
  left: 15px;
  top: 50%;
  transform: translateY(-50%);

  svg {
    width: 100%;
    height: 100%;
  }

  ${media.desktop`
    margin-right: 24px;
    position: static;
    transform: translateY(0);
    z-index: 123;
    height: 488px;
    width: 68px;
    padding: 18px 0;
  `}

  ${media.bigDesktop`
    // padding: 27px 29px;
  `}
`;

export const Icon = styled.div<{ backgroundColor: string; isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  background: transparent;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  border: ${({ isActive }) => (isActive ? `` : '')};
  //box-shadow: -10px 10px 30px 0px rgba(201, 201, 201, 1);
  margin-bottom: 6px;

  ${media.desktop`
    height: 35px;
    width: 35px;
  `}
`;

export const Button = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-bottom: 15px;
`;

export const Map = styled.div<{ isLoad: boolean; TRANSITION_TIMING: number }>`
  width: 100%;
  height: 100%;
  filter: ${({ isLoad }) => (isLoad ? 'blur(3px)' : '')};

  @keyframes slidein {
    from {
      width: 87px;
      left: 17px;
    }

    to {
      left: 85px;
      width: 220px;
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .gm-style-iw {
    padding: 0 25px 0 7px!important;
    height: 50px;
    border-radius: 30px;
    width: 87px;
    min-width: 50px!important;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 63px!important;
    //left: 85px;
    //width: 220px!important;
    animation: ${({ TRANSITION_TIMING }) =>
      `slidein ${100 * TRANSITION_TIMING}ms forwards`};
  }

  .gm-style-iw-d {
    width: 100%;
    overflow: hidden !important;
    
    & + div {
      display: flex;
      justify-content: flex-start;
    }
  }

  & button.gm-ui-hover-effect {
    display: none !important;
    opacity: 0!important;
    width: 100%!important;
    height: 100%!important;
  }

  & .gm-style-iw-t::after {
    display: none;!important;
  }

  ${media.desktop`
      width: 85%;
  `}

  ${media.bigDesktop`
    width: 53vw;
    margin-right: auto; 
  `}
  
  .map-marker {
    background-color: transparent;
    width: 50px;
    height: 50px;
    position: absolute;
    cursor: pointer;
  }
  
  .map-marker-animate-in {
    padding: 0 25px 0 7px!important;
    height: 50px;
    border-radius: 30px;
    min-width: 50px!important;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 63px!important;
    left: 85px;
    width: 220px!important;
  }
  
  .map-marker-style {
    background: #FFFFFF;
    box-shadow: -10px 10px 30px rgba(0, 0, 0, 0.101961);
    height: 50px;
    width: 50px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width 100ms linear;
  }

  .map-marker-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .map-marker-text {
    display: flex;
    flex-direction: column;
    opacity: 0;
    margin-left: 50px;
    max-width: 79%;
    animation: fade 150ms forwards;
    animation-delay: 150ms;
  }
`;

export const RootContentMarker = styled.div`
  //max-width: 150px;
  //max-height: 120px;
`;

export const ImageWrapperMarker = styled.div`
  max-width: 150px;
  height: 100px;
`;

export const ImageMarker = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MarkerTitle = styled.div`
  font-family: LiberGrotesqueExtraBold, sans-serif;
  color: ${Colors.mineShaft};

  font-size: 14px;
  text-align: left;
  word-break: break-word;
`;

export const Desc = styled.div`
  margin-top: 5px;
  font-family: LiberGrotesqueRegular, sans-serif;
  color: ${Colors.mineShaft};

  font-size: 13px;
  text-align: left;
  word-break: break-word;
`;

export const Link = styled.a`
  text-decoration: none;
  color: #427fed;
  font-size: 13px;
  font-family: LiberGrotesqueRegular, sans-serif;
  margin-top: 5px;
`;

export const POPUP = styled.div`
  margin-right: auto;
  max-width: 195px;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Img = styled.img`
  height: 40px !important;
  width: 41px !important;
  position: absolute;
  left: 5px;
`;

const fade = keyframes`
  from {
      opacity: 0;
  }

  to {
    opacity: 1;
  }`;

export const Text = styled.div<{ TRANSITION_TIMING: number }>`
  display: flex;
  flex-direction: column;
  opacity: 0;
  margin-left: 40px;
  animation: ${({ TRANSITION_TIMING }) =>
    css`
      ${fade} ${150 * TRANSITION_TIMING}ms forwards
    `};
  animation-delay: ${({ TRANSITION_TIMING }) =>
    css`
      ${150 * TRANSITION_TIMING}ms
    `};
  max-width: 71%;
`;

export const Title = styled.a`
  color: #444444;
  font-family: ${FONTS.LiberGrotesqueRegular};
  font-weight: 800;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  line-height: 14px;
  padding: 3px;
  margin: -3px;
`;

export const Subtitle = styled.p`
  color: #444444;
  font-family: ${FONTS.LiberGrotesqueRegular};
  font-size: 10px;
  line-height: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  padding: 3px;
  margin: -3px;
`;

export const About = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Long = styled.div`
  color: #444;
  font-size: 8px;
  line-height: 14px;
  font-family: ${FONTS.LiberGrotesqueRegular};
`;

export const Rate = styled.div`
  display: flex;
  color: #444;
  align-items: center;
  font-size: 8px;
  line-height: 14px;
  font-family: ${FONTS.LiberGrotesqueRegular};
`;

export const Star = styled.div`
  background-color: yellowgreen;
  width: 11px;
  height: 11px;
  margin: 0 4px;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
`;

export const Dollar = styled.div``;
