import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Banner from "../Common/Banner";
import Page404 from "../Common/404Page";
import Home from "./Home/Home";
import Settings from "../Common/Settings";
import ClassesList from "./Classes/ClassesList";
import Aide from "../Common/Aide";
import Classe from "./Classes/Classe";

//// importing template cssAide
import "./css/style.css";
import "./css/responsive.css";
import "./css/animate.css";
import "./css/jquery.range.css";

class Student extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="wrapper mt-0" style={{ Height: "100%" }}>
          <Banner />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/Settings">
              <Settings />
            </Route>

            <Route exact path="/Classes">
              <ClassesList />
            </Route>

            <Route path="/Classes/:classID" component={Classe} />

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

export default Student;
