import styled from 'styled-components';
import { Form as FormikForm } from 'formik';

import { Colors } from '@types';

import { textMixin } from 'styles/helpers';
import { media } from 'styles/media';

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Panel = styled.div`
  width: 80%;
  padding: 22px 20px 22px;
  background-color: ${Colors.white};
  border-radius: 15px;
  text-align: center;

  ${media.tablet`
    width: auto;
    min-width: 450px;
    padding: 27px 30px 27px;
  `}
`;

export const Form = styled(FormikForm)`
  display: block;
`;

export const Header = styled.h2`
  margin-bottom: 30px;

  ${textMixin({
    fontType: 'bwGradualExtraBold',
    fontSize: 22,
    color: 'malibu',
    align: 'center',
  })}
`;

export const PasswordDesc = styled.h2`
  margin-bottom: 20px;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 12,
    color: 'mischka',
  })}
`;
