import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

class Banner extends React.Component {
  LogoutFunction() {
    localStorage.clear();

    window.location =
      window.location.protocol + "//" + window.location.host + "/";
  }

  render() {
    return (
      <header className="navbar fixed-top sticky-top navbar-expand-md w-100">
        <div className="container-fluid ">
          <div className="d-inline-block float-left ml-xl-5 ml-lg-4 logo my-0">
            <Link to="/">
              <img className="ot1" src={logo} alt="LOGO" />
            </Link>
          </div>

          <div className="search-bar float-left mr-xl-auto  my-2 my-sm-0 mb-1 ">
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder="Chercher..."
                />
                <div className="input-group-append p-0">
                  <span className="input-group-text p-0 m-0 bg-white">
                    <button type="submit" className="btn bg-white">
                      <i className="fa fa-search text-primary bg-white" />
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </div>

          <nav className=" col-12  col-md-8 col-lg-6 col-xl-6 mr-0 p-0 my-0 ">
            <ul className="row float-xl-right mr-xl-2 p-0 mb-0 mt-2">
              <li className="col py-0 my-1 text-center px-xl-4 mr-xl-1">
                <Link to="/">
                  <span className="d-block mx-auto">
                    {" "}
                    <i className="fas fa-home fa-lg text-light mt-n1 mb-1"></i>{" "}
                  </span>
                  Accueill
                </Link>
              </li>
              <li className="col py-0 my-1 text-center  px-xl-3 mr-xl-1">
                <Link to="/Profile">
                  <span className="d-block mx-auto">
                    {" "}
                    <i className="fas fa-user fa-lg text-light mt-n1 mb-1"></i>{" "}
                  </span>
                  Profile
                </Link>
              </li>
              <li className=" col py-0 my-1 text-center px-xl-4 mr-xl-1 ">
                <a href="#aaa">
                  <span className="d-block mx-auto">
                    {" "}
                    <i className="far fa-calendar-alt fa-lg text-light mt-n1 mb-1"></i>{" "}
                  </span>
                  Planning
                </a>
              </li>
              <li className="col py-0 my-1 text-center pl-xl-3 pr-xl-2 mr-xl-1 ">
                <a href="#aa" className="not-box-open">
                  <span className="d-block mx-auto">
                    {" "}
                    <i className="fas fa-envelope fa-lg text-light mt-n1 mb-1"></i>{" "}
                  </span>
                  Messages
                </a>
              </li>
              <li className="col py-0 my-1 text-center  px-xl-3 mr-xl-1">
                <a href="#aa" className="not-box-open">
                  <span className="d-block mx-auto">
                    {" "}
                    <i className="fas fa-bell fa-lg text-light mt-n1 mb-1"></i>{" "}
                  </span>
                  Notifications
                </a>
              </li>
              <li className="col-xs-12 col py-0 my-1 text-center px-0 pl-xl-2 pr-xl-2 mr-xl-2 ">
                <OverlayTrigger
                  trigger="click"
                  key="bottom"
                  placement="bottom"
                  overlay={
                    <Popover
                      id={`popover-positioned-bottom`}
                      className="mt-md-4 mt-sm-3 mt-2 "
                    >
                      <Popover.Content>
                        <Link to="Help">
                          <button
                            type="button"
                            className="w-100 d-block btn btn-outline-white border border-0 text-info text-left buttonOutline"
                          >
                            {" "}
                            <i className="far fa-question-circle text-info text-left"></i>{" "}
                            Aide{" "}
                          </button>
                        </Link>
                        <hr className="mb-0 mt-1 py-0" />
                        <Link to="Settings">
                          <button
                            type="button"
                            className="w-100 d-block btn btn-outline-white border border-0  text-left buttonOutline"
                          >
                            {" "}
                            <i className="fas fa-cog text-secondary text-left"></i>{" "}
                            Paramètres{" "}
                          </button>
                        </Link>
                        <hr className="mb-0 mt-1 py-0" />
                        <button
                          type="button"
                          onClick={this.LogoutFunction}
                          className="w-100 d-block btn btn-outline-white border border-0 text-danger text-left buttonOutline"
                        >
                          {" "}
                          <i className="fas fa-sign-out-alt text-danger text-left"></i>{" "}
                          Déconnexion{" "}
                        </button>
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <Button
                    className="bg-transparent p-0 buttonOutline"
                    style={{
                      outline: "0px !important",
                      border: "#003D7E",
                      boxShadow: "none !important"
                    }}
                  >
                    <span className="d-block mx-auto mt-n3">
                      {" "}
                      <i className="fas fa-ellipsis-h fa-2x text-light"></i>{" "}
                    </span>
                  </Button>
                </OverlayTrigger>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Banner;
