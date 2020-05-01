import React from "react";
import { ApiHost } from "../../Common/Config";
import MyModal from "../../Common/Modal";
import { Form, Formik, Field } from "formik";
import Loading from "../../Common/Loading";
import * as Yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Page404 from "../../Common/404Page";

const ResetSchema = Yup.object().shape({
  pwd: Yup.string()
    .min(6, "minmum est de 6 caractères")
    .required("Saisissez votre nouveau mot de passe !"),
  pwdC: Yup.string().oneOf([Yup.ref("pwd"), null], "Confirmation erronnée !"),
});

class ResetPWD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
      encmail: this.props.match.params.encmail,
      heading: "",
      body: "",
      showMod: false,
      changed: false,
      p404: false,
    };

    axios({
      method: "get",
      url: ApiHost + "/api/forgot_check",
      params: {
        token: this.props.match.params.token,
        encmail: this.props.match.params.encmail,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.data.status === "err")
          this.setState({
            p404: true,
          });
      })
      .catch((err) => {
        this.setState({
          heading: "d",
          body: "erreur de Connexion au serveur ! " + err,
          showMod: true,
        });
      });
  }

  HandleShowModal(t) {
    this.setState({ heading: "", body: "", showMod: false });
  }

  render() {
    if (this.state.p404) return <Page404 />;
    if (this.state.changed) {
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
            <h2 className="h2 mt-5"> Réinitialisation de Mot de passes</h2>
            <h4 className="h4 mt-2"> Saisissez votre nouveau mot de passe: </h4>
          </div>
          <div className="row d-block w-100" id="pop">
            <Formik
              initialValues={{
                pwd: "",
                pwdC: "",
                token: "" + this.state.token,
                encmail: "" + this.state.encmail,
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
                  method: "post",
                  url: ApiHost + "/api/forgot",
                  data: mydata,
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
                        body: " Erreur internal  !",
                        showMod: true,
                      });
                    else if (res.data.status === "success") {
                      this.setState({
                        heading: "s",
                        body:
                          " Mot de passe Bien changé, Vous pouvez vous connecter.",
                        showMod: true,
                      });
                      setTimeout(() => {
                        this.setState({ changed: true });
                      }, 2000);
                    } else
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
                      type="password"
                      name="pwd"
                      className="form-control  text-center"
                      id="exampleInputEmail1ssss"
                      aria-describedby="emailHelp"
                      placeholder="Le nouveau mot de passe"
                    />
                    {errors.pwd && touched.pwd ? (
                      <>
                        <div className="alert alert-danger" role="alert">
                          <strong>Attention </strong> {errors.pwd}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="form-group d-block mx-auto">
                    <Field
                      type="password"
                      name="pwdC"
                      className="form-control  text-center"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Confirmez le nouveau mot de passe"
                    />
                    {errors.pwdC && touched.pwdC ? (
                      <>
                        <div className="alert alert-danger" role="alert">
                          {errors.pwdC}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || errors.pwd || errors.pwdC}
                    className="btn btn-primary col-md-5 mt-3 mb-md-n5"
                  >
                    Réinitialiser
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

export default ResetPWD;
