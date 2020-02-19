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
      classID: props.classID,
      Loading: true,
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

  MorePosts() {
    axios({
      method: "get",
      url: ApiHost + "/api/Classes/MorePosts",
      header: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        Offset: "" + this.state.Offset,
        classID: "" + this.state.classID
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
            Medias = this.state.Medias,
            Comments = this.state.Comments,
            Likes = this.state.Likes;

          var data = res.data;
          for (let i = 0; i < data.Posters.length; i++) {
            data.Posters[i].pic = ApiHost + data.Posters[i].pic;
            data.LastComms[i].pic = ApiHost + data.LastComms[i].pic;
          }
          for (let i = 0; i < data.Posts.length; i++) {
            Posters.push(data.Posters[i]);
            Medias.push(data.medias[i]);
            Comments.push(data.LastComms[i]);
            Likes.push(data.Likes[i]);
            Posts.push(data.Posts[i]);
          }
          this.setState({
            Offset: this.state.Offset + 1,
            Posts: Posts,
            Posters: Posters,
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
    if (this.state.Loading) return <Loading />;
    return (
      <>
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
      </>
    );
  }
}

export default PostsSection;
