import styled from 'styled-components';
import { Form as FormikForm } from 'formik';
import { Colors } from '@types';

export const Form = styled(FormikForm)`
  width: 100%;
`;

export const Text = styled.span`
  color: ${Colors.white};
  font-size: 18px;
`;
