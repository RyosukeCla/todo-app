import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import Todo from './Todo.jsx';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {todo_id: "a", title: "aiueo", hasDone: true},
        {todo_id: "b", title: "aiueo2", hasDone: false}
      ],
      tempItem: "",
      errorMessage: ""
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  static get defaultProps() {
    return {
      task_id: "",
      title: "none"
    };
  }

  addItem(newItem) {
    const allItems = this.state.items.concat([newItem]);
    this.setState({items: allItems});
  }

  deleteItem(event, todo_id) {
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
    let newItems = Object.assign(this.state.items);
    for (let i in newItems) {
      if (newItems[i].todo_id == todo_id) {
        newItems[i].hasDone = checked;
      }
    }
    console.log(newItems);
    this.setState({items: newItems});
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
        this.addItem({
          title: this.state.tempItem,
          todo_id: "",
          hasDone: false
        });
        this.setState({tempItem: ""});
        this.setState({errorMessage: ""});
      }
    }
  }

  render() {
    const deleteItem = this.deleteItem;
    const checkItem = this.checkItem;

    return(
      <Card>
        <Toolbar>
          <ToolbarGroup firstChild={false}>
            <ToolbarTitle text={this.props.title} />
          </ToolbarGroup>
          <ToolbarGroup lastChind={true}>
            <IconButton
            iconClassName="material-icons"
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
                  key={i}
                  onTouchDelete={deleteItem}
                  onCheck={checkItem}
                  todo_id={item.todo_id}
                  title={item.title}
                  hasDone={item.hasDone}
                />
              );
            }, this)
          }
        </List>
        <CardActions>
          <TextField
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
