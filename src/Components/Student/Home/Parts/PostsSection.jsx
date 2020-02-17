import React from "react";
import Post from "./Post";
import axios from "axios";
import TokenValidate from "../../../Common/tokenValidate";
import Loading from "../../../Common/Loading";
import { ApiHost } from "../../../Common/Config";

class PostsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Filiere: JSON.parse(localStorage.getItem("details")).Filiere,
      Annee: JSON.parse(localStorage.getItem("details")).Annee,
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
      url: ApiHost + "/api/Classes/Posts",
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
          var Posters = res.data.Posters;
          var Comments = res.data.LastComms;
          for (let i = 0; i < Posters.length; i++) {
            Posters[i].pic = ApiHost + Posters[i].pic;
            Comments[i].pic = ApiHost + Comments[i].pic;
          }
          this.setState({
            Loading: false,
            Posts: res.data.Posts,
            Posters: Posters,
            Medias: res.data.medias,
            Comments: Comments,
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
    if (this.state.Loading)
      return (
        <div className="d-block col-6">
          <Loading />
        </div>
      );
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
