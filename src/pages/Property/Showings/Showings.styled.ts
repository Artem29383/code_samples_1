import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';
import { motion } from 'framer-motion';

export const Root = styled.div`
  padding: 0 22px 0 19px;
  max-width: 719px;
  width: 100%;
  margin: 0 auto;

  ${media.tablet`
     max-width: 100%
  `}

  ${media.desktop`
    max-width: 719px;
    margin: 109px auto 0 auto;
  `}
  
  ${media.bigDesktop`
    margin: 0;
    margin-top: 109px;
    margin-left: 215px;
  `}
`;

export const HowMeet = styled.div`
  max-width: 449px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 40px;
  overflow: hidden;
  margin: 0 auto;
  background: #f8f8f8;
  padding: 0 3px;

  ${media.desktop`
    padding: 0;
    height: 63px;
    background-color: ${Colors.white};
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    padding: 0 10px;
  `}

  ${media.bigDesktop`
    margin: 0;
    margin-left: 50px;
  `}
`;

export const Button = styled.div<{ isActive: boolean }>`
  max-width: 189px;
  cursor: pointer;
  width: 100%;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient( \n' +
        '-55deg\n' +
        ',#6a8dff 0%,#8d8fff 41%,#8d8fff 41%,#928fff 46%,#928fff 47%,#928fff 47%,#c192ff 100% );'
      : 'transparent'};
  border-radius: 40px;

  ${media.desktop`
    // @ts-ignore
    box-shadow: ${({ isActive }) =>
      isActive ? '0px 20px 30px 0 rgba(0, 0, 0, 0.1)' : 'initial'}
  `}
`;

export const VideoPreview = styled.div`
  color: ${Colors.emperor};
  font-family: LiberGrotesqueNews, sans-serif;
  font-size: 14px;
  margin-top: 23px;
  font-style: normal;
  letter-spacing: 0.35px;
  line-height: 14px;
  text-align: center;
  text-decoration: underline;

  ${media.bigDesktop`
     margin-left: 115px;
     text-align: left;
  `}
`;

export const ChooseDate = styled(motion.div)`
  padding: 20px 0 20px 0;
  margin-top: 30px;
  border-top: 2px solid ${Colors.bordero};
  border-bottom: 2px solid ${Colors.bordero};
  max-width: 748px;
  width: 100%;
  margin-bottom: 37px;

  ${media.tablet`
      max-width: 100%;
  `}

  ${media.desktop`
    max-width: 748px;
    padding: 52px 0 62px 0;
    margin-top: 50px;
  `}
`;

export const PreferredTime = styled(motion.div)`
  margin-top: 37px;
`;

export const StagesDays = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.tablet`
      justify-content: space-around;
  `}

  ${media.desktop`
      justify-content: space-between;
  `}
`;

export const DayStage = styled.button<{ isActive: boolean }>`
  box-shadow: ${({ isActive }) =>
    isActive ? '0 20px 30px rgba(0, 0, 0, 0.1)' : ''};
  max-width: 27vw;
  width: 100%;
  cursor:pointer;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient( \n' +
        '-55deg\n' +
        ',#6a8dff 0%,#8d8fff 41%,#8d8fff 41%,#928fff 46%,#928fff 47%,#928fff 47%,#c192ff 100% )'
      : 'transparent'};
  border-radius: 40px;
  border: ${({ isActive }) =>
    isActive ? '' : `3px solid ${Colors.cornFlowerBlue}`};
  
  &:disabled {
    border: 3px solid ${Colors.disableColor};
    cursor: not-allowed;
    background: transparent;
    
    & div {
      color: ${Colors.disableColor};
      cursor: not-allowed;
    }
  }

  ${media.tablet`
    max-width: 189px;
  `}

  ${media.desktop`
    max-width: 160px;
  `}
  
  ${media.mediumDesktop`
    max-width: 189px;
  `}
`;

export const SubmitRequest = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  button {
    max-width: 369px;
  }
`;

export const ShowingsTitle = styled.div`
  font-family: bwGradualBold, sans-serif;
  color: ${Colors.mineShaft};
  margin-bottom: 20px;
  line-height: 22px;
  font-size: 22px;
  
  ${media.tablet`
    font-size: 38px;
    line-height: 38px;
    margin-bottom: 60px;
  `}
  
  ${media.desktop`
    font-size: 28px;
    line-height: 28px;
  `}
  
  ${media.mediumDesktop`
    font-size: 30px;
    line-height: 30px;
  `}
  
  ${media.bigDesktop`
    font-size:38px;
    line-height: 38px;
  `}
`;
