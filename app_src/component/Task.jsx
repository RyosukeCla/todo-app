import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import Todo from './Todo.jsx';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {grey500} from 'material-ui/styles/colors';

import axios from 'axios';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      tempItem: "",
      errorMessage: "",
      "hover": false
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleCheckItem = this.handleCheckItem.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.handleOnTouchTap = this.handleOnTouchTap.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  static get defaultProps() {
    return {
      task_id: "",
      title: "none",
      onTouchDelete: function(){}
    };
  }

  addItem(newItem) {
    // use ajax
    const allItems = this.state.items.concat([newItem]);
    this.setState({items: allItems});
  }

  deleteItem(event, todo_id) {
    // use ajax
    let newItems = [];
    for (let i in this.state.items) {
      if (this.state.items[i].todo_id == todo_id) {

      } else {
        newItems.push(this.state.items[i]);
      }
    }
    this.setState({items: newItems});
  }

  checkItem(event, checked, todo_id) {
    // use ajax
    let newItems = Object.assign(this.state.items);
    for (let i in newItems) {
      if (newItems[i].todo_id == todo_id) {
        newItems[i].hasDone = checked;
      }
    }
    this.setState({items: newItems});
  }

  handleDeleteItem(event, todo_id) {
    const deleteItem = this.deleteItem;
    const toi = todo_id;
    const ev = event;
    axios.delete(`/api/todo/single/${todo_id}`)
    .then(function(res) {
      deleteItem(ev, toi);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  handleCheckItem(event, checked, todo_id) {
    const checkItem = this.checkItem;
    const ev = event;
    const ch = checked;
    const toi = todo_id;
    axios.put(`/api/todo/single/${todo_id}`, {
      has_done: ch
    })
    .then(function(res) {
      checkItem(ev, ch, toi);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  handleOnChange(event, value) {
    this.setState({tempItem: value})
    if (value.length > 0) {
      this.setState({errorMessage: ""});
    } else {
      this.setState({errorMessage: "at least 1 characters."});
    }
  }

  handleOnKeyPress(event) {
    if (event.key === 'Enter') {
      if (this.state.tempItem.length > 0) {
        const addItem = this.addItem;
        const title = this.state.tempItem;
        const task_id = this.props.task_id;
        axios.post(`/api/todo`, {
          title: title,
          task_id: task_id
        })
        .then(function(res) {
          addItem({
            title: title,
            todo_id: res.data.todo_id
          });
        })
        .catch(function(err) {
          console.log(err);
        });
        this.setState({tempItem: ""});
        this.setState({errorMessage: ""});
      }
    }
  }

  handleOnTouchTap(event) {
    this.props.onTouchDelete(event, this.props.task_id);
  }

  handleMouseOut() {
    this.setState({hover: false});
  }

  handleMouseOver() {
    this.setState({hover: true});
  }

  componentDidMount() {
    // use ajax, and get and set items
    //this.setState({items: newItems});
    const updateItems = this.updateItems;
    axios.get(`/api/todo/from_task/${this.props.task_id}`)
    .then(function(res) {
      let newItems = [];
      for (let i in res.data) {
        newItems.push({
          todo_id: res.data[i]._id,
          title: res.data[i].title,
          hasDone: res.data[i].has_done
        });
      }
      updateItems(newItems)
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  updateItems(items) {
    this.setState({items: items});
  }

  render() {
    const handleDeleteItem = this.handleDeleteItem;
    const handleCheckItem = this.handleCheckItem;
    const deleteButtonStyle = this.state.hover ? {color: grey500} : {display: "none"};

    const textFieldStyle = {
      marginTop: -30,
      marginBottom: 10
    };
    const cardActionStyle = {
      paddingLeft: 20,
      paddingRight: 20
    };

    return(
      <Card>
        <Toolbar onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <ToolbarGroup firstChild={false}>
            <ToolbarTitle text={this.props.title} />
          </ToolbarGroup>
          <ToolbarGroup lastChind={true}>
            <IconButton
              onTouchTap={this.handleOnTouchTap}
              iconClassName="material-icons"
              iconStyle={deleteButtonStyle}
            >
              clear
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <List>
          {
            this.state.items.map(function(item, i) {
              return (
                <Todo
                  key={item.todo_id}
                  onTouchDelete={handleDeleteItem}
                  onCheck={handleCheckItem}
                  todo_id={item.todo_id}
                  title={item.title}
                  hasDone={item.hasDone}
                />
              );
            }, this)
          }
        </List>
        <CardActions style={cardActionStyle}>
          <TextField
            style={textFieldStyle}
            fullWidth={true}
            floatingLabelText="Add your todo. ('Enter': add)"
            onChange={this.handleOnChange}
            onKeyPress={this.handleOnKeyPress}
            value={this.state.tempItem}
            errorText={this.state.errorMessage}
            />
        </CardActions>
      </Card>
    );
  }
}
