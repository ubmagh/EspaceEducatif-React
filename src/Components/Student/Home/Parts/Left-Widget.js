import React from 'react';


function LeftWidget() {

    return (


        <div className="col-lg-3 col-md-4 pd-left-none no-pd">
            <div className="main-left-sidebar no-margin">
                <div className="user-data full-width">
                    <div className="user-profile">
                        <div className="username-dt">
                            <div className="usr-pic">
                                <img src="http://via.placeholder.com/100x100" alt="qsd" />
                            </div>
                        </div>{/*username-dt end*/}
                        <div className="user-specs">
                            <h3>John Doe</h3>
                            <span>Graphic Designer at Self Employed</span>
                        </div>
                    </div>{/*user-profile end*/}
                </div>{/*user-data end*/}
                <div className="suggestions full-width">
                    <div className="sd-title">
                        <h3>Mes Classes</h3><a href="#qsdqsd"><img className="icon1" alt='qsdq' src="images/icons8-ajouter-50.png" /></a>
                    </div>{/*sd-title end*/}
                    <div className="suggestions-list">
                        <div className="suggestion-usd">
                            <div className="sgt-text">
                            </div>
                        </div>
                        <div className="view-more">
                            <a href="#sqdfqs">Voir Plus</a>
                        </div>
                    </div>{/*suggestions-list end*/}
                </div>{/*suggestions end*/}
            </div>{/*main-left-sidebar end*/}
        </div>

    );


}

export default LeftWidget;