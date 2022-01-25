import React from 'react';
import * as Styled from 'pages/Property/Property.styled';

type Props = {
  url: string;
  onImageError: (p: React.SyntheticEvent<HTMLImageElement>) => void;
};

const Slide = ({ url, onImageError }: Props) => {
  return (
    <Styled.SlideImage
      data-src={url}
      className="swiper-lazy"
      onError={onImageError}
    />
  );
};

export default Slide;
