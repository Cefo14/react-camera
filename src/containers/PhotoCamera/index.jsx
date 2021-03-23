import React, {
  memo,
  useState,
  useCallback,
  useMemo,
} from 'react';

import Camera from '../../components/Camera';
import Preview from '../../components/Preview';

import useStyles from './useStyles';

const PhotoCamera = () => {
  const classes = useStyles();

  const [image, setImage] = useState(null);

  const url = useMemo(() => (
    image ? URL.createObjectURL(image) : ''
  ), [image]);

  const onPhoto = useCallback((event, blob) => {
    setImage(blob);
  }, []);

  const onError = useCallback((error) => {
    // eslint-disable-next-line no-alert
    alert(error.message);
  }, []);

  const onAccept = useCallback(() => {
    window.open(url, '_blank', 'noopener');
  }, [url]);

  const onReject = useCallback(() => {
    setImage(null);
  }, [url]);

  return (
    <div className={classes.container}>
      {
        url
          ? (
            <Preview
              url={url}
              onAccept={onAccept}
              onReject={onReject}
            />
          )
          : (
            <Camera
              onPhoto={onPhoto}
              onError={onError}
            />
          )
      }
    </div>
  );
};

export default memo(PhotoCamera);
