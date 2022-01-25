import React, { useState, useRef, useCallback, MutableRefObject } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import { CommonProps } from './types';

import {
  PropertyTypeFilters,
  PerksFilters,
  PropertyType,
  Perks as PerksType,
  Filters as FiltersType,
  RuleFilters,
  Rule,
  StatusesFilters,
  Tag,
  TagsFilters,
} from 'models/properties/types';
import { SaveSearchPayload } from 'models/searches/types';

import Size from './Size';
import Perks from './Perks';
import Advanced from './Advanced';
import Finder from 'pages/Properties/Filters/Finder';

import useToggle from 'hooks/useToggle';
import useLayout from 'hooks/useLayout';

import PopupModal from 'components/Modal/PopupModal';
import Text from 'components/Text';
import Button from 'components/Button';

import history from 'utils/history';

import * as Styled from './Filters.styled';

type Tabs = 'size' | 'perks' | 'advanced';

type Props = {
  filters: FiltersType;
  onSetTypeFilters: (payload: PropertyTypeFilters) => void;
  onSetPerksFilters: (payload: PerksFilters) => void;
  onSetRuleFilters: (payload: RuleFilters) => void;
  onSetStatusesFilters: (payload: StatusesFilters) => void;
  onSetTagsFilters: (payload: TagsFilters) => void;
  onSaveSearch: (payload: SaveSearchPayload) => void;
};

const tabsContent: Record<
  Tabs,
  (props: {
    propertyTypesFilters: PropertyTypeFilters;
    perksFilters: PerksFilters;
    statusesFilters: StatusesFilters;
    tagsFilters: TagsFilters;
    onStatusFilterChange: (item: string) => void;
    onTagFilterChange: (item: Tag) => void;
    onPropertyTypesFilterChange: (item: PropertyType) => void;
    onPerksFilterChange: (item: PerksType) => void;
    rulesFiltersValues: MutableRefObject<RuleFilters>;
    pickerSize: number;
    toggleSaveModal: () => void;
    onResetFilters: () => void;
  }) => React.ReactNode
> = {
  size: props => <Size {...props} />,
  perks: props => <Perks {...props} />,
  advanced: props => <Advanced {...props} />,
};

