import React from "react";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Modal from "../../Common/Modal";
import validateToken from "../../Common/tokenValidate";

const EmailSchema = Yup.object().shape({
  email1: Yup.string()
    .email("Adresse email Invalide !")
    .max(120, "c'est trop pour un email")
    .required("Saisaissez le nouveau email !"),
  email2: Yup.string()
    .email("Adresse email Invalide !")
    .oneOf([Yup.ref("email1"), null], "Cet email ne ressemble pas au premier !")
    .required("Confirmez le nouveau email !"),
  pwd: Yup.string()
    .required("Champ nécessaire pour sauvegarder !")
    .max(30, " mot de passe invalide ")
    .min(6, " mot de passe invalide ")
});

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { heading: "", body: "", showMod: false };
  }

  HandleShowModal(t) {
    this.setState({ heading: "", body: "", showMod: false });
  }

  render() {
    return (
      <section className="profile-account-setting">
        <div className="container">
          <div className="account-tabs-setting">
            <div className="row">
              <div className="col-lg-3">
                <div className="acc-leftbar">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-item nav-link active"
                      id="nav-acc-tab"
                      data-toggle="tab"
                      href="#nav-acc"
                      role="tab"
                      aria-controls="nav-acc"
                      aria-selected="true"
                    >
                      <i className="fas fa-at" /> Changer l'email
                    </a>
                    <a
                      className="nav-item nav-link text-nowrap"
                      id="nav-password-tab"
                      data-toggle="tab"
                      href="#nav-password"
                      role="tab"
                      aria-controls="nav-password"
                      aria-selected="false"
                    >
                      <i className="fa fa-key" /> Changer le mot de passe
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-requests-tab"
                      data-toggle="tab"
                      href="#nav-requests"
                      role="tab"
                      aria-controls="nav-requests"
                      aria-selected="false"
                    >
                      <i className="fas fa-camera" /> Changer la photo
                    </a>
                  </div>
                </div>
                {/*acc-leftbar end*/}
              </div>

              <Modal
                ShowOrNot={this.state.showMod}
                setShowOrNot={this.HandleShowModal.bind(this)}
                Heading={this.state.heading}
                body={this.state.body}
              />

              <div className="col-lg-9">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-acc"
                    role="tabpanel"
                    aria-labelledby="nav-acc-tab"
                  >
                    <div className="acc-setting">
                      <h3 className="text-center h3">
                        Changer votre Adresse Email
                      </h3>
                      <Formik
                        initialValues={{ email1: "", email2: "", pwd: "" }}
                        validationSchema={EmailSchema}
                        onSubmit={(data, { setSubmitting, resetForm }) => {
                          setSubmitting(true);

                          const mydata = data;
                          //// Envoie des données vers la BD utilisant axios ( =: ajax ) sans actualiser
                          axios({
                            method: "post",
                            url:
                              "http://127.0.0.1:8000/api/Settings/ChangeEmail",

                            data: {
                              token: "" + localStorage.getItem("LogToken"),
                              email: "" + mydata.email1,
                              password: "" + mydata.pwd
                            },
                            timeout: 5000,
                            headers: { "Content-Type": "application/json" }
                          })
                            .then(res => {
                              var response = res.data;
                              //check token validation
                              validateToken(response);

                              switch (response.error + "") {
                                case "ValidationError":
                                  this.setState({
                                    heading: "w",
                                    body: "Données Fournies sont invalides .",
                                    showMod: true
                                  });
                                  break;

                                case "PwDErr":
                                  this.setState({
                                    heading: "d",
                                    body: "Mot De Passe Incorrecte !",
                                    showMod: true
                                  });
                                  break;

                                case "SameEmail":
                                  this.setState({
                                    heading: "w",
                                    body:
                                      "C'est le meme que l'email actuel entrez un autre !",
                                    showMod: true
                                  });
                                  break;
                                case "EmailTaken":
                                  this.setState({
                                    heading: "w",
                                    body:
                                      "Email déja Enregistré pour un membre",
                                    showMod: true
                                  });
                                  break;
                                case "none":
                                  this.setState({
                                    heading: "s",
                                    body: " Adresse Email Bien Changée ",
                                    showMod: true
                                  });
                                  break;

                                default:
                                  break;
                              }
                            })
                            .catch(err => {
                              this.setState({
                                heading: "d",
                                body: "Une Erreur s'est produit! \n " + err,
                                showMod: true
                              });
                              console.log("contact-Err :" + err);
                            });

                          /// FIn du requete GET
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
                          resetForm
                        }) => {
                          return (
                            <Form>
                              <div className="cp-field">
                                <h5>Nouveau email</h5>
                                <div className="input-group cpp-fiel">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text bg-transparent">
                                      <i className="fas fa-at" />
                                    </span>
                                  </div>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Nouveau l'email"
                                    name="email1"
                                  />
                                </div>
                                {errors.email1 && touched.email1 ? (
                                  <>
                                    <div className="d-block mt-4 mb-n2 text-warning text-center mx-auto h5">
                                      <i className="fas fa-exclamation" />{" "}
                                      {errors.email1}{" "}
                                    </div>
                                  </>
                                ) : null}
                              </div>
                              <div className="cp-field">
                                <h5>Confirmer le nouveau email</h5>
                                <div className="input-group cpp-fiel">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text bg-transparent">
                                      <i className="fas fa-at" />
                                    </span>
                                  </div>
                                  <Field
                                    className="form-control"
                                    type="text"
                                    placeholder="Confirmer email"
                                    name="email2"
                                  />
                                </div>
                                {errors.email2 && touched.email2 ? (
                                  <>
                                    <div className="d-block mt-4 mb-n2 text-warning text-center mx-auto h5">
                                      <i className="fas fa-exclamation" />{" "}
                                      {errors.email2}{" "}
                                    </div>
                                  </>
                                ) : null}
                              </div>
                              <div className="cp-field">
                                <h5>Entrez votre mot de passe</h5>
                                <div className="input-group cpp-fiel">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text bg-transparent">
                                      <i className="fa fa-key" />
                                    </span>
                                  </div>
                                  <Field
                                    className="form-control"
                                    type="password"
                                    name="pwd"
                                    placeholder="Mot de passe"
                                  />
                                </div>
                                {errors.pwd && touched.pwd ? (
                                  <>
                                    <div className="d-block mt-4 mb-n2 text-danger text-center mx-auto h5">
                                      <i className="fas fa-exclamation" />{" "}
                                      {errors.pwd}{" "}
                                    </div>
                                  </>
                                ) : null}
                              </div>
                              <div className=" save-stngs pd2 ">
                                <ul className=" mx-auto">
                                  <li className="mr-3">
                                    <button
                                      disabled={
                                        isSubmitting ||
                                        errors.email1 ||
                                        errors.email2 ||
                                        errors.pwd
                                      }
                                      type="submit"
                                    >
                                      {" "}
                                      <i className="fas fa-save"></i>{" "}
                                      Enregistrer
                                    </button>
                                  </li>
                                  <li className="mr-0">
                                    <button type="button" onClick={resetForm}>
                                      {" "}
                                      <i className="fas fa-recycle"></i>{" "}
                                      Rénitialiser
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              {/*save-stngs end*/}
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                    {/*acc-setting end*/}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-password"
                    role="tabpanel"
                    aria-labelledby="nav-password-tab"
                  >
                    <div className="acc-setting">
                      <h3 className=" text-center h3">
                        Changer votre mot de passe
                      </h3>
                      <form>
                        <div className="cp-field">
                          <h5>Ancien mot de passe</h5>
                          <div className="input-group cpp-fiel">
                            <div className="input-group-prepend">
                              <span className="input-group-text bg-transparent">
                                <i className="fa fa-key" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="old-password"
                              placeholder="Ancien mot de passe"
                            />
                          </div>
                        </div>
                        <div className="cp-field">
                          <h5>Nouveau mot de passe</h5>
                          <div className="input-group cpp-fiel">
                            <div className="input-group-prepend">
                              <span className="input-group-text bg-transparent">
                                <i className="fa fa-key" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="new-password"
                              placeholder="Nouveau mot de passe"
                            />
                          </div>
                        </div>
                        <div className="cp-field">
                          <h5>Confirmer le nouveau mot de passe</h5>
                          <div className="input-group cpp-fiel">
                            <div className="input-group-prepend">
                              <span className="input-group-text bg-transparent">
                                <i className="fa fa-key" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="repeat-password"
                              placeholder="Confirmer mot de passe"
                            />
                          </div>
                        </div>
                        <div className="cp-field">
                          <h5 className="text-center ">
                            <a href="#dqsd">
                              <u>
                                {" "}
                                <i className="far fa-question-circle"></i> Mot
                                de passe oublié ?{" "}
                              </u>
                            </a>
                          </h5>
                        </div>
                        <div className="save-stngs pd2">
                          <ul className=" mx-auto">
                            <li className="mr-3">
                              <button type="submit">
                                {" "}
                                <i className="fas fa-save"></i> Enregistrer
                              </button>
                            </li>
                            <li className="mr-0">
                              <button type="submit">
                                {" "}
                                <i className="fas fa-recycle"></i> Rénitialiser
                              </button>
                            </li>
                          </ul>
                        </div>
                        {/*save-stngs end*/}
                      </form>
                    </div>
                    {/*acc-setting end*/}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-requests"
                    role="tabpanel"
                    aria-labelledby="nav-requests-tab"
                  >
                    <div className="acc-setting">
                      <div className="user-data full-width">
                        <div className="user-profile">
                          <div className="username-dt">
                            <div className="usr-pic">
                              <img
                                src="http://via.placeholder.com/100x100"
                                style={{ height: "100px", width: "100px" }}
                                alt="sdqsd"
                              />
                              <a href="#dqsd">
                                <i className="fa fa-camera" /> Modifier{" "}
                              </a>
                            </div>
                          </div>
                          {/*username-dt end*/}
                          <div className="user-specs"></div>
                        </div>
                        {/*user-profile end*/}
                        <div className="cp-field">
                          <h5>Confirmer votre mot de passe</h5>
                          <div className=" input-group cpp-fiel">
                            <div className="input-group-prepend">
                              <span className="input-group-text bg-transparent">
                                <i className="fa fa-key" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="new-password"
                              placeholder="Mot de passe"
                            />
                          </div>
                        </div>
                        <div className="save-stngs pd2">
                          <ul className=" mx-auto">
                            <li>
                              <button type="submit">
                                {" "}
                                <i className="fas fa-save"></i> Enregistrer
                              </button>
                            </li>
                          </ul>
                        </div>
                        {/*save-stngs end*/}
                      </div>
                      {/*user-data end*/}
                    </div>
                    {/*acc-setting end*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*account-tabs-setting end*/}
        </div>
      </section>
    );
  }
}

export default Settings;
