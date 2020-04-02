import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import axios from "axios";
import ApiHost from "../../../Common/Config";
import TokenValidate from "../../../Common/tokenValidate";
import FormatFileSize from "../../../Common/FileSizeFormat";
import { renderFilesThumbs } from "../../../Common/Affichages_Functions";

const affichageSchema = Yup.object().shape({
  titre: Yup.string()
    .max(60, "Max: 30 caractère.")
    .required("Entrez un titre "),
  content: Yup.string().max(150, "Max: 100 caractère.")
});

class Affichage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ClassID: props.classID, files: [], data: [] };
    this.ToggleMainSection = this.props.ToggleMainSection;
    this.Usemodal = this.props.Usemodal;
  }

  setData(data) {
    this.setState({ data: data });
  }

  OnFileChange(e) {
    let tab = this.state.files;
    let flag = false;
    let allowed = [
      "docx",
      "doc",
      "rtf",
      "xlsx",
      "pptx",
      "ppt",
      "zip",
      "rar",
      "pdf"
    ];
    let tmp = "",
      Signal = [],
      sizes = [];

    for (let i = 0; i < e.currentTarget.files.length; i++) {
      for (let j = 0; j < tab.length; j++)
        if (tab[j].name === e.currentTarget.files[i].name) flag = true;

      tmp = (e.currentTarget.files[i].type + "").split("/").shift();
      if (flag) {
        flag = false;
        continue;
      }
      if (
        !allowed.includes(
          e.currentTarget.files[i].name
            .split(".")
            .pop()
            .toLowerCase()
        ) &&
        !["audio", "video", "image"].includes(tmp)
      ) {
        Signal.push(
          e.currentTarget.files[i].name
            .split(".")
            .pop()
            .toLowerCase()
        );
        continue;
      }
      if (e.currentTarget.files[i].size >= 20000000) {
        sizes.push(e.currentTarget.files[i].name);
        continue;
      }
      tab.push(e.currentTarget.files[i]);
    }
    this.setState({ files: tab });
    e.currentTarget.value = "";
    if (Signal.length > 0)
      this.Usemodal("w", "Type de fichier non alloué : " + Signal, true);
    if (sizes.length > 0)
      this.Usemodal(
        "w",
        "Maximum taille acceptée est 20Mo, ces fichiers ne sont pas choisi : " +
          sizes,
        true
      );
  }

  removeFile(indice) {
    let tmp = this.state.files;
    tmp.splice(indice, 1);
    this.setState({ files: tmp });
  }

  AfficherLesFichiersSelectionnes() {
    let tab = [];
    let pic = "";
    var ele = null;
    const files = this.state.files;
    for (let i = 0; i < files.length; i++) {
      //check image
      ele = null;
      if (files[i].type.search("image") !== -1) {
        ele = "image";
      } else if (files[i].type.search("pdf") !== -1) {
        ele = "pdf";
      } else if (files[i].type.search("presentation") !== -1) {
        ele = "presentation";
      } else if (files[i].type.search("word") !== -1) {
        ele = "doc";
      } else if (files[i].type.search("sheet") !== -1) {
        ele = "xls";
      } else if (files[i].type.search("audio") !== -1) {
        ele = "audio";
      } else if (files[i].type.search("video") !== -1) {
        ele = "video";
      } else if (files[i].name.split(".").pop() === "ppt") {
        ele = "presentation";
      } else if (
        files[i].name.split(".").pop() === "doc" ||
        files[i].name.split(".").pop() === "rtf"
      ) {
        ele = "doc";
      } else if (files[i].name.split(".").pop() === "rar") {
        ele = "zip";
      } else if (files[i].name.split(".").pop() === "zip") {
        ele = "zip";
      }

      switch (ele) {
        case "image":
          pic = <i className="far d-inline fa-image fa-lg mr-1 ml-n1"></i>;
          break;
        case "zip":
          pic = (
            <i className="fas d-inline fa-file-archive fa-lg mr-1 ml-n1"></i>
          );
          break;
        case "pdf":
          pic = <i className="far d-inline fa-file-pdf fa-lg mr-1 ml-n1"></i>;
          break;
        case "presentation":
          pic = (
            <i className="far d-inline fa-file-powerpoint fa-lg mr-1 ml-n1"></i>
          );
          break;
        case "word":
          pic = <i className="far d-inline fa-file-word fa-lg mr-1 ml-n1"></i>;
          break;
        case "Excel":
          pic = <i className="far d-inline fa-file-excel fa-lg mr-1 ml-n1"></i>;
          break;
        case "video":
          pic = <i className="far d-inline fa-file-video fa-lg mr-1 ml-n1"></i>;
          break;
        case "audio":
          pic = <i className="far d-inline fa-file-audio fa-lg mr-1 ml-n1"></i>;
          break;
        default:
          pic = <i className="fas d-inline fa-question fa-lg mr-1 ml-n1"></i>;
      }
      tab.push(
        <li
          key={"media:" + files[i].name + Math.random()}
          style={{ cursor: "pointer", listStyle: "none" }}
          className="text-dark font-weight-bold mt-3 w-100 text-truncate"
        >
          {pic} {files[i].name} ({FormatFileSize(files[i].size, true)})
          <span
            className="float-right"
            style={{ cursor: "pointer" }}
            onClick={() => this.removeFile(i)}
          >
            {" "}
            <i className="fas fa-times-circle fa-lg text-danger"></i>{" "}
          </span>
        </li>
      );
    }
    return tab;
  }

  render() {
    return (
      <div className="w-100 d-block">
        <h3
          className="d-inline-block mr-auto text-primary h4"
          style={{ cursor: "pointer" }}
          onClick={() => this.ToggleMainSection("main")}
        >
          {" "}
          <i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i>{" "}
          Retourner à la classe{" "}
        </h3>
        <h3 className=" text-center h3 mt-md-n3 mt-sm-3 text-dark">
          {" "}
          Tableau d'affichage :{" "}
        </h3>
        <hr className="d-block text-dark w-100" />

        <div className="rounded mt-5 mb-3 border border-dark p-3 pt-4">
          <h4 className="h4 text-left mb-3"> Ajouter un affichage : </h4>
          <Formik
            initialValues={{ titre: "", content: "" }}
            validationSchema={affichageSchema}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              let fd = new FormData();

              for (let i = 0; i < this.state.files.length; i++)
                fd.append("File" + i, this.state.files[i]);
              fd.append("lngth", this.state.files.length);

              fd.append("classiD", this.state.ClassID);
              fd.append("titre", data.titre);
              fd.append("content", data.content);
              axios({
                method: "POST",
                url: ApiHost + "/api/Classes/NewAffichage",
                params: { token: localStorage.getItem("LogToken") },
                data: fd
              })
                .then(res => {
                  TokenValidate(res.data);
                  if (res.data.error === "ParamMissing")
                    this.Usemodal("w", "Données manquantes/invalides !", true);
                  else if (res.data.error === "Notpermitted")
                    this.Usemodal(
                      "w",
                      "Vous n'etes pas permi à completer cette action !",
                      true
                    );
                  else if (res.data.error === "notSaved")
                    this.Usemodal("w", "Données non enregistrées!", true);
                  else if (res.data.error === "none") {
                    let tmp = this.state.data;
                    tmp.unshift(res.data.content);
                    this.setState({ data: tmp });
                  } else
                    this.Usemodal(
                      "w",
                      "Une erreure inconnue s'est servenue !",
                      true
                    );
                })
                .catch(err => this.Usemodal("d", "Erreure: " + err, true));
              this.setState({ files: [] });
              resetForm();
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
                <>
                  <Form
                    action=""
                    method="post"
                    className="col-md-12 mx-md-auto"
                  >
                    <div className="form-group">
                      <Field
                        type="text"
                        className="form-control"
                        name="titre"
                        id="titre"
                        aria-describedby="helpId"
                        placeholder="titre"
                        maxLength="60"
                      />
                      {errors.titre && touched.titre ? (
                        <>
                          <div className="alert alert-danger" role="alert">
                            {errors.titre}
                          </div>
                        </>
                      ) : null}
                      <div className="form-group mt-2">
                        <Field
                          className="form-control py-3 px-2"
                          maxLength="150"
                          as="textarea"
                          name="content"
                          id="content"
                          rows="3"
                          placeholder="description"
                          style={{ resize: "none" }}
                        ></Field>
                        {errors.content && touched.content ? (
                          <>
                            <div className="alert alert-danger" role="alert">
                              {errors.content}
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className="ml-2" style={{ marginTop: "20px" }}>
                        <input
                          type="file"
                          name="Files"
                          id="Files"
                          value=""
                          multiple
                          style={{ display: "none" }}
                          onChange={this.OnFileChange.bind(this)}
                        />
                        {/* */}

                        <OverlayTrigger
                          key="sh"
                          placement="bottom"
                          overlay={
                            <Tooltip id={`tooltip-bottom`}>
                              {" "}
                              Attacher des fichier{" "}
                            </Tooltip>
                          }
                        >
                          <label htmlFor="Files" style={{ cursor: "pointer" }}>
                            <i className="fas fa-file-upload fa-2x text-secondary"></i>
                          </label>
                        </OverlayTrigger>
                        {/* */}
                      </div>

                      <div className="float-right row col-xs-9 col-sm-9 col-md-10 mt-n4 mb-2">
                        <button
                          type="button"
                          disabled={isSubmitting}
                          className="btn btn-danger col mr-1"
                          onClick={() => {
                            this.setState({ files: [] });
                            resetForm();
                            errors.titre = null;
                          }}
                        >
                          {" "}
                          <i className="fas fa-times fa-lg ml-n1 mr-1"></i>{" "}
                          Vider{" "}
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary col  ml-1 "
                          disabled={
                            isSubmitting || errors.content || errors.titre
                          }
                        >
                          <i
                            className="fa fa-plus fa-lg ml-n1 mr-1 "
                            aria-hidden="true"
                          >
                            {" "}
                          </i>{" "}
                          Ajouter
                        </button>
                      </div>
                    </div>
                    <div className="float-none d-block w-100 mt-3">
                      {this.AfficherLesFichiersSelectionnes()}
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
        <h4 className="h4 text-left mt-5"> Liste des affichages : </h4>
        <div>
          <Affiches
            ClassID={this.state.ClassID}
            Usemodal={this.Usemodal}
            data={this.state.data}
            SetData={this.setData.bind(this)}
          />
        </div>
      </div>
    );
  }
}

class Affiches extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ClassID: props.ClassID, data: props.data };
    this.SetData = props.SetData;
    this.Usemodal = props.Usemodal;
    axios({
      method: "GET",
      url: ApiHost + "/api/Classes/affichages",
      params: {
        classiD: this.state.ClassID,
        token: localStorage.getItem("LogToken") + ""
      }
    })
      .then(res => {
        TokenValidate(res.data);
        if (res.data.error === "ParamMissing")
          this.Usemodal("w", "Données invalides !", true);
        else if (res.data.error === "Notpermitted")
          this.Usemodal(
            "w",
            "Vous n'avez pas l'autorisation à cette action ! ",
            true
          );
        else if (res.data.error === "none") this.SetData(res.data.data);
        else
          this.Usemodal(
            "w",
            "impossible de récupérer les données depuis le serveur!",
            true
          );
      })
      .catch(err => this.Usemodal("d", "Erreure: " + err, true));
  }

  renderData() {
    let tab = [];
    const data = this.props.data;
    if (this.props.data.length === 0)
      tab = <h4 className="h4 text-center w-100 "> Aucun affichage ! </h4>;
    else
      for (let i = 0; i < this.props.data.length; i++) {
        tab.push(
          <div
            className="card border-secondary mb-3 w-100"
            key={"affichage: " + data[i].id}
          >
            <div className="card-header ">
              <span className="text-dark font-weight-bold">
                {data[i].title}{" "}
              </span>
              <span
                style={{
                  position: "relative",
                  float: "right",
                  cursor: "pointer"
                }}
                onClick={() => {
                  axios({
                    url: ApiHost + "/api/Classes/DelAffichage",
                    method: "GET",
                    params: {
                      token: localStorage.getItem("LogToken"),
                      AffiD: data[i].id
                    }
                  })
                    .then(res => {
                      TokenValidate(res.data);
                      switch (res.data.error) {
                        case "ParamMissing":
                          this.Usemodal(
                            "w",
                            "Données fournies sont incorrectes !",
                            true
                          );
                          break;
                        case "Notpermitted":
                          this.Usemodal(
                            "d",
                            "Vous action est refusée vous n'etes pas permis !",
                            true
                          );
                          break;
                        case "NotFound":
                          this.Usemodal(
                            "w",
                            "Données fournies sont incorrectes !",
                            true
                          );
                          break;
                        case "none":
                          this.Usemodal("s", " Bien supprimé ! ", true);
                          let tmp = this.props.data;
                          tmp.splice(i, 1);
                          this.SetData(tmp);
                          break;
                        default:
                          this.Usemodal("w", "Une Erreure servenue !", true);
                      }
                    })
                    .catch(err =>
                      this.Usemodal("d", "Une Erreure servenue !", true)
                    );
                }}
              >
                {" "}
                <i className="fas fa-times-circle fa-lg text-danger  "></i>{" "}
              </span>
            </div>
            <div className="card-body text-secondary">
              <h5 className="card-title text-right text-primary">
                {data[i].date}
              </h5>
              <p className="card-text mb-4 h5">{data[i].content}</p>
              <hr />
              {renderFilesThumbs(data[i].files, data[i].id)}
            </div>
          </div>
        );
      }
    return tab;
  }

  render() {
    return <div className="w-100">{this.renderData()}</div>;
  }
}

export default Affichage;
