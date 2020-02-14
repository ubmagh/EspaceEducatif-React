import React from "react";
import Post from "./Post";
import axios from "axios";
import TokenValidate from "../../../Common/tokenValidate";
import Loading from "../../../Common/Loading";

class PostsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classID: props.classID,
      Loading: true,
      Posts: "",
      Posters: "",
      Medias: "",
      Comments: ""
    };
    this.useModal = props.useModal;
    var fd = new FormData();
    fd.append("classID", this.state.classID);
    axios({
      method: "get",
      url: "http://localhost:8000/api/Classes/Posts",
      params: {
        token: localStorage.getItem("LogToken") + "",
        classID: this.state.classID
      }
    })
      .then(res => {
        TokenValidate(res.data);
        if (res.data.status === "NonAuth") {
          this.useModal("w", "chargement des publications est refusé", true);
        } else if (res.data.status === "succes") {
          this.setState({
            Loading: false,
            Posts: res.data.Posts,
            Posters: res.data.Posters,
            Medias: res.data.medias,
            Comments: res.data.LastComms,
            Likes: res.data.Likes
          });
        }
      })
      .catch(err => {
        this.useModal("d", "erreur :" + err, true);
      });

    ///
  }

  renderPosts() {
    var tab = [];
    for (let i = 0; i < this.state.Posts.length; i++) {
      tab.push(
        <Post
          key={"post:" + this.state.Posts[i].PostID}
          Poster={this.state.Posters[i]}
          Post={this.state.Posts[i]}
          Media={this.state.Medias[i]}
          Comment={this.state.Comments[i]}
          Like={this.state.Likes[i]}
          useModal={this.useModal}
        />
      );
    }
    return tab;
  }

  render() {
    if (this.state.Loading) return <Loading />;
    return (
      <>
        {this.renderPosts()}
        <div className="process-comm">
          <div className="spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>
      </>
    );
  }
}

export default PostsSection;
