import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {issueStates, appActions} from '../constants/appConstants.js';
import objectAssign from 'object-assign';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';

/*
    Variable _appstore is the application data storage.
    It contains domains objects.
    
    In Flux concept: components - actions - dispatcher - STORE
*/
var _appStore = {
  todoList: [
      {id:0, title:"Issue1", state:issueStates.PRODUCTION},
      {id:1, title:"Issue2", state:issueStates.PRODUCTION},
      {id:2, title:"Issue3", state:issueStates.PRODUCTION},
      {id:3, title:"Issue4", state:issueStates.DONE},
      {id:4, title:"Issue5", state:issueStates.DONE},
      {id:5, title:"Issue6", state:issueStates.PRODUCTION}
  ]
};

/* counter provides a unique ID when creating new item */
var counter = _appStore.todoList.length;

var getNewID = function() {
    return counter++;
};

var addIssue = function(item){
    var newItem = {id: getNewID(), title: item, state: issueStates.PRODUCTION};
  _appStore.todoList.push(newItem);
};

var removeIssue = function(id){
    var pos = _appStore.todoList.map(x => x.id).indexOf(id);
    _appStore.todoList.splice(pos, 1);
}

var changeState = function(id, state){
    var pos = _appStore.todoList.map(x => x.id).indexOf(id);
    _appStore.todoList[pos].state = state;
}

/*
    Public API used by main component. It registers listeners.
    getList()
    getParamList()
    getListByState()
*/
var appStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getList(){
        return _appStore.todoList;
    },
    getParamList: function(params) {
        //(item) => (item.state == params.state && item.title.indexOf(params.query) > 0)
        return _appStore.todoList.filter(function(item) {
            var query = "";
            if(params.query) {
                return (item.state == params.state && item.title.toLowerCase().indexOf(params.query.toLocaleLowerCase()) > -1)
            }
            else return (item.state == params.state);
        } ); 
    },
    getListByState: function(state){
        return _appStore.todoList.filter((item) => item.state == state); 
    }
});

/*
    Dispatcher registering
*/
AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appActions.ADD_ISSUE:
      addIssue(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appActions.CHANGE_STATE:
      changeState(action.data.id, action.data.state);
      appStore.emit(CHANGE_EVENT);
      break;
    case appActions.REMOVE_ISSUE:
      removeIssue(action.data);
      appStore.emit(CHANGE_EVENT);
      break;
    case appActions.SEARCH:
      appStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

export default appStore;