import React from "react";
import RightWidget from "../Home/Parts/Right-Widget";
import LeftWidget from "../Home/Parts/Left-Widget";
import { Link } from "react-router-dom";
import axios from "axios";
import { ApiHost } from "../../Common/Config";

class ClassesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };

    axios({
      method: "get",
      url: ApiHost + "/api/classes/GetClassesList",
      params: {
        token: localStorage.getItem("LogToken")
      },
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
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
      .catch(e => this.setState({ data: { error: "networkERr: " + e } }));
  }

  GetRows() {
    var rows = [];

    for (let i = 0; i < this.state.data.length; i++) {
      let Annee = "";
      let Filiere = "";
      if (this.state.data[i].Annee + "" === "2") Annee = "2éme Année";
      else Annee = "1er Année";

      switch (this.state.data[i].Filiere) {
        case "GI":
          Filiere = "Génie Informatique";
          break;
        case "GE":
          Filiere = "Génie Eléctrique";
          break;
        default:
          Filiere = "Undefined";
      }

      rows.push(
        <tr key={this.state.data[i].id} className="py-3">
          <th scope="row" className="text-left py-3">
            <Link to={"/Classes/" + this.state.data[i].id + ""}>
              {" "}
              {this.state.data[i].ClasseName}
            </Link>
          </th>
          <td className="text-center py-3"> {Filiere} </td>
          <td className="text-center py-3"> {Annee} </td>
        </tr>
      );
    }
    return rows;
  }

  render() {
    return (
      <div className="main-section" style={{ Height: "100%" }}>
        <div className="container" style={{ Height: "100%" }}>
          <div className="main-section-data" style={{ Height: "100%" }}>
            <div className="row mt-3" style={{ Height: "100%" }}>
              <LeftWidget />
              <div className="col-lg-6 col-md-8 no-pd">
                <div className="main-ws-sec">
                  <h5 className="text-nowrap h1 mt-md-4 mt-3 text-center">
                    {" "}
                    Mes Classes :{" "}
                  </h5>
                  <div className="table-responsive mt-md-5 mt-3">
                    <table className="table table-hover">
                      <thead className="">
                        <tr className=" bg-info text-light">
                          <th scope="col " className="text-left py-4">
                            Classe
                          </th>
                          <th scope="col" className=" text-center py-4">
                            Filiere
                          </th>
                          <th scope="col" className=" text-center py-4">
                            Année
                          </th>
                        </tr>
                      </thead>
                      <tbody>{this.GetRows()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <RightWidget />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassesList;
