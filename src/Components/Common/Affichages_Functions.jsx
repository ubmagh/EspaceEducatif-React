import React from "react";
import FormatFileSize from "./FileSizeFormat";
import ApiHost from "./Config";

function renderFilesThumbs(files, affID) {
  /// files of an affichage

  //let tmp = <ul style={{ listStyle: "none" }}></ul>;
  let tmp = [];

  for (let i = 0; i < files.length; i++) {
    let pic = "";
    switch (files[i].type) {
      case "image":
        pic = <i className="far fa-image fa-lg mr-1 ml-n1"></i>;
        break;
      case "zip":
        pic = <i className="fas fa-file-archive fa-lg mr-1 ml-n1"></i>;
        break;
      case "pdf":
        pic = <i className="far fa-file-pdf fa-lg mr-1 ml-n1"></i>;
        break;
      case "presentation":
        pic = <i className="far fa-file-powerpoint fa-lg mr-1 ml-n1"></i>;
        break;
      case "word":
        pic = <i className="far fa-file-word fa-lg mr-1 ml-n1"></i>;
        break;
      case "Excel":
        pic = <i className="far fa-file-excel fa-lg mr-1 ml-n1"></i>;
        break;
      case "video":
        pic = <i className="far fa-file-video fa-lg mr-1 ml-n1"></i>;
        break;
      case "audio":
        pic = <i className="far fa-file-audio fa-lg mr-1 ml-n1"></i>;
        break;
      default:
        pic = <i className="fas fa-question fa-lg mr-1 ml-n1"></i>;
    }

    tmp.push(
      <li
        key={"media:" + files[i].id}
        style={{ cursor: "pointer", listStyle: "none" }}
        className="text-dark font-weight-bold mt-2 col-11 mx-auto"
      >
        <span
          onClick={() => {
            window.open(
              ApiHost +
                "/api/Classes/Affichage_Media/?token=" +
                localStorage.getItem("LogToken") +
                "&mediaiD=" +
                files[i].id +
                "&AffiD=" +
                affID,
              "_blank"
            );
          }}
        >
          {pic} {files[i].originalName} ({FormatFileSize(files[i].size, true)})
        </span>
      </li>
    );
  }
  return tmp;
}

export { renderFilesThumbs };
