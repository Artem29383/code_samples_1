import React from 'react';
import { PositionProps, LayoutProps } from 'styled-system';

import { TranslateProps } from '@types';

import * as Styled from './Spinner.styled';

type Props = { id?: string } & PositionProps & TranslateProps & LayoutProps;

const Spinner = ({ id, ...rest }: Props) => <Styled.Root id={id} {...rest} />;

export default Spinner;
