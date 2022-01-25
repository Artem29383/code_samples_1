import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  forwardRef,
} from 'react';
import { LayoutProps, MarginProps } from 'styled-system';

import * as S from './HoverSlider.styled';

const imagePlaceholder = require('images/placeholder.jpg');

type Props = {
  // id?: number;
  images: { id: number; url: string }[];
  onChange?: (id: number) => void;
  overlayEl?: React.ReactNode | null;
} & LayoutProps &
  MarginProps;

const HoverSlider = forwardRef(
  (
    {
      // id = 0,
      images,
      overlayEl,
      onChange = () => {},
      ...rest
    }: Props,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [sliderImages, setSliderImages] = useState<
      {
        id: number;
        url: string;
        active: boolean;
        position: number;
        loaded: boolean;
      }[]
    >([]);

    const activeImageId = useRef<number>(images.length > 0 ? images[0].id : -1);

    useEffect(() => {
      if (rootRef.current) {
        const segment = Math.round(rootRef.current.clientWidth / images.length);

        setSliderImages(
          images.map((image, i) => ({
            ...image,
            active: i === 0,
            position: (i + 1) * segment - S.progressItemMargin,
            loaded: false,
          }))
        );
      }
    }, [images]);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (rootRef.current) {
          const rect = rootRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;

          const newImage = sliderImages.find(({ position }) => x < position);

          if (newImage && newImage.id !== activeImageId.current) {
            activeImageId.current = newImage.id;

            onChange(newImage.id);

            setSliderImages(
              sliderImages.map(image => ({
                ...image,
                active: newImage.id === image.id,
              }))
            );
          }
        }
      },
      [sliderImages, onChange]
    );

    const handleImageLoad = useCallback(
      (index: number) => {
        setSliderImages(
          sliderImages.map((image, i) => ({
            ...image,
            loaded: image.loaded || i === index,
          }))
        );
      },
      [sliderImages]
    );

    const handleImageLoadError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>, index: number) => {
        handleImageLoad(index);
        e.currentTarget.src = imagePlaceholder;
      },
      [handleImageLoad]
    );

    const sliderImagesLoaded =
      sliderImages.length > 0 && sliderImages.every(({ loaded }) => loaded);

    return (
      <S.Root onMouseMove={handleMouseMove} ref={rootRef} {...rest}>
        {overlayEl && overlayEl}
        {sliderImages.map(({ url, active }, i) => (
          <img
            style={{ display: active ? 'block' : 'none' }}
            onLoad={() => handleImageLoad(i)}
            onError={e => handleImageLoadError(e, i)}
            key={url}
            src={url}
            alt={url}
          />
        ))}
        {sliderImagesLoaded && (
          <S.ProgressBar>
            {images.map(item => (
              <S.ProgressItem key={item.id}>
                <S.TransparentPart />
                <S.HighlightPart className="hover-slider-highlight-part" />
              </S.ProgressItem>
            ))}
          </S.ProgressBar>
        )}
      </S.Root>
    );
  }
);

export default HoverSlider;
