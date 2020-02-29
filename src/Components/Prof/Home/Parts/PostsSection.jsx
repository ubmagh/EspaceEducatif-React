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
      Classes: "",
      Posts: "",
      Posters: "",
      Medias: "",
      Comments: "",
      Offset: 0,
      more: true,
      Likes: ""
    };
    this.useModal = props.useModal;
    var fd = new FormData();
    fd.append("classID", this.state.classID);
    axios({
      method: "get",
      url: ApiHost + "/api/DashPosts",
      params: {
        token: localStorage.getItem("LogToken") + ""
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
            Classes: res.data.Classes,
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
          Classe={this.state.Classes[i]}
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

  MorePosts() {
    axios({
      method: "get",
      url: ApiHost + "/api/MorePosts",
      header: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        Offset: "" + this.state.Offset
      }
    })
      .then(res => {
        ///
        TokenValidate(res.data);
        if (res.data.error === "ParamMissing") {
          this.useModal("w", "Données invalides", true);
        } else if (res.data.status === "succes") {
          if (res.data.Posts.length === 0) {
            this.setState({ more: false });
            return;
          }
          var Posts = this.state.Posts,
            Posters = this.state.Posters,
            Classes = this.state.Classes,
            Medias = this.state.Medias,
            Comments = this.state.Comments,
            Likes = this.state.Likes;

          var data = res.data;
          for (let i = 0; i < data.Posters.length; i++) {
            data.Posters[i].pic = ApiHost + data.Posters[i].pic;
            data.LastComms[i].pic = ApiHost + data.LastComms[i].pic;
          }
          for (let i = 0; i < data.Posts.length; i++) {
            Posts.push(data.Posts[i]);
            Classes.push(data.Classes[i]);
            Posters.push(data.Posters[i]);
            Medias.push(data.medias[i]);
            Comments.push(data.LastComms[i]);
            Likes.push(data.Likes[i]);
          }
          this.setState({
            Offset: this.state.Offset + 1,
            Posts: Posts,
            Posters: Posters,
            Classes: Classes,
            Medias: Medias,
            Comments: Comments,
            Likes: Likes
          });
        }
      })
      .catch(err => {
        this.useModal("d", "Erreure: " + err, true);
      });
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
        <div className="col-lg-6">
          {this.renderPosts()}
          <div className="process-comm">
            {this.state.more ? (
              <div
                className="spinner mt-n4 mb-3"
                onClick={e => {
                  if (this.state.more) this.MorePosts();
                }}
              >
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
              </div>
            ) : (
              <h2 className="h3  mt-n4 mb-4  ">
                {" "}
                <i className="fas fa-exclamation-circle"></i> C'est tout pour le
                moment{" "}
              </h2>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default PostsSection;
