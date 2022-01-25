/* eslint-disable jsx-a11y/alt-text */

import React, { useCallback, useRef, useState } from 'react';
import numeral from 'numeral';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Lazy, Navigation } from 'swiper';
// @ts-ignore
import ReadMoreReact from 'read-more-react';

import { Colors } from '@types';

import { PropertyItem, getPropertyItem } from 'models/properties/selectors';

import useToggle from 'hooks/useToggle';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';

import Spinner from 'components/Spinner';
import PinButton from 'pages/Properties/PinButton';
import Text from 'components/Text';
import Button from 'components/Button';
import Perks from 'pages/Property/Perks';
import PaymentCalculator from 'pages/Property/PaymentCalculator';
import Map from 'pages/Property/Map';
import Showings from 'pages/Property/Showings';
import NearByListing from 'pages/Property/NearByListing';
import BoardsModal from 'components/Modal/BoardsModal';
import Slide from 'pages/Property/Slide';

import { everyWordWithUpperLetter } from 'utils/everyWordWithUpperLetter';
import { getPxFromVH } from 'utils/getPxFromVH';

import { HeartGrayIcon, HideIcon, ShareIcon, icons } from 'styles/icons';

import { Viewport } from 'styles/media';

import * as Styled from './Property.styled';
import { CSSTransition } from 'react-transition-group';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import config from '@config';

const imagePlaceholder = require('images/placeholder.jpg');

export const Statuses: {
  [key: string]: string;
} = {
  Active: 'Active',
  ActiveUnderContract: 'Pending',
};

export const StatusesColor: {
  [key: string]: string;
} = {
  Active: Colors.dodgerBlue,
  ActiveUnderContract: Colors.mauve,
};

const propertyTypesIcons = {
  house: { icon: icons.house2, width: 59, position: 'center' },
  townhome: { icon: icons.townhome, width: 52, position: 'center' },
  lot: { icon: icons.lot, width: 75, position: 'flex-end' },
  condo: { icon: icons.condo, width: 39, position: 'center' },
};

const propertyTypesIconsDesktop = {
  house: { icon: icons.house2, width: 100 },
  townhome: { icon: icons.townhome, width: 100 },
  lot: { icon: icons.lot, width: 100 },
  condo: { icon: icons.condo, width: 100 },
};

SwiperCore.use([Navigation, Lazy]);

type Props = {
  idProp: number;
  onCopy: () => void;
  isShare: boolean;
  setShare: (p: boolean) => void;
  referenceDrop: React.ReactNode;
  fetching: boolean;
  item: PropertyItem;
  onToggleToFavorites: (id: number) => void;
  onToggleToHiddens: (id: number) => void;
  windowWidth: number;
  reference: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
  onToggleDetail: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSeeDetail: boolean;
  windowHeight: number;
};

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

const homeInfoTitle = { m: 22, d: 20, bd: 22 };

const galleryHeightVH = {
  bd: 70,
  d: 55,
};

const renderSquareFeet = (item: ReturnType<typeof getPropertyItem>) => {
  if (item.propertyType === 'lot') {
    return item.formattedLotSizeSquareFeet || '-';
  }

  return item.formattedLivingSquareFeet || '-';
};

const renderTimeOnMarket = (item: ReturnType<typeof getPropertyItem>) => {
  if (item.daysOnMarket === null || item.daysOnMarket === undefined) {
    return '-';
  }

  const fullYears = Math.floor(item.daysOnMarket / 365);
  const remainsDays = item.daysOnMarket % 365;

  if (fullYears > 1) {
    return `More than ${fullYears}${remainsDays >= 183 ? `.5` : ''} years`;
  }

  return `${item.daysOnMarket === 0 ? 1 : item.daysOnMarket} days`;
};

