import React from 'react';

import { CommonProps } from './types';

import Addresses from './Addresses';

import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/user';
import { listSelector } from 'models/addresses/selectors';
import { useSelector } from 'hooks/useSelector';

const AddressesContainer = (props: CommonProps) => {
  const addresses = useSelector(listSelector);
  const handleAddAddress = useActionWithPayload(actions.addUserAddress);
  const handleDeleteAddress = useActionWithPayload(actions.deleteUserAddress);
  const handleToggleActiveAddress = useActionWithPayload(
    actions.toggleUserAddressActive
  );

  return (
    <Addresses
      list={addresses}
      onToggleActive={handleToggleActiveAddress}
      onDelete={handleDeleteAddress}
      onAdd={handleAddAddress}
      {...props}
    />
  );
};

export default AddressesContainer;
