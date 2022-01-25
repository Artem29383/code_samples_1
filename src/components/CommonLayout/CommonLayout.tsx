import React, { memo } from 'react';
import UserPageLayoutContainer from 'components/UserPageLayout';

type Props = {
  children: React.ReactNode;
};

const CommonLayout = ({ children }: Props) => {
  return <UserPageLayoutContainer>{children}</UserPageLayoutContainer>;
};

export default memo(CommonLayout);
