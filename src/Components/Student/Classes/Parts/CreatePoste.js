import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import FormatFileSize from "../../../Common/FileSizeFormat";
//// pictures
import pictureIcon from "../../../Common/images/picture.png";
import pdfIcon from "../../../Common/images/pdf.png";
import pptxIcon from "../../../Common/images/pptx.png";
import docIcon from "../../../Common/images/doc.png";
import xlsIcon from "../../../Common/images/xls.png";
import zipIcon from "../../../Common/images/zip.png";
import audioIcon from "../../../Common/images/audio.png";
import videoIcon from "../../../Common/images/video.png";
import axios from "axios";

/// those validation lines won't be shown !

class CreatePoste extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attachedFiles: [] };
    this.UseModal = props.Usemodal;
  }

  componentDidMount() {
    var textarea = document.getElementById("area");
    textarea.addEventListener("keydown", autosize);
    function autosize() {
      var el = this;
      setTimeout(function() {
        el.style.cssText = "height:auto; padding:0";
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
        el.style.cssText = "height:" + (el.scrollHeight + 55) + "px";
      }, 0);
    }
  }

  Vider() {
    this.setState({ attachedFiles: [] });
  }

  onChange(e) {
    let tab = this.state.attachedFiles;
    let flag = false;
    let allowed = ["docx", "xlsx", "pptx", "zip", "rar", "pdf"];
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
    this.setState({ attachedFiles: tab });
    e.currentTarget.value = "";
    if (Signal.length > 0)
      this.UseModal("w", "Type de fichier non alloué : " + Signal, true);
    if (sizes.length > 0)
      this.UseModal(
        "w",
        "Maximum taille acceptée est 20Mo, ces fichiers ne sont pas choisi : " +
          sizes,
        true
      );
  }

  Annuler1Fichier(indice) {
    let tab = this.state.attachedFiles;
    tab.splice(indice, 1);
    this.setState({ attachedFiles: tab });
  }

  file_Thumbnail(FileType, FileName, Size, indice) {
    switch (FileType) {
      case "image":
        return (
          <div
            className="d-inline-block w-100 mt-2 rounded"
            style={{ backgroundColor: "#b68eae" }}
            key={FileName}
          >
            <img
              src={pictureIcon}
              alt="TypeImage"
              className="float-left my-1"
              style={{
                height: "90px",
                width: "120px",
                marginRight: "-1px",
                marginLeft: "2rem"
              }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              onClick={e => this.Annuler1Fichier(indice)}
            >
              {" "}
              <i className="fas fa-times text-danger fa-lg " />{" "}
            </span>
            <div className=" mx-auto ">
              <h4 className="text-break text-center mt-3 h5">{FileName}</h4>
              <p className="text-secondary text-center  mt-2">
                ( {FormatFileSize(Size, true)} )
              </p>
            </div>
          </div>
        );
      case "pdf":
        return (
          <div
            className="d-inline-block w-100 mt-2 rounded"
            style={{ backgroundColor: "#fba2a2" }}
            key={FileName}
          >
            <img
              src={pdfIcon}
              alt="TypePDF"
              className="float-left ml-5 my-1"
              style={{ height: "90px", width: "90px", marginRight: "-1px" }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              onClick={e => this.Annuler1Fichier(indice)}
            >
              {" "}
              <i className="fas fa-times text-danger fa-lg " />{" "}
            </span>
            <div className="  mx-auto ">
              <h4 className="text-break text-center mt-3 h5">{FileName}</h4>
              <p className="text-secondary text-center  mt-2">
                ( {FormatFileSize(Size, true)} )
              </p>
            </div>
          </div>
        );
      case "presentation":
        return (
          <div
            className="d-inline-block w-100 mt-2 rounded"
            style={{ backgroundColor: "#e8997a" }}
            key={FileName}
          >
            <img
              src={pptxIcon}
              alt="TypePPTX"
              className="float-left ml-5 my-1"
              style={{ height: "90px", width: "90px", marginRight: "-1px" }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              onClick={e => this.Annuler1Fichier(indice)}
            >
              {" "}
              <i className="fas fa-times text-danger fa-lg " />{" "}
            </span>
            <div className="  mx-auto ">
              <h4 className="text-break text-center mt-3 h5">{FileName}</h4>
              <p className="text-secondary text-center  mt-2">
                ( {FormatFileSize(Size, true)} )
              </p>
            </div>
          </div>
        );
      case "doc":
        return (
          <div
            className="d-inline-block w-100 mt-2 rounded"
            style={{ backgroundColor: "#edf3f4" }}
            key={FileName}
          >
            <img
              src={docIcon}
              alt="typedoc"
              className="float-left ml-5 my-1"
              style={{ height: "90px", width: "90px", marginRight: "-1px" }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              onClick={e => this.Annuler1Fichier(indice)}
            >
              {" "}
              <i className="fas fa-times text-danger fa-lg " />{" "}
            </span>

            <div className=" mx-auto ">
              <h4 className="text-break text-center mt-3 h5">{FileName}</h4>
              <p className="text-secondary text-center  mt-2">
                ( {FormatFileSize(Size, true)} )
              </p>
            </div>
          </div>
        );
      case "xls":
        return (
          <div
            className="d-inline-block w-100 mt-2 rounded"
            style={{ backgroundColor: "#cbe0cb" }}
            key={FileName}
          >
            <img
              src={xlsIcon}
              alt="typexls"
              className="float-left ml-5 my-1"
              style={{ height: "90px", width: "90px", marginRight: "-1px" }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              onClick={e => this.Annuler1Fichier(indice)}
            >
              {" "}
              <i className="fas fa-times text-danger fa-lg " />{" "}
            </span>

            <div className="  mx-auto ">
              <h4 className="text-break text-center mt-3 h5">{FileName}</h4>
              <p className="text-secondary text-center  mt-2">
                ( {FormatFileSize(Size, true)} )
              </p>
            </div>
          </div>
        );
      case "zip":
        return (
          <div
            className="d-inline-block w-100 mt-2 rounded"
            style={{ backgroundColor: "#eefec8" }}
            key={FileName}
          >
            <img
              src={zipIcon}
              alt="typezip"
              className="float-left ml-5 my-1"
              style={{ height: "90px", width: "90px", marginRight: "-1px" }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              onClick={e => this.Annuler1Fichier(indice)}
            >
              {" "}
              <i className="fas fa-times text-danger fa-lg " />{" "}
            </span>

            <div className="  mx-auto ">
              <h4 className="text-break text-center mt-3 h5">{FileName}</h4>
              <p className="text-secondary text-center  mt-2">
                ( {FormatFileSize(Size, true)} )
              </p>
            </div>
          </div>
        );
      case "audio":
        return (
          <div
            className="d-inline-block w-100 mt-2 rounded"
            style={{ backgroundColor: "#d0d1d0" }}
            key={FileName}
          >
            <img
              src={audioIcon}
              alt="typezip"
              className="float-left ml-5 my-1"
              style={{ height: "90px", width: "90px", marginRight: "-1px" }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              onClick={e => this.Annuler1Fichier(indice)}
            >
              {" "}
              <i className="fas fa-times text-danger fa-lg " />{" "}
            </span>

            <div className="  mx-auto ">
              <h4 className="text-break text-center mt-3 h5">{FileName}</h4>
              <p className="text-secondary text-center  mt-2">
                ( {FormatFileSize(Size, true)} )
              </p>
            </div>
          </div>
        );
      case "video":
        return (
          <div
            className="d-inline-block w-100 mt-2 rounded"
            style={{ backgroundColor: "#fcff73" }}
            key={FileName}
          >
            <img
              src={videoIcon}
              alt="typezip"
              className="float-left my-1"
              style={{
                height: "90px",
                width: "120px",
                marginRight: "-1px",
                marginLeft: "2rem"
              }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              onClick={e => this.Annuler1Fichier(indice)}
            >
              {" "}
              <i className="fas fa-times text-danger fa-lg " />{" "}
            </span>

            <div className="  mx-auto ">
              <h4 className="text-break text-center mt-3 h5">{FileName}</h4>
              <p className="text-secondary text-center  mt-2">
                ( {FormatFileSize(Size, true)} )
              </p>
            </div>
          </div>
        );
      default:
        break;
    }
  }

  affichageDesFichierSelectionnes() {
    var Table = [];
    var ele = null;
    const files = this.state.attachedFiles;
    for (let i = 0; i < files.length; i++) {
      //check image
      ele = null;
      if (files[i].type.length > 0) {
        if (files[i].type.search("image") !== -1) {
          ele = this.file_Thumbnail("image", files[i].name, files[i].size, i);
        } else if (files[i].type.search("pdf") !== -1) {
          ele = this.file_Thumbnail("pdf", files[i].name, files[i].size, i);
        } else if (files[i].type.search("presentation") !== -1) {
          ele = this.file_Thumbnail(
            "presentation",
            files[i].name,
            files[i].size,
            i
          );
        } else if (files[i].type.search("word") !== -1) {
          ele = this.file_Thumbnail("doc", files[i].name, files[i].size, i);
        } else if (files[i].type.search("sheet") !== -1) {
          ele = this.file_Thumbnail("xls", files[i].name, files[i].size, i);
        } else if (files[i].type.search("audio") !== -1) {
          ele = this.file_Thumbnail("audio", files[i].name, files[i].size, i);
        } else if (files[i].type.search("video") !== -1) {
          ele = this.file_Thumbnail("video", files[i].name, files[i].size, i);
        }
      } else {
        if (files[i].name.split(".").pop() === "rar") {
          ele = this.file_Thumbnail("zip", files[i].name, files[i].size, i);
        } else if (files[i].name.split(".").pop() === "zip") {
          ele = this.file_Thumbnail("zip", files[i].name, files[i].size, i);
        }
      }

      Table.push(ele);
    }

    return Table;
  }

  render() {
    return (
      <div className="post-topbar">
        <div className="post_comment_sec w-100 float-none">
          <Formik
            initialValues={{ pub: "", attachedFiles: [] }}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              let fd = new FormData();
              fd.append(
                "Files",
                this.state.attachedFiles
              );
              fd.append("pub", data.pub);
              resetForm({});
              this.Vider();
              
              axios({
                method:'post',
                url:'',
                params: {token:localStorage.getItem('LogToken')},
                data:fd,
              }).then(
                /// TODO
                
                ///
              ).catch(
                err => this.UseModal('d','une erreure servenue :'+err,true)
              )

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
                <Form className="w-100 col-12">
                  <Field
                    as="textarea"
                    placeholder="Saisissez Votre publication ici ..."
                    className="w-100 form-control text-dark overflow-hidden "
                    id="area"
                    name="pub"
                    style={{ display: "block" }}
                    rows="2"
                  />
                  {this.state.attachedFiles.length === 0
                    ? null
                    : this.affichageDesFichierSelectionnes()}
                  <div
                    className="float-left ml-2"
                    style={{ marginTop: "20px" }}
                  >
                    <input
                      type="file"
                      name="Files"
                      id="Files"
                      value=""
                      multiple
                      style={{ display: "none" }}
                      onChange={this.onChange.bind(this)}
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

                  <div className="float-right">
                    <button
                      type="button"
                      className=" btn btn-danger bg-danger mr-1"
                      onClick={e => {
                        resetForm({});
                        this.Vider();
                      }}
                    >
                      <i className="fas fa-times fa-lg"></i> Annuler
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary bg-primary ml-1 "
                      onClick={handleSubmit}
                    >
                      <i className="fas fa-check fa-lg"></i> Publier
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        {/*post_comment_sec end*/}
      </div>
    );
  }
}

export default CreatePoste;
