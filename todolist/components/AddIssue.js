import React, { Component } from 'react';

export class AddIssue extends React.Component {
  constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
          var newIssue = this.refs.newIssue.value;
        this.refs.newIssue.value = "";
        if (newIssue)
          this.props.onClick(newIssue);
        else return false;
    }
    
    render() {
    return (
      <div>
        <input type="text" ref="newIssue" className="form-control" placeholder="What needs to be done"   />
        <button className="btn" onClick={this.handleSubmit}>Add issue</button>
      </div>
    );
  }
}


export default AddIssue;