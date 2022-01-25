import React from 'react';
import _uniqueId from 'lodash/uniqueId';

import Button from 'components/Button';
import MultiplePicker from 'components/MultiplePicker';
import Datepicker from 'components/Datepicker';
import RangeInput from 'components/RangeInput';
import FilterButton from 'pages/Properties/FilterButton';
import ListButton from 'pages/Properties/ListButton';
import MapButton from 'pages/Properties/MapButton';
import HoverSlider from 'components/HoverSlider';
import Text from 'components/Text';
import RangeSlider from 'components/RangeSlider/RangeSlider';
import ItemsSlider from 'components/ItemsSlider';
import ButtonSvg from 'components/ButtonSvg';

import { icons } from 'styles/icons';
// import Calendar from 'components/Calendar';

import { useDispatch } from 'react-redux';
import { actions } from 'models/pushes';

import * as Styled from './UI.styled';

const images = [
  {
    url:
      'https://offers-simply.s3.amazonaws.com/uploads/properties/photo/image/614380/card_photo-988744365.jpeg',
    id: 111,
  },
  {
    url:
      'https://offers-simply.s3.amazonaws.com/uploads/properties/photo/image/614379/card_photo-988744366.jpeg',
    id: 112,
  },
  {
    url:
      'https://offers-simply.s3.amazonaws.com/uploads/properties/photo/image/614378/card_photo-988744367.jpeg',
    id: 113,
  },
];

const UI = () => {
  const dispatch = useDispatch();

  const PhotoIcon = icons.photo;
  const overlay = (
    <Styled.Overflow>
      <Styled.ShowMoreImages>
        <PhotoIcon width={55} height="auto" />
        <Text fontType="liberGrotesqueBlack" color="white" fontSize={15}>
          Show the rest 13 photos
        </Text>
      </Styled.ShowMoreImages>
    </Styled.Overflow>
  );

  return (
    <Styled.Root>
      <Styled.Header>UI components</Styled.Header>
      {/* <Styled.Section>
        <Styled.SubHeader>Calendar</Styled.SubHeader>
        <Calendar setMonth={() => {}} groupTours={[]} />
      </Styled.Section> */}
      <Styled.Section>
        <Styled.SubHeader>Items slider</Styled.SubHeader>
        <ItemsSlider
          callback={() => {}}
          elements={[2000, 2001, 2002, 2003, 2004, 2005, 2006]}
          m="0 auto"
          maxWidth={340}
        />
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>Range slider</Styled.SubHeader>
        <RangeSlider maxWidth={500} />
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>Hover slider</Styled.SubHeader>
        <HoverSlider
          onChange={id => console.info('id', id)}
          overlayEl={overlay}
          images={images}
          height={250}
          width={400}
        />
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>List button</Styled.SubHeader>
        <ListButton />
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>Map button</Styled.SubHeader>
        <MapButton onClick={() => {}} disabled={false} />
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>Text</Styled.SubHeader>
        <Text
          as="div"
          fontType="liberGrotesqueBlack"
          color="mineShaft"
          fontSize={20}
          mb={30}
        >
          Liber Grotesque Black
        </Text>
        <Text
          as="div"
          fontType="liberGrotesqueBold"
          color="mineShaft"
          fontSize={18}
          mb={30}
        >
          Liber Grotesque Bold
        </Text>
        <Text
          as="div"
          fontType="liberGrotesqueExtraBold"
          color="mineShaft"
          fontSize={16}
          mb={30}
        >
          Liber Grotesque Extra Bold
        </Text>
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>Datepicker</Styled.SubHeader>
        <Datepicker onGetDate={() => {}} id="datepicker" />
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>Filter button</Styled.SubHeader>
        <FilterButton onClick={() => {}} />
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>Range input</Styled.SubHeader>
        <Styled.RangeInputContainer>
          <RangeInput
            id="range-input"
            min={100}
            max={999}
            margin={1}
            start={[245, 599]}
            step={1}
            suffix="k"
            prefix="$"
            pickerWidth={70}
            onChange={values => console.info('values', values)}
          />
        </Styled.RangeInputContainer>
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>Mutlitple picker</Styled.SubHeader>
        <MultiplePicker
          onChange={value => console.info('value', value)}
          items={[
            { value: '1', active: false },
            { value: '2', active: false },
            { value: '3', active: false },
            { value: '4', active: true },
            { value: '5', active: false },
            { value: '6', active: false },
            { value: '7', active: false, suffix: '+' },
          ]}
        />
      </Styled.Section>
      {/* <Styled.Section>
        <Styled.SubHeader>Badges</Styled.SubHeader>
        <Styled.BadgesBg>
          <Badge icon={Icons.house} iconSize={[22, 19]} marginRight={20} />
          <Badge disabled icon={Icons.townhome} iconSize={[24, 23]} />
        </Styled.BadgesBg>
      </Styled.Section> */}
      <Styled.Section>
        <Styled.SubHeader>Buttons</Styled.SubHeader>
        <Button width={200} marginRight={20} marginBottom={20}>
          Some button
        </Button>
        <Button width={200} disabled>
          Some disabled button
        </Button>
        <ButtonSvg maxWidth={270} svg={icons.documentIcon}>
          Unpermitted additions
        </ButtonSvg>
      </Styled.Section>
      <Styled.Section>
        <Styled.SubHeader>Push notifications</Styled.SubHeader>
        <Button
          width={200}
          onClick={() =>
            dispatch(
              actions.addPush({
                id: _uniqueId('push_'),
                message: 'You were successfully signed up in system',
                title: 'Success',
                type: 'info',
              })
            )
          }
          marginRight={20}
          marginBottom={20}
        >
          Success notification
        </Button>
        <Button
          width={200}
          marginBottom={20}
          onClick={() =>
            dispatch(
              actions.addPush({
                id: _uniqueId('push_'),
                message: 'Internal server error. Please contact your admin.',
                title: 'Error',
                type: 'error',
              })
            )
          }
        >
          Error notification
        </Button>
      </Styled.Section>
    </Styled.Root>
  );
};

export default UI;
