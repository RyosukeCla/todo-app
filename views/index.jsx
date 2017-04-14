import React from 'react';
import DefaultLayout from './Layout';

export default class IndexPage extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <h1>{this.props.title}</h1>
        <p>Welcome to {this.props.title}</p>
      </DefaultLayout>
    );
  }
}
