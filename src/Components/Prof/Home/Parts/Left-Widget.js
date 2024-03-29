import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ApiHost } from "../../../Common/Config";

class LeftWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: JSON.parse(localStorage.getItem("details")),
      data: "",
    };

    axios({
      method: "get",
      url: ApiHost + "/api/classes/GetInitialClasses",
      params: {
        token: localStorage.getItem("LogToken"),
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        //look at reponse data for token errors
        if ((res.data.error + " ").search("token") !== -1) {
          localStorage.clear();
          var getUrl = window.location;
          var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
          //window.open(baseUrl);
          window.location = baseUrl;
        }
        ////if token error goback to login page

        this.setState({ data: res.data });
      })
      .catch((e) => this.setState({ data: { error: "networkERr: " + e } }));
  }

  Error() {
    return (
      <>
        <h4 className="text-danger">
          <i className="fa fa-times text-danger" /> Une Erreur est servenue
        </h4>
      </>
    );
  }

  Succes() {
    var rows = [];

    for (let i = 0; i < this.state.data.length; i++) {
      rows.push(
        <Link
          to={"/Classes/" + this.state.data[i].id}
          key={"classe:" + this.state.data[i].id}
        >
          <h1 key={this.state.data[i].id} className="text-left py-2 mx-auto">
            {" "}
            {this.state.data[i].Filiere +
              this.state.data[i].Annee +
              ":" +
              this.state.data[i].ClasseName}{" "}
          </h1>
        </Link>
      );
    }

    return rows;
  }

  render() {
    return (
      <div className="col-lg-3 col-md-4 pd-left-none no-pd">
        <div className="main-left-sidebar no-margin">
          <div className="user-data full-width">
            <div className="user-profile">
              <div className="username-dt">
                <div className="usr-pic">
                  <Link to={"/Profile"}>
                    <img
                      src={this.state.details.AvatarPath}
                      style={{
                        backgroundColor: "white",
                        height: "100px",
                        width: "100px",
                      }}
                      alt="qsd"
                    />
                  </Link>
                </div>
              </div>
              {/*username-dt end*/}
              <div className="user-specs">
                <Link to={"/Profile"}>
                  <h3>
                    {this.state.details.Lname + " " + this.state.details.Fname}
                  </h3>
                </Link>
                <span>
                  {this.state.details.Filiere + " - "}{" "}
                  {this.state.details.Matiere}
                </span>
              </div>
            </div>
            {/*user-profile end*/}
          </div>
          {/*user-data end*/}
          <div className="suggestions full-width">
            <div className="sd-title">
              <h3>Mes Classes</h3>
            </div>
            {/*sd-title end*/}
            <div className="suggestions-list">
              <div className="suggestion-usd">
                <div className="sgt-text">
                  {
                    this.state.data.error + "".length !== 0
                      ? this.Succes()
                      : this.Error() ///TODO
                  }
                </div>
              </div>
              <div className="view-more">
                <Link to="Classes">
                  <i className="fas fa-plus ml-n1 mr-1"></i> Voir Plus
                </Link>
              </div>
            </div>
            {/*suggestions-list end*/}
          </div>
          {/*suggestions end*/}
        </div>
        {/*main-left-sidebar end*/}
      </div>
    );
  }
}

export default LeftWidget;
