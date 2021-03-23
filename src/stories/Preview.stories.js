import React from 'react';

import { action } from '@storybook/addon-actions';
import {
  text,
  withKnobs,
} from '@storybook/addon-knobs';

import Preview from '../components/Preview';

export const Main = () => {
  const url = text('url', 'https://dummyimage.com/1920x1080/000/fff');
  const onAccept = action('onAccept');
  const onReject = action('onReject');

  return (
    <Preview
      url={url}
      onAccept={onAccept}
      onReject={onReject}
    />
  );
};

export default {
  title: 'Preview',
  decorators: [withKnobs],
};
