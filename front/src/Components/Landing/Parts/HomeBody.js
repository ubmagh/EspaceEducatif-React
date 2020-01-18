import React from 'react';
import { Container, Row } from 'react-bootstrap';
import pic1 from './colab.png';
import pic2 from './est.png';
import './banner.css';
import Features from './Features';

function Body() {

    return (
        <>
            <Container fluid="true" className="w-100 pb-3" >
                <Row className="  pb-xs-4 mb-xs-5" style={{ maxHeight: '3000px', minHeight: '100%' }}>
                    <div className="col-md-6 col-xs-0">
                        <img
                            alt="Colaboration en education"
                            src={pic1}
                            className="mt-3 align-top mx-sm-auto w-100"
                        />
                    </div>

                    <div className=" col-xs-5 col-md-6" style={{ height: '600px' }}>
                        <div className="row w-100 mx-auto mt-md-3">
                            <img
                                alt="Colaboration en education"
                                src={pic2}
                                className=" align-top mx-auto mt-2 w-75 "
                            />
                        </div>
                        <div className="row w-100 mx-auto mt-md-4" >
                            <br />
                            <h1 className="text-center mx-auto mt-md-0 mt-lg-2" style={{ fontFamily: ' Source Sans Pro ', fontSize: '57px', fontWeight: 'bolder', color: 'rgb(16,16,141)' }}> Espace Educatif </h1>
                            <h5 className="text-center text-justify mx-auto mt-md-5 mt-sm-2" style={{ fontFamily: ' Source Sans Pro ', fontSize: '30px', fontWeight: 'lighter', color: 'rgb(20,25,110)' }}> Un Réseau éducatif privé aux étudiants de l'école supérieure de Technologie Agadir et offrant des outils puissantes pour les professeurs. </h5>
                            <p className="text-center mx-auto text-justify mt-md-3 mb-xs-3" style={{ fontFamily: ' Source Sans Pro ', fontSize: '20px', fontWeight: 'normal', color: 'rgb(20,35,100)' }}>
                                Un internaute ? Connectez-vous !
                            </p>
                        </div>
                    </div>
                </Row>

                <Features />
            </Container>
        </>
    )

}

export default Body;