import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import {grey500} from 'material-ui/styles/colors'

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnCheck = this.handleOnCheck.bind(this);
    this.handleOnTouchTap = this.handleOnTouchTap.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);

    this.state = {
      hover: false
    }
  }

  static get defaultProps() {
    return {
      todo_id: "",
      title: "none",
      hasDone: false,
      onCheck: function(){},
      onTouchDelete: function() {}
    };
  }

  handleOnCheck(event, checked) {
    this.props.onCheck(event, checked, this.props.todo_id);
  }

  handleOnTouchTap(event) {
    this.props.onTouchDelete(event, this.props.todo_id);
  }

  handleMouseOut() {
    this.setState({hover: false});
  }

  handleMouseOver() {
    this.setState({hover: true});
  }

  render() {
    const deleteButtonStyle = this.state.hover ? {color: grey500} : {display: "none"};
    return(
      <div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <ListItem
          leftCheckbox={
            <Checkbox
              defaultChecked={this.props.hasDone}
              onCheck={this.handleOnCheck}
            />
          }
          primaryText={this.props.title}
          rightIconButton={
            <IconButton
              iconClassName="material-icons"
              onTouchTap={this.handleOnTouchTap}
              iconStyle={deleteButtonStyle}
              >
              clear
            </IconButton>
          }
        />
      </div>
    );
  }
}
