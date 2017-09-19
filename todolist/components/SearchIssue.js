import React, { Component } from 'react';

/*
    Component represents searching functionality
*/
export class SearchIssue extends React.Component {
  constructor(props){
        super(props);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleKeydown(e) {
        //this.refs.newIssue.value = "";
        var queryString = e.target.value;
        this.props.onKeydown(queryString);
    }
    handleDelete(e) {
        this.refs.searchIssue.value = "";
        this.props.onDeleteClick();
    }
    render() {
    return (
      <div>
        <input type="text" ref="searchIssue" className="form-control" placeholder="Search issue" onKeyUp={this.handleKeydown} />
        <span onClick={this.handleDelete}> x</span>
      </div>
    );
  }
}


export default SearchIssue;