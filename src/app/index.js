import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


const config = window.config;

ReactDOM.render(<App config={{ ...config }}/>, document.getElementById(config.rootId));
