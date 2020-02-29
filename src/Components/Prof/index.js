import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Banner from "../Common/Banner";
import Page404 from "../Common/404Page";
import Home from "./Home/Home";
import ClassesList from "./Classes/ClassesList";
import Settings from "../Common/Settings";
import Aide from "../Common/Aide";
import MyProfile from "../Profile/MyProfile";
import Profile from "../Profile/Profile";
import Classe from "./Classes/Classe";

//// importing template css
import "./css/style.css";
import "./css/responsive.css";
import "./css/animate.css";
import "./css/jquery.range.css";

class Prof extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="wrapper mt-0 float-none" style={{ Height: "100%" }}>
          <Banner />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/Classes">
              <ClassesList />
            </Route>

            <Route path="/Classes/:classID" component={Classe} />

            <Route exact path="/Profile">
              <MyProfile />
            </Route>

            <Route path="/Profile/:UserId" component={Profile} />

            <Route exact path="/Settings">
              <Settings />
            </Route>

            <Route exact path="/Help">
              <Aide />
            </Route>

            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Prof;
