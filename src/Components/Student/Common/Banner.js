import React from 'react';
import logo from '../../Common/logo.png';
import { Link } from 'react-router-dom';

function Banner() {
    return (
        <header className="Navbar w-100 sticky-top d-block" expand="md">
            <div className="container">
                <div className="header-data">
                    <div className="logo">
                        <a href="index.html" ><img className="ot1" src={logo} alt="LOGO" /></a>
                    </div>{/*logo end*/}
                    <div className="search-bar">

                        <form>
                            <input type="text" name="search" placeholder="Search..." />
                            <button type="submit"><i className="fa fa-search text-primary" /></button>
                        </form>

                    </div>{/*search-bar end*/}

                    <nav>
                        <ul>
                            <li>
                                <Link to="/">
                                    <span> <i className="fas fa-home fa-lg text-light mt-n1 mb-1"></i> </span>
                                    Accueill
                                </Link>
                            </li>
                            <li>
                                <a href="#aaa" >
                                    <span> <i className="far fa-calendar-alt fa-lg text-light mt-n1 mb-1"></i> </span>
                                    Mon Planning
            </a>
                            </li>
                            <li>
                                <a href="#aaa" >
                                    <span> <i className="fas fa-user-friends fa-lg text-light mt-n1 mb-1"></i> </span>
                                    Profiles
            </a>
                            </li>
                            <li>
                                <a href="#aa"  className="not-box-open">
                                    <span> <i className="fas fa-envelope fa-lg text-light mt-n1 mb-1"></i> </span>
                                    Messages
            </a>
                            </li>
                        </ul>
                    </nav>{/*nav end*/}

                    <div className="menu-btn">
                        <a href="#aaa" ><i className="fa fa-bars" /></a>
                    </div>{/*menu-btn end*/}

                    <div className="user-account">
                        <div className="user-info">
                            <img src="http://via.placeholder.com/30x30" alt="" />
                            <a href="#aaa" >John</a>
                            <i className="la la-sort-down" />
                        </div>
                        <div className="user-account-settingss">
                            <h3><a href="sign-in.html" >Paramètres Profil</a></h3>
                            <h3><a href="sign-in.html" >Se Déconnecter</a></h3>
                        </div>{/*user-account-settingss end*/}
                    </div>
                </div>{/*header-data end*/}
            </div>
        </header>
    )
}

export default Banner;