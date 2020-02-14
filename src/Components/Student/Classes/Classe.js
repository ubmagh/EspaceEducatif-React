import React from "react";
import axios from "axios";
import TokenValidate from "../../Common/tokenValidate";
import Modal from "../../Common/Modal";
import { Redirect } from "react-router-dom";
import TabAffichage from "./Parts/TabAffichage";
import CreatePoste from "./Parts/CreatePoste";
import PostsSection from "./Parts/PostsSection";
import RightWidget from "./Parts/RightWidget";

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

  UseModal(h, b, show) {
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

                          <CreatePoste
                            Usemodal={this.UseModal.bind(this)}
                            classID={this.state.classID}
                          />

                          {/*post-topbar end*/}
                        </div>
                        {/*user-tab-sec end*/}
                        <div className="product-feed-tab current" id="feed-dd">
                          <div className="posts-section">
                            <PostsSection
                              classID={this.state.classID}
                              useModal={this.UseModal.bind(this)}
                            />

                            {/*process-comm end*/}
                          </div>
                          {/*posts-section end*/}
                        </div>
                        {/*product-feed-tab end*/}
                      </div>
                      {/*main-ws-sec end*/}
                    </div>
                    <div className="col-xl-2 col-lg-4">
                      <RightWidget classID={this.state.classID} />
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
