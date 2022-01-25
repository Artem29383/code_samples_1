import React, { memo } from 'react';

import Text from 'components/Text';

import * as Styled from 'pages/Property/Map/Map.Styled';

type Props = {
  $map: React.RefObject<HTMLDivElement>;
  onServiceNearBy: (
    type: string,
    title: string,
    keywords: string,
    types: string[]
  ) => void;
  buttonsPanel: {
    title: string;
    type: string;
    ComponentIcon: React.FC;
    ComponentIconActive: React.FC;
    bgc: string;
    types: string[];
    keywords: string;
    status: boolean;
  }[];
  isLoad: boolean;
  TRANSITION_TIMING: number;
};

const Map = ({
  buttonsPanel,
  onServiceNearBy,
  $map,
  isLoad,
  TRANSITION_TIMING,
}: Props) => (
  <Styled.Root>
    <Styled.Panel>
      {buttonsPanel.map(
        ({
          type,
          title,
          ComponentIcon,
          bgc,
          status,
          keywords,
          types,
          ComponentIconActive,
        }) => (
          <Styled.Button
            key={title}
            onClick={
              isLoad
                ? () => {}
                : () => onServiceNearBy(type, title, keywords, types)
            }
          >
            <Styled.Icon backgroundColor={bgc} isActive={status}>
              {status ? <ComponentIconActive /> : <ComponentIcon />}
            </Styled.Icon>
            <Text
              fontType="liberGrotesqueNews"
              fontSize={{ d: '11px', m: '7px' }}
              color="dovGray"
            >
              {title}
            </Text>
          </Styled.Button>
        )
      )}
    </Styled.Panel>
    <Styled.Map
      TRANSITION_TIMING={TRANSITION_TIMING}
      isLoad={isLoad}
      ref={$map}
      id="#map"
    />
    ;
  </Styled.Root>
);

export default memo(Map);
