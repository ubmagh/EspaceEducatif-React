import React from "react";
import axios from "axios";
import TokenValidate from "../../../Common/tokenValidate";
import Loading from "../../../Common/Loading";
import { ApiHost } from "../../../Common/Config";
import Post from "./Post_innaprouved";

class NewPostsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classID: this.props.classID,
      Loading: true,
      Posts: [],
      Posters: [],
      Medias: [],
    };
    this.ToggleMainSection = this.props.ToggleMainSection;
    this.useModal = props.UseModal;
    var fd = new FormData();
    fd.append("classID", this.state.classID);
    axios({
      method: "get",
      url: ApiHost + "/api/Classes/InnaPosts",
      params: {
        token: localStorage.getItem("LogToken") + "",
        classID: this.state.classID,
      },
    })
      .then((res) => {
        TokenValidate(res.data);
        if (res.data.status === "Notpermitted") {
          this.useModal("w", "chargement des publications est refusé", true);
        } else if (res.data.status === "ParamMissing") {
          this.useModal(
            "w",
            " Données manquantes ou invalide réssayez plustard !",
            true
          );
        } else if (res.data.status === "succes") {
          var Posters = res.data.Posters;
          for (let i = 0; i < Posters.length; i++) {
            Posters[i].pic = ApiHost + Posters[i].pic;
          }
          this.setState({
            Loading: false,
            Posts: res.data.Posts,
            Posters: Posters,
            Medias: res.data.medias,
          });
        }
      })
      .catch((err) => {
        this.useModal("d", "erreur :" + err, true);
      });

    ///
  }

  removeItem(i) {
    let tmp = this.state;
    tmp.Posts.splice(i, 1, null);
    tmp.Medias.splice(i, 1, null);
    tmp.Posters.splice(i, 1, null);
    this.setState({ tmp });
  }

  use2Modal(mod, msg, showmod) {
    this.useModal(mod, msg, showmod);
  }

  renderPosts() {
    var tab = [];
    if (this.state.Posts.length === 0)
      return (
        <h3 className="h3 w-100 text-center">Aucune nouvelle publication</h3>
      );
    else
      for (let i = 0; i < this.state.Posts.length; i++) {
        if (this.state.Posters[i] !== null)
          tab.push(
            <Post
              key={"post:" + this.state.Posts[i].PostID}
              index={i}
              Poster={this.state.Posters[i]}
              Post={this.state.Posts[i]}
              Media={this.state.Medias[i]}
              classID={this.state.classID}
              useModal={this.useModal}
              removeIt={this.removeItem.bind(this)}
            />
          );
      }
    return tab;
  }

  render() {
    if (this.state.Loading) return <Loading />;

    return (
      <>
        <div className="user-tab-sec">
          <h3 className="text-nowrap text-center display-2 mb-n3 mt-3">
            {this.props.classeName}
          </h3>
          <div className=" text-nowrap text-center star-descp">
            <span
              className="txt mx-auto"
              style={{
                float: "none",
                textAlign: "center !important",
              }}
            ></span>
          </div>
        </div>
        <div className="company-title">
          <h3 className="h2 d-block text-center ">
            approuver les nouvelles Publications
          </h3>

          <div className="d-block w-100">
            <h3
              onClick={(e) => this.ToggleMainSection("main")}
              className="float-left text-primary "
              style={{ cursor: "pointer" }}
            >
              {" "}
              <i
                className="fa fa-arrow-left mr-0 ml-n2 "
                aria-hidden="true"
              ></i>{" "}
              Retourner à la classe
            </h3>
          </div>
        </div>
        <div className="product-feed-tab current" id="feed-dd">
          <div className="posts-section mt-4">{this.renderPosts()}</div>
        </div>
      </>
    );
  }
}

export default NewPostsApp;
