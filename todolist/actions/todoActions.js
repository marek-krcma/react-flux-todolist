import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {issueStates, appActions} from '../constants/appConstants.js';

/*
    Defines actions in the application. Setting connection with the dispatcher.
    In Flux concept: components - ACTIONS - dispatcher - store
*/
var todoActions = {
  addIssue: function(item){
    AppDispatcher.handleAction({
      actionType: appActions.ADD_ISSUE,
      data: item
    });
  },
  removeIssue: function(id){
    AppDispatcher.handleAction({
      actionType: appActions.REMOVE_ISSUE,
      data: id
    })
  },
    searchIssue: function(query){
    AppDispatcher.handleAction({
      actionType: appActions.SEARCH,
      data: {searchQuery:query}
    })
  },
    changeState: function(id, status){
    AppDispatcher.handleAction({
      actionType: appActions.CHANGE_STATE,
      data: {id: id, state: status}
    })
  },
};

export default todoActions;