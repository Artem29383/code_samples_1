/* eslint-disable */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import TransparentScrollContainerX from 'components/TransparentScrollContainerX';

import { getComputedProp } from 'utils/getComputedProp';

import * as Styled from './Scrollable.styled';

type Props = {
  children: React.ReactNode;
  display?: string;
  trigger?: boolean;
  alignItem?: {
    m: string;
    t: string;
  };
  isServer?: boolean;
  direction?: string;
  padding?: {
    m?: string;
    d?: string;
    md?: string;
    bd?: string;
  };
  margin?: {
    m: string;
    d: string;
    md: string;
    bd: string;
  };
  isShadowEffect?: boolean;
};

let Root;

const Scrollable = ({
  children,
  display = 'flex',
  trigger,
  direction = 'row',
  alignItem = {
    m: 'center',
    t: 'flex-start',
  },
  isServer = true,
  padding = {
    m: '0',
    d: '0',
    md: '0',
    bd: '0',
  },
  margin = {
    m: '0',
    d: '0',
    md: '0',
    bd: '0',
  },
  isShadowEffect = false,
}: Props) => {
  const [widgetsWidthCommon, setWidgetsWidth] = useState(0);
  const $widgets = useRef<null | HTMLDivElement>(null);
  const $tape = useRef<null | HTMLDivElement>(null);
  const [$shadowTape, setShadowTape] = useState<null | HTMLDivElement>(null);
  const scrollStop = useRef(false);

  const calculateWidgetsWidth = useCallback(
    (HTMLCollection: Array<Element>) => {
      return HTMLCollection.reduce((acc, elem) => {
        const marginElement = getComputedProp(elem, 'margin-right')!
          .split('px')[0];
        const size = +marginElement + +elem.getBoundingClientRect().width;
        return (acc += size);
      }, 0);
    },
    []
  );

  const handleSetWidgetsWidth = useCallback(() => {
    const HTMLCollection = Array.from($widgets.current!.children);
    const paddingLeft = getComputedProp(
      $widgets.current!,
      'padding-left'
    )!.split('px')[0];

    const widgetsWidth = calculateWidgetsWidth(HTMLCollection);
    if (widgetsWidth) {
      setWidgetsWidth(widgetsWidth + +paddingLeft);
    }
  }, [calculateWidgetsWidth]);

  useEffect(() => {
    if ($widgets.current && widgetsWidthCommon === 0 && isServer) {
      handleSetWidgetsWidth();
    }
    return () => {
      setWidgetsWidth(0);
    };
  }, [$widgets, trigger, isServer, handleSetWidgetsWidth]);

  useEffect(() => {
    if ($widgets.current && !isServer) {
      handleSetWidgetsWidth();
    }
  }, [$widgets, trigger, isServer, children, handleSetWidgetsWidth]);

  /** wheel scroll event  */

  const handleWheel = (e: { preventDefault: () => void; deltaY: number; deltaX: number; }) => {
    const finishScroll = $widgets.current!.getBoundingClientRect().width;
    const startScroll = 0
    e.preventDefault();

    $tape.current!.scrollLeft += e.deltaY * 1;
    $tape.current!.scrollLeft += e.deltaX * 1;
    if (Math.ceil($tape.current!.scrollLeft + window.innerWidth) >= finishScroll) {
      scrollStop.current = true;
      return;
    }
    if ($tape.current!.scrollLeft === startScroll) {
      scrollStop.current = true;
      return;
    }
  }

  useEffect(() => {
      if ($tape.current && !isShadowEffect && $widgets.current) {
        $tape.current.addEventListener('wheel', handleWheel);
      }
      if ($shadowTape && isShadowEffect && $widgets) {
        $shadowTape.addEventListener('wheel', function(e) {
          e.preventDefault();
          this.scrollLeft += e.deltaX * 1;
          this.scrollLeft += e.deltaY * 1;
        });
      }
  }, [$shadowTape, $widgets]);

  Root = <Styled.Root
    padding={padding}
    direction={direction}
    alignItem={alignItem}
    display={display}
    ref={$widgets}
    width={widgetsWidthCommon || 10000}
  >
    {children}
  </Styled.Root>;

  return isShadowEffect ? (
    <Styled.OverFlow
      isShadowEffect={isShadowEffect}
      margin={margin}
      ref={$tape}
    >
      <TransparentScrollContainerX setShadowTape={setShadowTape}>
        {Root}
      </TransparentScrollContainerX>
    </Styled.OverFlow>
  ) : (
    <Styled.OverFlow margin={margin} ref={$tape}>
      {Root}
    </Styled.OverFlow>
  );
};

export default memo(Scrollable);
