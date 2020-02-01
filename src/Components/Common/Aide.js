import React from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import tokenValidate from "../Common/tokenValidate";

const LoginSchema = Yup.object().shape({
  message: Yup.string()
    .required("Ecrivez quelque chose d'abord !")
    .max(1200, "max = 1200 caractéres ")
    .min(10, "exprimer votre probleme 10caratères sont insufisants ")
});

class Aide extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: "waiting" };
  }

  render() {
    return (
      <>
        <div
          className="jumbotron jumbotron-fluid w-100 d-inline-block pb-5 mb-n5"
          style={{ height: "100%" }}
          id="aideContai"
        >
          <div className="container">
            <h1 className="display-4">Besoin de l'aide ?</h1>
            <p className="lead">
              Veuillez nous contacter en remplissant ce formulaire, nous allons
              vous répondre plutot possible.{" "}
            </p>
          </div>
          <div className="container">
            <Formik
              initialValues={{ message: "" }}
              validationSchema={LoginSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);

                const mydata = data;
                //// Envoie des données vers la BD utilisant axios ( =: ajax ) sans actualiser
                axios({
                  method: "get",
                  url: "http://127.0.0.1:8000/api/Help",
                  params: {
                    token: localStorage.getItem("LogToken") + "",
                    message: "" + mydata.message
                  },

                  timeout: 2000,
                  header: { "Content-Type": "application/json" }
                })
                  .then(res => {
                    tokenValidate(res.data);

                    if (res.data.error + "" === "ValidationError")
                      this.setState({ error: "validation" });
                    else if (res.data.error + "" === "none") {
                      this.setState({ error: "succeded" });
                    } else {
                      this.setState({ error: "failed" });
                    }
                  })

                  .catch(err => {
                    this.setState({ error: "failed" });
                    console.log("contact-Err :" + err);
                  });

                /// FIn du requete GET

                setSubmitting(false);
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                isSubmitting,
                errors,
                touched
              }) => {
                if (this.state.error === "validation") {
                  return (
                    <div
                      className="alert alert-warning h-75 w-100  mt-3"
                      role="alert"
                    >
                      <h5 className="my-3 text-center">
                        {" "}
                        Les données Fournies sont invalides
                      </h5>
                      <hr />
                      <h6 className="my-4 text-center">
                        {" "}
                        <strong>Votre message n'est pas envoyé,</strong>{" "}
                        veuillez réssayer plustard !{" "}
                      </h6>
                    </div>
                  );
                } else if (this.state.error === "succeded") {
                  return (
                    <div
                      className="alert alert-success h-75 w-100  mt-3"
                      role="alert"
                    >
                      <h5 className="my-3 text-center"> succès ! </h5>
                      <hr />
                      <h6 className="my-4 text-center">
                        {" "}
                        <strong>Votre message est bien envoyé,</strong> veuillez
                        observer votre boite mail !{" "}
                      </h6>
                    </div>
                  );
                } else if (this.state.error === "failed") {
                  return (
                    <div
                      className="alert alert-warning h-75 w-100  mt-3"
                      role="alert"
                    >
                      <h5 className="my-3 text-center">
                        {" "}
                        Une erreur s'est produit{" "}
                      </h5>
                      <hr />
                      <h6 className="my-4 text-center">
                        {" "}
                        <strong>Votre message n'est pas envoyé,</strong>{" "}
                        veuillez réssayer plustard !{" "}
                      </h6>
                    </div>
                  );
                } else {
                  return (
                    <Form className="col-md-11 mx-auto mt-5" methode="GET">
                      <div className="form-group">
                        <Field
                          name="message"
                          as="textarea"
                          className="form-control px-4 py-3"
                          placeholder="Exprimer votre problème ici..."
                          id="exampleFormControlTextarea1"
                          rows="12"
                          style={{ resize: "none" }}
                        />
                        {errors.message && touched.message ? (
                          <>
                            <div className="alert alert-danger" role="alert">
                              {errors.message}
                            </div>
                          </>
                        ) : null}
                      </div>
                      <button
                        type="submit"
                        disabled={
                          isSubmitting ||
                          errors.email ||
                          errors.name ||
                          errors.message
                        }
                        className="btn btn-primary btn-outline-whit col-6 mx-auto btn-block "
                      >
                        {" "}
                        <i className="far fa-paper-plane "> </i> Envoyer{" "}
                      </button>
                    </Form>
                  );
                }
              }}
            </Formik>
          </div>
        </div>
      </>
    );
  }
}
export default Aide;
