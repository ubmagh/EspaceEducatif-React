import React from "react";
import LeftWidget from "./Parts/Left-Widget";
import Posts from "./Parts/Posts";
import RightWidget from "./Parts/Right-Widget";

class Home extends React.Component {
  render() {
    return (
      <div
        className="main-section bg-white"
        style={{ minHeight: "100%", height: "unset !important" }}
      >
        <div className="container" style={{ Height: "100%" }}>
          <div
            className="main-section-data"
            style={{ Height: "unset", minHeight: "100%" }}
          >
            <div className="row mt-3" style={{ Height: "100%" }}>
              <LeftWidget />
              <Posts
                useriD={JSON.parse(localStorage.getItem("user") + "").id}
                Avatar={
                  JSON.parse(localStorage.getItem("details") + "").AvatarPath
                }
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
