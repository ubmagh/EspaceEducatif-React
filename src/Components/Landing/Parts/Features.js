import React from "react";
import { Row } from "react-bootstrap";
import F1 from "./F1.png";
import F2 from "./F2.png";

function Features() {
  return (
    <>
      <Row
        className=" border border-left-0 border-right-0 border-bottom-0 border-top border-aqua px-3 py-3  mt-xs-5 pt-xs-5 bg-white"
        style={{ maxHeight: "600px" }}
      >
        <div
          className="d-flex justify-content-center col-md-6 col-xl-3 col-xs-0 col-lg-4"
          style={{ maxHeight: "100%" }}
        >
          <img
            alt="Colaboration en education"
            src={F1}
            height="100%"
            className="w-75 h-100 h-100"
          />
        </div>

        <div className=" col-xs-5 col-md-6 col-lg-8">
          <h5 className="mt-md-3 h6 text-secondary "> Pour le professeur </h5>
          <h2 className="ml-4 mt-2">
            {" "}
            Outils dont les enseignants ont besoin{" "}
          </h2>
          <p className="mt-3">
            Envoyez des messages, partagez du matériel de classe et rendez
            l'apprentissage accessible partout. Gagnez du temps en rassemblant
            tous vos outils de classe.
          </p>
        </div>
      </Row>

      <br />

      <Row
        className=" border border-left-0 border-right-0 border-bottom-0 border-top border-aqua px-3 py-3 bg-white"
        style={{ maxHeight: "600px" }}
      >
        <div
          className=" d-flex justify-content-center col-md-6 col-xs-0 col-lg-4 col-xl-3 "
          style={{ maxHeight: "100%" }}
        >
          <img
            alt="Colaboration en education"
            src={F2}
            height="100%"
            className="w-75 h-100 "
          />
        </div>

        <div className=" col-xs-5 col-md-6 col-lg-8 ">
          <h5 className="mt-md-3 h6 text-secondary "> Pour l'Etudiant </h5>
          <h2 className="ml-4 mt-2">
            {" "}
            Une plateforme que les étudiants adorent{" "}
          </h2>
          <p className="mt-3">
            Augmentez votre confiance, trouvez votre voix et découvrez ce que
            signifie être un citoyen numérique. Renforcez votre apprentissage et
            faites partie d'une communauté de classe dynamique.
          </p>
        </div>
      </Row>
    </>
  );
}

export default Features;
