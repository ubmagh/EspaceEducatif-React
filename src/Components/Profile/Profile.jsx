import React from "react";
import StudentPro from "./Student_Profile";
import ProfPro from "./Prof_Profile";
import MyProfile from "./MyProfile";
import TokenValidate from "../Common/tokenValidate";
import Modal from "../Common/Modal";
import NotFound from "./notFound";

import Axios from "axios";
import Loading from "../Common/Loading";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.match.params.UserId,
      userType: "",
      heading: "",
      body: "",
      showMod: false,
      data: null
    };

    ///// now we'll get user type and check if it is current or admin type
    //// if itis we'll return My profile component

    Axios({
      url: "http://127.0.0.1:8000/api/CheckProfile",
      method: "get",
      headers: { "Content-Type": "application/json" },
      params: {
        token: localStorage.getItem("LogToken"),
        userID: "" + this.state.userID
      }
    })
      .then(res => {
        TokenValidate(res.data);
        if (res.data.status === "succeded") {
          this.setState({
            userType: res.data.content.Type,
            data: res.data.content
          });
        } else {
          this.setState({
            heading: "w",
            body: "Réssayez plus tard ! ",
            showMod: true
          });
        }
      })
      .catch(err => {
        this.setState({ heading: "d", body: "Erreure: " + err, showMod: true });
      });
  }

  HandleShowModal(t) {
    this.setState({ heading: "", body: "", showMod: false });
  }

  Usemodale(h, b, bool) {
    this.setState({ heading: h, body: b, showMod: bool });
  }

  render() {
    var ret = [];
    ret.push(
      <Modal
        ShowOrNot={this.state.showMod}
        setShowOrNot={this.HandleShowModal.bind(this)}
        Heading={this.state.heading}
        body={this.state.body}
        key="modal"
      />
    );
    if (this.state.userType === "prof")
      ret.push(
        <ProfPro
          userID={this.state.userID}
          key="prof"
          useModal={this.Usemodale.bind(this)}
          data={this.state.data}
        />
      );
    else if (this.state.userType === "etud")
      ret.push(
        <StudentPro
          userID={this.state.userID}
          key="student"
          useModal={this.Usemodale.bind(this)}
          data={this.state.data}
        />
      );
    else if (this.state.userType === "self") ret.push(<MyProfile key="mein" />);
    else if (this.state.userType === "notFound")
      ret.push(<NotFound key="unicorn" />);
    else ret.push(<Loading key="wait" />);
    return ret;
  }
}

export default Profile;
