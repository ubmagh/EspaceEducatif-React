import React from "react";
import { Container, Row } from "react-bootstrap";
import pic1 from "./colab.png";
import pic2 from "./est.png";
import "./banner.css";
import Features from "./Features";

function Body() {
  return (
    <>
      <Container fluid="true " className="w-100 bg-white pb-3">
        <Row className="  w-100 m-0 p-0">
          <div className=" col-md-6 col-xs-0 m-0 p-0 ">
            <img
              alt="Colaboration en education"
              src={pic1}
              className="mt-3 align-top mx-sm-auto w-100"
            />
          </div>

          <div className=" col-xs-5 col-md-6 m-0 p-0 ">
            <div className="row  w-100 mx-auto mt-sm-5">
              <img
                alt="University Logo"
                src={pic2}
                className=" w-75 mx-auto  my-0 "
              />
            </div>

            <div className=" row w-100 mx-auto mt-sm-5 mt-3">
              <br />
              <h1
                className="text-nowrap mx-auto mt-md-0 mt-lg-2"
                style={{
                  fontFamily: " Source Sans Pro ",
                  fontSize: "57px",
                  fontWeight: "bolder",
                  color: "rgb(16,16,141)",
                }}
              >
                {" "}
                Espace Educatif{" "}
              </h1>
              <h6
                className="text-center h6 mx-auto mt-4 mt-sm-5 "
                style={{
                  fontFamily: " Source Sans Pro ",
                  fontSize: "30px",
                  fontWeight: "lighter",
                  color: "rgb(20,25,110)",
                }}
              >
                {" "}
                Un Réseau éducatif privé aux étudiants de l'école supérieure de
                Technologie Agadir et offrant une solution pour la communication
                entre l'etablissement et ses etudiants.{" "}
              </h6>
              <p
                className="text-center mx-auto text-justify mt-md-3 mb-xs-3"
                style={{
                  fontFamily: " Source Sans Pro ",
                  fontSize: "20px",
                  fontWeight: "normal",
                  color: "rgb(20,35,100)",
                }}
              >
                Un internaute ? Connectez-vous !
              </p>
            </div>
          </div>
        </Row>

        <Features />
      </Container>
    </>
  );
}

export default Body;
