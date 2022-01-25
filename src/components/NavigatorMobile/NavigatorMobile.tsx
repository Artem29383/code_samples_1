import React, { memo } from 'react';
import { CSSTransition } from 'react-transition-group';

import { animationMenu, Colors } from '@types';

import { useAction } from 'hooks/useAction';
import { actions } from 'models/user';
import { useSelector } from 'hooks/useSelector';
import { authorizedSelector } from 'models/user/selectors';

import Navigator from 'components/Navigator';
import SettingsEdit from 'components/SettingsEdit';

import useClickAway from 'hooks/useClickAway';
import useWindowResize from 'hooks/useWindowResize';

import * as Styled from './NavigatorMobile.styled';

type Props = {
  showMenu: boolean;
  setOpenMenu: () => void;
};

const NavigatorMobile = ({ showMenu, setOpenMenu }: Props) => {
  const handleSignOut = useAction(actions.signOutUser);
  const user = useSelector(authorizedSelector);
  const { ref, active, toggle } = useClickAway(false);
  const { width: windowWidth } = useWindowResize();

  return (
    <>
      <CSSTransition
        classNames="drop"
        timeout={animationMenu.animationBackGround}
        in={showMenu}
        unmountOnExit
      >
        <Styled.BlackGround onClick={setOpenMenu} />
      </CSSTransition>
      <CSSTransition
        classNames="fade"
        timeout={animationMenu.animationDashBoardMenu}
        in={showMenu}
        unmountOnExit
      >
        <Styled.NavigatorMobile>
          <Styled.BackDrop onClick={setOpenMenu} />
          <Styled.NavigatorBackDrop>
            <Navigator
              activeClassName="activeRoute"
              colorIcons={Colors.white}
              colorLinks={Colors.white}
              onSignOut={handleSignOut}
              firstName={user?.firstName || ''}
              lastName={user?.lastName || ''}
              avatarUrl={user?.avatarUrl || ''}
              windowWidth={windowWidth}
              onToggle={toggle}
              onHideMenu={setOpenMenu}
            />
          </Styled.NavigatorBackDrop>
          <CSSTransition
            classNames="swipe"
            timeout={500}
            in={active}
            unmountOnExit
          >
            <Styled.Settings ref={ref}>
              <SettingsEdit
                onClick={() => {
                  setOpenMenu();
                  toggle();
                }}
              />
            </Styled.Settings>
          </CSSTransition>
        </Styled.NavigatorMobile>
      </CSSTransition>
    </>
  );
};

export default memo(NavigatorMobile);
