import React, { Component } from 'react';

/*
    Component represents a single item of todolist store.
*/
export const List = (props) => {
    var todoItems = props.items.map(function(item, index){
      return (
        <li key={item.id}  >
          <span onClick={() => props.changeState(item.id)}>
            {item.title}
          </span>
          <div
            className="remove"
            onClick={() => props.remove(item.id)}>x
          </div>
        </li>
      )
    });
    return <ol>{todoItems}</ol>;
}



export default List;