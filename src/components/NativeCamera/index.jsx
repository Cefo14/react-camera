import React, {
  useRef,
  useCallback,
  useEffect,
  memo,
} from 'react';
import PropTypes from 'prop-types';

const NativeCamera = ({ onPhoto }) => {
  const inputFileRef = useRef(null);
  const inputButton = useRef(null);

  const openInputFile = useCallback(() => {
    inputFileRef.current.click();
  }, [inputFileRef]);

  const onChange = useCallback((event) => {
    const { files } = event.target;
    const [file] = files;
    onPhoto(event, file);
  }, [onPhoto]);

  useEffect(() => {
    inputButton.current.click();
  }, []);

  return (
    <>
      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onChange}
        style={{
          display: 'none',
        }}
      />
      <button
        ref={inputButton}
        type="button"
        onClick={openInputFile}
      >
        Open
      </button>
    </>
  );
};

NativeCamera.propTypes = {
  onPhoto: PropTypes.func,
};

NativeCamera.defaultProps = {
  onPhoto: () => {},
};

export default memo(NativeCamera);
