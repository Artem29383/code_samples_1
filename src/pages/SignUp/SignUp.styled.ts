import styled from 'styled-components';
import { Link as AppLink } from 'react-router-dom';
import { Form as FormikForm } from 'formik';

import { Colors } from '@types';

import { media } from 'styles/media';
import { textMixin } from 'styles/helpers';

const signUpIcon = require('assets/icons/sign-up.svg');

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Panel = styled.div`
  background-color: ${Colors.white};
  border-radius: 15px;
  padding: 27px 30px 27px;
  text-align: center;
  width: 80%;

  ${media.tablet`
    width: auto;
    min-width: 450px;
  `}
`;

export const Agreement = styled.div`
  margin-bottom: 20px;

  ${textMixin({
    fontType: 'affogatoMedium',
    fontSize: 16,
    color: 'mischka',
    align: 'center',
  })};
`;

export const SignIn = styled.div`
  display: flex;
  justify-content: center;
  color: ${Colors.mischka};
`;

export const Link = styled(AppLink)`
  position: relative;
  margin-left: 15px;

  ${textMixin({
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 16,
    color: 'malibu',
    align: 'center',
  })}

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: -8px;
    background-color: ${Colors.malibu};
  }
`;

export const Form = styled(FormikForm)`
  display: block;
`;

export const SignUpIcon = styled(signUpIcon)`
  width: 198px;
  height: auto;
  margin-bottom: 20px;
`;
