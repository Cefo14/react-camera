import React from 'react';

import { action } from '@storybook/addon-actions';
import {
  select,
  number,
  withKnobs,
} from '@storybook/addon-knobs';

import Camera from '../components/Camera';

export const Main = () => {
  const facingMode = select('type', ['user', 'environment'], 'environment');
  const widthIdeal = number('widthIdeal', 1920);
  const heightIdeal = number('heightIdeal', 1080);
  const onPhoto = action('onPhoto');
  const onError = action('onError');

  return (
    <Camera
      widthIdeal={widthIdeal}
      heightIdeal={heightIdeal}
      facingMode={facingMode}
      onPhoto={onPhoto}
      onError={onError}
    />
  );
};

export default {
  title: 'Camera',
  decorators: [withKnobs],
};
