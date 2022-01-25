import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from 'components/Header';
// import Footer from 'components/Footer';
import Nav from 'components/Nav';
import NavigatorMobile from 'components/NavigatorMobile';

import useToggle from 'hooks/useToggle';
import useWindowResize from 'hooks/useWindowResize';

import * as Styled from './Layout.styled';
import { useSelector } from 'hooks/useSelector';
import { authorizedSelector } from 'models/user/selectors';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isNavOpen, toggleNav] = useToggle(false);
  const [openMenu, setOpenMenu] = useToggle(false);
  const { width: windowWidth } = useWindowResize();
  const current = useSelector(authorizedSelector);

  useEffect(() => {
    if (openMenu) {
      document.body.classList.add('modal');
    }
    return () => {
      document.body.classList.remove('modal');
    };
  }, [openMenu]);

  return (
    <Styled.Root>
      <AnimatePresence>
        {isNavOpen && <Nav onClose={toggleNav} />}
      </AnimatePresence>
      <Header
        current={current}
        onMenuClick={toggleNav}
        windowWidth={windowWidth}
        onToggle={current !== null ? setOpenMenu : () => {}}
      />
      {windowWidth < 1025 && (
        <NavigatorMobile showMenu={openMenu} setOpenMenu={setOpenMenu} />
      )}
      <Styled.Content id="layout-content">{children}</Styled.Content>
      {/* <Footer /> */}
    </Styled.Root>
  );
};

export default Layout;
