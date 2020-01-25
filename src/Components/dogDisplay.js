import React from "react";
import { Card, Input, Image, Button, Container } from "semantic-ui-react";

class dogDisplay extends React.Component {
  state = {
    doggos: [],
    doggoText: ""
  };

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/hound/images")
      .then(res => res.json())
      .then(dogs => {
        console.log("fetch: dogs: ", dogs);
        this.setState({ ...this.state, doggos: dogs.message });
      })
      .catch(err => console.log("error on fetch: ", err));
  }

  handleDogTextChange = e => {
    this.setState({ ...this.state, doggoText: e.target.value });
  };

  handleDogFetch = e => {
    e.preventDefault();
    fetch(`https://dog.ceo/api/breed/${this.state.doggoText}/images`)
      .then(res => res.json())
      .then(dogData => {
        console.log("handleDogFetch: dogData: ", dogData);
        if (dogData.status !== "error") {
          this.setState({ ...this.state, doggos: dogData.message });
        }
      })
      .catch(err => console.log("fetch in handleDogFetch error: err:", err));
  };

  render() {
    return (
      <div className="App">
        <h1>Hello Doggos</h1>
        <Input
          type="text"
          value={this.state.doggoText}
          onChange={this.handleDogTextChange}
        />
        <Button color="primary" onClick={this.handleDogFetch}>
          fetch dogs
        </Button>

        <div className="doggos">
          {this.state.doggos &&
            this.state.doggos.map(doggo => {
              return (
                <Container textAlign="center">
                  <Image src={doggo} key={doggo} alt={doggo} />
                  <br />
                </Container>
              );
            })}
        </div>
      </div>
    );
  }
}

export default dogDisplay;
