import React from 'react';

import { action } from '@storybook/addon-actions';

import Camera from '../components/Camera';

export const Main = () => {
  const onPhoto = action('onPhoto');
  const onError = action('onError');

  return (
    <Camera
      onPhoto={onPhoto}
      onError={onError}
    />
  );
};

export default {
  title: 'Camera',
};
