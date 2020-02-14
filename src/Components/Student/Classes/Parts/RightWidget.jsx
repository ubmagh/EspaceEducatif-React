import React from "react";
import Axios from "axios";

class RightWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classID: props.classID,
      Profimg: "",
      profName: "",
      profLink: ""
    };

    Axios({
      method: "get",
      url: "http://localhost:8000/api/Classes/GetClassesProf",
      header: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        classID: this.state.classID + ""
      }
    })
      .then(res => {
        if (res.data.status === "succeded") {
          this.setState({
            Profimg: "" + res.data.content.pic,
            profName: "" + res.data.content.name,
            profLink: "" + res.data.content.idProf
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

  render() {
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
              </div>
              <div className="float-md-none d-md-inline-block col-md-12 mt-md-2 mb-md-3">
                <h2
                  className="text-center"
                  style={{ fontFamily: "Source Sans Pro", fontSize: "18px" }}
                >
                  {this.state.profName}
                </h2>
              </div>
            </div>
            {/*pf-gallery end*/}
          </div>
          {/*widget-portfolio end*/}
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
              <ul>
                <li>
                  <a href="#A" title="true">
                    <img src="http://via.placeholder.com/70x70" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#a" title="true">
                    <img src="http://via.placeholder.com/70x70" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#a" title="true">
                    <img src="http://via.placeholder.com/70x70" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#a" title="true">
                    <img src="http://via.placeholder.com/70x70" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#a" title="true">
                    <img src="http://via.placeholder.com/70x70" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#a" title="true">
                    <img src="http://via.placeholder.com/70x70" alt="" />
                  </a>
                </li>
              </ul>
              <div className="view-more">
                <a href="#a" title="true">
                  Voir plus
                </a>
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
