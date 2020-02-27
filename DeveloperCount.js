import React from "react";

class DeveloperCount extends React.Component {
  render() {
    return (
      <p>There are currently <span>{this.props.count}</span> developers available to hire.</p>
    );
  }
}

export default DeveloperCount;