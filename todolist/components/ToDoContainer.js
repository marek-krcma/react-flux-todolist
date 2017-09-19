import React, { Component } from 'react';
import { AddIssue } from './AddIssue.js';
import { SearchIssue } from './SearchIssue.js';
import { List } from './List.js';
import {issueStates, appActions} from '../constants/appConstants.js';
import appStore from '../stores/appStore.js';
import todoActions from '../actions/todoActions';

/*
    The base application container.
    Handles all application actions.
    Registers application listeners in STORE.
    Calls ACTIONS method.
    Renders the hierarchy of the components.
    Method _onChange() is registered in Flux event mechanism - 
    it updates application state when change_event is fired
    
    In Flux concept: COMPONENTS - actions - dispatcher - store
*/

export class ToDoContainer extends Component {
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleOnDeleteClick = this.handleOnDeleteClick.bind(this);
        this._onChange = this._onChange.bind(this);
        this.state = {
            todoList: appStore.getList(),
            searchQuery: ""
        };
    }
    
    componentDidMount(){
        appStore.addChangeListener(this._onChange);
    }
    componentWillUnmount(){
        appStore.removeChangeListener(this._onChange);
    }

    _onChange(){
        this.setState({
            todoList: appStore.getList()
        });
    }
    handleAdd(newIssue) {
        todoActions.addIssue(newIssue);
    }
    handleSearch(query) {
        this.setState({
            searchQuery: query
        });
    }
    handleChangeState(index) {
        const list = this.state.todoList.slice();
        var filter = list.filter((item) => item.id == index);
        var state = filter[0].state == issueStates.PRODUCTION ? issueStates.DONE : issueStates.PRODUCTION;
        todoActions.changeState(index, state);
    }
    
    handleRemove(index) {
        todoActions.removeIssue(index);
    }
    
    handleOnDeleteClick() {
        this.setState({
            searchQuery: ""
        });
    }

    getList(params) {
        return appStore.getListByState(params.state);
    }
    
    getListByState(stateP) {
        //return appStore.getListByState(state);
        return appStore.getParamList({query: this.state.searchQuery, state: stateP})
    }
    
    render() {
        return (
          <div className="container">
            <h1>ToDoList App (ReactJS and Flux concepts)</h1>
            <AddIssue onClick={this.handleAdd} />
            <SearchIssue onKeydown={this.handleSearch} onDeleteClick={this.handleOnDeleteClick}/><br />
            <div className="list list-production"><h2>In production</h2><List items={this.getListByState(issueStates.PRODUCTION)} changeState={this.handleChangeState} remove={this.handleRemove} /></div>
            <div className="list list-done"><h2>Done</h2><List items={this.getListByState(issueStates.DONE)} changeState={this.handleChangeState} remove={this.handleRemove} /></div>
          </div>
        );
      }
}

export default ToDoContainer;