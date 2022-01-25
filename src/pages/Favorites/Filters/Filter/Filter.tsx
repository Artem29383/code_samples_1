import React, { memo, useCallback } from 'react';

import { actions } from 'models/favorites';

import { useActionWithPayload } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';
import { querySelector } from 'models/favorites/selectors';

import * as Styled from './Filter.styled';

type Props = {
  children: string;
  path: string;
  typeProperty: string;
};

const Filter = ({ children, path, typeProperty }: Props) => {
  const query = useSelector(querySelector);
  const handleFilterChange = useActionWithPayload(actions.filterChange);

  const handleToPath = useCallback(() => {
    if (query !== path) {
      handleFilterChange({
        query: path,
        propertyTypes: typeProperty,
      });
    }
  }, [query, path, handleFilterChange, typeProperty]);

  return (
    <Styled.Filter isActive={query === path} onClick={handleToPath}>
      {children}
    </Styled.Filter>
  );
};

export default memo(Filter);
