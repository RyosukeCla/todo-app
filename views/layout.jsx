import React from 'react';

export default class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <link type="text/css" rel="stylesheet" href="/stylesheets/style.css" />
        </head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}
