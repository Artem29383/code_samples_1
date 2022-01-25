import styled from 'styled-components';
import { Colors } from '@types';

export const ImageSide = styled.div`
  flex-basis: 50%;
  position: relative;
`;

export const ImageWrap = styled.div<{ isPhoto: string | null | File }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: ${({ isPhoto }) => (isPhoto ? 'hidden' : 'visible')};
  margin: 0 auto;
  border: 8px solid ${Colors.lightGray};
  background-color: ${({ isPhoto }) =>
    isPhoto ? 'transparent' : Colors.cornFlowerBlue};
`;
export const Image = styled.img<any>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Plus = styled.div`
  width: 23px;
  height: 23px;
  cursor: pointer;
  transform: rotate(45deg);
  margin-bottom: 10px;
`;

export const Cross = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: -20%;
  cursor: pointer;
  top: 0;
`;

export const UploadPreview = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 15px;
  text-align: center;
`;

export const Text = styled.div`
  font-family: LiberGrotesqueExtraBold, sans-serif;
`;

export const AvatarButton = styled.div`
  width: 41px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  position: absolute;
  right: -20px;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
`;

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const ImageSideMobile = styled.div`
  position: relative;
  max-width: 100px;
  width: 100%;
`;

export const ImageWrapMobile = styled.div<{ isPhoto: string | null | File }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  overflow: hidden;
  border: 5px solid ${Colors.white};
  background-color: ${({ isPhoto }) =>
    isPhoto ? 'transparent' : Colors.mischka};
  box-shadow: ${({ isPhoto }) =>
    isPhoto ? '' : '0 13px 14px 0 rgba(0, 0, 0, 0.08)'};
`;
export const ImageMobile = styled.img<any>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlusMobile = styled.div`
  width: 23px;
  height: 23px;
  cursor: pointer;
  transform: rotate(45deg);
  margin-bottom: 10px;
`;

export const CrossMobile = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: -10%;
  cursor: pointer;
  top: 0;
`;

export const UploadPreviewMobile = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  text-align: center;
`;

export const TextMobile = styled.div`
  font-family: LiberGrotesqueExtraBold, sans-serif;
`;
