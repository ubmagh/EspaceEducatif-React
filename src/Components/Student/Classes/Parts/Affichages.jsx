import React from "react";
import axios from "axios";
import ApiHost from "../../../Common/Config";
import TokenValidate from "../../../Common/tokenValidate";
import { renderFilesThumbs } from "../../../Common/Affichages_Functions";

class Affichage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ClassID: props.classID, files: [], data: [] };
    this.ToggleMainSection = this.props.ToggleMainSection;
    this.Usemodal = this.props.Usemodal;
  }

  setData(data) {
    this.setState({ data: data });
  }

  render() {
    return (
      <div className="w-100 d-block">
        <h3
          className="d-inline-block mr-auto text-primary h4"
          style={{ cursor: "pointer" }}
          onClick={() => this.ToggleMainSection("main")}
        >
          {" "}
          <i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i>{" "}
          Retourner à la classe{" "}
        </h3>
        <h3 className=" text-center h3 mt-md-n3 mt-sm-3 text-dark">
          {" "}
          Tableau d'affichage :{" "}
        </h3>

        <hr className="d-block text-dark w-100" />

        <div>
          <Affiches
            ClassID={this.state.ClassID}
            Usemodal={this.Usemodal}
            data={this.state.data}
            SetData={this.setData.bind(this)}
          />
        </div>
      </div>
    );
  }
}

class Affiches extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ClassID: props.ClassID, data: props.data };
    this.SetData = props.SetData;
    this.Usemodal = props.Usemodal;
    axios({
      method: "GET",
      url: ApiHost + "/api/Classes/affichages",
      params: {
        classiD: this.state.ClassID,
        token: localStorage.getItem("LogToken") + ""
      }
    })
      .then(res => {
        TokenValidate(res.data);
        if (res.data.error === "ParamMissing")
          this.Usemodal("w", "Données invalides !", true);
        else if (res.data.error === "Notpermitted")
          this.Usemodal(
            "w",
            "Vous n'avez pas l'autorisation à cette action ! ",
            true
          );
        else if (res.data.error === "none") this.SetData(res.data.data);
        else
          this.Usemodal(
            "w",
            "impossible de récupérer les données depuis le serveur!",
            true
          );
      })
      .catch(err => this.Usemodal("d", "Erreure: " + err, true));
  }

  renderData() {
    let tab = [];
    const data = this.props.data;
    if (this.props.data.length === 0)
      tab = <h4 className="h4 text-center w-100 "> Aucun affichage ! </h4>;
    else
      for (let i = 0; i < this.props.data.length; i++) {
        tab.push(
          <div
            className="card border-secondary mb-3 w-100"
            key={"affichage: " + data[i].id}
          >
            <div className="card-header ">
              <span className="text-dark font-weight-bold">
                {data[i].title}{" "}
              </span>
            </div>
            <div className="card-body text-secondary">
              <h5 className="card-title text-right text-primary">
                {data[i].date}
              </h5>
              <p className="card-text mb-4 h5">{data[i].content}</p>
              {data[i].files.length > 0 ? <hr /> : null}
              {renderFilesThumbs(data[i].files, data[i].id)}
            </div>
          </div>
        );
      }
    return tab;
  }

  render() {
    return <div className="w-100">{this.renderData()}</div>;
  }
}

export default Affichage;
