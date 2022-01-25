import styled from 'styled-components';
import { Colors } from '@types';
import { rgba } from 'polished';
import { margin, MarginProps } from 'styled-system';
import { textMixin } from 'styles/helpers';
import { media } from 'styles/media';
import { NavLink } from 'react-router-dom';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${media.desktop`
    height: 100%;
    width: 100%;
    margin-bottom: 0;
  `}

  ${media.height(450)`
    height: auto;
  `}
`;

export const Avatar = styled.div`
  width: 131px;
  overflow: hidden;
  flex-shrink: 0;
  min-height: 131px;
  min-width: 131px;
  height: 131px;
  margin-bottom: 32px;
  border-radius: 50%;
  border: 6px solid white;
  background-color: ${Colors.mischka};
  box-shadow: 0 13px 14px ${rgba(Colors.black, 0.08)};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const Nav = styled.ul<MarginProps>`
  width: fit-content;

  ${margin}
`;

export const Link = styled(NavLink)<{
  activeClassNameBoolean: boolean;
  colorLinks: string;
}>`
  border-bottom: ${({ activeClassNameBoolean, colorLinks }) =>
    activeClassNameBoolean ? `1px solid ${colorLinks}` : 'none'};
  padding-bottom: 1px;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 210px;
    width: 100%;
    padding: 0 0 3px 0;
  }
`;

export const NavItem = styled.li<{
  cursor?: 'pointer' | 'default';
  colorText: string;
}>`
  display: flex;
  align-items: center;
  width: fit-content;
  position: relative;
  cursor: ${p => p.cursor || 'default'};
  margin-bottom: 25px;
  color: ${({ colorText }) => colorText}!important;

  ${textMixin({
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 16,
  })}
  
  ${media.desktop`
    ${textMixin({
      fontType: 'liberGrotesqueExtraBold',
      fontSize: 16,
    })}
  `}

  ${media.height(890)`
    margin-bottom: 20px;
  `}
`;
