import React, { Component } from 'react';
import { AddIssue } from './AddIssue.js';
import { List } from './List.js';
import {issueStates, appActions} from '../constants/appConstants.js';
import appStore from '../stores/appStore.js';
import todoActions from '../actions/todoActions';

var _ToDoStore = {
    todolist: [{id:0, title:"Issue1", state:issueStates.PRODUCTION},{id:1, title:"Issue2", state:issueStates.PRODUCTION},{id:2, title:"Issue3", state:issueStates.PRODUCTION}]
}

export class ToDoContainer extends Component {
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            counter: _ToDoStore.todolist.length,
            todoList: _ToDoStore.todolist
        };
    }
    
    handleAdd(newIssue) {
        var issue = {id: this.state.counter, title: newIssue, state: issueStates.PRODUCTION};
        var list = this.state.todoList.slice();
        list.push(issue);
        this.setState({todoList: list, counter: list.length});
    }
    
    handleChangeState(index) {
        const list = this.state.todoList.slice();
        var filter = list.filter((item) => item.id == index);
        var clicked = filter[0];
        var pos = list.map(x => x.id).indexOf(index);
        clicked.state = clicked.state == issueStates.PRODUCTION ? issueStates.DONE : issueStates.PRODUCTION;
        list[pos] = clicked;
        this.setState({todoList: list});
    }
    
    handleRemove(index) {
        var list = this.state.todoList.slice();
        var pos = list.map(x => x.id).indexOf(index);
        list.splice(pos, 1);
        this.setState({todoList: list, counter: list.length});
    }
    
    getItems(state) {
        return this.state.todoList.filter((item) => item.state == state);    
    }
    
    render() {
        return (
          <div className="container">
            <h1>ToDoList App (ReactJS and Flux concepts)</h1>
            <AddIssue onClick={this.handleAdd} /><br />
            <div className="list list-production"><h2>In production</h2><List items={this.getItems(issueStates.PRODUCTION)} changeState={this.handleChangeState} remove={this.handleRemove} /></div>
            <div className="list list-done"><h2>Done</h2><List items={this.getItems(issueStates.DONE)} changeState={this.handleChangeState} remove={this.handleRemove} /></div>
          </div>
        );
      }
}

export default ToDoContainer;