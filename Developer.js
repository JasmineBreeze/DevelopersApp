import React from "react";

import "./Developer.css";

class Developer extends React.Component {
  handleDelete = () => {
    this.props.deleteDeveloperFunc(this.props.id);
  }
  render() {
    return (
      <div className="row">
        <div className="col-12 col-sm-3">
          <p>{this.props.DeveloperName}</p>
        </div>
        <div className="col-12 col-sm-3">
          <p>{this.props.skills}</p>
        </div>
        <div className="col-12 col-sm-2">
          <p>{this.props.dateJoined}</p>
        </div>
        <div className="col-12 col-sm-2">
          <button className="btn btn-danger" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
        <div className="col-12 col-sm-2">
          {this.props.available === true ? (
            <button className="btn btn-primary book-button">Book</button>
          ) : (
            <button disabled className="btn btn-primary book-button">
              Unavailable
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Developer;
