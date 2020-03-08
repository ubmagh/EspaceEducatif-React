import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import { ApiHost } from "../../../Common/Config";
import axios from "axios";
import validateToken from "../../../Common/tokenValidate";

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Heading: this.props.Heading,
      body: this.props.body,
      ShowOrNot: this.props.ShowOrNot.motherstate,
      file: "",
      ClassID: this.props.classID,
      Cover: null
    };
    this.setShowOrNot = this.props.setShowOrNot;
    this.UseModal = this.props.UseModal;
  }

  ChangeCover_Fileinput_Onchange(e) {
    const name = document
      .getElementById("inputGroupFile01")
      .value.split("\\")
      .pop();
    document.getElementById("filename").innerText = name;
    this.setState({ file: document.getElementById("inputGroupFile01").value });
    let fd = new FormData();
    fd.append("newcover", e.currentTarget.files[0]);
    this.setState({ Cover: fd });
  }

  render() {
    return (
      <Modal
        show={this.props.ShowOrNot}
        onHide={() => {
          this.setShowOrNot(false);
          this.setState({ file: "" });
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="py-4">
          <div>
            <Formik
              initialValues={{ f: "" }}
              onSubmit={(data, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                //fd.append("coverimg", this.state.Cover);
                console.log(this.state.Cover);

                let fd = this.state.Cover;
                fd.append("classiD", this.state.ClassID);
                axios({
                  method: "post",
                  url: ApiHost + "/api/Classes/ClasseCover",
                  params: { token: localStorage.getItem("LogToken") },
                  data: fd
                })
                  .then(res => {
                    validateToken(res.data);
                    this.setShowOrNot(false);
                    if (res.data.error === "ParamMissing") {
                      this.UseModal(
                        "w",
                        "Données fournies sont invalides ",
                        true
                      );
                    } else if (res.data.error === "Notpermitted") {
                      this.UseModal(
                        "w",
                        " Vous n'etes pas autorisé pour cette action !",
                        true
                      );
                    } else if (res.data.error === "none") {
                      this.UseModal(
                        "s",
                        " L'image est bien changée, re-accédez au classe pour consulter la modification ",
                        true
                      );
                    } else {
                      this.UseModal(
                        "w",
                        " Certain Erreur servenue, Réssayez plus tard! ",
                        true
                      );
                    }
                  })
                  .catch(err => {
                    this.setShowOrNot(false);
                    this.UseModal("d", "Erreure Servenue: \n" + err, true);
                  });
                setSubmitting(false);
              }}
            >
              {({ values, handleSubmit, handleChange, isSubmitting }) => {
                return (
                  <Form>
                    <h3 className="h3 text-center">
                      {" "}
                      Changer l'image de la classe :{" "}
                    </h3>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroupFileAddon01"
                        >
                          <i className="fas fa-image    "></i>
                        </span>
                      </div>
                      <div className="custom-file d-block">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile01"
                          name="file"
                          accept="image/*"
                          onChange={this.ChangeCover_Fileinput_Onchange.bind(
                            this
                          )}
                          aria-describedby="inputGroupFileAddon01"
                        />
                        <label
                          className="custom-file-label"
                          id="filename"
                          htmlFor="inputGroupFile01"
                        >
                          Choisissez une image
                        </label>
                      </div>
                      <div className="d-block col-12">
                        <small id="emailHelp" className="d-block text-muted ">
                          {" "}
                          choisissez une image large de 1600x400 px au minimum.
                        </small>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      onClick={handleSubmit}
                      disabled={isSubmitting || this.state.file.length === 0}
                    >
                      <i className="fas fa-save    "></i> Enregistrer
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
    /*

                        
    if (this.state.Heading === "w")
      return (
        <Modal
          show={this.state.ShowOrNot}
          onHide={() => this.setShowOrNot(false)}
          size="md"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="py-4">
            <div
              className="alert alert-warning col-12 py-5 mt-n3 mb-n3"
              role="alert"
            >
              <strong>
                {" "}
                <i className="fas fa-exclamation text-warning fa-4x d-block float-left mr-3 ml-n2 mt-n4"></i>{" "}
              </strong>{" "}
              {body}
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      );

    if (Heading === "s")
      return (
        <Modal
          show={this.state.ShowOrNot}
          onHide={() => this.setShowOrNot(false)}
          size="md"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="py-4">
            <div
              className="alert alert-success col-12 py-5 mt-n3 mb-n3"
              role="alert"
            >
              <strong>
                {" "}
                <i className="fas fa-check text-success fa-4x d-block float-left mr-3 ml-n2 mt-n4"></i>{" "}
              </strong>{" "}
              {this.state.body}
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      );

    return (
      <Modal
        show={this.state.ShowOrNot}
        onHide={() => this.setShowOrNot(false)}
        size="md"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="py-4">
          <div
            className="alert alert-danger col-12 py-5 mt-n3 mb-n3"
            role="alert"
          >
            <strong>
              {" "}
              <i className="fas fa-times text-danger fa-4x d-block float-left mr-3 ml-n2 mt-n4"></i>{" "}
            </strong>{" "}
            {this.state.body}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );*/
  }
}

export default MyModal;
