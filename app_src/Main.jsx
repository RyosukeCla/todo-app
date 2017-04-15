import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from './component/App.jsx';

class Main extends React.Component {
  muiTheme() {
    return getMuiTheme(
      {}
    );
  }

  render() {
    return(
      <MuiThemeProvider muiTheme={this.muiTheme()}>
        <App />
      </MuiThemeProvider>
    );
  }
}

window.onload = function() {
  injectTapEventPlugin();
  ReactDOM.render(
  <Main />
  ,
  document.getElementById('root-container')
  );
}
