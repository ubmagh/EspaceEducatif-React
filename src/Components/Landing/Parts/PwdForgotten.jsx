import React from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MyModal from "../../Common/Modal";
import { ApiHost } from "../../Common/Config";
import { Redirect } from "react-router-dom";
import Loading from "../../Common/Loading";

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Adresse email Invalide !")
    .required("Saisissez votre adresse Email !"),
});

class PwdForgotten extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "",
      body: "",
      showMod: false,
    };
  }

  HandleShowModal(t) {
    this.setState({ heading: "", body: "", showMod: false });
  }

  render() {
    if (localStorage.getItem("LogToken") !== null) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <MyModal
          ShowOrNot={this.state.showMod}
          setShowOrNot={this.HandleShowModal.bind(this)}
          Heading={this.state.heading}
          body={this.state.body}
        />
        <div className="container mb-md-n5" style={{ minHeight: "100%" }}>
          <div className="row mt-5 d-inline-block w-100 col-12   ">
            <h2 className="h2 mt-5"> Mot de passes Oublié ? </h2>
            <h4 className="h4 mt-2">
              {" "}
              Saisissez votre adresse email pour Réinitialisez votre mot de
              passe:{" "}
            </h4>
          </div>
          <div className="row d-block w-100">
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={ResetSchema}
              onSubmit={(data, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                const mydata = data;
                document
                  .getElementById("loadingSec")
                  .classList.remove("d-none");
                document.getElementById("loadingSec").classList.add("d-block");
                axios({
                  method: "Get",
                  url: ApiHost + "/api/forgot",
                  params: mydata,
                  headers: { "Content-Type": "application/json" },
                })
                  .then((res) => {
                    if (res.data.status === "dataErr")
                      this.setState({
                        heading: "w",
                        body: " Données fournies sont incorrectes ",
                        showMod: true,
                      });
                    else if (res.data.status === "notfound")
                      this.setState({
                        heading: "w",
                        body:
                          " Le Compte avec email '" +
                          data.email +
                          "' est introuvable !",
                        showMod: true,
                      });
                    else if (res.data.status === "sent")
                      this.setState({
                        heading: "s",
                        body:
                          " Un lien de Réinitialisation de votre mot de passe est envoyé à votre boite mail.",
                        showMod: true,
                      });
                    else
                      this.setState({
                        heading: "w",
                        body: " Une erreur Servenue ! PWR :13",
                        showMod: true,
                      });
                    document
                      .getElementById("loadingSec")
                      .classList.add("d-none");
                    document
                      .getElementById("loadingSec")
                      .classList.remove("d-block");
                  })
                  .catch((err) => {
                    this.setState({
                      heading: "d",
                      body: "erreur de Connexion au serveur ! " + err,
                      showMod: true,
                    });
                  });
                resetForm({});
                setSubmitting(false);
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                isSubmitting,
                errors,
                touched,
              }) => (
                <Form className="col-8 mx-auto text-center mt-5 mb-md-n5">
                  <div className="form-group d-block mx-auto">
                    <Field
                      type="email"
                      name="email"
                      className="form-control  text-center"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Adresse Email"
                    />
                    {errors.email && touched.email ? (
                      <>
                        <div className="alert alert-danger" role="alert">
                          <strong>Attention </strong> {errors.email}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || errors.email}
                    className="btn btn-primary col-md-5 mt-3 mb-md-n5"
                  >
                    Envoyer
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="row w-100 d-block">
            <div className="col-md-6 mx-auto d-none" id="loadingSec">
              <Loading />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PwdForgotten;
