import React from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Adresse email Invalide !')
        .max(120, 'c\'est trop pour un email')
        .required('l\'email est Obligatoire !'),
    name: Yup.string()
        .min(3, 'Nom très court !')
        .max(20, '20caracts suffit pour un nom !')
        .matches(/^[a-z A-Z éèà]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Nom Invalide !')
        .required('Entrez Votre Nom svp!'),
    message: Yup.string()
        .required('Ecrivez quelque chose d\'abord !')
        .max(500, 'max = 500 caractéres '),
});



class Aide extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: 'waiting' }
    }

    render() {
        return (
            <>
                <div className="jumbotron jumbotron-fluid mt-n3 w-100 d-inline-block" style={{ height: '100%' }} id="aideContai">
                    <div className="container">
                        <h1 className="display-4">Besoin de l'aide ?</h1>
                        <p className="lead">Veuillez nous contacter en remplissant ce formulaire, nous allons vous répondre plutot possible. </p>
                    </div>
                    <div className="container">

                        <Formik
                            initialValues={{ email: '', name: '', message: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                setSubmitting(true);

                                const mydata = data;
                                //// Envoie des données vers la BD utilisant axios ( =: ajax ) sans actualiser
                                axios({
                                    method: 'post',
                                    url: 'http://127.0.0.1:8000/api/NewContact',
                                    data: {
                                        "email": `${mydata.email}`,
                                        "name": `${mydata.name}`,
                                        "message": `${mydata.message}`,
                                    },
                                    timeout: 2000,
                                })
                                    .then((res) => {
                                        if (res.data + '' === "true") {
                                            this.setState({ error: 'succeded' });
                                        }
                                        else {
                                            this.setState({ error: 'failed' });
                                        }
                                    })

                                    .catch(err => {
                                        this.setState({ error: 'failed' });
                                        console.log("contact-Err :" + err);
                                    });

                                /// FIn du requete GET

                                setSubmitting(false);
                            }}

                        >

                            {({ values, handleSubmit, handleChange, isSubmitting, errors, touched }) => {

                                if (this.state.error === 'succeded') {
                                    return (
                                        <div className="alert alert-success h-75 w-100  mt-3" role="alert">
                                            <h5 className="my-3 text-center"> succès ! </h5>
                                            <hr />
                                            <h6 className="my-4 text-center"> <strong>Votre message est bien envoyé,</strong> veuillez observer votre boite mail !  </h6>
                                        </div>)
                                }
                                else
                                    if (this.state.error === 'failed') {
                                        return (
                                            <div className="alert alert-warning h-75 w-100  mt-3" role="alert">
                                                <h5 className="my-3 text-center"> Une erreur s'est produit </h5>
                                                <hr />
                                                <h6 className="my-4 text-center"> <strong>Votre message n'est pas envoyé,</strong> veuillez réssayer plustard !  </h6>
                                            </div>)

                                    } else {
                                        return (

                                            <Form className="col-md-9 mx-auto mt-5" methode="GET" >
                                                <div className="form-group">
                                                    <Field name="email" type="email" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Adresse Email* " />
                                                    <small id="emailHelp" className="form-text text-muted">Nous allons jamais le partager avec quelq'un d'autre.</small>
                                                    {
                                                        errors.email && touched.email ? (
                                                            <>
                                                                <div className="alert alert-danger" role="alert">
                                                                    <strong>Attention </strong> {errors.email}
                                                                </div>
                                                            </>
                                                        ) : null}
                                                </div>
                                                <div className="form-group">
                                                    <Field name='name' className="form-control text-muted" type="text" placeholder="Nom complet" />
                                                    {
                                                        errors.name && touched.name ? (
                                                            <>
                                                                <div className="alert alert-danger" role="alert">
                                                                    {errors.name}
                                                                </div>
                                                            </>
                                                        ) : null}
                                                </div>
                                                <div className="form-group">
                                                    <Field name="message" as="textarea" className="form-control px-3 py-2" placeholder="Exprimer votre problème ici..." id="exampleFormControlTextarea1" rows="8" style={{ resize: 'none' }} />
                                                    {
                                                        errors.message && touched.message ? (
                                                            <>
                                                                <div className="alert alert-danger" role="alert">
                                                                    {errors.message}
                                                                </div>
                                                            </>
                                                        ) : null}
                                                </div>
                                                <button type="submit" disabled={isSubmitting || (errors.email || errors.name || errors.message)} className="btn btn-primary btn-outline-whit col-6 mx-auto btn-block ">  <i className="far fa-paper-plane "> </i> Envoyer </button>
                                            </Form>)
                                    }

                            }}
                        </Formik>

                    </div>
                </div>
            </>
        )
    }

}
export default Aide;