import React from 'react';
import Camera from '../components/Camera';

import './style.css';

const App = () => (
  <main>
    <Camera
      onCamera={(onCamera) => { console.log({ onCamera }) }}
      onPlay={(onPlay) => { console.log({ onPlay }) }}
      onTakePhoto={(onTakePhoto) => { console.log({ onTakePhoto }) }}
      onError={(onError) => { console.log({ onError }) }}
    />
  </main>
);

export default App;
