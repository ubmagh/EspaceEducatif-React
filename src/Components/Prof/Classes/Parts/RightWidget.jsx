import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { ApiHost } from "../../../Common/Config";

class RightWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classID: props.classID,
      Profimg: "",
      profName: "",
      profLink: "",
      id: "",
      the6: []
    };
    this.ShowIt = this.props.ShowItOrNot;
    Axios({
      method: "get",
      url: ApiHost + "/api/Classes/GetClassesProf",
      header: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        classID: this.state.classID + ""
      }
    })
      .then(res => {
        if (res.data.status === "succeded") {
          this.setState({
            Profimg: ApiHost + res.data.content.pic,
            profName: "" + res.data.content.name,
            profLink: "" + res.data.content.idProf,
            id: "" + res.data.content.id,
            the6: res.data.the6
          });
        } else {
          this.setState({
            Profimg: "http://via.placeholder.com/120x120",
            profName: "",
            profLink: ""
          });
        }
      })
      .catch(err =>
        this.setState({
          Profimg: "http://via.placeholder.com/120x120",
          profName: " <span class='text-danger'>Erreure :</span> <br /> " + err,
          profLink: ""
        })
      );
  }

  Render_ClasseMates(props) {
    return (
      <li>
        <Link to={"/Profile/" + props.id} title={props.name}>
          <img
            src={ApiHost + "/images/Avatars/" + props.AvatarPath}
            style={{ height: "70px", width: "70px" }}
            alt="Classmate"
          />
        </Link>
      </li>
    );
  }

  render() {
    var tab = [];
    for (let i = 0; i < this.state.the6.length; i++) {
      tab.push(
        <this.Render_ClasseMates
          id={this.state.the6[i].id + ""}
          AvatarPath={this.state.the6[i].AvatarPath + ""}
          name={this.state.the6[i].Lname + " " + this.state.the6[i].Fname}
          key={"classeMate" + this.state.the6[i].id}
        />
      );
    }
    return (
      <>
        <div className="right-sidebar">
          <div className="widget widget-portfolio">
            <div className="wd-heady ">
              <h3>Professeur</h3>
              <i className="fas fa-chalkboard-teacher float-right d-inline-block fa-lg" />
            </div>
            <div className="pf-gallery">
              <div className="float-none col-md-11 mx-auto mb-1">
                <Link to={"/Profile/" + this.state.id}>
                  <img
                    src={this.state.Profimg}
                    className="float-none d-block mx-auto"
                    style={{
                      height: "120px",
                      width: "120px",
                      borderRadius: "100%",
                      backgroundColor: "#a1bff3"
                    }}
                    alt="."
                  />
                </Link>
              </div>
              <div className="float-md-none d-md-inline-block col-md-12 mt-md-2 mb-md-3">
                <Link
                  to={"/Profile/" + this.state.id}
                  style={{ textDecoration: "none" }}
                >
                  <h2
                    className="text-nowrap text-center mb-n3 "
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontSize: "20px",
                      fontWeight: "bold",
                      textDecoration: "none",
                      color: "black"
                    }}
                  >
                    {this.state.profName}
                  </h2>
                </Link>
              </div>
            </div>
            <div className="w-100 mt-n2 border border-top-0 border-bottom-0 border-right-0 border-left-0">
              <div className="d-inline position-relative mt-0 pt-1 border border-secondary">
                <hr className="my-0" />
                <h3 className="text-center h5 mt-2 mb-0 text-dark">
                  {" "}
                  Afficher Aux Etudiants{" "}
                </h3>
              </div>
              <div className="d-inline position-relative mt-0 border border-secondary">
                <hr className="my-0" />
                <h3 className="text-center h5 mt-2 mb-0 text-dark">
                  {" "}
                  Les nouvelles publications{" "}
                </h3>
              </div>
              <div className="d-inline position-relative mt-0 border border-secondary">
                <hr className="my-0" />
                <h3 className="text-center h5 mt-2 mb-0 text-dark">
                  {" "}
                  Outils3{" "}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* 
        
        /
        /
        /ClassMates
        
        
        Starts From here
        */}
        <div className="right-sidebar">
          <div className="widget widget-portfolio">
            <div className="wd-heady ">
              <h3>Etudiants</h3>
              <i className="fas fa-users float-right d-inline-block fa-lg" />
            </div>
            <div className="pf-gallery">
              <ul>{tab}</ul>
              <div className="view-more">
                <h4
                  onClick={e => this.ShowIt(true)}
                  style={{ cursor: "pointer" }}
                  className="text-primary"
                >
                  Voir Tout{" "}
                  <i className="fa fa-arrow-right mt-1" aria-hidden="true" />
                </h4>
              </div>
            </div>
            {/*pf-gallery end*/}
          </div>
          {/*widget-portfolio end*/}
        </div>
      </>
    );
  }
}

export default RightWidget;