const Property = ({
  fetching,
  idProp,
  item,
  onToggleToFavorites,
  onToggleToHiddens,
  windowWidth,
  reference,
  onScroll,
  onToggleDetail,
  windowHeight,
  isSeeDetail,
  isShare,
  setShare,
  referenceDrop,
  onCopy,
}: Props) => {
  const [index, setIndex] = useState('first');
  const [heightSlider, setHeightSlider] = useState(0);
  const [addModalOpen, toggleAddModal] = useToggle(false);
  const imageToBoardId = useRef<number>();
  const handleAddImageToBoardModalOpen = useCallback(
    (id: number) => {
      imageToBoardId.current = id;
      toggleAddModal();
    },
    [toggleAddModal]
  );

  useIsomorphicLayoutEffect(() => {
    if (windowWidth >= Viewport.desktop) {
      setHeightSlider(getPxFromVH(windowHeight, galleryHeightVH.bd));
    }
    if (windowWidth > Viewport.tablet && windowWidth < Viewport.desktop) {
      setHeightSlider(getPxFromVH(windowHeight, galleryHeightVH.d));
    }
  }, [windowHeight, windowWidth]);

  if (RUNTIME_ENV === 'server') {
    return null;
  }

  return (
    <>
      <Styled.Root isFetching={fetching}>
        <BoardsModal
          isOpen={addModalOpen}
          onClose={toggleAddModal}
          imageId={imageToBoardId.current!}
        />
        {fetching && <Spinner position="absolute" top="50%" left="50%" />}
        {!fetching && item && (
          <React.Fragment>
            {item.images.length < 2 ? (
              <Styled.ImageSolo>
                <Styled.Image
                  isZero={item.images.length === 0}
                  src={item.images[0]?.url}
                  onError={handleImageError}
                />
              </Styled.ImageSolo>
            ) : (
              <Styled.Slider
                onProgress={({ progress }) => {
                  const module = Math.abs(progress);
                  if (module === 1) {
                    setIndex('end');
                  }
                  if (module === 0) {
                    setIndex('first');
                  }
                  if (module > 0 && module < 1) {
                    setIndex('center');
                  }
                }}
                height={heightSlider}
                images={item.images}
                slidesPerView="auto"
                spaceBetween={5}
                pagination={{
                  el: '.swiper-pagination',
                  type: 'progressbar',
                }}
                navigation={{
                  nextEl: `.swiper-next-button-${item.id}`,
                  prevEl: `.swiper-prev-button-${item.id}`,
                }}
                lazy={{
                  loadPrevNext: true,
                  loadPrevNextAmount: 5,
                }}
              >
                {item.images.map(({ url, id }) => (
                  <SwiperSlide key={url}>
                    <Slide url={url} onImageError={handleImageError} />
                    <Styled.PinWrapper
                      isVisible={windowWidth > Viewport.tablet}
                    >
                      <PinButton
                        position="absolute"
                        width={35}
                        height={35}
                        right={28}
                        top={28}
                        onClick={() => handleAddImageToBoardModalOpen(id)}
                      />
                    </Styled.PinWrapper>
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
                  </SwiperSlide>
                ))}
                {item.images.length > 1 && (
                  <>
                    <Styled.SliderNavPrev
                      isActive={index !== 'first'}
                      className={`swiper-prev-button-${item.id}`}
                    />
                    <Styled.SliderNavNext
                      isActive={index !== 'end'}
                      className={`swiper-next-button-${item.id}`}
                    />
                    <Styled.ProgressBar className="swiper-pagination" />
                  </>
                )}
              </Styled.Slider>
            )}
            <Styled.Content>
              <Styled.ContentLeft>
                {windowWidth > Viewport.tablet && (
                  <Styled.Header>About</Styled.Header>
                )}
                {windowWidth <= Viewport.tablet && (
                  <Styled.MobileInfo>
                    {(() => {
                      const Icon = propertyTypesIcons[item.propertyType].icon;
                      return (
                        <Icon
                          width={propertyTypesIcons[item.propertyType].width}
                          height="auto"
                          alignSelf={
                            propertyTypesIcons[item.propertyType].position
                          }
                          color="cornFlowerBlue"
                        />
                      );
                    })()}
                    <Styled.Stack>
                      <Text
                        lineHeight="20px"
                        fontType="liberGrotesqueBlack"
                        fontSize={20}
                        color="emperor"
                      >
                        {item.bedrooms || '-'}
                      </Text>
                      <Text
                        lineHeight="12px"
                        fontType="liberGrotesqueBold"
                        fontSize={12}
                        color="emperor"
                      >
                        Beds
                      </Text>
                    </Styled.Stack>
                    <Styled.Stack>
                      <Text
                        lineHeight="20px"
                        fontType="liberGrotesqueBlack"
                        fontSize={20}
                        color="emperor"
                      >
                        {item.bathrooms || '-'}
                      </Text>
                      <Text
                        lineHeight="12px"
                        fontType="liberGrotesqueBold"
                        fontSize={12}
                        color="emperor"
                      >
                        Baths
                      </Text>
                    </Styled.Stack>
                    <Styled.Stack>
                      <Text
                        lineHeight="20px"
                        fontType="liberGrotesqueBlack"
                        fontSize={20}
                        color="emperor"
                      >
                        {renderSquareFeet(item)}
                      </Text>
                      <Text
                        lineHeight="12px"
                        fontType="liberGrotesqueBold"
                        fontSize={12}
                        color="emperor"
                      >
                        Sq.Ft.
                      </Text>
                    </Styled.Stack>
                    <Styled.Stack>
                      <Text
                        lineHeight="18px"
                        fontType="liberGrotesqueBold"
                        fontSize={12}
                        maxWidth={{ m: '130px', t: '150px' }}
                        color="emperor"
                      >
                        {item.address}
                      </Text>
                    </Styled.Stack>
                  </Styled.MobileInfo>
                )}
                <Styled.AboutContainerWrapper isSeeDetail={isSeeDetail}>
                  <Styled.AboutContainer isSeeDetail={isSeeDetail}>
                    <Styled.About>
                      {windowWidth <= Viewport.mobile ? (
                        <Styled.Description>
                          <ReadMoreReact
                            text={item.description}
                            min={80}
                            ideal={200}
                            max={255}
                            readMoreText="Read More"
                          />
                        </Styled.Description>
                      ) : (
                        <Styled.Description>
                          {item.description}
                        </Styled.Description>
                      )}
                    </Styled.About>
                    <Styled.MSL>
                      {!isSeeDetail && (
                        <>
                          <Text
                            fontType="liberGrotesqueBold"
                            color={
                              windowWidth <= Viewport.tablet
                                ? 'bombay'
                                : 'emperor'
                            }
                            lineHeight={{ m: '11px', t: '26px' }}
                            fontSize={{ m: '8px', t: '14px' }}
                          >
                            MLS ID
                          </Text>
                          <Text
                            fontType="liberGrotesqueBold"
                            color={
                              windowWidth <= Viewport.tablet
                                ? 'bombay'
                                : 'emperor'
                            }
                            lineHeight={{ m: '11px', t: '26px' }}
                            fontSize={{ m: '8px', t: '14px' }}
                          >
                            {item.globalListingId}
                          </Text>
                        </>
                      )}
                      {windowWidth <= Viewport.tablet && (
                        <Styled.Details
                          isSeeDetail={isSeeDetail}
                          onClick={onToggleDetail}
                        >
                          {isSeeDetail ? 'Hide Details' : 'See Details'}
                        </Styled.Details>
                      )}
                    </Styled.MSL>
                  </Styled.AboutContainer>
                  {isSeeDetail && windowWidth <= Viewport.tablet && (
                    <Styled.BurgerInfo>
                      <Styled.Text>
                        <Styled.Title>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueExtraBold"
                            color="tundora"
                          >
                            Status:
                          </Text>
                        </Styled.Title>
                        <Styled.SubText>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueRegular"
                            color="tundora"
                          >
                            {Statuses[item.standardStatus]
                              ? Statuses[item.standardStatus]
                              : '-'}
                          </Text>
                        </Styled.SubText>
                      </Styled.Text>
                      <Styled.Text>
                        <Styled.Title>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueExtraBold"
                            color="tundora"
                          >
                            Time on Market:
                          </Text>
                        </Styled.Title>
                        <Styled.SubText>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueRegular"
                            color="tundora"
                          >
                            {renderTimeOnMarket(item)}
                          </Text>
                        </Styled.SubText>
                      </Styled.Text>
                      <Styled.Text>
                        <Styled.Title>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueExtraBold"
                            color="tundora"
                          >
                            Property Type:
                          </Text>
                        </Styled.Title>
                        <Styled.SubText>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueRegular"
                            color="tundora"
                          >
                            {item.propertyType
                              ? everyWordWithUpperLetter(item.propertyType)
                              : '-'}
                          </Text>
                        </Styled.SubText>
                      </Styled.Text>
                      <Styled.Text>
                        <Styled.Title>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueExtraBold"
                            color="tundora"
                          >
                            Lot Size:
                          </Text>
                        </Styled.Title>
                        <Styled.SubText>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueRegular"
                            color="tundora"
                          >
                            {item.lotSizeSquareFeet !== 0
                              ? item.formattedLotSizeSquareFeet
                              : '-'}
                          </Text>
                        </Styled.SubText>
                      </Styled.Text>
                      <Styled.Text>
                        <Styled.Title>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueExtraBold"
                            color="tundora"
                          >
                            Stories:
                          </Text>
                        </Styled.Title>
                        <Styled.SubText>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueRegular"
                            color="tundora"
                          >
                            {item.stories ? item.stories : '-'}
                          </Text>
                        </Styled.SubText>
                      </Styled.Text>
                      <Styled.Text>
                        <Styled.Title>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueExtraBold"
                            color="tundora"
                          >
                            Year Built:
                          </Text>
                        </Styled.Title>
                        <Styled.SubText>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueRegular"
                            color="tundora"
                          >
                            {item.yearBuilt ? item.yearBuilt : '-'}
                          </Text>
                        </Styled.SubText>
                      </Styled.Text>
                      <Styled.Text>
                        <Styled.Title>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueExtraBold"
                            color="tundora"
                          >
                            Annual Tax:
                          </Text>
                        </Styled.Title>
                        <Styled.SubText>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueRegular"
                            color="tundora"
                          >
                            {item.annualTaxAmount
                              ? `$${numeral(item.annualTaxAmount).format(
                                  '0,0'
                                )}`
                              : '-'}
                          </Text>
                        </Styled.SubText>
                      </Styled.Text>
                      <Styled.Text>
                        <Styled.Title>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueExtraBold"
                            color="tundora"
                          >
                            HOA Fee:
                          </Text>
                        </Styled.Title>
                        <Styled.SubText>
                          <Text
                            fontSize={{ d: 22, m: 14 }}
                            fontType="liberGrotesqueRegular"
                            color="tundora"
                          >
                            {item.monthlyFee === 0
                              ? '-'
                              : `$${item.formattedMonthlyFee}/m`}
                          </Text>
                        </Styled.SubText>
                      </Styled.Text>
                    </Styled.BurgerInfo>
                    /* test comment */
                  )}
                </Styled.AboutContainerWrapper>
                {windowWidth <= Viewport.tablet && (
                  <Styled.WrapperInfo>
                    <Styled.Info>
                      <Styled.InfoLine marginBottom={16}>
                        <Styled.Button
                          className={
                            item.favorite
                              ? 'activeFavorite'
                              : 'noActiveFavorite'
                          }
                          onClick={() => onToggleToFavorites(item.id)}
                        >
                          <HeartGrayIcon />
                        </Styled.Button>
                        <Styled.Button
                          className={
                            item.hidden ? 'activeHidden' : 'noActiveHidden'
                          }
                          onClick={() => onToggleToHiddens(item.id)}
                        >
                          <HideIcon />
                        </Styled.Button>
                        <Styled.Button isShare={isShare}>
                          <ShareIcon onClick={setShare} />
                          <CSSTransition
                            classNames="fadeIn"
                            timeout={450}
                            in={isShare}
                            unmountOnExit
                          >
                            <Styled.DropDown ref={referenceDrop}>
                              <Styled.Li>
                                <FacebookShareButton
                                  url={`${config.remoteApiUrl}/properties/${idProp}`}
                                  quote={`${config.remoteApiUrl}/properties/${idProp}`}
                                >
                                  Facebook
                                </FacebookShareButton>
                              </Styled.Li>
                              <Styled.Li>
                                <TwitterShareButton
                                  url={`${config.remoteApiUrl}/properties/${idProp}`}
                                >
                                  Twitter
                                </TwitterShareButton>
                              </Styled.Li>
                              <Styled.Li onClick={onCopy}>Copy</Styled.Li>
                            </Styled.DropDown>
                          </CSSTransition>
                        </Styled.Button>
                      </Styled.InfoLine>
                      <Styled.InfoLine marginBottom={9}>
                        <Styled.PriceAndStatus>
                          <Styled.Status
                            color={StatusesColor[item.standardStatus]}
                          >
                            {Statuses[item.standardStatus] ||
                              item.standardStatus}
                          </Styled.Status>
                          <Styled.Price
                            color={StatusesColor[item.standardStatus]}
                          >
                            ${item.listPrice}
                          </Styled.Price>
                        </Styled.PriceAndStatus>
                      </Styled.InfoLine>
                      <Styled.InfoLine marginBottom={31}>
                        <Styled.InfoNumber>
                          <Styled.InfoNumberValue>
                            {item.bedrooms || '-'}
                          </Styled.InfoNumberValue>
                          <Styled.InfoNumberTitle>Br</Styled.InfoNumberTitle>
                        </Styled.InfoNumber>
                        <Styled.InfoNumber>
                          <Styled.InfoNumberValue>
                            {item.bathrooms || '-'}
                          </Styled.InfoNumberValue>
                          <Styled.InfoNumberTitle>Ba</Styled.InfoNumberTitle>
                        </Styled.InfoNumber>
                        <Styled.InfoNumber>
                          <Styled.InfoNumberValue>
                            {renderSquareFeet(item)}
                          </Styled.InfoNumberValue>
                          <Styled.InfoNumberTitle>
                            Sq. Ft.
                          </Styled.InfoNumberTitle>
                        </Styled.InfoNumber>
                      </Styled.InfoLine>
                      <Styled.ButtonAbsolute>
                        <Button onClick={onScroll}>Schedule Tour</Button>
                      </Styled.ButtonAbsolute>
                    </Styled.Info>
                  </Styled.WrapperInfo>
                )}
                <Perks {...item} />
                <Map
                  propertyType={item.propertyType}
                  coordinates={{
                    lat: Number(item.latitude),
                    lng: Number(item.longitude),
                  }}
                />
                <Styled.Payment>
                  <PaymentCalculator
                    totalPrice={item.listPrice}
                    annualTaxAmount={item.annualTaxAmount}
                    hoaFee={String(item.monthlyFee)}
                  />
                </Styled.Payment>
                <Showings
                  listAgentFullName={item.listAgentFullName}
                  listAgentStateLicense={item.listAgentStateLicense}
                  listOfficeMlsId={item.listOfficeMlsId}
                  listOfficeName={item.listOfficeName}
                  id={item.id}
                  reference={reference}
                />
              </Styled.ContentLeft>
              {windowWidth > Viewport.tablet && (
                <Styled.ContentRight>
                  <Styled.Info>
                    <Styled.InfoLine marginBottom={31}>
                      <Styled.InfoNumber>
                        <Styled.InfoNumberValue>
                          {item.bedrooms || '-'}
                        </Styled.InfoNumberValue>
                        <Styled.InfoNumberTitle>Beds</Styled.InfoNumberTitle>
                      </Styled.InfoNumber>
                      <Styled.InfoNumber>
                        <Styled.InfoNumberValue>
                          {item.bathrooms || '-'}
                        </Styled.InfoNumberValue>
                        <Styled.InfoNumberTitle>Baths</Styled.InfoNumberTitle>
                      </Styled.InfoNumber>
                      <Styled.InfoNumber>
                        <Styled.InfoNumberValue>
                          {renderSquareFeet(item)}
                        </Styled.InfoNumberValue>
                        <Styled.InfoNumberTitle>Sq. Ft.</Styled.InfoNumberTitle>
                      </Styled.InfoNumber>
                    </Styled.InfoLine>
                    <Styled.InfoLineIcon marginBottom={31}>
                      {(() => {
                        const Icon =
                          propertyTypesIconsDesktop[item.propertyType].icon;
                        return (
                          <Icon
                            width={
                              propertyTypesIconsDesktop[item.propertyType].width
                            }
                            height="55px"
                            alignSelf="flex-end"
                            color="cornFlowerBlue"
                          />
                        );
                      })()}
                      <Styled.PriceAndStatus>
                        <Styled.Status
                          color={StatusesColor[item.standardStatus]}
                        >
                          {Statuses[item.standardStatus] || item.standardStatus}
                        </Styled.Status>
                        <Styled.Price
                          color={StatusesColor[item.standardStatus]}
                        >
                          ${item.listPrice}
                        </Styled.Price>
                      </Styled.PriceAndStatus>
                    </Styled.InfoLineIcon>
                    <Styled.InfoLine marginBottom={28}>
                      <Styled.Address>
                        <Styled.LineAddress>
                          {item.fullAddress?.unparsed_address}
                        </Styled.LineAddress>
                        <Styled.LineAddressMin>
                          {`${item.fullAddress?.postal_city}, ${item.fullAddress?.state_or_province} ${item.fullAddress?.postal_code}`}
                        </Styled.LineAddressMin>
                      </Styled.Address>
                      <Styled.PriceSqFeet>
                        ${item.formattedSquarePerFeetPrice} / Sq.Ft.
                      </Styled.PriceSqFeet>
                    </Styled.InfoLine>
                    <Styled.InfoLine>
                      <Styled.Button
                        className={
                          item.favorite ? 'activeFavorite' : 'noActiveFavorite'
                        }
                        onClick={() => onToggleToFavorites(item.id)}
                      >
                        <HeartGrayIcon />
                        <Styled.ButtonText>Favorite</Styled.ButtonText>
                      </Styled.Button>
                      <Styled.Button
                        className={
                          item.hidden ? 'activeHidden' : 'noActiveHidden'
                        }
                        onClick={() => onToggleToHiddens(item.id)}
                      >
                        <HideIcon />
                        <Styled.ButtonText>Hide</Styled.ButtonText>
                      </Styled.Button>
                      <Styled.Button isShare={isShare}>
                        <ShareIcon onClick={setShare} />
                        <Styled.ButtonText isShare={isShare} onClick={setShare}>
                          Share
                        </Styled.ButtonText>
                        <CSSTransition
                          classNames="fadeIn"
                          timeout={450}
                          in={isShare}
                          unmountOnExit
                        >
                          <Styled.DropDown ref={referenceDrop}>
                            <Styled.Li>
                              <FacebookShareButton
                                url={`${config.remoteApiUrl}/properties/${idProp}`}
                                quote={`${config.remoteApiUrl}/properties/${idProp}`}
                              >
                                Facebook
                              </FacebookShareButton>
                            </Styled.Li>
                            <Styled.Li>
                              <TwitterShareButton
                                url={`${config.remoteApiUrl}/properties/${idProp}`}
                              >
                                Twitter
                              </TwitterShareButton>
                            </Styled.Li>
                            <Styled.Li onClick={onCopy}>Copy</Styled.Li>
                          </Styled.DropDown>
                        </CSSTransition>
                      </Styled.Button>
                    </Styled.InfoLine>
                    <Styled.InfoLine marginTop={30}>
                      <Button onClick={onScroll}>Schedule Tour</Button>
                    </Styled.InfoLine>
                  </Styled.Info>
                  <Styled.HomeInfo>
                    <Styled.Text>
                      <Styled.Title>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueBold"
                          color="tundora"
                        >
                          Status:
                        </Text>
                      </Styled.Title>
                      <Styled.SubText>
                        <Text
                          fontSize={22}
                          fontType="liberGrotesqueRegular"
                          color="tundora"
                        >
                          {Statuses[item.standardStatus]
                            ? Statuses[item.standardStatus]
                            : '-'}
                        </Text>
                      </Styled.SubText>
                    </Styled.Text>
                    <Styled.Text>
                      <Styled.Title>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueBold"
                          color="tundora"
                        >
                          Time on Market:
                        </Text>
                      </Styled.Title>
                      <Styled.SubText>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueRegular"
                          color="tundora"
                        >
                          {renderTimeOnMarket(item)}
                        </Text>
                      </Styled.SubText>
                    </Styled.Text>
                    <Styled.Text>
                      <Styled.Title>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueBold"
                          color="tundora"
                        >
                          Property Type:
                        </Text>
                      </Styled.Title>
                      <Styled.SubText>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueRegular"
                          color="tundora"
                        >
                          {item.propertyType
                            ? everyWordWithUpperLetter(item.propertyType)
                            : '-'}
                        </Text>
                      </Styled.SubText>
                    </Styled.Text>
                    <Styled.Text>
                      <Styled.Title>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueBold"
                          color="tundora"
                        >
                          Lot Size:
                        </Text>
                      </Styled.Title>
                      <Styled.SubText>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueRegular"
                          color="tundora"
                        >
                          {item.lotSizeSquareFeet !== 0
                            ? item.formattedLotSizeSquareFeet
                            : '-'}
                        </Text>
                      </Styled.SubText>
                    </Styled.Text>
                    <Styled.Text>
                      <Styled.Title>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueBold"
                          color="tundora"
                        >
                          Stories:
                        </Text>
                      </Styled.Title>
                      <Styled.SubText>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueRegular"
                          color="tundora"
                        >
                          {item.stories ? item.stories : '-'}
                        </Text>
                      </Styled.SubText>
                    </Styled.Text>
                    <Styled.Text>
                      <Styled.Title>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueBold"
                          color="tundora"
                        >
                          Year Built:
                        </Text>
                      </Styled.Title>
                      <Styled.SubText>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueRegular"
                          color="tundora"
                        >
                          {item.yearBuilt ? item.yearBuilt : '-'}
                        </Text>
                      </Styled.SubText>
                    </Styled.Text>
                    <Styled.Text>
                      <Styled.Title>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueBold"
                          color="tundora"
                        >
                          Annual Tax:
                        </Text>
                      </Styled.Title>
                      <Styled.SubText>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueRegular"
                          color="tundora"
                        >
                          {item.annualTaxAmount
                            ? `$${numeral(item.annualTaxAmount).format('0,0')}`
                            : '-'}
                        </Text>
                      </Styled.SubText>
                    </Styled.Text>
                    <Styled.Text>
                      <Styled.Title>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueBold"
                          color="tundora"
                        >
                          HOA Fee:
                        </Text>
                      </Styled.Title>
                      <Styled.SubText>
                        <Text
                          fontSize={homeInfoTitle}
                          fontType="liberGrotesqueRegular"
                          color="tundora"
                        >
                          {item.monthlyFee === 0
                            ? '-'
                            : `$${item.formattedMonthlyFee}/m`}
                        </Text>
                      </Styled.SubText>
                    </Styled.Text>
                  </Styled.HomeInfo>
                </Styled.ContentRight>
              )}
            </Styled.Content>
          </React.Fragment>
        )}
      </Styled.Root>
      {!fetching && item && (
        <>
          <NearByListing
            id={(item.id as unknown) as string}
            latitude={item.latitude}
            longitude={item.longitude}
            windowWidth={windowWidth}
            price={item.listPrice}
            bedrooms={item.bedrooms}
          />
        </>
      )}
    </>
  );
};

export default Property;
