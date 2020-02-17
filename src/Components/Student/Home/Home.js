import React from "react";
import LeftWidget from "./Parts/Left-Widget";
import Posts from "./Parts/PostsSection";
import Modal from "../../Common/Modal";
import RightWidget from "./Parts/Right-Widget";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { heading: "", body: "", showMod: false };
  }

  HandleShowModal(t) {
    this.setState({ heading: "", body: "", showMod: false });
  }

  UseModal(h, b, show) {
    this.setState({ heading: h, body: b, showMod: show });
  }

  render() {
    return (
      <div
        className="main-section bg-white"
        style={{ minHeight: "100%", height: "unset !important" }}
      >
        <Modal
          ShowOrNot={this.state.showMod}
          setShowOrNot={this.HandleShowModal.bind(this)}
          Heading={this.state.heading}
          body={this.state.body}
        />

        <div className="container" style={{ Height: "100%" }}>
          <div
            className="main-section-data"
            style={{ Height: "unset", minHeight: "100%" }}
          >
            <div className="row mt-3" style={{ Height: "100%" }}>
              <LeftWidget />
              <Posts
                Filiere={this.state.Filiere}
                Annee={this.state.Annee}
                useModal={this.UseModal.bind(this)}
              />
              <RightWidget />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
