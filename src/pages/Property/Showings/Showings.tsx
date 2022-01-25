import React, { memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/properties';
import { useSelector } from 'hooks/useSelector';
import { disabledFieldsSelector } from 'models/properties/selectors';

import Datepicker from 'components/Datepicker';
import Text from 'components/Text';
import Button from 'components/Button';
import Switch from 'pages/Property/Showings/Switch';

import * as Styled from './Showings.styled';

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { type: 'spring', delay: 0.3 },
  },
};

const Showings = ({
  id,
  reference,
  listAgentFullName,
  listAgentStateLicense,
  listOfficeMlsId,
  listOfficeName,
}: {
  id: number;
  reference: React.RefObject<HTMLDivElement>;
  listOfficeName: string;
  listAgentFullName: string;
  listAgentStateLicense: string;
  listOfficeMlsId: string;
}) => {
  const [typeMeet, setTypeMeet] = useState<null | boolean>(null);
  const [initialDate, setInitialDate] = useState(false);
  const [activeDay, setActiveDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const postShowingRequest = useActionWithPayload(actions.postShowingRequest);
  const getFieldsDisabled = useActionWithPayload(actions.getFieldsDisabled);
  const disabledFields = useSelector(disabledFieldsSelector);

  const handleChangeDate = useCallback(
    (string: string) => {
      setCurrentDate(string);
      getFieldsDisabled(string);
    },
    [getFieldsDisabled]
  );

  const activeHandlerStageDay = useCallback(
    (e: React.SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      setActiveDay(target.textContent as string);
    },
    [setActiveDay]
  );

  const submitRequest = () => {
    postShowingRequest({
      property_id: id,
      tour_date: currentDate,
      showing_type: typeMeet ? 'in_person' : 'virtual_walkthrough',
      preferred_time_slot: activeDay.toLowerCase(),
    });
  };

  return (
    <Styled.Root ref={reference}>
      <Styled.ShowingsTitle>See this House</Styled.ShowingsTitle>
      <Text
        fontSize={{ m: '18px', t: '21px' }}
        lineHeight={{ m: '18px', t: '21px' }}
        fontType="bwGradualBold"
        marginBottom={{ m: '34px', t: '38px' }}
      >
        Select showing type
      </Text>
      <Styled.HowMeet>
        <Switch
          leftString="In Person"
          rightString="Virtual Walkthrough"
          onChange={setTypeMeet}
          value={typeMeet}
        />
      </Styled.HowMeet>
      {typeMeet !== null && (
        <Styled.ChooseDate
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <Text
            fontSize={{ m: '18px', t: '21px' }}
            lineHeight={{ m: '18px', t: '21px' }}
            fontType="bwGradualBold"
            marginBottom={{ m: '30px', t: '20px' }}
          >
            Choose Date
          </Text>
          <Datepicker
            id="datePickerShowing"
            onGetDate={handleChangeDate}
            init={initialDate}
            setInit={setInitialDate}
          />
        </Styled.ChooseDate>
      )}
      {initialDate && (
        <Styled.PreferredTime
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <Text
            fontSize={{ m: '18px', t: '21px' }}
            lineHeight={{ m: '18px', t: '21px' }}
            fontType="bwGradualBold"
            marginBottom="38px"
          >
            Preferred Time
          </Text>
          <Styled.StagesDays>
            <Styled.DayStage
              onClick={activeHandlerStageDay}
              isActive={activeDay === 'Morning'}
              disabled={disabledFields.includes('morning')}
            >
              <Text
                cursor="pointer"
                fontSize={{ m: '16px', t: '18px' }}
                lineHeight={{ m: '16px', t: '18px' }}
                fontType="liberGrotesqueExtraBold"
                color={activeDay === 'Morning' ? 'white' : 'cornFlowerBlue'}
              >
                Morning
              </Text>
            </Styled.DayStage>
            <Styled.DayStage
              onClick={activeHandlerStageDay}
              isActive={activeDay === 'Afternoon'}
              disabled={disabledFields.includes('afternoon')}
            >
              <Text
                cursor="pointer"
                fontSize={{ m: '16px', t: '18px' }}
                lineHeight={{ m: '16px', t: '18px' }}
                fontType="liberGrotesqueExtraBold"
                color={activeDay === 'Afternoon' ? 'white' : 'cornFlowerBlue'}
              >
                Afternoon
              </Text>
            </Styled.DayStage>
            <Styled.DayStage
              onClick={activeHandlerStageDay}
              isActive={activeDay === 'Evening'}
              disabled={disabledFields.includes('evening')}
            >
              <Text
                cursor="pointer"
                fontSize={{ m: '16px', t: '18px' }}
                lineHeight={{ m: '16px', t: '18px' }}
                fontType="liberGrotesqueExtraBold"
                color={activeDay === 'Evening' ? 'white' : 'cornFlowerBlue'}
              >
                Evening
              </Text>
            </Styled.DayStage>
          </Styled.StagesDays>
        </Styled.PreferredTime>
      )}
      {initialDate && (
        <motion.div variants={variants} initial="hidden" animate="visible">
          <Styled.SubmitRequest>
            <Button disabled={!activeDay.trim()} onClick={submitRequest}>
              Request Showing
            </Button>
          </Styled.SubmitRequest>
          <Text
            color="bombay"
            fontSize={17}
            maxWidth={415}
            align="center"
            margin={{ m: '25px auto 0', t: '25px auto 0' }}
            lineHeight="22px"
            fontType="liberGrotesqueBold"
          >
            {listAgentFullName &&
            listOfficeMlsId &&
            listOfficeName &&
            listAgentStateLicense
              ? `Listing Agent: ${listAgentFullName}, ${listOfficeName} License #B
        ${listAgentStateLicense} | Data provided by LVR`
              : ''}
          </Text>
        </motion.div>
      )}
    </Styled.Root>
  );
};

export default memo(Showings);
