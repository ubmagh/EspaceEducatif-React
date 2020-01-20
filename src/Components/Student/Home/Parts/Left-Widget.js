import React from 'react';


class LeftWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = { details: JSON.parse(localStorage.getItem('details')) };
    }

    render() {
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
                                <h3>{this.state.details.Lname + ' ' + this.state.details.Fname}</h3>
                                <span>{
                                    this.state.details.Filiere + ' - '} {this.state.details.Annee + '' === '1' ? '1er Année' : '2éme Année'
                                    }</span>
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

}

export default LeftWidget;