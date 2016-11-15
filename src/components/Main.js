require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import TimerComponent from './/TimerComponent';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <TimerComponent/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
