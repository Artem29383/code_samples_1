import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useAction } from 'hooks/useAction';
import { actions } from 'models/steps';

import Steps from 'pages/Sell/Steps';

import useWindowResize from 'hooks/useWindowResize';

import { icons } from 'styles/icons';

import * as S from './Sell.styled';
import { useSelector } from 'hooks/useSelector';
import { stepSelector } from 'models/steps/selectors';

const SellTopIcon = icons.sellTop;
const SplashIcon = icons.splashIcon;
const SplashMobile = icons.svgMobileSplash;

const Sell = () => {
  const { width: windowWidth } = useWindowResize();
  const initialize = useAction(actions.initialize);
  const step = useSelector(stepSelector);
  const [widthProgress, setWidth] = useState(0);

  useEffect(() => {
    setWidth((windowWidth / 10) * step);
  }, [step, windowWidth]);

  useLayoutEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <S.Root>
      {windowWidth >= 1024 && (
        <SellTopIcon zIndex={-1} position="absolute" top="-90px" width="100%" />
      )}
      {windowWidth < 1024 && (
        <SplashMobile
          zIndex={-1}
          position="absolute"
          top="-72px"
          width="100%"
        />
      )}
      <Steps />
      <SplashIcon
        // @ts-ignore
        id="splash-icons"
        position="absolute"
        left="50%"
        bottom="0"
        zIndex={-1}
      />
      <S.ProgressBarControl>
        <S.ProgressRoot>
          <S.ProgressBar width={widthProgress} />
        </S.ProgressRoot>
      </S.ProgressBarControl>
    </S.Root>
  );
};

export default Sell;
