import React from "react";
import axios from "axios";
import moment from "moment";
import FormatFileSize from "../FileSizeFormat";
import { Form, Formik, Field } from "formik";
import TokenValidator from "../tokenValidate";
import { ApiHost } from "../Config";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import Loading from "../Loading";

//// pictures
import pictureIcon from "../images/picture.png";
import pdfIcon from "../images/pdf.png";
import pptxIcon from "../images/pptx.png";
import docIcon from "../images/doc.png";
import xlsIcon from "../images/xls.png";
import zipIcon from "../images/zip.png";
import audioIcon from "../images/audio.png";
import videoIcon from "../images/video.png";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postID: this.props.match.params.postID,
      found: false,
      heading: "",
      body: "",
      showMod: false,
      comments: [],
      commentors: [],
      poster: {},
      post: {},
      media: [],
      classe: "",
      liked: false,
      loading: true,
      Likers: [],
    };
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
    //
    axios({
      method: "get",
      url: ApiHost + "/api/Post",
      params: {
        postID: this.state.postID,
        token: localStorage.getItem("LogToken") + "",
      },
      header: { "Content-Type": "application/json" },
    })
      .then((res) => {
        TokenValidator(res.data);
        if (res.data.status === "dataErr")
          this.UseModal(
            "w",
            "Données Fournies au serveur sont Invalides",
            true
          );
        else if (res.data.status === "unauthorized") {
          this.UseModal(
            "w",
            " Vous n'etes pas autorisé pour voir cette publication! ",
            true
          );
          setTimeout(function () {
            window.history.back();
          }, 1800);
        } else if (res.data.status === "notFound") {
          this.setState({ found: false, loading: false });
        } else if (res.data.status === "succes") {
          var Posters = res.data.Poster;
          var commentors = res.data.commentors;
          Posters.pic = ApiHost + Posters.pic;
          for (let i = 0; i < commentors.length; i++) {
            commentors[i].pic = ApiHost + commentors[i].pic;
          }
          this.setState({
            post: res.data.Post,
            poster: Posters,
            classe: res.data.classe,
            media: res.data.medias,
            comments: res.data.comments,
            commentors: commentors,
            liked: res.data.Liked,
            found: true,
            loading: false,
            Likers: res.data.Likers,
          });
        } else {
          this.UseModal(
            "w",
            "Une erreur de chargement de la publication",
            true
          );
        }
      })
      .catch((err) => {
        this.UseModal("d", "erreur :" + err, true);
      });
    //
  }

  HandleShowModal(t) {
    this.setState({ heading: "", body: "", showMod: false });
  }

  UseModal(h, b, show) {
    this.setState({ heading: h, body: b, showMod: show });
  }

  Download(indice) {
    axios({
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
          this.UseModal(
            "d",
            "Ce fichier n'exist plus dans la base de données",
            true
          );
        } else if (res.data.status === "Rejected") {
          this.UseModal("w", "Vous n'avez pas l'accès à ce fichier ! ", true);
        }
      })
      .catch((err) => this.UseModal("d", "Erreure: " + err, true));
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
            style={{ backgroundColor: "#edf3f4" }}
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
            style={{ backgroundColor: "#edf3f4" }}
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
            style={{ backgroundColor: "#edf3f4" }}
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
            style={{ backgroundColor: "#edf3f4" }}
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
            style={{ backgroundColor: "#edf3f4" }}
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
            style={{ backgroundColor: "#edf3f4" }}
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
            style={{ backgroundColor: "#edf3f4" }}
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
      <div className="comment-sec" key={"comm" + id}>
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
                  {moment(date, "YYYY-MM-DD HH:mm:ss").fromNow()}
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
    this.state.comments.forEach((element) => {
      tr = this.comment(element.Text, element.date, element.id);
      tab.push(tr);
    });
    return tab;
  }

  LikeIt() {
    //// try to use socket io here to send and get those quickly
    axios({
      method: "get",
      url: ApiHost + "/api/Classes/Like",
      header: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        postID: this.state.post.PostID + "",
      },
    })
      .then((res) => {
        TokenValidator(res.data);
        if (res.data.status === "NotPermitted") {
          this.UseModal("w", "Action de Like refusée !", true);
        } else if (res.data.status === "successed") {
          this.setState({ liked: !this.state.liked });
          if (this.state.liked)
            document.getElementById("Like").classList.add("text-primary");
          else document.getElementById("Like").classList.remove("text-primary");
          /////
        } else if (res.data.status === "NotSuccessed") {
          this.UseModal("w", "une erreure servenue au dernier action ", true);
          /////
        }
      })
      .catch((err) => {
        this.UseModal("d", "Erreur : " + err, true);
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
          <div className="usy-name">
            <h3>
              <Link to={"/Profile/" + this.state.poster.id}>
                {" "}
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
              </Link>
              <span
                style={{
                  color: "orange",
                  fontSize: "19px",
                  marginLeft: "3px",
                }}
              >
                {" "}
                ►{" "}
              </span>
              <span>
                <Link
                  to={"/Classes/" + this.state.classe.id}
                  className="classLink text-nowrap"
                >
                  {this.state.classe.ids + ": " + this.state.classe.name}
                </Link>
              </span>
            </h3>{" "}
            <Link to={"/Posts/" + this.state.post.postID}>
              <span>
                <i className="far fa-clock text-secondary"></i>{" "}
                {moment(this.state.post.date, "YYYY-MM-DD HH:mm:ss").fromNow()}
              </span>
            </Link>
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
          <Link to={"/Posts/" + this.state.post.postID}>
            <span>
              <i className="far fa-clock text-secondary"></i>{" "}
              {moment(this.state.post.date, "YYYY-MM-DD HH:mm:ss").fromNow()}
            </span>
          </Link>
        </div>
      </div>
    );
  }

  closeOneModal(modalId) {
    // get modal
    const modal = document.getElementById(modalId);

    // change state like in hidden modal
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("style", "display: none");

    // get modal backdrop
    const modalBackdrops = document.getElementsByClassName("modal-backdrop");

    // remove opened modal backdrop
    document.body.removeChild(modalBackdrops[0]);
  }

  LikersModal() {
    var tmp = [];
    const likers = this.state.Likers;

    likers.forEach((el) => {
      tmp.push(
        <div className="comment-sec" key={"like" + el.id}>
          <ul>
            <li
              className=" border border-top-0 border-left-0 border-right-0 mb-2 "
              onClick={(e) => this.closeOneModal("exampleModal")}
            >
              <div className="comment-list ">
                <div className="bg-img">
                  <Link to={"/Profile/" + el.id}>
                    <img
                      src={ApiHost + el.pic}
                      style={{ height: "50px", width: "50px" }}
                      alt={"Commentor" + el.id}
                    />
                  </Link>
                </div>
                <div className="comment">
                  <Link to={"/Profile/" + el.id}>
                    <h3 className="mt-n1"> {el.name}</h3>
                  </Link>
                </div>
              </div>
              {/*comment-list end*/}
            </li>
          </ul>
        </div>
      );
    });

    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Personnes Qui ont aimés cette publication
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{tmp}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                <i className="fa fa-times mr-1 ml-n1"></i>
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.loading) return <Loading />;
    if (!this.state.found)
      return (
        <div className="container mt-2" style={{ minHeight: "100%" }}>
          <div className="d-inline-block row w-100 mt-5">
            <div className="alert d-block mt-5 alert-warning " role="alert">
              <h2 className="h2 text-center">Publication Introuvable !</h2>
              <br />
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-info d-block col-md-4 mx-auto mt-3 mb-3"
              >
                {" "}
                <i className="fa fa-arrow-left"></i> Page Précédente{" "}
              </button>
            </div>
          </div>
        </div>
      );

    return (
      <div
        className=" bg-white float-none  row d-inline-block  border-0 my-5 w-100"
        style={{ minHeight: "100%", height: "unset !important" }}
      >
        <Modal
          ShowOrNot={this.state.showMod}
          setShowOrNot={this.HandleShowModal.bind(this)}
          Heading={this.state.heading}
          body={this.state.body}
        />

        {this.LikersModal()}

        <div className="   py-3 my-4 col-md-6 mx-auto ">
          <div className="posty border border-secondary">
            <div className="post-bar no-margin">
              <div className="post_topbar">
                {this.postHeader(this.state.poster.type)}
              </div>
              <div className="job_descp">
                <p
                  style={{ whiteSpace: "pre-line", overflowWrap: "break-word" }}
                >
                  {this.state.post.text}
                </p>
                {this.mediaRender()}
              </div>

              <div className="job-status-bar ">
                <ul className="like-com ">
                  <li>
                    {this.state.post.likes === 0 ? null : (
                      <button
                        className="px-2 "
                        style={{
                          backgroundColor: "inherit",
                          border: "inherit",
                          outline: "inherit",
                          fontSize: "17px",
                        }}
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        {" "}
                        {this.state.post.likes}{" "}
                      </button>
                    )}
                    <button
                      className="com mr-4"
                      style={{
                        backgroundColor: "inherit",
                        border: "inherit",
                        outline: "inherit",
                      }}
                      onClick={this.LikeIt.bind(this)}
                    >
                      {" "}
                      <i
                        className={
                          this.state.liked
                            ? "far fa-thumbs-up fa-lg ml-2 text-primary"
                            : "far fa-thumbs-up fa-lg ml-2 "
                        }
                        id="Like"
                      ></i>{" "}
                      Liker
                    </button>
                  </li>
                  <li>
                    <button
                      style={{
                        backgroundColor: "inherit",
                        border: "inherit",
                        outline: "inherit",
                      }}
                      className="com"
                      onClick={(e) => {
                        document
                          .getElementById("GoComment" + this.state.post.PostID)
                          .focus();
                      }}
                    >
                      {" "}
                      {this.state.post.Comments === 0
                        ? null
                        : this.state.post.Comments}
                      <i className="far fa-comment-dots fa-lg ml-2"> </i>{" "}
                      Commenter
                    </button>
                  </li>
                  <li>
                    <a href="#qs" className="com">
                      <i className="far fa-calendar-check fa-lg ml-2"></i>{" "}
                      Ajouter{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/*post-bar end*/}

            <div className="comment-section">
              {/*this.state.comment.com !== undefined ? (
                <>
                  <div className="plus-ic">
                    <i className="fa fa-plus" />
                  </div>
                  <div className="comment-sec">
                    <ul>
                      <li className=" border border-top-0 border-left-0 border-right-0 mb-2 ">
                        <div className="comment-list ">
                          <div className="bg-img">
                            {" "}
                            <Link to={"/Profile/" + this.state.comment.idc}>
                              <img
                                src={this.state.comment.pic}
                                style={{ height: "50px", width: "50px" }}
                                alt={"Commentor" + this.state.comment.idc}
                              />
                            </Link>
                          </div>
                          <div className="comment">
                            <Link to={"/Profile/" + this.state.comment.idc}>
                              <h3 className="mt-n1">
                                {" "}
                                {this.state.comment.name}{" "}
                              </h3>
                            </Link>
                            <span className="mt-n2">
                              <i className="far fa-clock text-secondary"></i>{" "}
                              {moment(
                                this.state.comment.date,
                                "YYYY-MM-DD HH:mm:ss"
                              ).fromNow()}
                            </span>
                            <p
                              className="mt-n2"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {this.state.comment.com}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              ) : null */}

              {this.state.comments ? this.AfficherMesCommentaires() : null}

              <div className="post-comment">
                <div className="cm_img">
                  <img
                    src={JSON.parse(localStorage.getItem("details")).AvatarPath}
                    alt="UserAvatar"
                    style={{ maxHeight: "40px", maxWidth: "40px" }}
                  />
                </div>
                <div className="d-inline w-75 mx-auto comment_box">
                  <Formik
                    initialValues={{
                      postID: this.state.post.PostID,
                      Comment: "",
                    }}
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                      if (data.Comment.length === 0) {
                        this.UseModal(
                          "w",
                          "écrivez quelque chose d'abord",
                          true
                        );
                        return;
                      }
                      setSubmitting(true);
                      axios({
                        methode: "get",
                        url: ApiHost + "/api/Classes/Comment",
                        header: { "Content-Type": "application/json" },
                        params: {
                          token: "" + localStorage.getItem("LogToken"),
                          postID: this.state.post.PostID + "",
                          Comment: data.Comment + "",
                        },
                      })
                        .then((res) => {
                          TokenValidator(res.data);
                          if (res.data.status === "NotPermitted") {
                            this.UseModal(
                              "w",
                              "L'ajout du commentaire est refusé !",
                              true
                            );
                          } else if (res.data.status === "Permission") {
                            this.UseModal(
                              "w",
                              "Vous ne pouvez pas commenter !",
                              true
                            );
                          } else if (res.data.status === "successed") {
                            var comments = this.state.comments;
                            comments.push(res.data.content);
                            this.setState({ comments: comments });
                            resetForm();
                          }
                        })
                        .catch((err) => {
                          this.UseModal("d", "Erreure : " + err, true);
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
                      touched,
                      resetForm,
                    }) => (
                      <Form>
                        <Field
                          type="text"
                          placeholder="Ajouter un commentaire"
                          className="form-control d-inline"
                          name="Comment"
                          id={"GoComment" + this.state.post.PostID}
                        />
                        <button
                          type="submit"
                          className="d-inline"
                          disabled={isSubmitting || values.Comment.length === 0}
                        >
                          Envoyer
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              {/*post-comment end*/}
            </div>
            {/*comment-section end*/}
          </div>
          {/*posty end*/}
        </div>
      </div>
    );
  }
}

export default Post;
