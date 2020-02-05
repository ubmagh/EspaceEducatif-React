import React from "react";
import axios from "axios";
import TokenValidate from "../../Common/tokenValidate";
import Modal from "../../Common/Modal";
import { Redirect } from "react-router-dom";
import TabAffichage from "./Parts/TabAffichage";
import CreatePoste from "./Parts/CreatePoste";

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
      profName: ""
    };

    axios({
      url: "http://127.0.0.1:8000/api/Classes/ClassInfo",
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
          this.setState({
            classeData: res.data.data.classeData,
            profName: res.data.data.profName
          });
          console.log("state");
          console.log(this.state);
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

  UseModal(h,b,show){
    this.setState({ heading: h, body: b, showMod: show });
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
              alt=""
              style={{ height: "100%", width: "100%" }}
            />
          </section>

          <Modal
            ShowOrNot={this.state.showMod}
            setShowOrNot={this.HandleShowModal.bind(this)}
            Heading={this.state.heading}
            body={this.state.body}
          />

          <main style={{ paddingTop: "20px" }}>
            <div className="main-section">
              <div className="container">
                <div className="main-section-data">
                  <div className="row">
                    <div className="col-lg-4">
                      <TabAffichage />

                      {/*main-left-sidebar end*/}
                    </div>
                    <div className="col-lg-6">
                      <div className="main-ws-sec">
                        <div className="user-tab-sec">
                          <h3 className="text-nowrap text-center">
                            {this.state.classeData.ClasseName}
                          </h3>
                          <div className=" text-nowrap text-center star-descp">
                            <span
                              className="txt mx-auto"
                              style={{
                                float: "none",
                                textAlign: "center !important"
                              }}
                            >
                              {this.state.profName}
                            </span>
                          </div>
                          {/*star-descp end*/}

                          <CreatePoste Usemodal = {this.UseModal.bind(this)} />

                          {/*post-topbar end*/}
                        </div>
                        {/*user-tab-sec end*/}
                        <div className="product-feed-tab current" id="feed-dd">
                          <div className="posts-section">
                            <div className="post-bar">
                              <div className="post_topbar">
                                <div className="usy-dt">
                                  <img
                                    src="http://via.placeholder.com/50x50"
                                    alt=""
                                  />
                                  <div className="usy-name">
                                    <h3>Omar Zemzami</h3>
                                    <span>
                                      <img src="images/clock.png" alt="" />3 min
                                      ago
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="job_descp">
                                <p>Contenu du post</p>
                              </div>
                              <div className="job-status-bar">
                                <ul className="like-com">
                                  <li>
                                    <a href="#a">
                                      <i className="la la-heart" /> Like
                                    </a>
                                    <img src="images/liked-img.png" alt="" />
                                    <span>25</span>
                                  </li>
                                  <li>
                                    <a href="#a" title="true" className="com">
                                      <img src="images/com.png" alt="" />{" "}
                                      Comment 15
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/*post-bar end*/}
                            <div className="process-comm">
                              <div className="spinner">
                                <div className="bounce1" />
                                <div className="bounce2" />
                                <div className="bounce3" />
                              </div>
                            </div>
                            {/*process-comm end*/}
                          </div>
                          {/*posts-section end*/}
                        </div>
                        {/*product-feed-tab end*/}
                      </div>
                      {/*main-ws-sec end*/}
                    </div>
                    <div className="col-lg-2">
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
                                  <img
                                    src="http://via.placeholder.com/70x70"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#a" title="true">
                                  <img
                                    src="http://via.placeholder.com/70x70"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#a" title="true">
                                  <img
                                    src="http://via.placeholder.com/70x70"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#a" title="true">
                                  <img
                                    src="http://via.placeholder.com/70x70"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#a" title="true">
                                  <img
                                    src="http://via.placeholder.com/70x70"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#a" title="true">
                                  <img
                                    src="http://via.placeholder.com/70x70"
                                    alt=""
                                  />
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
