import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { actions } from 'models/requests';
import { useActionWithPayload } from 'hooks/useAction';
import { groupToursSelector, loadSelector } from 'models/requests/selectors';
import { useSelector } from 'hooks/useSelector';

import Showings from './Showings';
import useWindowResize from 'hooks/useWindowResize';

const year = format(new Date(), 'yyyy');

const ShowingsContainer = () => {
  const getGroupTours = useActionWithPayload(actions.getGroupTours);
  const setGroupTours = useActionWithPayload(actions.setGroupTours);
  const groupTours = useSelector(groupToursSelector);
  const [month, setMonth] = useState(0);
  const { width: windowWidth } = useWindowResize();
  const isLoad = useSelector(loadSelector);
  const setLoad = useActionWithPayload(actions.setLoad);

  useEffect(() => {
    setLoad(true);
    getGroupTours({
      tour_month: `${year}-${
        ((month as unknown) as number) + 1 > 12 ? 1 : month + 1
      }`,
    });
    return () => {
      setGroupTours({});
    };
  }, [month, getGroupTours, setGroupTours, setLoad]);

  return (
    <Showings
      isLoad={isLoad}
      groupTours={groupTours}
      setMonth={setMonth}
      windowWidth={windowWidth}
    />
  );
};

export default ShowingsContainer;
