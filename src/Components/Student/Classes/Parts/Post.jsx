import React from "react";
import moment from "moment";
import FormatFileSize from "../../../Common/FileSizeFormat";
import { Form, Formik, Field } from "formik";
import TokenValidator from "../../../Common/tokenValidate";

//// pictures
import pictureIcon from "../../../Common/images/picture.png";
import pdfIcon from "../../../Common/images/pdf.png";
import pptxIcon from "../../../Common/images/pptx.png";
import docIcon from "../../../Common/images/doc.png";
import xlsIcon from "../../../Common/images/xls.png";
import zipIcon from "../../../Common/images/zip.png";
import audioIcon from "../../../Common/images/audio.png";
import videoIcon from "../../../Common/images/video.png";
import Axios from "axios";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: props.Poster,
      post: props.Post,
      media: props.Media,
      comment: props.Comment,
      myComments: [],
      Liked: props.Like
    };
    this.useModal = props.useModal;
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
        yy: "%d années"
      }
    });
  }

  mediaRender() {
    var Table = [];
    var ele = null;
    const files = this.state.media;
    for (let i = 0; i < files.length; i++) {
      ele = null;
      switch (files[i].type) {
        case "image":
          ele = this.file_Thumbnail("image", files[i].OrgName, files[i].size);
          break;
        case "pdf":
          ele = this.file_Thumbnail("pdf", files[i].OrgName, files[i].size);
          break;
        case "presentation":
          ele = this.file_Thumbnail(
            "presentation",
            files[i].OrgName,
            files[i].size
          );
          break;
        case "word":
          ele = this.file_Thumbnail("doc", files[i].OrgName, files[i].size);
          break;
        case "Excel":
          ele = this.file_Thumbnail("xls", files[i].OrgName, files[i].size);
          break;
        case "zip":
          ele = this.file_Thumbnail("zip", files[i].OrgName, files[i].size);
          break;
        case "audio":
          ele = this.file_Thumbnail("audio", files[i].OrgName, files[i].size);
          break;
        case "video":
          ele = this.file_Thumbnail("video", files[i].OrgName, files[i].size);
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
                marginLeft: "2rem"
              }}
            />
            <span
              className="float-right mr-1 mt-1"
              style={{ cursor: "pointer" }}
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

  comment(text, date, id) {
    return (
      <div className="comment-sec">
        <ul>
          <li className=" border border-top-0 border-left-0 border-right-0 mb-2 ">
            <div className="comment-list ">
              <div className="bg-img">
                <img
                  src={JSON.parse(localStorage.getItem("details")).AvatarPath}
                  style={{ height: "50px", width: "50px" }}
                  alt={
                    "Commentor" + JSON.parse(localStorage.getItem("user")).id
                  }
                />
              </div>
              <div className="comment">
                <h3 className="mt-n1">
                  {" "}
                  {JSON.parse(localStorage.getItem("details")).Lname +
                    " " +
                    JSON.parse(localStorage.getItem("details")).Fname}
                </h3>
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
    this.state.myComments.forEach(element => {
      tr = this.comment(element.Text, element.date, element.id);
      tab.push(tr);
    });
    return tab;
  }

  LikeIt() {
    Axios({
      method: "get",
      url: "http://localhost:8000/api/Classes/Like",
      header: { "Content-Type": "application/json" },
      params: {
        token: "" + localStorage.getItem("LogToken"),
        postID: this.state.post.PostID + ""
      }
    })
      .then(res => {
        TokenValidator(res.data);
        if (res.data.status === "NotPermitted") {
          this.useModal("w", "Action de Like refusée !", true);
        } else if (res.data.status === "successed") {
          this.setState({ Liked: !this.state.Liked });
          /////
        } else if (res.data.status === "NotSuccessed") {
          this.useModal("w", "une erreure servenue au dernier action ", true);
          /////
        }
      })
      .catch(err => {
        this.useModal("d", "Erreur : " + err, true);
      });
  }

  render() {
    return (
      <div className="post-bar">
        <div className="posty">
          <div className="post-bar no-margin">
            <div className="post_topbar">
              <div className="usy-dt">
                <img
                  src={this.state.poster.pic}
                  alt="postOwner Avatar"
                  style={{ maxHeight: "50px", maxWidth: "50px" }}
                />
                <div className="usy-name">
                  <h3>{this.state.poster.name}</h3>
                  <span>
                    <i className="far fa-clock text-secondary"></i>{" "}
                    {moment(
                      this.state.post.date,
                      "YYYY-MM-DD HH:mm:ss"
                    ).fromNow()}
                  </span>
                </div>
              </div>
            </div>
            <div className="job_descp">
              <p style={{ whiteSpace: "pre-line" }}>{this.state.post.text}</p>
              {this.mediaRender()}
            </div>

            <div className="job-status-bar ">
              <ul className="like-com ">
                <li>
                  <button
                    className="com mr-4"
                    style={{
                      backgroundColor: "inherit",
                      border: "inherit",
                      outline: "inherit"
                    }}
                    onClick={this.LikeIt.bind(this)}
                  >
                    {" "}
                    {this.state.post.likes === 0 ? null : this.state.post.likes}
                    <i className={this.state.Liked === true? "far fa-thumbs-up fa-lg ml-2 text-primary" : "far fa-thumbs-up fa-lg ml-2 "}></i>{" "}
                        Liker
                    
                  </button>
                </li>
                <li>
                  <button
                    style={{
                      backgroundColor: "inherit",
                      border: "inherit",
                      outline: "inherit"
                    }}
                    className="com"
                    onClick={e => {
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
                    <i className="far fa-calendar-check fa-lg ml-2"></i> Ajouter{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/*post-bar end*/}

          <div className="comment-section">
            {this.state.comment ? (
              <>
                <div className="plus-ic">
                  <i className="fa fa-plus" />
                </div>
                <div className="comment-sec">
                  <ul>
                    <li className=" border border-top-0 border-left-0 border-right-0 mb-2 ">
                      <div className="comment-list ">
                        <div className="bg-img">
                          <img
                            src={this.state.comment.pic}
                            style={{ height: "50px", width: "50px" }}
                            alt={"Commentor" + this.state.comment.idc}
                          />
                        </div>
                        <div className="comment">
                          <h3 className="mt-n1"> {this.state.comment.name} </h3>
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
                      {/*comment-list end*/}
                    </li>
                  </ul>
                </div>
              </>
            ) : null}
            {/*comment-sec end*/}

            {this.state.myComments ? this.AfficherMesCommentaires() : null}

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
                    Comment: ""
                  }}
                  onSubmit={(data, { setSubmitting, resetForm }) => {
                    if (data.Comment.length === 0) {
                      this.useModal("w", "écrivez quelque chose d'abord", true);
                      return;
                    }
                    setSubmitting(true);
                    Axios({
                      methode: "get",
                      url: "http://localhost:8000/api/Classes/Comment",
                      header: { "Content-Type": "application/json" },
                      params: {
                        token: "" + localStorage.getItem("LogToken"),
                        postID: this.state.post.PostID + "",
                        Comment: data.Comment + ""
                      }
                    })
                      .then(res => {
                        TokenValidator(res.data);
                        if (res.data.status === "NotPermitted") {
                          this.useModal(
                            "w",
                            "L'ajout du commentaire est refusé !",
                            true
                          );
                        } else if (res.data.status === "successed") {
                          var mycomments = this.state.myComments;
                          mycomments.push(res.data.content);
                          this.setState({ myComments: mycomments });
                          resetForm();
                        }
                      })
                      .catch(err => {
                        this.useModal("d", "Erreure : " + err, true);
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
                    resetForm
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
    );
  }
}

export default Post;
