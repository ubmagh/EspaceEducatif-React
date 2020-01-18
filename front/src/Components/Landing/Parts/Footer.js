import React from 'react';
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <footer className="footer mt-4 p-4 " style={{ minHeight: '100px', backgroundColor: '#003D7E' }}>

                <div className="container py-4">
                    <div className="row text-light">

                        <div className="col  mx-auto">
                            <h4 className="text-center mb-3 mt-n2">L'espace educatif</h4>
                            <p className="text-justify text-left mt-2" >Un réseau éducatif privé aux étudiants et aux professeurs de l'école supérieure de Technologie Agadir, Afin de faciliter l'accès à l'information.</p>
                        </div>

                        <div className="col mx-auto">
                            <h4 className="text-center mb-3 mt-n2">Liens Utils :</h4>
                            <a href="http://www.esta.ac.ma/" target="_blank" rel="noopener noreferrer" className="d-block text-center text-light" style={{ textDecoration: 'none' }}> Ecole Supérieure de Technologie - Agadir <i className="fas fa-external-link-alt text-light"></i> </a>
                            <Link to="/Rules" className="d-block text-light my-2" style={{ textDecoration: 'none' }}><h6 className="d-block text-center"> Conditions d'utilisation </h6></Link>
                            <Link to="/Aide" className="d-block text-light " style={{ textDecoration: 'none' }}><h6 className="d-block text-center"> Aide </h6></Link>
                        </div>


                    </div>
                </div>

            </footer>
        </>
    );
}

export default Footer;