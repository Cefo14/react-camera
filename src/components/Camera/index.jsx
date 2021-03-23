import React, {
  memo,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

const Camera = ({
  onPhoto,
  onError,
}) => {
  const classes = useStyles();

  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const startRecording = useCallback(async () => {
    const facingMode = 'environment';
    try {
      const config = {
        audio: false,
        video: {
          facingMode,
        },
      };
      const _stream = await navigator.mediaDevices.getUserMedia(config);
      videoRef.current.srcObject = _stream;
      setStream(_stream);
    }

    catch (e) {
      onError(e);
    }
  }, [videoRef, onError]);

  const stopStream = useCallback(() => {
    if (!stream) return;
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }, [stream]);

  const stopRecording = useCallback(() => {
    const { current } = videoRef;
    if (current) current.srcObject = null;
    stopStream();
    setStream(null);
  }, [videoRef, stopStream]);

  const createCanvasScreenShot = useCallback(() => {
    const canvas = document.createElement('canvas');

    const video = videoRef.current;
    const { width, height } = window.screen; // Device Width

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    return canvas;
  }, [videoRef]);

  const takePhoto = useCallback((event) => {
    const canvas = createCanvasScreenShot();
    stopRecording();
    canvas.toBlob((blob) => {
      onPhoto(event, blob);
    });
  }, [createCanvasScreenShot, stopRecording, onPhoto]);

  const isRecording = useMemo(() => (
    Boolean(stream)
  ), [stream]);

  useEffect(() => {
    startRecording();
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', stopStream, false);
    return () => {
      stopStream();
      window.removeEventListener('beforeunload', stopStream, false);
    };
  }, [stopStream]);

  return (
    <div className={classes.container}>
      { /* eslint-disable-next-line jsx-a11y/media-has-caption */ }
      <video
        ref={videoRef}
        className={classes.video}
        autoPlay
      />
      <div className={classes.buttonContainer}>
        <button
          className={classes.button}
          type="button"
          onClick={
            isRecording
              ? takePhoto
              : startRecording
          }
        >
          <div className={classes.buttonCamera} />
        </button>
      </div>
    </div>
  );
};

Camera.propTypes = {
  onPhoto: PropTypes.func,
  onError: PropTypes.func,
};

Camera.defaultProps = {
  onPhoto: () => {},
  onError: () => {},
};

export default memo(Camera);
