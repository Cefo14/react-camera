import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import '../../utils/getUserMediaPolyfill';
import './style.css';

class Camera extends PureComponent {
  constructor(...props) {
    super(...props);
    this.sectionRef = createRef(null);
    this.videoRef = createRef(null);
    this.stream = null;
    this.state = { stream: null };
  };
  
  componentDidMount() {
    this.initialize();
  }

  /**
   * @returns {Object}
   */
  getSectionRef = () => this.sectionRef;

  /**
   * @returns {Object}
   */
  getVideoRef = () => this.videoRef;

  /**
   * @param {MediaStream}
   */
  setStream = (stream) => this.setState(() => ({ stream }));

  /**
   * @returns {MediaStream}
   */
  getStream = () => this.state.stream;

  /**
   * @returns {Boolean}
   */
  isFrontCamera = () => {
    const { useFrontCamera } = this.props;
    return useFrontCamera;
  };

  /**
   * @returns {Boolean}
   */
  cameraIsReady = () => Boolean(this.state.stream);

  /**
   * @returns {String}
   */
  getCameraMode = () => this.isFrontCamera() ? "user" : "environment";

  /**
   * @returns {Object}
   */
  getVideoSize = () => {
    const section = this.getSectionRef().current;
    return {
      width: { ideal: section.offsetWidth },
      height: { ideal: section.offsetHeight },
    };
  }

  /**
   * wait permission for the camera
   * the video will have the size of the container
   * Stream MediaStream into the video reference
   * play video
   * in case of error trigger the onError event
   */
  initialize = async () => {
    const { onCamera, onError } = this.props;
    const facingMode = this.getCameraMode();

    try {
      const videoSize = this.getVideoSize();
      const config = { audio: false, video: { facingMode, ...videoSize } };
      const stream = await navigator.mediaDevices.getUserMedia(config)
      this.setStream(stream);
      onCamera(stream);
      this.playVideo();
    }

    catch (err) {
      onError(err);
    }
  };
  

  /**
   * set stream MediaStream into the video
   * play video
   */
  playVideo = () => {
    const stream = this.getStream();
    const video = this.getVideoRef().current;
    const { onPlay } = this.props;

    video.srcObject = stream;
    video.play();
    onPlay(video);
  }

  onTakePicture = () => {
    const { onTakePhoto } = this.props;
    const canvas = document.createElement('canvas');

    const video = this.getVideoRef().current;
    const width = video.offsetWidth
    const height = video.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    const img = canvas.toDataURL();
    console.log(img)
    onTakePhoto(img);
  }

  render() {
    return (
      <section
        className="camera__container"
        ref={this.getSectionRef()}
      >
        <video ref={this.getVideoRef()} />
        <div className="camera__button-container">
          <button
            type="button"
            className="camera__button-button"
            onClick={
              this.cameraIsReady()
                ? this.onTakePicture
                : () => {}
            }>
            <div className="camera__button-circle" />
          </button>
        </div>
      </section>
    );
  }
}

Camera.propTypes = {
  useFrontCamera: PropTypes.bool,
  onCamera: PropTypes.func, // when the camera is ready send stream
  onPlay: PropTypes.func, // when the video is ready send video
  onTakePhoto: PropTypes.func, // when take a photo send toDataURL
  onError: PropTypes.func, // when error send error
};

Camera.defaultProps = {
  useFrontCamera: false,
  onCamera: () => {},
  onPlay: () => {},
  onTakePhoto: () => {},
  onError: () => {},
};

export default Camera;
