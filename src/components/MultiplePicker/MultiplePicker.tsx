import React, { useState } from 'react';
import { MarginProps } from 'styled-system';

import takeWhile from 'lodash/takeWhile';
import takeRightWhile from 'lodash/takeRightWhile';

import * as Styled from './MultiplePicker.styled';

type Props<T extends string | number> = {
  onChange: (param: T[] | T) => void;
  multiple?: boolean;
  size?: number;
  items: {
    value: T;
    active: boolean;
    suffix?: string;
    prefix?: string;
  }[];
} & MarginProps;

const MultiplePicker = <T extends string | number>({
  items,
  onChange,
  multiple = true,
  size = 50,
  ...rest
}: Props<T>) => {
  const [pickItems, setItems] = useState(items);

  const firstPart = takeWhile(pickItems, ({ active }) => !active);
  const activePart = pickItems.filter(({ active }) => active);
  const lastPart = takeRightWhile(pickItems, ({ active }) => !active);

  return (
    <Styled.Root size={size} {...rest}>
      <Styled.Items isFirstActive={firstPart.length === 0}>
        <Styled.Part size={size}>
          {firstPart.map(pickItem => (
            <Styled.Item
              key={pickItem.value}
              size={size}
              onClick={() => {
                if (multiple) {
                  setItems([
                    ...takeWhile(
                      firstPart,
                      ({ value }) => pickItem.value !== value
                    ),
                    { ...pickItem, active: true },
                    ...takeRightWhile(
                      firstPart,
                      ({ value }) => pickItem.value !== value
                    ).map(item => ({ ...item, active: true })),
                    ...activePart,
                    ...lastPart,
                  ]);

                  onChange([
                    pickItem.value,
                    ...takeRightWhile(
                      firstPart,
                      ({ value }) => pickItem.value !== value
                    ).map(item => item.value),
                    ...activePart.map(item => item.value),
                  ]);
                } else {
                  setItems(
                    pickItems.map(item => ({
                      ...item,
                      active: item.value === pickItem.value,
                    }))
                  );

                  onChange(pickItem.value);
                }
              }}
            >
              {pickItem.prefix && pickItem.prefix}
              {pickItem.value}
              {pickItem.suffix && pickItem.suffix}
            </Styled.Item>
          ))}
        </Styled.Part>
        <Styled.ActivePart size={size}>
          {activePart.map(pickItem => (
            <Styled.Item
              key={pickItem.value}
              size={size}
              onClick={() => {
                if (multiple) {
                  if (activePart.length > 1) {
                    setItems(
                      pickItems.map(item => ({
                        ...item,
                        active: item.value === pickItem.value,
                      }))
                    );

                    onChange(pickItem.value);
                  }
                } else {
                  setItems(
                    pickItems.map(item => ({
                      ...item,
                      active: item.value === pickItem.value,
                    }))
                  );

                  onChange(pickItem.value);
                }
              }}
            >
              {pickItem.prefix && pickItem.prefix}
              {pickItem.value}
              {pickItem.suffix && pickItem.suffix}
            </Styled.Item>
          ))}
        </Styled.ActivePart>
        <Styled.Part size={size}>
          {lastPart.map(pickItem => (
            <Styled.Item
              key={pickItem.value}
              size={size}
              onClick={() => {
                if (multiple) {
                  setItems([
                    ...firstPart,
                    ...activePart,
                    ...takeWhile(
                      lastPart,
                      ({ value }) => pickItem.value !== value
                    ).map(item => ({ ...item, active: true })),
                    { ...pickItem, active: true },
                    ...takeRightWhile(
                      lastPart,
                      ({ value }) => pickItem.value !== value
                    ),
                  ]);

                  onChange([
                    ...activePart.map(item => item.value),
                    ...takeWhile(
                      lastPart,
                      ({ value }) => pickItem.value !== value
                    ).map(item => item.value),
                    pickItem.value,
                  ]);
                } else {
                  setItems(
                    pickItems.map(item => ({
                      ...item,
                      active: item.value === pickItem.value,
                    }))
                  );

                  onChange(pickItem.value);
                }
              }}
            >
              {pickItem.prefix && pickItem.prefix}
              {pickItem.value}
              {pickItem.suffix && pickItem.suffix}
            </Styled.Item>
          ))}
        </Styled.Part>
      </Styled.Items>
    </Styled.Root>
  );
};

export default MultiplePicker;
