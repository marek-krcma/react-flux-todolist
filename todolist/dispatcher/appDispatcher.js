import { Dispatcher } from 'flux';
var AppDispatcher = new Dispatcher();

/*
    In Flux concept: components - actions - DISPATCHER - store
*/
AppDispatcher.handleAction = function(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

export default AppDispatcher;