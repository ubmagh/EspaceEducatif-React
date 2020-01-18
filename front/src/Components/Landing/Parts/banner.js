import React from 'react';
import { Navbar, Nav, Button, ButtonToolbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'
import logo from './BannerLogo.png'
import './banner.css'

function Banner(props) {
    return (
        <>

            <Navbar bg="" style={{ backgroundColor: '#003D7E' }} variant="dark" className="sticky-top" expand="md" >
                <Navbar.Brand >
                    <Link to="." className="NavBarBrand" style={{ textDecoration: 'none' }} >
                        <img
                            alt=""
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top mt-n2 mx-1 "
                        />{' '}
                        <span style={{ color: 'white' }}> Espace Educatif </span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav ">
                    <Nav className="mr-md-auto ml-md-2 text-center mx-auto " >
                        <NavLink exact to="/" className="NavLink text-light my-xs-2 mt-sm-2 mt-md-0" style={{ textDecoration: 'none' }} >
                            Acceuil
                        </NavLink>
                        <NavLink exact to="/Aide" className="NavLink text-light mt-xs-2 mt-sm-2 mt-md-0 ml-sm-3 " style={{ textDecoration: 'none' }} >
                            Aide ?
                        </NavLink>
                    </Nav>

                    <ButtonToolbar>
                        <Link to="/register"><Button type="button" variant="light" className="btn-outline-white mr-md-3 mx-auto mt-xs-2 mt-sm-2 mt-md-0" > <i className="fas fa-plus text-primary"> </i> Créer Compte</Button></Link>
                        <OverlayTrigger
                            trigger="click"
                            key='LoginBtn'
                            placement='bottom'
                            overlay={
                                <Popover id={`popover-positioned-bottom`}>
                                    <Popover.Title as="h3" className="text-center">{`Vous-etes ?`}</Popover.Title>
                                    <Popover.Content>
                                        <div className="row mx-auto">
                                            <Link to="TeacherLog" style={{ textDecoration: 'none' }}>
                                                <Button variant="light" className="btn-outline-primary mr-md-3" > Professeur </Button>
                                            </Link>
                                            <Link to="StudentLog" style={{ textDecoration: 'none' }}>
                                                <Button variant="light" className="btn-outline-primary mr-md-3" > Etudiant </Button>
                                            </Link>
                                        </div>
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <Button variant="light" className="btn-outline-white mr-md-3 mx-auto mt-xs-2 mt-sm-2 mt-md-0" > <i className="fas fa-sign-in-alt text-primary"> </i> Se Connecter</Button>
                        </OverlayTrigger>
                    </ButtonToolbar>
                </Navbar.Collapse>
            </Navbar>


        </>
    )
}

export default Banner;