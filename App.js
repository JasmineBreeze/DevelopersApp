import React from "react";
import uuid from "uuid/v4";
import DeveloperCount from "./DeveloperCount";
import Header from "./Header";
import Developer from "./Developer";
import AddDeveloper from "./AddDeveloper";
import axios from "axios";

import "./App.css";

// Only class components can have state
// State must live in the parent of any components that need to access it
class App extends React.Component {
  state = {
    developers: []
  };

componentDidMount(){
  //fetch the developers making a get request 
  axios.get("https://upv99e7bqh.execute-api.eu-west-1.amazonaws.com/dev/developers").then((response) => {
    const developers = response.data.developers;
    this.setState({
      developers: developers
    })
  })
  .catch((err) => {
    console.log(err);
  });
  //then set them as the state
}

  deleteDeveloper = id => {
    const filteredDevelopers = this.state.developers.filter(dev => {
      return dev.id !== id;
    });
    console.log(filteredDevelopers);
    this.setState({
      developers: filteredDevelopers
    });
  };

  addNewDeveloper = (name, skills, dateJoined) => {

    // Create a new developer object
    const newDev = {
      name: name,
      skills: skills,
      available: true,
      dateJoined: dateJoined,
      id: uuid()
    };

    // Copy the array of developers from state using slice
    const copy = this.state.developers.slice();

    // Push that object into the array of developers
    copy.push(newDev);

    // Make sure state is updated
    this.setState({
      developers: copy
    });
  };

  render() {
    const availableDevelopers = this.state.developers.filter(developer => {
      return developer.available == true;
    });

    const unavailableDevelopers = this.state.developers.filter(developer => {
      return developer.available == false;
    });

    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddDeveloper addNewDeveloperFunc={this.addNewDeveloper} />
          <DeveloperCount count={availableDevelopers.length} />
          <h2>Available right now:</h2>
          {availableDevelopers.map(developer => {
            return (
              <Developer
                deleteDeveloperFunc={this.deleteDeveloper}
                key={developer.id}
                available={developer.available}
                name={developer.name}
                skills={developer.skills}
                dateJoined={developer.dateJoined}
                id={developer.id}
              />
            );
          })}
          <h2>Currently working very hard:</h2>
          {unavailableDevelopers.map(developer => {
            return (
              <Developer
                deleteDeveloperFunc={this.deleteDeveloper}
                key={developer.id}
                available={developer.available}
                name={developer.name}
                skills={developer.skills}
                dateJoined={developer.dateJoined}
                id={developer.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
