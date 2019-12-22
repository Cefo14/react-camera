import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

import './style.css';

const CameraPreview = ({ image, onCancel, onConfirm }) => (
  <div className="photo-preview__container">
    <img
      className="photo-preview__image"
      src={image}
      alt="captura"
    />
    <div className="photo-preview__actions-container">
      <IconButton onClick={() => onCancel(image)}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => onConfirm(image)}>
        <DoneIcon />
      </IconButton>
    </div>
  </div>
);

CameraPreview.propTypes = {
  image: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

CameraPreview.defaultProps = {
  image: '',
  onCancel: () => {},
  onConfirm: () => {},
};

export default CameraPreview;