const Filters = ({
  onSave,
  onSetRuleFilters,
  onSetPerksFilters,
  onSetStatusesFilters,
  onSetTagsFilters,
  onSetTypeFilters,
  onSaveSearch,
  filters,
  saveTitle,
  reference,
  onResetFilters,
  view,
}: Props & CommonProps) => {
  const [tab, setTab] = useState<'size' | 'perks' | 'advanced'>('size');
  const layout = useLayout();

  const rulesFiltersValues = useRef({ ...filters.rules });
  const [statusesFilters, setStatusesFilters] = useState(
    filters.boolean.statuses
  );
  const [perksFilters, setPerksFilters] = useState(filters.boolean.perks);
  const [propertyTypesFilters, setPropertyTypesFilters] = useState(
    filters.boolean.types
  );
  const [tagsFilters, setTagsFilters] = useState(filters.boolean.tags);

  const [saveModalOpen, toggleSaveModal] = useToggle(false);

  const handleSave = useCallback(() => {
    const query = new URLSearchParams(history.location.search);

    query.delete('pt');
    query.delete('pk');
    query.delete('s');
    query.delete('t');

    Object.keys(propertyTypesFilters).forEach(key => {
      if (propertyTypesFilters[key as PropertyType]) {
        query.append('pt', key);
      }
    });

    Object.keys(perksFilters).forEach(key => {
      if (perksFilters[key as PerksType]) {
        query.append('pk', key);
      }
    });

    Object.keys(statusesFilters).forEach(key => {
      if (statusesFilters[key]) {
        query.append('s', key);
      }
    });

    Object.keys(tagsFilters).forEach(key => {
      if (tagsFilters[key as Tag]) {
        query.append('t', key);
      }
    });

    Object.keys(rulesFiltersValues.current).forEach(key => {
      const valueItem = rulesFiltersValues.current[key as Rule];

      query.delete(key);

      if (Array.isArray(valueItem)) {
        query.set(`${key}-${valueItem[0].rule}`, String(valueItem[0].value));
        query.set(`${key}-${valueItem[1].rule}`, String(valueItem[1].value));
      } else {
        query.set(`${key}-${valueItem.rule}`, String(valueItem.value));
      }
    });

    history.replace(`${history.location.pathname}?${query}`);

    onSetTypeFilters(propertyTypesFilters);
    onSetStatusesFilters(statusesFilters);
    onSetTagsFilters(tagsFilters);
    onSetPerksFilters(perksFilters);
    onSetRuleFilters(rulesFiltersValues.current);

    onSave();
  }, [
    onSave,
    onSetRuleFilters,
    onSetPerksFilters,
    onSetTypeFilters,
    onSetTagsFilters,
    onSetStatusesFilters,
    tagsFilters,
    perksFilters,
    statusesFilters,
    propertyTypesFilters,
  ]);

  const handlePerksFilterChange = useCallback(
    (item: PerksType) => {
      setPerksFilters({
        ...perksFilters,
        [item]: !perksFilters[item],
      });
    },
    [perksFilters]
  );

  const handleStatusesFilterChange = useCallback(
    (item: string) => {
      setStatusesFilters({
        ...statusesFilters,
        [item]: !statusesFilters[item],
      });
    },
    [statusesFilters]
  );

  const handleTagsFilterChange = useCallback(
    (item: Tag) => {
      setTagsFilters({
        ...tagsFilters,
        [item]: !tagsFilters[item],
      });
    },
    [tagsFilters]
  );

  const handlePropertyTypeFiltersChange = useCallback(
    (item: PropertyType) => {
      setPropertyTypesFilters({
        ...propertyTypesFilters,
        [item]: !propertyTypesFilters[item],
      });
    },
    [propertyTypesFilters]
  );

  const handleSaveSearch = useCallback(
    ({ title }: { title: string }) => {
      toggleSaveModal();
      onSaveSearch({
        title,
        query: {
          boolean: {
            types: propertyTypesFilters,
            perks: perksFilters,
            statuses: statusesFilters,
            tags: tagsFilters,
          },
          rules: rulesFiltersValues.current,
        },
      });
    },
    [
      onSaveSearch,
      toggleSaveModal,
      propertyTypesFilters,
      perksFilters,
      tagsFilters,
      statusesFilters,
    ]
  );

  const pickerSize = layout === 'mobile' ? 45 : 50;
  console.info(view);
  return (
    <Styled.Root>
      <Styled.Opacity opacity={view === 'to-map-list-up'}>
        {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <PopupModal
          isOpen={saveModalOpen}
          onClose={toggleSaveModal}
          onRequestClose={toggleSaveModal}
        >
          <Text
            fontType="bwGradualBold"
            fontSize={22}
            mb={35}
            color="mineShaft"
            align="center"
          >
            Enter search query name
          </Text>
          <Formik
            onSubmit={handleSaveSearch}
            initialValues={{ title: '' }}
            initialErrors={{ title: '' }}
            validationSchema={Yup.object({
              title: Yup.string().required(),
            })}
          >
            {({ isValid }) => (
              <Form>
                <Field name="title">
                  {({ field }: FieldProps) => (
                    <Styled.SaveSearchInput
                      {...field}
                      placeholder="Collection Name"
                    />
                  )}
                </Field>
                <Button disabled={!isValid} type="submit" width={274}>
                  Save & Add
                </Button>
              </Form>
            )}
          </Formik>
        </PopupModal>
        <Styled.Finder>
          <Finder reference={reference} />
        </Styled.Finder>
        <Styled.SaveControls>
          <Styled.SaveButton color="cornFlowerBlue" onClick={handleSave}>
            {saveTitle}
          </Styled.SaveButton>
          {/*  <Styled.SaveButton color="burningOrange" onClick={toggleSaveModal}> */}
          {/*    Save search */}
          {/*  </Styled.SaveButton> */}
        </Styled.SaveControls>
        {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <Styled.Tabstrip>
          <Styled.TabsContainer>
            <Styled.Tab active={tab === 'size'} onClick={() => setTab('size')}>
              Size
            </Styled.Tab>
            <Styled.Tab
              active={tab === 'perks'}
              onClick={() => setTab('perks')}
            >
              Perks
            </Styled.Tab>
            <Styled.Tab
              active={tab === 'advanced'}
              onClick={() => setTab('advanced')}
            >
              Advanced
            </Styled.Tab>
          </Styled.TabsContainer>
        </Styled.Tabstrip>
        {/* <Addresses mapLoaded={mapLoaded} mb={33} /> */}
        {tabsContent[tab]({
          tagsFilters,
          perksFilters,
          statusesFilters,
          propertyTypesFilters,
          onStatusFilterChange: handleStatusesFilterChange,
          onTagFilterChange: handleTagsFilterChange,
          onPerksFilterChange: handlePerksFilterChange,
          onPropertyTypesFilterChange: handlePropertyTypeFiltersChange,
          rulesFiltersValues,
          pickerSize,
          toggleSaveModal,
          onResetFilters,
        })}
      </Styled.Opacity>
    </Styled.Root>
  );
};

export default Filters;
