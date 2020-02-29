import React from "react";

class TabAffichage extends React.Component {
  render() {
    return (
      <div className="main-left-sidebar" style={{ marginTop: "-2px" }}>
        {/*user_profile end*/}
        <div className="suggestions full-width">
          <div
            className="sd-title mb-2"
            style={{ borderTop: "1px solid #e5e5e5" }}
          >
            <h3 className="" style={{ float: "none", fontWeight: "bold" }}>
              {" "}
              <span className="text-left">Tableau d'affichage</span>{" "}
              <span className="text-right">
                <i className="far fa-newspaper text-right float-right fa-lg"></i>
              </span>
            </h3>
          </div>
          {/*sd-title end*/}
          <div className="suggestions-list">
            <div className="view-more mt-2">
              <a href="#a" title="true">
                Voir plus
              </a>
            </div>
          </div>
          {/*suggestions-list end*/}
        </div>
        {/*suggestions end*/}
      </div>
    );
  }
}

export default TabAffichage;
