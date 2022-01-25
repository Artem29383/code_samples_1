import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Push } from 'models/pushes';
import uniqueId from 'lodash/uniqueId';

export const useFileWork = (
  fileType?: string,
  pushNotification?: (p: Push) => void
) => {
  const [objectFile, setObjectFile] = useState<string | null | File>(null);
  const objectFiles = useRef<File[]>([]);
  const [isDisableBtn, setDisableBtn] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleResetObjectFiles = useCallback(() => {
    objectFiles.current = [];
  }, []);

  const resetImagePreview = useCallback(() => {
    setImage(null);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const compressImage = async (img: HTMLImageElement, fileImage: File) => {
    return new Promise<(string | File)[]>(resolve => {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas?.getContext('2d')?.drawImage(img, 0, 0);

      const newImgData = canvas.toDataURL(fileImage.type, 0.3);
      fetch(newImgData)
        .then(res => res.blob())
        .then(blob => {
          const file: File = new File([blob], `low${fileImage.name}`, {
            type: fileImage.type,
          });
          const newImageData = canvas.toDataURL(fileImage.type, 0.7);
          resolve([newImageData, file]);
        });
    });
  };

  const createImage = useCallback((base64: string, file: File) => {
    const img = document.createElement('IMG');
    if (img instanceof HTMLImageElement) {
      img.src = base64;
      img.onload = () => {
        setObjectFile(file);
      };
    }
  }, []);

  const reader = useCallback((file: File): Promise<string> => {
    return new Promise<string>((resolve): void => {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setImage(fileReader.result);
      };
    });
  }, []);

  const changeHandle = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      fileList: Array<string> | null = null
    ) => {
      const files: FileList | Array<string> | null =
        e.currentTarget.files || fileList;
      setDisableBtn(true);
      Object.values(files as object).forEach(
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async (file: File): Promise<any> => {
          if (file) {
            const type = file.type.split('/');
            const size = Math.ceil(file.size / 1024);
            if (size < 2500) {
              if (type[0] === 'image' && fileType === type[0]) {
                const base64 = await reader(file);
                createImage(base64, file);
                objectFiles.current = [...objectFiles.current, file];
              } else if (type[1] === fileType) {
                setObjectFile(file);
              } else if (pushNotification && type[1] !== fileType) {
                pushNotification({
                  id: uniqueId('info'),
                  type: 'error',
                  title: 'Fail',
                  message: `File must be ${fileType}`,
                });
              }
            } else {
              setObjectFile(null);
              if (pushNotification) {
                pushNotification({
                  id: uniqueId('info'),
                  type: 'error',
                  title: 'Fail',
                  message: `File must be less than 2.5mb`,
                });
              }
            }
          }
        }
      );
      e.target.value = '';
    },
    [createImage, fileType, pushNotification, reader]
  );

  return {
    objectFile: objectFile as File,
    changeHandle,
    setObjectFile,
    setDisableBtn,
    isDisableBtn,
    image,
    resetImagePreview,
    objectFiles: objectFiles.current,
    resetObjectFiles: handleResetObjectFiles,
  };
};
