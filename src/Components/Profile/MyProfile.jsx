import React from "react";
import "./css/LinerIcons.css";
import "./css/responsive.css";
import "./css/style.css";
import Axios from "axios";
import Modal from "../Common/Modal";
import ValidateToken from "../Common/tokenValidate";
import Loading from "../Common/Loading";
import moment from "moment";
import { ApiHost } from "../Common/Config";

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "",
      body: "",
      showMod: false,
      userType: "",
      data: ""
    };

    moment.updateLocale("fr", {
      months: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "May",
        "Juin",
        "juillet",
        "aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
      ]
    });
    moment.updateLocale("fr", {
      longDateFormat: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "MM/DD/YYYY",
        LL: " Do MMMM YYYY",
        LLL: "MMMM Do YYYY LT",
        LLLL: "dddd, MMMM Do YYYY LT"
      }
    });
    moment.locale("fr");
    Axios({
      url: ApiHost + "/api/Profile",
      method: "get",
      headers: { "Content-Type": "application/json" },
      params: {
        token: localStorage.getItem("LogToken")
      }
    })
      .then(res => {
        ValidateToken(res.data);
        if (res.data.status + "" === "succeded") {
          var content = res.data.content;
          content.infos.AvatarPath = ApiHost + content.infos.AvatarPath;
          this.setState({ data: content });
          this.setState({ userType: res.data.content.Type });
        } else {
          this.setState({
            heading: "w",
            body: "Réssayez Plus Tard !",
            showMod: true
          });
        }
      })
      .catch(err => {
        this.setState({
          heading: "w",
          body: "Erreur de conx au serveur : " + err,
          showMod: true
        });
      });
  }

  HandleShowModal(t) {
    this.setState({ heading: "", body: "", showMod: false });
  }

  Filiere(nom) {
    switch (nom) {
      case "GI":
        return "Génie Informatique";
      default:
        return "Undefined";
    }
  }

  Annee(num) {
    switch (num) {
      case "1":
        return "1er Année";
      case "2":
        return "2éme Année";
      default:
        return "Undefined";
    }
  }

  render() {
    if (this.state.userType === "etud")
      return (
        <>
          <Modal
            ShowOrNot={this.state.showMod}
            setShowOrNot={this.HandleShowModal.bind(this)}
            Heading={this.state.heading}
            body={this.state.body}
          />
          <section className="profile_area">
            <div className="container">
              <div className="profile_inner p_120">
                <div className="row">
                  <div className="col-lg-5 ">
                    <img
                      className="ot float-lg-right float-sm-none d-sm-block mx-sm-auto rounded "
                      src={this.state.data.infos.AvatarPath}
                      alt="."
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #eaf2f3 "
                      }}
                    />
                  </div>
                  <div className="col-lg-7 ml-sm-n5 ml-md-0">
                    <div className="personal_text mx-sm-auto d-sm-inline-block ">
                      <h3 className="text-nowrap ml-sm-n5 ml-md-0">
                        {this.state.data.infos.Sex === "M" ? (
                          <span
                            className="mr-1"
                            style={{
                              fontWeight: "bold",
                              textTransform: "none"
                            }}
                          >
                            M.{" "}
                          </span>
                        ) : (
                          <span
                            className="mr-1"
                            style={{
                              fontWeight: "bold",
                              textTransform: "none"
                            }}
                          >
                            Mme.{" "}
                          </span>
                        )}
                        {this.state.data.infos.Lname +
                          " " +
                          this.state.data.infos.Fname}
                      </h3>

                      <p
                        className="ml-sm-5 ml-md-0"
                        style={{
                          fontFamily: "Source Sans Pro",
                          fontSize: "22px",
                          textAlign: "center"
                        }}
                      >
                        {" "}
                        <span className="text-success">
                          <u>
                            {" "}
                            {this.state.data.infos.Sex === "M"
                              ? "Etudiant"
                              : "Etudiante"}{" "}
                          </u>
                        </span>{" "}
                        {" en "}
                        {this.Filiere(this.state.data.infos.Filiere)} -{" "}
                        {this.Annee(this.state.data.infos.Annee)}
                      </p>
                      <ul className="list basic_info">
                        <li>
                          <a href="#Birthdate">
                            <i
                              className="far fa-calendar-alt fa-lg"
                              id="Birthdate"
                            ></i>
                            {moment(
                              this.state.data.infos.dateNaissance,
                              "YYYY-MM-DD"
                            ).format("LL")}
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={"mailto:" + this.state.data.infos.email}
                          >
                            <i className="far fa-envelope fa-lg"> </i>{" "}
                            {" " + this.state.data.infos.email}
                          </a>
                        </li>
                        <li>
                          <a href={"#CIN"} style={{ wordSpacing: "2px" }}>
                            <i className="far fa-id-card fa-lg" id="CIN"></i>{" "}
                            {"mon CIN: " + this.state.data.infos.CIN}
                          </a>
                        </li>
                        <li>
                          <a href={"#Joined"} style={{ wordSpacing: "2px" }}>
                            <i
                              className="fas fa-sign-in-alt fa-lg"
                              id="Joined"
                            ></i>{" "}
                            {"rejoint à: " +
                              moment(
                                this.state.data.Joined,
                                "YYYY-MM-DD"
                              ).format("LL")}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );

    return <Loading />;
  }
}

export default MyProfile;
