import React, { useEffect } from 'react';
import Header from 'components/Header';
import { AnimatePresence } from 'framer-motion';
import Nav from 'components/Nav';
import NavigatorMobile from 'components/NavigatorMobile/NavigatorMobile';
import * as Styled from './SellLayout.styled';
import useToggle from 'hooks/useToggle';
import useWindowResize from 'hooks/useWindowResize';
import { useSelector } from 'hooks/useSelector';
import { authorizedSelector } from 'models/user/selectors';

type Props = {
  children: React.ReactNode;
};

const SellLayout = ({ children }: Props) => {
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
    </Styled.Root>
  );
};

export default SellLayout;
