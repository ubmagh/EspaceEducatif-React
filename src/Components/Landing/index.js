import React from "react";
import Banner from "./Parts/banner";
import Body from "./Parts/HomeBody";
import Footer from "./Parts/Footer";
import Aide from "./Parts/Aide";
import { StudentLog, TeacherLog } from "./Parts/LogScreens";
import Rules from "./Parts/Rules";
import Page404 from "./Parts/404";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Register from "./Parts/register";

class Landing extends React.Component {
  render() {
    return (
      <Router>
        <Banner />

        <Switch>
          <Route exact path="/">
            <Body />
          </Route>

          <Route exact path="/Aide">
            <Aide />
          </Route>

          <Route exact path="/StudentLog">
            <StudentLog />
          </Route>
          <Route exact path="/TeacherLog">
            <TeacherLog />
          </Route>

          <Route exact path="/Rules">
            <Rules />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route component={Page404} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Landing;
