import React, {
  memo,
  useState,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import Camera from './Camera';
import Preview from './Preview';

import useStyles from './useStyles';

const PhotoCamera = ({
  onPhoto,
  onError,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const onTakePhoto = useCallback((imageBlob) => {
    setImage(imageBlob);
  }, []);

  const onAccept = useCallback((event) => {
    onPhoto(event, image);
  }, [onPhoto, image]);

  const onReject = useCallback(() => {
    setImage(null);
  }, []);

  const imageURL = useMemo(() => (
    image ? URL.createObjectURL(image) : ''
  ), [image]);

  return (
    <div className={classes.container}>
      {
        imageURL
          ? (
            <Preview
              url={imageURL}
              onAccept={onAccept}
              onReject={onReject}
            />
          )
          : (
            <Camera
              onTakePhoto={onTakePhoto}
              onError={onError}
            />
          )
      }
    </div>
  );
};

PhotoCamera.propTypes = {
  onPhoto: PropTypes.func,
  onError: PropTypes.func,
};

PhotoCamera.defaultProps = {
  onPhoto: () => {},
  onError: () => {},
};

export default memo(PhotoCamera);
