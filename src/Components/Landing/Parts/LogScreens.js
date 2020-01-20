import React from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import MyModal from '../../Common/Modal';


const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Adresse email Invalide !')
        .required('l\'email est Obligatoire !'),
    password: Yup.string()
        .min(6, 'Mot De Passe invalide >6!')
        .required('Entrez Votre Mot De Passe !'),
    save: Yup.boolean('élément invalide : save')
        .required('info manquante: save'),
});



class StudentLog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { heading: '', body: '', showMod: false };
    }


    HandleShowModal(t) {
        this.setState({ heading: '', body: '', showMod: false });
    }


    render() {


        return (
            <>
                <div className="container mb-md-n5" style={{ minHeight: '100%' }}>
                    <div className="row mt-5 d-inline-block w-100 col-12  ">
                        <i className=" d-block fas fa-user-graduate fa-10x text-center mx-auto mt-5" style={{ color: '#0b7285' }}></i>
                    </div>

                    <MyModal ShowOrNot={this.state.showMod} setShowOrNot={this.HandleShowModal.bind(this)} Heading={this.state.heading} body={this.state.body} />


                    <div className="row d-block col-md-8 mx-auto mt-3 mb-md-n5">
                        <Formik
                            initialValues={{ email: '', password: '', type: 'etud', save: false }}
                            validationSchema={LoginSchema}
                            onSubmit={(data, { setSubmitting, resetForm }) => {
                                setSubmitting(true);
                                const mydata = data;
                                //// Envoie des données vers la BD utilisant axios ( =: ajax ) sans actualiser

                                axios({
                                    method: 'post',
                                    url: 'http://127.0.0.1:8000/api/login',
                                    data: mydata,
                                    headers: { 'Content-Type': 'application/json' },
                                })
                                    .then((res) => {
                                        if (res.data.status + '' === "disactivated") {
                                            this.setState({ heading: 'w', body: ' Votre Compte est suspendue ou en attente d\'activation par l\'administration.', showMod: true });
                                        }
                                        else
                                            if (res.data.status + '' === "CredErr")
                                                this.setState({ heading: 'd', body: ' Email ou Mot de passe incorrecte ', showMod: true });
                                            else
                                                if (res.data.status + '' === "TokErr")
                                                    this.setState({ heading: 'd', body: ' Token_Err: Veuillez réssayer plusTard ou contactez l\'administration ', showMod: true });
                                                else
                                                    if (res.data.status + '' === 'Success') {
                                                        this.setState({ heading: 's', body: ' Connexion succès ', showMod: true });
                                                        localStorage.setItem('LastLogDate', res.data.LogDate);
                                                        localStorage.setItem('LogToken', res.data.token);
                                                        var getUrl = window.location;
                                                        var baseUrl = getUrl.protocol + "//" + getUrl.host + '/';
                                                        //window.open(baseUrl);
                                                        window.location = baseUrl;
                                                        //+ ':' + getUrl.port +

                                                    }
                                    })
                                    .catch(err => {
                                        this.setState({ heading: 'd', body: 'erreur de Connexion au serveur ! ' + err, showMod: true });
                                    });
                                resetForm({});
                                setSubmitting(false);
                            }}

                        >

                            {({ values, handleSubmit, handleChange, isSubmitting, errors, touched }) => (

                                <Form className="col-10 mx-auto text-center mt-5 mb-md-n5">

                                    <div className="form-group d-block mx-auto">
                                        <Field type="email" name="email" className="form-control  text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Adresse Email" />
                                        {errors.email && touched.email ? (
                                            <>
                                                <div className="alert alert-danger" role="alert">
                                                    <strong>Attention </strong> {errors.email}
                                                </div>
                                            </>
                                        ) : null}

                                    </div>

                                    <div className="form-group">
                                        <Field type="password" name="password" className={errors.password && touched.password ? "form-control  text-center border-danger" : "form-control  text-center"} id="exampleInputPassword1" placeholder="Mot de Passe" />
                                        {
                                            errors.password && touched.password ? (
                                                <>
                                                    <div className="alert alert-danger" role="alert">
                                                        <strong>Attention </strong> {errors.password}
                                                    </div>
                                                </>
                                            ) : null}

                                    </div>

                                    <div className="custom-control custom-checkbox mt-md-n2">
                                        <Field type="checkbox" name="save" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Souvenir de Moi</label>
                                    </div>

                                    <button type="submit" disabled={isSubmitting || (errors.email || errors.password || errors.save)} className="btn btn-primary col-md-5 mt-4 mb-md-n5">
                                        <i className="fas fa-sign-in-alt text-light mr-1 ml-n1"> </i>
                                        Connexion
                             </button>

                                </Form>



                            )}

                        </Formik>

                    </div>
                </div>
            </>


        )
    }
};














