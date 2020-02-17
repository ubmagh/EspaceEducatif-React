import React from "react";
import "./css/LinerIcons.css";
import "./css/responsive.css";
import "./css/style.css";

class ProfPro extends React.Component {
  constructor(props) {
    super(props);
    this.useModal = this.props.useModal;
    this.state = { userID: this.props.userID, data: this.props.data };
  }

  Filiere(nom) {
    switch (nom) {
      case "GI":
        return "Département Informatique";
      case "GE":
        return "Département Eléctrique";
      default:
        return "Undefined";
    }
  }

  render() {
    return (
      <>
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
                      backgroundColor: "#eaf2f3",
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
                        <u>{" " + this.state.data.Matiere + " "}</u>
                      </span>{" "}
                    </p>
                    <ul className="list basic_info">
                      <li>
                        <a href="#Departement">
                          <i
                            className="fab fa-font-awesome-flag fa-lg"
                            id="Departement"
                          >
                            {" "}
                          </i>{" "}
                          {this.Filiere(this.state.data.Filiere)}
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={"mailto:" + this.state.data.email}
                        >
                          <i className="far fa-envelope fa-lg"> </i>
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
      </>
    );
  }
}

export default ProfPro;
