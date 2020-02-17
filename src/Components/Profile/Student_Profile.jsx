import React from "react";
import moment from "moment";

class StudentPro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
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
    return (
      <section className="profile_area">
        <div className="container">
          <div className="profile_inner p_120">
            <div className="row">
              <div className="col-lg-5 ">
                <img
                  className="ot float-lg-right float-sm-none d-sm-block mx-sm-auto rounded "
                  src={this.state.data.pic}
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
                    {this.state.data.Sex === "M" ? (
                      <span
                        className="mr-1"
                        style={{ fontWeight: "bold", textTransform: "none" }}
                      >
                        M.{" "}
                      </span>
                    ) : (
                      <span
                        className="mr-1"
                        style={{ fontWeight: "bold", textTransform: "none" }}
                      >
                        Mme.{" "}
                      </span>
                    )}
                    {this.state.data.name}
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
                        {this.state.data.Sex === "M"
                          ? "Etudiant"
                          : "Etudiante"}{" "}
                      </u>
                    </span>{" "}
                    {" en "}
                    {this.Filiere(this.state.data.Filiere)} -{" "}
                    {this.Annee(this.state.data.Annee)}
                  </p>
                  <ul className="list basic_info">
                    <li>
                      <a href="#Birthdate">
                        <i
                          className="far fa-calendar-alt fa-lg"
                          id="Birthdate"
                        ></i>
                        {"  "}
                        {moment(this.state.data.dateNai, "YYYY-MM-DD").format(
                          "LL"
                        )}
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={"mailto:" + this.state.data.email}
                      >
                        <i className="far fa-envelope fa-lg"> </i>{" "}
                        {" " + this.state.data.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default StudentPro;
