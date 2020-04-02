import React from "react";
import axios from "axios";
import TokenValidate from "../../Common/tokenValidate";
import Modal from "../../Common/Modal";
import { Redirect } from "react-router-dom";
import TabAffichage from "./Parts/TabAffichage";
import PostsSection from "./Parts/PostsSection";
import ClassMatesCo from "./Parts/ClasseMates";
import Affichage from "./Parts/Affichage";
import RightWidget from "./Parts/RightWidget";
import CoverChange from "./Parts/Cover_modal";
import { ApiHost } from "../../Common/Config";

class Classe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classID: this.props.match.params.classID,
      heading: "",
      body: "",
      showMod: false,
      Goback: false,
      classeData: "",
      profName: "",
      ClassMates: false,
      Toggle_cover_change: false
    };
    if (isNaN(this.props.match.params.classID)) {
      this.state = {
        classID: this.props.match.params.classID,
        heading: "",
        body: "",
        showMod: false,
        Goback: true,
        classeData: "",
        profName: "",
        Section: "main",
        Toggle_cover_change: false
      };
      return;
    }
    axios({
      url: ApiHost + "/api/Classes/ClassInfo",
      method: "get",
      headers: { "Content-Type": "application/json" },
      params: {
        token: localStorage.getItem("LogToken"),
        ClasseID: "" + this.state.classID
      }
    })
      .then(res => {
        TokenValidate(res.data);

        if (res.data.error + "" === "ValidationError") {
          this.setState({
            heading: "w",
            body:
              "Erreur des données fournies au serveur ! vous ne pouvez pas accéder à ce classe",
            showMod: true
          });
          setTimeout(() => this.setState({ Goback: true }), 3000);
        } else if (res.data.error + "" === "Access Forbidden") {
          this.setState({
            heading: "w",
            body: "Accès Interdit ou Classe introuvable !",
            showMod: true
          });
          setTimeout(() => this.setState({ Goback: true }), 3000);
        } else if (res.data.error + "" === "none") {
          var classData = res.data.data.classeData;
          classData.ImagePath = ApiHost + classData.ImagePath;
          this.setState({
            classeData: classData,
            profName: res.data.data.profName
          });
        } else {
          this.setState({
            heading: "d",
            body: "Une erreur internale s'est servenue Réssayez plus-tard !",
            showMod: true
          });
          setTimeout(() => this.setState({ Goback: true }), 3000);
        }
      })
      .catch(e => {
        this.setState({
          heading: "d",
          body: " erreur : " + e,
          showMod: true
        });
      });
  }

  componentDidMount() {}

  HandleShowModal(t) {
    this.setState({ heading: "", body: "", showMod: false });
  }

  UseModal(h, b, show) {
    this.setState({ heading: h, body: b, showMod: show });
  }

  ToggleMainSection(section) {
    this.setState({ Section: section });
  }

  toggleCoverChange(bool) {
    this.setState({ Toggle_cover_change: bool });
  }

  changeCover(e) {
    e.preventDefault();
    this.toggleCoverChange(true);
  }

  RenderMainSection() {
    switch (this.state.Section) {
      case "affichage":
        return (
          <>
            <div className="user-tab-sec">
              <h3 className="text-nowrap text-center display-2 mb-n3 mt-3">
                {this.state.classeData.ClasseName}
              </h3>
              <div className=" text-nowrap text-center star-descp">
                <span
                  className="txt mx-auto"
                  style={{
                    float: "none",
                    textAlign: "center !important"
                  }}
                ></span>
              </div>
            </div>
            <Affichage
              ToggleMainSection={this.ToggleMainSection.bind(this)}
              classID={this.state.classID}
              Usemodal={this.UseModal.bind(this)}
            />
          </>
        );
      case "ClassMates":
        return (
          <>
            <div className="user-tab-sec">
              <h3 className="text-nowrap text-center display-2 mb-n3 mt-3">
                {this.state.classeData.ClasseName}
              </h3>
              <div className=" text-nowrap text-center star-descp">
                <span
                  className="txt mx-auto"
                  style={{
                    float: "none",
                    textAlign: "center !important"
                  }}
                ></span>
              </div>
            </div>
            <ClassMatesCo
              ToggleMainSection={this.ToggleMainSection.bind(this)}
              classID={this.state.classID}
              Usemodal={this.UseModal.bind(this)}
            />
          </>
        );
      default:
        return (
          <>
            <PostsSection
              classID={this.state.classID}
              useModal={this.UseModal.bind(this)}
              classeName={this.state.classeData.ClasseName}
            />
          </>
        );
    }
  }

  render() {
    if (this.state.Goback) return <Redirect to="/Classes" />;
    return (
      <>
        <div>
          <section
            className="cover-sec"
            style={{ height: "400px", width: "100%" }}
          >
            <img
              src={this.state.classeData.ImagePath}
              alt="Cover"
              style={{ height: "100%", width: "100%" }}
            />
            <a href="#GO0oD" onClick={this.changeCover.bind(this)}>
              <i className="fa fa-camera" /> Changer l'image
            </a>
          </section>

          <Modal
            ShowOrNot={this.state.showMod}
            setShowOrNot={this.HandleShowModal.bind(this)}
            Heading={this.state.heading}
            body={this.state.body}
          />
          <CoverChange
            setShowOrNot={this.toggleCoverChange.bind(this)}
            ShowOrNot={this.state.Toggle_cover_change}
            classID={this.state.classID}
            UseModal={this.UseModal.bind(this)}
          />

          <main style={{ paddingTop: "20px" }}>
            <div className="main-section">
              <div className="container">
                <div className="main-section-data">
                  <div className="row">
                    <div className="col-lg-4">
                      <TabAffichage
                        ToggleMainSection={this.ToggleMainSection.bind(this)}
                        classID={this.state.classID}
                        UseModal={this.UseModal.bind(this)}
                      />
                    </div>
                    <div className="col-lg-6">
                      <div className="main-ws-sec">
                        {this.RenderMainSection()}
                      </div>
                      {/*main-ws-sec end*/}
                    </div>
                    <div className="col-xl-2 col-lg-4">
                      <RightWidget
                        classID={this.state.classID}
                        ToggleMainSection={this.ToggleMainSection.bind(this)}
                      />
                      {/*right-sidebar end*/}
                    </div>
                  </div>
                </div>
                {/* main-section-data end*/}
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default Classe;
