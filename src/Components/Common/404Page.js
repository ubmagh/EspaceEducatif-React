import React from 'react';
import pic1 from './404.png';
import {Link} from 'react-router-dom';


function Page404() {
    return (
        <div className=" w-100  h-100 container mt-5">
            <div className="row w-100 mt-4">
                <img 
                src = {pic1}
                alt="404 Error"
                className="col-9 mx-auto"
                />
            </div>
            <div className=" d-block  w-100">
                <hr className="d-block col-6 mx-auto mb-5" />
                <Link to="/" className="btn btn-primary d-block col-3 mx-auto mt-4"> <i className="fa fa-arrow-left fa-lg ml-n1 mr-1"></i> Aller à l'Acceuil </Link>
            </div>
        </div>
    )
}

export default Page404;