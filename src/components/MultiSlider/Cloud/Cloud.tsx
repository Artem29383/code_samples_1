import React, { memo } from 'react';

import { getFormatted } from 'utils/formattedCloudNumber';

import * as S from './Cloud.styled';

import { icons } from 'styles/icons';

const Pencil = icons.pencil;

type Props = {
  isEdit: boolean;
  onEditStart: () => void;
  value: number;
  onChange: (e: { target: { value: string } }) => void;
  onEditEnd: () => void;
  transform?: string;
  label: string;
  step: number;
  leftBorder: number;
  rightBorder: number;
  div: number;
  suffixThousand: string;
};

const Cloud = ({
  isEdit,
  onEditStart,
  value,
  onChange,
  onEditEnd,
  transform,
  label,
  step,
  leftBorder,
  rightBorder,
  div,
  suffixThousand,
}: Props) => (
  <S.Cloud transform={transform} isEdit={isEdit}>
    <S.Label isEdit={isEdit}>{label}</S.Label>
    {!isEdit ? (
      <S.Option onClick={onEditStart}>
        <S.Text>
          {getFormatted(
            value,
            step,
            leftBorder,
            rightBorder,
            div,
            suffixThousand
          )}
        </S.Text>
        <Pencil />
      </S.Option>
    ) : (
      <S.InputWrapper>
        <S.InputEdit
          type="number"
          autoFocus
          onChange={onChange}
          value={value}
          onBlur={onEditEnd}
        />
      </S.InputWrapper>
    )}
  </S.Cloud>
);

export default memo(Cloud);
