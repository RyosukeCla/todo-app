import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

import {grey500} from 'material-ui/styles/colors'

import Task from './Task.jsx'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {task_id: "aa", title: "aiueo"},
        {task_id: "bb", title: "test"}
      ],
      tempTask: "",
      errorMessage: ""
    }

    this.deleteTask = this.deleteTask.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  static get defaultProps() {
    return {};
  }

  addTask(newTask) {
    // use ajax
    const allTasks = this.state.tasks.concat([newTask]);
    this.setState({tasks: allTasks});
  }

  deleteTask(event, task_id) {
    // use ajax
    let newTasks = [];
    for (let i in this.state.tasks) {
      if (this.state.tasks[i].task_id == task_id) {

      } else {
        newTasks.push(this.state.tasks[i]);
      }
    }
    this.setState({tasks: newTasks});
  }

  handleOnChange(event, value) {
    this.setState({tempTask: value})
    if (value.length > 0) {
      this.setState({errorMessage: ""});
    } else {
      this.setState({errorMessage: "at least 1 characters."});
    }
  }

  handleOnKeyPress(event) {
    if (event.key === 'Enter') {
      if (this.state.tempTask.length > 0) {
        this.addTask({
          title: this.state.tempTask,
          task_id: ""
        });
        this.setState({tempTask: ""});
        this.setState({errorMessage: ""});
      }
    }
  }

  componentDidMount() {
    // use ajax, and get and set tasks
  }

  render() {
    const containerStyle = {
      padding: 20
    }
    const deleteTask = this.deleteTask;
    return(
      <div style={containerStyle}>
        <Paper zDepth={2} style={containerStyle}>
          <TextField
            fullWidth={true}
            floatingLabelText="Add your task. ('Enter': add)"
            onChange={this.handleOnChange}
            onKeyPress={this.handleOnKeyPress}
            value={this.state.tempTask}
            errorText={this.state.errorMessage}
            />
        </Paper>
        <br />
        <div style={containerStyle}>
          {
            this.state.tasks.map(function(task, i) {
              return (
                <div>
                  <Task
                    key={task.task_id}
                    onTouchDelete={deleteTask}
                    task_id={task.task_id}
                    title={task.title}
                  />
                  <br />
                </div>
              );
            }, this)
          }
        </div>
      </div>
    );
  }
}
