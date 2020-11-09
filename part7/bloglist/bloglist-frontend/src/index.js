import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const font = '\'Oxygen Mono\', monospace';

const dark = createMuiTheme({
  palette: {
    type:  'dark'
  },
  typography: {
    fontFamily: font
  }
});

ReactDOM.render(
  <ThemeProvider theme={dark}>
    <CssBaseline/>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>
  , document.getElementById('root')
);
