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
  background-color: ${Colors.white};
  border-radius: 15px;
  padding: 27px 30px 27px;
  text-align: center;
  width: 80%;

  ${media.desktop`
    width: auto;
    min-width: 450px;
  `}
`;

export const Form = styled(FormikForm)`
  display: block;
`;

export const PasswordDesc = styled.div`
  ${textMixin({
    fontType: 'bwGradualExtraBold',
    fontSize: 12,
    color: 'mischka',
  })}
`;

export const AdditionalControls = styled.div`
  margin-top: 20px;

  ${media.tablet`
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  `}
`;
