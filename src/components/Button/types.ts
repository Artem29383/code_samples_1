import { MarginProps, SizeProps } from '@types';

export type CommonProps = {
  disabled?: boolean;
} & MarginProps &
  SizeProps;
