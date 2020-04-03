import React from "react";
import Axios from "axios";
import { ApiHost } from "../../../Common/Config";
import TokenValidate from "../../../Common/tokenValidate";
import { Link } from "react-router-dom";

function ClassMateThumb(imgsrc, id, name) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={"mate:" + id}>
      <div className="company_profile_info">
        <div className="company-up-info mb-0">
          <img src={imgsrc} alt="." />
          <h3 className="mb-0">{name}</h3>
        </div>
        <Link
          to={"/Profile/" + id}
          title={name}
          className="view-more-pro text-info"
        >
          Voir le profile
        </Link>
      </div>
    </div>
  );
}

class ClassMates extends React.Component {
  constructor(props) {
    super(props);
    this.ToggleMainSection = this.props.ToggleMainSection;
    this.state = { classID: this.props.classID, data: [] };
    this.Usemodal = this.props.Usemodal;
    Axios({
      method: "GET",
      url: ApiHost + "/api/Classes/ClasseMates",
      headers: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        classID: "" + this.state.classID
      }
    })
      .then(res => {
        TokenValidate(res.data);
        if (res.data.error === "ParamMissing") {
          this.Usemodal("w", "Les Données fournies sont invalides ! ", true);
        } else if (res.data.status === "success") {
          this.setState({ data: res.data.content });
        }
      })
      .catch(err => {
        this.Usemodal("d", "Erreure: " + err, true);
      });
  }

  Thumnails(data) {
    var tab = [];

    for (let i = 0; i < data.length; i++) {
      tab.push(
        ClassMateThumb(
          ApiHost + "/images/Avatars/" + data[i].pic,
          data[i].id,
          data[i].name
        )
      );
    }

    return tab;
  }

  render() {
    return (
      <div className="wrapper mt-n3 ">
        <section className="companies-info pt-1">
          <div className="company-title">
            <h3 className="h2 d-block text-center ">ClasseMates</h3>

            <div className="d-block w-100">
              <h3
                onClick={e => this.ToggleMainSection("main")}
                className="float-left text-primary "
                style={{ cursor: "pointer" }}
              >
                {" "}
                <i
                  className="fa fa-arrow-left mr-0 ml-n2 "
                  aria-hidden="true"
                ></i>{" "}
                Retourner à la classe
              </h3>
            </div>
          </div>

          <div className="companies-list">
            <div className="row mt-3 ">
              {/* */
              this.Thumnails(this.state.data)
              /* */
              }
            </div>
          </div>
          {/*companies-list end*/}
        </section>
        {/*companies-info end*/}
      </div>
    );
  }
}

export default ClassMates;
