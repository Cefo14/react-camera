import React, { useState } from 'react';

import Camera from '../../components/Camera';
import CameraPreview from '../../components/CameraPreview';

import './style.css';

const Screen = () => {
  const [camera, setCamera] = useState(true);
  const [image, setImage] = useState('');

  const openCamera = () => {
    setCamera(true);
  };

  const closeCamera = () => {
    setCamera(false);
  };

  const openImage = (image) => {
    setImage(image);
  };

  const closeImage = () => {
    setImage('');
  };

  /**
   * 
   * @param {MediaStream} stream 
   */
  const handleOnCamera = (stream) => {
    console.log({ handleOnCamera: stream });
  };

  /**
   * 
   * @param {HTMLVideoElement} video 
   */
  const handleOnPlay = (video) => {
    console.log({ handleOnPlay: video });
  };

  /**
   * 
   * @param {Error} error 
   */
  const handleOnError = (error) => {
    console.log({ handleOnError: error });
  };

  /**
   *
   * @param {String} dataURL
   */
  const handleOnTakePhoto = (dataURL) => {
    console.log({ handleOnTakePhoto: dataURL });
    openImage(dataURL);
    closeCamera();
  };

  /**
   *
   * @param {String} dataURL
   */
  const handleOnConfirm = (dataURL) => {
    console.log({ handleOnConfirm: dataURL });
    closeImage();
    openCamera();
  };

  /**
   *
   * @param {String} dataURL
   */
  const hangleOnCloseImage = (dataURL) => {
    console.log({ handleOnConfirm: dataURL });
    closeImage();
    openCamera();
  };

  return (
    <div className="screen__container">
      {
        camera && (
          <Camera
            useFrontCamera={false}
            onCamera={handleOnCamera}
            onPlay={handleOnPlay}
            onTakePhoto={handleOnTakePhoto}
            onError={handleOnError}
          />
        )
      }
      {
        image && (
          <CameraPreview
            image={image}
            onConfirm={handleOnConfirm} 
            onCancel={hangleOnCloseImage}
          />
        )
      }
    </div>
  );
};

export default Screen;
