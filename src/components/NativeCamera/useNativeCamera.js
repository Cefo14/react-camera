import { useCallback, useMemo } from 'react';

const useNativeCamera = () => {
  const IsAvalible = useCallback(() => (
    'capture' in HTMLInputElement.prototype
  ), []);

  const createCaptureInput = (onChange = () => {}, capture = 'environment') => {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = 'image/*';
    input.capture = capture;
    input.style = 'display: none;';

    input.onchange = (event) => {
      const { files } = event.target;
      const [file] = files;
      input.remove();
      onChange(event, file);
    };

    document.body.appendChild(input);
    input.click();
  };

  const result = useMemo(
    () => (
      {
        IsAvalible,
        createCaptureInput,
      }
    ),
    [
      IsAvalible,
      createCaptureInput,
    ],
  );

  return result;
};

export default useNativeCamera;
