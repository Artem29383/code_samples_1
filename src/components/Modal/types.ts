import { Props as ReactModalProps } from 'react-modal';

export type CommonProps = {
  children: React.ReactNode;
  onClose?: () => void;
} & ReactModalProps;
