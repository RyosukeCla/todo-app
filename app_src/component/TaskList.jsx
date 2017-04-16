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

import axios from 'axios';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      tempTask: "",
      errorMessage: ""
    }

    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnTouchDelete = this.handleOnTouchDelete.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
  }

  static get defaultProps() {
    return {
    };
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

  handleOnTouchDelete(event, task_id) {
    const deleteTask = this.deleteTask;
    axios.delete(`/api/task/${task_id}`)
    .then(function(res) {
      deleteTask(event, task_id);
    })
    .catch(function(err) {
      console.log(err);
    });
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
        const addTask = this.addTask;
        const title = this.state.tempTask;
        axios.post(`api/task`, {
          title: title
        })
        .then(function(res) {
          addTask({
            title: title,
            task_id: res.data.task_id
          });
        })
        .catch(function(err) {
          console.log(err);
        });
        this.setState({tempTask: ""});
        this.setState({errorMessage: ""});
      }
    }
  }

  componentDidMount() {
    // use ajax, and get and set tasks
    const updateTasks = this.updateTasks;
    axios.get(`/api/task`)
    .then(function(res) {
      let newTasks = [];
      for (let i in res.data) {
        newTasks.push({
          task_id: res.data[i]._id,
          title: res.data[i].title
        });
      }
      updateTasks(newTasks)
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  updateTasks(tasks) {
    this.setState({tasks: tasks});
  }

  render() {
    const containerStyle = {
      padding: 20
    }
    const paperStyle = {
      paddingTop: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20
    }
    const handleOnTouchDelete = this.handleOnTouchDelete;
    return(
      <div style={containerStyle}>
        <Paper zDepth={2} style={paperStyle}>
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
                    onTouchDelete={handleOnTouchDelete}
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