class TeacherLog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { heading: '', body: '', showMod: false };
    }


    HandleShowModal(t) {
        this.setState({ heading: '', body: '', showMod: false });
    }


    render() {
        return (
            <>
                <div className="container mb-md-n5" style={{ minHeight: '100%' }}>
                    <div className="row d-inline-block w-100 mt-5 ">
                        <i className="d-block fas fa-chalkboard-teacher fa-10x text-center mx-auto mt-5" style={{ color: '#0b7285' }}></i>
                    </div>

                    <MyModal ShowOrNot={this.state.showMod} setShowOrNot={this.HandleShowModal.bind(this)} Heading={this.state.heading} body={this.state.body} />


                    <div className="row d-block col-md-8 mx-auto mt-3 mb-md-n5">
                        <Formik
                            initialValues={{ email: '', password: '', type: 'prof', save: false }}
                            validationSchema={LoginSchema}
                            onSubmit={(data, { setSubmitting, resetForm }) => {
                                setSubmitting(true);
                                const mydata = data;
                                //// Envoie des données vers la BD utilisant axios ( =: ajax ) sans actualiser

                                axios({
                                    method: 'post',
                                    url: 'http://127.0.0.1:8000/api/login',
                                    data: mydata,
                                    headers: { 'Content-Type': 'application/json' },
                                })
                                    .then((res) => {
                                        if (res.data.status + '' === "disactivated") {
                                            this.setState({ heading: 'w', body: ' Votre Compte est suspendue ou en attente d\'activation par l\'administration.', showMod: true });
                                        }
                                        else
                                            if (res.data.status + '' === "CredErr")
                                                this.setState({ heading: 'd', body: ' Email ou Mot de passe incorrecte ', showMod: true });
                                            else
                                                if (res.data.status + '' === "TokErr")
                                                    this.setState({ heading: 'd', body: ' Token_Err: Veuillez réssayer plusTard ou contactez l\'administration ', showMod: true });
                                                else
                                                    if (res.data.status + '' === 'Success') {
                                                        this.setState({ heading: 's', body: ' Connexion succès ', showMod: true });
                                                        localStorage.setItem('LastLogDate', res.data.LogDate);
                                                        localStorage.setItem('LogToken', res.data.token);
                                                        var getUrl = window.location;
                                                        var baseUrl = getUrl.protocol + "//" + getUrl.host + '/';
                                                        window.open(baseUrl);
                                                        //+ ':' + getUrl.port +
                                                    }
                                    })
                                    .catch(err => {
                                        this.setState({ heading: 'd', body: 'erreur de Connexion au serveur ! ' + err, showMod: true });
                                    });
                                resetForm({});
                                setSubmitting(false);
                            }}

                        >

                            {({ values, handleSubmit, handleChange, isSubmitting, errors, touched }) => (

                                <Form className="col-10 mx-auto text-center mt-5 mb-md-n5">

                                    <div className="form-group">
                                        <Field type="email" name="email" className="form-control  text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Adresse Email" />
                                        {errors.email && touched.email ? (
                                            <>
                                                <div className="alert alert-danger" role="alert">
                                                    <strong>Attention </strong> {errors.email}
                                                </div>
                                            </>
                                        ) : null}

                                    </div>

                                    <div className="form-group">
                                        <Field type="password" name="password" className={errors.password && touched.password ? "form-control  text-center border-danger" : "form-control  text-center"} id="exampleInputPassword1" placeholder="Mot de Passe" />
                                        {
                                            errors.password && touched.password ? (
                                                <>
                                                    <div className="alert alert-danger" role="alert">
                                                        <strong>Attention </strong> {errors.password}
                                                    </div>
                                                </>
                                            ) : null}

                                    </div>

                                    <div className="custom-control custom-checkbox mt-md-n2">
                                        <Field type="checkbox" name="save" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Souvenir de Moi</label>
                                    </div>

                                    <button type="submit" disabled={isSubmitting || (errors.email || errors.password || errors.save)} className="btn btn-primary col-md-5 mt-4 mb-md-n5">
                                        <i className="fas fa-sign-in-alt text-light mr-1 ml-n1"> </i>
                                        Connexion
                             </button>

                                </Form>

                            )}
                        </Formik>
                    </div>
                </div>
            </>


        );
    }
}


export default StudentLog;
export { StudentLog, TeacherLog };