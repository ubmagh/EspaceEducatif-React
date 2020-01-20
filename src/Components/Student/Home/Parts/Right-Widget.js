import React from 'react';


function RightWidget() {

  return (


    <div className="col-lg-3 pd-right-none no-pd">
      <div className="right-sidebar">
      </div>{/*widget-about end*/}
      <div className="widget widget-jobs">
        <div className="sd-title">
          <h3>Devoirs à Faire</h3> <a href="#qsd"><img className="icon" src="images/icons8-ajouter-50.png" alt="sdfsd" /></a>
        </div>
        <div className="jobs-list">
          <div className="job-info">
          </div>
        </div>
      </div>


      <div className="widget suggestions full-width">
        <div className="sd-title">
          <h3>Mes Groupes</h3><a href="#sdfsd"><img className="icon1" src="images/icons8-ajouter-50.png" alt="sdf" /></a>
        </div>{/*sd-title end*/}
        <div className="suggestions-list">
          <div className="view-more">
            <a href="#qsdqs" >Voir Plus</a>
          </div>
        </div>{/*suggestions-list end*/}
      </div>
      {/*right-sidebar end*/}
    </div>


  );


}

export default RightWidget;