import React, { useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';

import isExternalLink from 'utils/isExternalLink';

import AppLink from 'components/AppLink';

import * as Styled from './Nav.styled';

import Logo from 'components/Logo';

import { secondaryNavItems, mainNavItems } from './items';

type Props = {
  onClose: () => void;
};

const commonTransitionSettings = {
  ease: 'easeIn',
  duration: 0.3,
};

/* TODO Don't render if same route */
const Nav = ({ onClose }: Props) => {
  const rootAnimation = useAnimation();
  const mainItemAnimation = useAnimation();
  const secondaryItemAnimation = useAnimation();

  useEffect(() => {
    const animate = async () => {
      await rootAnimation.start({ opacity: 1 });

      await mainItemAnimation.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2 },
      }));

      await secondaryItemAnimation.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2 },
      }));
    };

    animate();
  });

  return (
    <Styled.Root
      animate={rootAnimation}
      initial={{ opacity: 0 }}
      exit={{ x: '100%' }}
      transition={commonTransitionSettings}
    >
      <Logo
        $white
        position="absolute"
        $zIndex={12}
        left={{ m: 15, t: 40 }}
        top={{ m: 15, t: 33 }}
        width={{ m: 200, t: 282 }}
        height="auto"
      />
      <Styled.Cross onClick={onClose}>
        <motion.span
          animate={{ rotate: 45 }}
          transition={{
            ...commonTransitionSettings,
            delay: 0.2,
          }}
        />
        <motion.span
          animate={{ rotate: -45 }}
          transition={{
            ...commonTransitionSettings,
            delay: 0.2,
          }}
        />
      </Styled.Cross>
      <Styled.NavItems position="absolute" top="19%" right={35}>
        {mainNavItems.map(({ title, to }, i) => (
          <Styled.MainNavItem
            custom={i}
            initial={{ opacity: 0, y: 50 }}
            animate={mainItemAnimation}
            key={title}
            onClick={isExternalLink(to) ? undefined : onClose}
          >
            <AppLink
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              to={to}
            />
            {title}
          </Styled.MainNavItem>
        ))}
      </Styled.NavItems>
      <Styled.NavItems position="absolute" bottom="5%" right={35}>
        {secondaryNavItems.map(({ title, to }, i) => (
          <Styled.SecondaryNavItem
            custom={i}
            initial={{ opacity: 0, y: -25 }}
            animate={secondaryItemAnimation}
            key={title}
            onClick={isExternalLink(to) ? undefined : onClose}
          >
            <AppLink
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              to={to}
            />
            {title}
          </Styled.SecondaryNavItem>
        ))}
      </Styled.NavItems>
    </Styled.Root>
  );
};

export default Nav;
