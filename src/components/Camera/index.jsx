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
  facingMode,
  widthIdeal,
  heightIdeal,
  onPhoto,
  onError,
}) => {
  const classes = useStyles();

  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const startRecording = useCallback(async () => {
    try {
      const config = {
        audio: false,
        video: {
          width: { ideal: widthIdeal },
          height: { ideal: heightIdeal },
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
  }, [facingMode, widthIdeal, heightIdeal, videoRef, onError]);

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

  const resetRecording = useCallback(() => {
    startRecording();
    startRecording();
  }, [startRecording, startRecording]);

  const createCanvasScreenShot = useCallback(() => {
    const canvas = document.createElement('canvas');

    const video = videoRef.current;
    const videoTrackSettings = stream
      ?.getVideoTracks()
      ?.find((track) => track.readyState === 'live')
      ?.getSettings();

    const width = videoTrackSettings ? videoTrackSettings.width : window.screen.width;
    const height = videoTrackSettings ? videoTrackSettings.height : window.screen.height;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    return canvas;
  }, [videoRef, stream]);

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
    resetRecording();
  }, [facingMode, widthIdeal, heightIdeal]);

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
  facingMode: PropTypes.oneOf(['user', 'environment']),
  widthIdeal: PropTypes.number,
  heightIdeal: PropTypes.number,
  onPhoto: PropTypes.func,
  onError: PropTypes.func,
};

Camera.defaultProps = {
  facingMode: 'environment',
  widthIdeal: 1920,
  heightIdeal: 1080,
  onPhoto: () => {},
  onError: () => {},
};

export default memo(Camera);
