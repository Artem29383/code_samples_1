import React, { memo, useCallback, useEffect, useState } from 'react';
import numeral from 'numeral';

import Text from 'components/Text';
import Input from 'components/Input';

import { validationInputMoney } from 'utils/validationInputMoney';

import * as Styled from './PaymentCalculator.styled';

const PaymentCalculator = ({
  totalPrice,
  annualTaxAmount,
  hoaFee,
}: {
  totalPrice: string;
  annualTaxAmount: string;
  hoaFee: string;
}) => {
  const [payment, setPayment] = useState<string | number>(0);
  const [mortgagePercent, setMortgagePercent] = useState<string | number>(0);
  const [commonSumma, setCommonSumma] = useState<string>('$');
  const [mortGage, setMortGage] = useState<string>('$');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      Number(hoaFee) +
        Number(annualTaxAmount) +
        Number(mortGage.replace('$', '')) +
        Number(commonSumma.replace('$', ''))
    );
  }, [commonSumma, mortGage, hoaFee, annualTaxAmount]);

  const paymentChangeHandler = useCallback(
    e => {
      const value =
        e.currentTarget.value.length > 2 ? payment : e.currentTarget.value;
      setPayment(value);
      setCommonSumma(
        `$${((parseFloat(totalPrice.replace(',', '')) / 100) * +value)
          .toFixed(0)
          .toString()}`
      );
    },
    [payment, totalPrice]
  );

  const mortGagePercentHandler = useCallback(
    e => {
      const value =
        e.currentTarget.value.length > 2
          ? mortgagePercent
          : e.currentTarget.value;
      setMortgagePercent(value);
      setMortGage(
        `$${((parseFloat(totalPrice.replace(',', '')) / 100) * +value)
          .toFixed(0)
          .toString()}`
      );
    },
    [mortgagePercent, totalPrice]
  );

  const commonSummaHandler = useCallback(
    e => {
      const value = validationInputMoney(e, commonSumma, 10);
      const modValue = +value.replace('$', '');
      const percent = (
        (modValue / parseFloat(totalPrice.replace(',', ''))) *
        100
      )
        .toFixed(0)
        .toString();
      if (+percent >= 100) return;
      setCommonSumma(value);
      setPayment(modValue === 0 ? 0 : percent);
    },
    [commonSumma, totalPrice]
  );

  const mortGageChangeHandler = useCallback(
    e => {
      const value = validationInputMoney(e, mortGage, 10);
      const modValue = +value.replace('$', '');
      const percent = (
        (modValue / parseFloat(totalPrice.replace(',', ''))) *
        100
      )
        .toFixed(0)
        .toString();
      if (+percent >= 100) return;
      setMortGage(value);
      setMortgagePercent(modValue === 0 ? 0 : percent);
    },
    [mortGage, totalPrice]
  );

  return (
    <Styled.Root>
      <Styled.Wrapper>
        <Styled.Header>
          <Styled.Title>Payment Calculator</Styled.Title>
        </Styled.Header>
        <Styled.Body>
          <Styled.Left>
            <Styled.Line>
              <Text
                fontSize={{ m: '16px', t: '18px' }}
                lineHeight={{ m: '16px', t: '20px' }}
                fontType="liberGrotesqueRegular"
              >
                Down Payment
              </Text>
              <Styled.InputWrapper ml={10}>
                <Input
                  width={4}
                  division={{ t: 2.16, m: 2.35 }}
                  value={payment.toString()}
                  onChange={paymentChangeHandler}
                  name="percent"
                  isError={false}
                  type="number"
                />
                <Text
                  fontType="liberGrotesqueBlack"
                  fontSize={{ m: '16px', t: '14px' }}
                  color="emperor"
                >
                  %
                </Text>
              </Styled.InputWrapper>
            </Styled.Line>
            <Styled.Line>
              <Text
                fontSize={{ m: '16px', t: '18px' }}
                lineHeight={{ m: '16px', t: '20px' }}
                fontType="liberGrotesqueRegular"
              >
                Mortgage
              </Text>
              <Styled.InputWrapper ml={10}>
                <Input
                  width={4}
                  division={{ t: 2.16, m: 2.35 }}
                  value={mortgagePercent.toString()}
                  onChange={mortGagePercentHandler}
                  name="percent"
                  isError={false}
                  type="number"
                />
                <Text
                  fontType="liberGrotesqueBlack"
                  fontSize={{ m: '16px', t: '14px' }}
                  color="emperor"
                >
                  %
                </Text>
              </Styled.InputWrapper>
            </Styled.Line>
            {annualTaxAmount && (
              <Styled.Line>
                <Text
                  fontSize={{ m: '16px', t: '18px' }}
                  lineHeight={{ m: '16px', t: '20px' }}
                  fontType="liberGrotesqueRegular"
                >
                  Property Tax
                </Text>
              </Styled.Line>
            )}
            {hoaFee && (
              <Styled.Line>
                <Text
                  fontSize={{ m: '16px', t: '18px' }}
                  lineHeight={{ m: '16px', t: '20px' }}
                  fontType="liberGrotesqueRegular"
                >
                  HOA Fee
                </Text>
              </Styled.Line>
            )}
          </Styled.Left>
          <Styled.Right>
            <Styled.Line flex="flex-end">
              <Styled.InputWrapper>
                <Input
                  fontSize={{ t: 24, m: 22 }}
                  division={{ t: 1.77, m: 1.76 }}
                  width={4}
                  value={commonSumma}
                  onChange={commonSummaHandler}
                  name="percent"
                  isError={false}
                  type="text"
                />
              </Styled.InputWrapper>
            </Styled.Line>
            <Styled.Line flex="flex-end">
              <Styled.InputWrapper>
                <Input
                  fontSize={{ t: 24, m: 22 }}
                  division={{ t: 1.77, m: 1.76 }}
                  width={4}
                  value={mortGage}
                  onChange={mortGageChangeHandler}
                  name="percent"
                  isError={false}
                  type="text"
                />
              </Styled.InputWrapper>
            </Styled.Line>
            {annualTaxAmount && (
              <Styled.Line flex="flex-end">
                <Text
                  fontSize={{ t: 24, m: 22 }}
                  lineHeight="48px"
                  fontType="liberGrotesqueBlack"
                >
                  ${annualTaxAmount}
                </Text>
              </Styled.Line>
            )}
            {hoaFee && (
              <Styled.Line flex="flex-end">
                <Text
                  fontSize={{ t: 24, m: 22 }}
                  lineHeight="48px"
                  fontType="liberGrotesqueBlack"
                >
                  ${hoaFee}
                </Text>
              </Styled.Line>
            )}
          </Styled.Right>
        </Styled.Body>
        <Styled.Estimated>
          <Text fontType="bwGradualBold" fontSize={21} lineHeight="21px">
            Estimated Total
          </Text>
          <Text fontType="bwGradualBold" fontSize={21} lineHeight="21px">
            ${numeral(total).format('0,0')}
          </Text>
        </Styled.Estimated>
      </Styled.Wrapper>
    </Styled.Root>
  );
};

export default memo(PaymentCalculator);
