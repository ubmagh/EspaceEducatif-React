import React from "react";
import axios from "axios";
import ApiHost from "../../../Common/Config";
import TokenValidate from "../../../Common/tokenValidate";
import FormatFileSize from "../../../Common/FileSizeFormat";

class TabAffichage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { classID: props.classID, data: [] };
    this.ToggleMainSection = props.ToggleMainSection;
    this.UseModal = props.UseModal;
    axios({
      url: ApiHost + "/api/Classes/QuickAffichages",
      method: "GET",
      params: {
        token: localStorage.getItem("LogToken"),
        classID: this.state.classID
      }
    })
      .then(res => {
        TokenValidate(res.data);
        switch (res.data.error) {
          case "ParamMissing":
            this.UseModal("w", "Les données fournies sont incorrectes", true);
            break;
          case "Notpermitted":
            this.UseModal(
              "d",
              "Action refusée! vous n'etes pas permis !",
              true
            );
            break;
          case "none":
            this.setState({ data: res.data.content });
            break;
          default:
            this.UseModal("d", "Une Erreure Servenue ! ", true);
        }
      })
      .catch(err => {});
    //*
  }

  RenderFiles(files) {
    let tab = [];
    let pic = "";
    for (let i = 0; i < files.length; i++) {
      //check image
      switch (files[i].type) {
        case "image":
          pic = <i className="far d-inline fa-image fa-lg mr-1 ml-n1"></i>;
          break;
        case "zip":
          pic = (
            <i className="fas d-inline fa-file-archive fa-lg mr-1 ml-n1"></i>
          );
          break;
        case "pdf":
          pic = <i className="far d-inline fa-file-pdf fa-lg mr-1 ml-n1"></i>;
          break;
        case "presentation":
          pic = (
            <i className="far d-inline fa-file-powerpoint fa-lg mr-1 ml-n1"></i>
          );
          break;
        case "word":
          pic = <i className="far d-inline fa-file-word fa-lg mr-1 ml-n1"></i>;
          break;
        case "Excel":
          pic = <i className="far d-inline fa-file-excel fa-lg mr-1 ml-n1"></i>;
          break;
        case "video":
          pic = <i className="far d-inline fa-file-video fa-lg mr-1 ml-n1"></i>;
          break;
        case "audio":
          pic = <i className="far d-inline fa-file-audio fa-lg mr-1 ml-n1"></i>;
          break;
        default:
          pic = <i className="fas d-inline fa-question fa-lg mr-1 ml-n1"></i>;
      }
      tab.push(
        <li
          key={"m:" + files[i].id}
          style={{ cursor: "pointer", listStyle: "none" }}
          className="text-dark font-weight-bold mt-3 col-11 d-block mx-auto text-truncate"
          onClick={() =>
            window.open(
              ApiHost +
                "/api/Classes/Affichage_Media/?token=" +
                localStorage.getItem("LogToken") +
                "&mediaiD=" +
                files[i].id +
                "&AffiD=" +
                this.state.data[i].id,
              "_blank"
            )
          }
        >
          {pic} {files[i].originalName} ({FormatFileSize(files[i].size, true)})
        </li>
      );
    }
    return tab;
  }

  rendreAffiches() {
    let tab = this.state.data,
      Component = [];
    for (let i = 0; i < tab.length; i++) {
      Component.push(
        <div
          style={{
            listStyle: "none",
            border: " 5px solid rgb(229, 229, 229) "
          }}
          className="py-4 w-100 border border-top-0 border-left-0 border-right-0 "
          key={"aff:" + tab[i].id}
        >
          <h5 className="d-block mx-auto text-center text-primary mt-1 mb-2">
            <u> {tab[i].date} </u>
          </h5>

          <h4 className=" text-danger h4 col-11 d-block mx-auto mb-3 text-centre font-weight-bold">
            {" "}
            {tab[i].title}{" "}
          </h4>

          <p className="mx-3 mb-3 h5  "> {tab[i].content} </p>

          {tab[i].files.length > 0 ? (
            <hr className="col-6 mx-auto text-centre mt-2" />
          ) : null}

          {this.RenderFiles(tab[i].files)}
        </div>
      );
    }
    return Component;
  }

  render() {
    return (
      <div className="main-left-sidebar" style={{ marginTop: "-2px" }}>
        {/*user_profile end*/}
        <div className="suggestions full-width">
          <div
            className="sd-title mb-2"
            style={{ borderTop: "1px solid #e5e5e5" }}
          >
            <h3 className="" style={{ float: "none", fontWeight: "bold" }}>
              {" "}
              <span className="text-left ">Tableau d'affichage</span>{" "}
              <span className="text-right">
                <i className="far fa-newspaper text-right float-right fa-lg"></i>
              </span>
            </h3>
          </div>
          {/*sd-title end*/}
          <div className="suggestions-list">
            <div>{this.rendreAffiches()}</div>
            <div className="view-more mt-2">
              <h3
                className="text-primary text-center h5 mb-n2 font-weight-bold"
                style={{ cursor: "pointer" }}
                onClick={() => this.ToggleMainSection("affichage")}
              >
                <i
                  className="fa fa-plus-circle fa-lg ml-n1 mr-1 "
                  aria-hidden="true"
                ></i>
                Voir tout
              </h3>
            </div>
          </div>
          {/*suggestions-list end*/}
        </div>
        {/*suggestions end*/}
      </div>
    );
  }
}

export default TabAffichage;
