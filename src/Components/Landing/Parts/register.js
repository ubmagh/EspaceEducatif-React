import React from "react";
import { Form, Formik, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import MyModal from "../../Common/Modal";
import moment from "moment";

const RegisterSchema = Yup.object().shape({
  Fname: Yup.string()
    .max(20, "C'est trop pour un prénom")
    .min(2, "prénom invalide")
    .required("Entrez Votre Prénom ")
    .matches(
      /^[a-z A-Z éèà]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      "Préom Invalide !"
    ),
  Lname: Yup.string()
    .max(30, "C'est trop pour un Nom")
    .min(2, "nom invalide")
    .required("Entrez Votre nom ")
    .matches(
      /^[a-z A-Z éèà]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      "Nom Invalide !"
    ),
  Filiere: Yup.string()
    .required("Choix invalide")
    .max(3, "Choix invalide"),
  Annee: Yup.string()
    .max(1, "Année invalide ")
    .required("Année manquante"),
  Sex: Yup.string()
    .max(1, "Sex Invalide ")
    .required("Sex Manquant"),
  CIN: Yup.string()
    .max(10, "CIN invalide ")
    .min(6, "Cin invalide ")
    .required("champ obligatoire ")
    .matches(
      /^[a-z A-Z 0-9]+(([0-9a-zA-Z ])?[a-zA-Z0-9]*)*$/,
      "CIN Invalide !"
    ),
  email: Yup.string()
    .email("Adresse email Invalide !")
    .required("l'email est Obligatoire !"),
  password: Yup.string()
    .min(6, "Mot De Passe invalide >6!")
    .required("Entrez Votre Mot De Passe !"),
  DateNais: Yup.date()
    .required("Veuillez saisir votre date de Naissance ici")
    .test("DOB", "date saisie est invalide !", value => {
      return moment().diff(moment(value), "years") >= 18;
    })
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { heading: "", body: "", showMod: false };
  }

  HandleShowModal(t) {
    this.setState({ heading: "", body: "", showMod: false });
  }

  render() {
    return (
      <>
        <div
          className="container  pb-lg-5 pb-3"
          style={{
            minHeight: "100%",
            maxHeight: "100%px",
            backgroundColor: "rgb(233,236,239)"
          }}
        >
          <MyModal
            ShowOrNot={this.state.showMod}
            setShowOrNot={this.HandleShowModal.bind(this)}
            Heading={this.state.heading}
            body={this.state.body}
          />

          <div className="jumbotron mt-n5 h-100 mb-lg-5">
            <h1 className="display-3">Nouveau compte :</h1>
            <div className="row col-md-10 col-xs-12 col-12 mx-auto mt-0 ">
              <Formik
                initialValues={{
                  Fname: "",
                  Lname: "",
                  email: "",
                  password: "",
                  Filiere: "",
                  Annee: "",
                  Sex: "F",
                  DateNais: "",
                  CIN: "",
                  Rules: false
                }}
                validationSchema={RegisterSchema}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  const mydata = data;
                  //// Envoie des données vers la BD utilisant axios ( =: ajax ) sans actualiser
                  axios({
                    method: "post",
                    url: "http://127.0.0.1:8000/api/register",
                    data: mydata,
                    headers: { "Content-Type": "application/json" }
                  })
                    .then(res => {
                      if (res.data.status + "" === "ToValidate") {
                        this.setState({
                          heading: "s",
                          body: "Votre compte Bien créé ! connectez-vous !",
                          showMod: true
                        });
                        resetForm({});
                      }
                      //setTimeout(() => { window.open(window.location.hostname + "/StudentLog") }, 5000);
                      else if (res.data.status + "" === "DBError") {
                        this.setState({
                          heading: "d",
                          body:
                            "Erreur Internal de Serveur \n Contactez l'administration ",
                          showMod: true
                        });
                      } else if (res.data.status + "" === "ValidationError") {
                        if (
                          res.data.content.email[0] + "" ===
                          "The email has already been taken."
                        )
                          this.setState({
                            heading: "w",
                            body: " Email déja existe !",
                            showMod: true
                          });
                        else
                          this.setState({
                            heading: "w",
                            body:
                              " Les données fournies invalides, réssayez plus tard !",
                            showMod: true
                          });
                      }
                    })
                    .catch(err => {
                      this.setState({
                        heading: "d",
                        body: "Erreur de connexion au serveur \n " + err,
                        showMod: true
                      });
                    });

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
                }) => (
                  <Form className="col-md-8 col-xs-10 col-sm-11 col-12 mx-auto text-center mt-5 mb-md-n5">
                    <div className="form-group">
                      <Field
                        type="input"
                        name="Fname"
                        className="form-control  text-center"
                        placeholder="Votre Prénom"
                      />
                      {errors.Fname && touched.Fname ? (
                        <>
                          <div className="alert alert-danger" role="alert">
                            {errors.Fname}
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <Field
                        type="input"
                        name="Lname"
                        className="form-control  text-center"
                        placeholder="Votre Nom"
                      />
                      {errors.Lname && touched.Lname ? (
                        <>
                          <div className="alert alert-danger" role="alert">
                            {errors.Lname}
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className=" form-group custom-control custom-radio custom-control-inline">
                      <Field
                        as="input"
                        type="radio"
                        id="customRadioInline1"
                        name="Sex"
                        value="M"
                        className="custom-control-input mt-n1"
                      />
                      <label
                        className="custom-control-label mt-2"
                        htmlFor="customRadioInline1"
                      >
                        Mâle
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <Field
                        as="input"
                        type="radio"
                        id="customRadioInline2"
                        name="Sex"
                        value="F"
                        className="custom-control-input mt-n1"
                        checked
                      />
                      <label
                        className="custom-control-label mt-2"
                        htmlFor="customRadioInline2"
                      >
                        femelle
                      </label>
                    </div>

                    <div className=" form-group col-12 mx-auto ">
                      <h6
                        className="h6 float-left mt-2 mr-md-2"
                        style={{ fontFamily: "Source Sans Pro" }}
                      >
                        Date de Naissance :
                      </h6>
                      <Field
                        type="date"
                        className="form-control text-center col-lg-8 col-10 mx-auto "
                        name="DateNais"
                        placeholder="Date de Naissance"
                      />
                      {errors.DateNais && touched.DateNais ? (
                        <>
                          <div
                            className="d-inline-block mx-auto alert alert-danger"
                            role="alert"
                          >
                            {errors.DateNais}
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <Field
                        type="select"
                        name="Filiere"
                        className="form-control custom-select text-center"
                        as="select"
                      >
                        <option defaultValue value="Nandimonay">
                          {" "}
                          Choisir la Filière{" "}
                        </option>
                        <option value="GI">Génie Informatique</option>
                        <option value="GE">Génie Electrique</option>
                      </Field>
                      {errors.Filiere && touched.Filiere ? (
                        <>
                          <div className="alert alert-danger" role="alert">
                            {errors.Filiere}
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <Field
                        name="Annee"
                        className="form-control custom-select text-center"
                        as="select"
                      >
                        <option defaultValue value="99">
                          {" "}
                          Choisir l'année'{" "}
                        </option>
                        <option value="1">1er Année</option>
                        <option value="2">2eme Année</option>
                      </Field>
                      {errors.Annee && touched.Annee ? (
                        <>
                          <div className="alert alert-danger" role="alert">
                            {errors.Annee}
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <Field
                        type="text"
                        name="CIN"
                        className="form-control  text-center"
                        id="CIN"
                        aria-describedby="emailHelp"
                        placeholder="CIN"
                      />
                      {errors.CIN && touched.CIN ? (
                        <>
                          <div className="alert alert-danger" role="alert">
                            {errors.CIN}
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className="form-group">
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

                    <div className="form-group">
                      <Field
                        type="password"
                        name="password"
                        className={
                          errors.password && touched.password
                            ? "form-control  text-center border-danger"
                            : "form-control  text-center"
                        }
                        id="exampleInputPassword1"
                        placeholder="Mot de Passe"
                      />
                      {errors.password && touched.password ? (
                        <>
                          <div className="alert alert-danger" role="alert">
                            <strong>Attention </strong> {errors.password}
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className="custom-control custom-checkbox mt-md-n2">
                      <Field
                        type="checkbox"
                        name="Rules"
                        className="custom-control-input mt-n1"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label mt-2"
                        htmlFor="customCheck1"
                      >
                        J'accepte tous{" "}
                        <Link to="Rules"> Les Conditions d'utilisation</Link>.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        !values.Rules ||
                        isSubmitting ||
                        errors.Lname ||
                        errors.Lname ||
                        errors.Sex ||
                        errors.Filiere ||
                        errors.Annee ||
                        errors.CIN ||
                        errors.email ||
                        errors.password ||
                        errors.Rules ||
                        errors.DateNais
                      }
                      className="btn btn-primary col-md-5 mt-4 mb-md-n5"
                    >
                      <i className="fas fa-plus text-light mr-1 ml-n1"> </i>
                      Créer
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
