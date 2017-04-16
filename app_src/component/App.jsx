import React from 'react';
import AppBar from 'material-ui/AppBar';

import Todo from './Todo.jsx';
import Task from './Task.jsx';
import TaskList from './TaskList.jsx'

export default class App extends React.Component {
  render() {
    const appbar_style = {
      position: "fixed"
    };
    const blank = {
      height: 60
    }
    return(
      <div>
        <AppBar
          title='Todo Share'
          style={appbar_style}
          showMenuIconButton={false}
        />
        <div style={blank} />
        <TaskList />
      </div>

    );
  }
}
