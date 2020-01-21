import React from 'react';
import logo from '../../Common/logo.png';
import { Link } from 'react-router-dom';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';


class Banner extends React.Component {

    LogoutFunction(){
        localStorage.clear();
        window.location.reload();
    }

    render() {
    return (
        <header className="navbar fixed-top sticky-top navbar-expand-md w-100">
            <div className="container ">
                <div className="d-inline-block logo my-0">
                    <Link to="/" ><img className="ot1" src={logo} alt="LOGO" /></Link>
                </div>

                <div className="search-bar mr-auto my-2 my-sm-0 mb-1">
                    <form>
                        <div className="input-group">
                            <input type="text" className="form-control" name="search" placeholder="Chercher..." />
                            <div className="input-group-append bg-transparent p-0">
                                <span className="input-group-text p-0 m-0"><button type="submit" className="btn bg-transparent"><i className="fa fa-search text-primary" /></button></span>
                            </div>
                        </div>

                    </form>
                </div>

                <nav className=" col-12  col-md-8 col-lg-6 col-xl-6 mr-0 p-0 my-0 ">
                    <ul className="row p-0 mb-0 mt-2">
                        <li className="col py-0 my-1 text-center">
                            <Link to="/">
                                <span className="d-block mx-auto"> <i className="fas fa-home fa-lg text-light mt-n1 mb-1"></i> </span>
                                Accueill
                                </Link>
                        </li>
                        <li className="col py-0 my-1 text-center">
                            <a href="#aaa" >
                                <span className="d-block mx-auto"> <i className="fas fa-user-friends fa-lg text-light mt-n1 mb-1"></i> </span>
                                Profile
            </a>
                        </li>
                        <li className=" col py-0 my-1 text-center ">
                            <a href="#aaa" >
                                <span className="d-block mx-auto"> <i className="far fa-calendar-alt fa-lg text-light mt-n1 mb-1"></i> </span>
                                Planning
            </a>
                        </li>
                        <li className="col py-0 my-1 text-center">
                            <a href="#aa" className="not-box-open">
                                <span className="d-block mx-auto"> <i className="fas fa-envelope fa-lg text-light mt-n1 mb-1"></i> </span>
                                Messages
            </a>
                        </li>
                        <li className="col py-0 my-1 text-center">
                            <a href="#aa" className="not-box-open">
                                <span className="d-block mx-auto"> <i className="fas fa-bell fa-lg text-light mt-n1 mb-1"></i> </span>
                                Notifications
            </a>
                        </li>
                        <li className="col-xs-12 col-lg-1 col py-0 my-1 text-center p-0">

                            <OverlayTrigger
                                trigger="click"
                                key="bottom"
                                placement="bottom"
                                overlay={
                                    <Popover id={`popover-positioned-bottom`} className="mt-md-4 mt-sm-3 mt-2 " >
                                        <Popover.Content>
                                        
                                        <button type="button" className="w-100 d-block btn btn-outline-white border border-0  text-left buttonOutline" > <i class="fas fa-cog text-secondary text-left"></i> Paramètres </button>
                                        <hr className="mb-0 mt-1 py-0" />
                                        <button type="button" onClick={this.LogoutFunction} className="w-100 d-block btn btn-outline-white border border-0 text-danger text-left buttonOutline"  > <i class="fas fa-sign-out-alt text-danger text-left"></i> Déconnexion </button>
                                        
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                
                                <Button className="bg-transparent p-0 buttonOutline"  style={{ outline: '0px !important',border:'#003D7E', boxShadow: 'none !important' }} ><span className="d-block mx-auto"> <i className="fas fa-ellipsis-h fa-lg text-light"></i> </span></Button>
                            </OverlayTrigger>
                        </li>
                    </ul>
                </nav>




            </div>
        </header>
    )
}
}

export default Banner;