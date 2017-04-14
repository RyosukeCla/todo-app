import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  render() {
    return(
      <div>Main</div>
    );
  }
}

window.onload = function() {
  ReactDOM.render(
  <Main />
  ,
  document.getElementById('root-container')
  );
}
