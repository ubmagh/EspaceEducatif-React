import React from "react";
import moment from "moment";
import FormatFileSize from "../../../Common/FileSizeFormat";
import TokenValidator from "../../../Common/tokenValidate";
import Axios from "axios";
import { Link } from "react-router-dom";
import { ApiHost } from "../../../Common/Config";

//// pictures
import pictureIcon from "../../../Common/images/picture.png";
import pdfIcon from "../../../Common/images/pdf.png";
import pptxIcon from "../../../Common/images/pptx.png";
import docIcon from "../../../Common/images/doc.png";
import xlsIcon from "../../../Common/images/xls.png";
import zipIcon from "../../../Common/images/zip.png";
import audioIcon from "../../../Common/images/audio.png";
import videoIcon from "../../../Common/images/video.png";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      poster: props.Poster,
      post: props.Post,
      media: props.Media,
      classID: props.classID,
    };
    this.useModal = props.useModal;
    this.removeIt = props.removeIt;
    moment.updateLocale("en", {
      relativeTime: {
        future: "aprés %s",
        past: " %s ",
        s: "quelque secondes",
        ss: "%d secondes",
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d Heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "une année",
        yy: "%d années",
      },
    });
  }

  Download(indice) {
    Axios({
      method: "get",
      url: ApiHost + "/api/Classes/CheckDownload",
      header: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        MediaID: indice + "",
      },
    })
      .then((res) => {
        /// if there is no error i would open the request again but receive the file this time
        if (res.data.status + "" === "Exist") {
          const token = localStorage.getItem("LogToken") + "";
          const url =
            ApiHost +
            "/api/Classes/Download?token=" +
            token +
            "&MediaID=" +
            indice;
          window.open(url, "_blank");
        } else if (res.data.status === "err") {
          this.useModal(
            "d",
            "Ce fichier n'exist plus dans la base de données",
            true
          );
        } else if (res.data.status === "Rejected") {
          this.useModal("w", "Vous n'avez pas l'accès à ce fichier ! ", true);
        }
      })
      .catch((err) => this.useModal("d", "Erreure: " + err, true));
  }

  mediaRender() {
    var Table = [];
    var ele = null;
    const files = this.state.media;
    for (let i = 0; i < files.length; i++) {
      ele = null;
      switch (files[i].type) {
        case "image":
          ele = this.file_Thumbnail(
            "image",
            files[i].OrgName,
            files[i].size,
            files[i].id
          );
          break;
        case "pdf":
          ele = this.file_Thumbnail(
            "pdf",
            files[i].OrgName,
            files[i].size,
            files[i].id
          );
          break;
        case "presentation":
          ele = this.file_Thumbnail(
            "presentation",
            files[i].OrgName,
            files[i].size,
            files[i].id
          );
          break;
        case "word":
          ele = this.file_Thumbnail(
            "doc",
            files[i].OrgName,
            files[i].size,
            files[i].id
          );
          break;
        case "Excel":
          ele = this.file_Thumbnail(
            "xls",
            files[i].OrgName,
            files[i].size,
            files[i].id
          );
          break;
        case "zip":
          ele = this.file_Thumbnail(
            "zip",
            files[i].OrgName,
            files[i].size,
            files[i].id
          );
          break;
        case "audio":
          ele = this.file_Thumbnail(
            "audio",
            files[i].OrgName,
            files[i].size,
            files[i].id
          );
          break;
        case "video":
          ele = this.file_Thumbnail(
            "video",
            files[i].OrgName,
            files[i].size,
            files[i].id
          );
          break;

        default:
          break;
      }
      Table.push(ele);
    }
    return Table;
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
                marginLeft: "2rem",
              }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              title="Télécharger ce fichier"
              onClick={(e) => {
                this.Download(indice);
              }}
            >
              {" "}
              <i className="far fa-arrow-alt-circle-down text-success fa-5x mt-2 " />{" "}
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
              title="Télécharger ce fichier"
              onClick={(e) => {
                this.Download(indice);
              }}
            >
              {" "}
              <i className="far fa-arrow-alt-circle-down text-success fa-5x mt-2 " />{" "}
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
              title="Télécharger ce fichier"
              onClick={(e) => {
                this.Download(indice);
              }}
            >
              {" "}
              <i className="far fa-arrow-alt-circle-down text-success fa-5x mt-2 " />{" "}
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
              title="Télécharger ce fichier"
              onClick={(e) => {
                this.Download(indice);
              }}
            >
              {" "}
              <i className="far fa-arrow-alt-circle-down text-success fa-5x mt-2 " />{" "}
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
              title="Télécharger ce fichier"
              onClick={(e) => {
                this.Download(indice);
              }}
            >
              {" "}
              <i className="far fa-arrow-alt-circle-down text-success fa-5x mt-2 " />{" "}
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
              title="Télécharger ce fichier"
              onClick={(e) => {
                this.Download(indice);
              }}
            >
              {" "}
              <i className="far fa-arrow-alt-circle-down text-success fa-5x mt-2 " />{" "}
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
              title="Télécharger ce fichier"
              onClick={(e) => {
                this.Download(indice);
              }}
            >
              {" "}
              <i className="far fa-arrow-alt-circle-down text-success fa-5x mt-2 " />{" "}
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
                marginLeft: "2rem",
              }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
              title="Télécharger ce fichier"
              onClick={(e) => {
                this.Download(indice);
              }}
            >
              {" "}
              <i className="far fa-arrow-alt-circle-down text-success fa-5x mt-2 " />{" "}
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

  comment(text, date, id) {
    let myid = JSON.parse(localStorage.getItem("user")).id;
    return (
      <div className="comment-sec">
        <ul>
          <li className=" border border-top-0 border-left-0 border-right-0 mb-2 ">
            <div className="comment-list ">
              <div className="bg-img">
                <Link to={"/Profile/" + myid}>
                  <img
                    src={JSON.parse(localStorage.getItem("details")).AvatarPath}
                    style={{ height: "50px", width: "50px" }}
                    alt={"Commentor" + myid}
                  />
                </Link>
              </div>
              <div className="comment">
                <Link to={"/Profile/" + myid}>
                  <h3 className="mt-n1">
                    {" "}
                    {JSON.parse(localStorage.getItem("details")).Lname +
                      " " +
                      JSON.parse(localStorage.getItem("details")).Fname}
                  </h3>
                </Link>
                <span className="mt-n2">
                  <i className="far fa-clock text-secondary"></i>{" "}
                  {moment(date, "YYYY-DD-MM HH:mm:ss").fromNow()}
                </span>
                <p className="mt-n2" style={{ whiteSpace: "pre-line" }}>
                  {text}
                </p>
              </div>
            </div>
            {/*comment-list end*/}
          </li>
        </ul>
      </div>
    );
  }

  AfficherMesCommentaires() {
    var tab = [];
    var tr = null;
    this.state.myComments.forEach((element) => {
      tr = this.comment(element.Text, element.date, element.id);
      tab.push(tr);
    });
    return tab;
  }

  ApprouveIT() {
    //// try to use socket io here to send and get those quickly
    Axios({
      method: "get",
      url: ApiHost + "/api/Classes/PostApprouve",
      header: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        postID: this.state.post.PostID + "",
        classID: this.state.classID,
        approuve: true,
      },
    })
      .then((res) => {
        TokenValidator(res.data);
        if (res.data.status === "NotPermitted") {
          this.useModal("w", " Vous n'avez pas la permission !", true);
        } else if (res.data.status === "ParamMissing") {
          this.useModal("w", " Données incorrectes réssayez plusTard !", true);
        } else if (res.data.status === "success") {
          this.removeIt(this.state.index);
          this.useModal("s", " publication bien approuvée !", true);
        }
      })
      .catch((err) => {
        this.useModal("d", "Erreur : " + err, true);
      });
  }

  DisapprouveIT() {
    Axios({
      method: "get",
      url: ApiHost + "/api/Classes/PostApprouve",
      header: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        postID: this.state.post.PostID + "",
        classID: this.state.classID,
        approuve: 0,
      },
    })
      .then((res) => {
        TokenValidator(res.data);
        if (res.data.status === "NotPermitted") {
          this.useModal("w", " Vous n'avez pas la permission !", true);
        } else if (res.data.status === "ParamMissing") {
          this.useModal("w", " Données incorrectes réssayez plusTard !", true);
        } else if (res.data.status === "success") {
          this.removeIt(this.state.index);
          this.useModal("s", " publication bien supprimée !", true);
        }
      })
      .catch((err) => {
        this.useModal("d", "Erreur : " + err, true);
      });
  }

  postHeader(PosterType) {
    if (PosterType === "prof")
      return (
        <div className="usy-dt">
          <Link to={"/Profile/" + this.state.poster.id}>
            <img
              src={this.state.poster.pic}
              alt="postOwner Avatar"
              style={{ maxHeight: "50px", maxWidth: "50px" }}
            />
          </Link>
          <div className="usy-name ">
            <Link to={"/Profile/" + this.state.poster.id}>
              {" "}
              <h3>
                <span
                  className="text-success display-3"
                  style={{ fontSize: "20px" }}
                >
                  {" "}
                  ●{" "}
                </span>{" "}
                {this.state.poster.name}
                <span
                  className="text-success display-4"
                  style={{ fontSize: "20px" }}
                >
                  {" "}
                  ●{" "}
                </span>{" "}
              </h3>{" "}
            </Link>
            <span>
              <i className="far fa-clock text-secondary"></i>{" "}
              {moment(this.state.post.date, "YYYY-MM-DD HH:mm:ss").fromNow()}
            </span>
          </div>
        </div>
      );

    return (
      <div className="usy-dt">
        <Link to={"/Profile/" + this.state.poster.id}>
          <img
            src={this.state.poster.pic}
            alt="postOwner Avatar"
            style={{ maxHeight: "50px", maxWidth: "50px" }}
          />
        </Link>
        <div className="usy-name">
          <Link to={"/Profile/" + this.state.poster.id}>
            {" "}
            <h3>{this.state.poster.name}</h3>{" "}
          </Link>
          <span>
            <i className="far fa-clock text-secondary"></i>{" "}
            {moment(this.state.post.date, "YYYY-MM-DD HH:mm:ss").fromNow()}
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="post-bar">
        <div className="posty">
          <div className="post-bar no-margin">
            <div className="post_topbar">
              {this.postHeader(this.state.poster.type)}
            </div>
            <div className="job_descp">
              <p style={{ whiteSpace: "pre-line" }}>{this.state.post.text}</p>
              {this.mediaRender()}
            </div>

            <div className="job-status-bar ">
              <ul className=" w-100 d-flex align-items-center  ">
                <li className="text-success d-inline">
                  <button
                    className=" mr-2 btn btn-success"
                    onClick={this.ApprouveIT.bind(this)}
                  >
                    <i className="fas fa-check fa-lg mr-1"></i> Approuver
                  </button>
                </li>

                <li className="text-danger d-inline">
                  <button
                    className=" mr-2 btn btn-danger"
                    onClick={this.DisapprouveIT.bind(this)}
                  >
                    <i className="fas fa-times fa-lg mr-1"></i> Supprimer
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/*post-bar end*/}

          {/*comment-section end*/}
        </div>
        {/*posty end*/}
      </div>
    );
  }
}

export default Post;
