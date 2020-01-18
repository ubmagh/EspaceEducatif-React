import React from 'react';
import pic from './Loading.gif';


function Loading() {

    return (

        <div className="container mb-md-n5 align-items-center d-flex" style={{ minHeight: '100%', maxHeight: '100%px' }}>
            <img
                src={pic}
                alt="Loading"
                className="align-self-center col-sm-2 col-xs-2 mx-auto"
            />
        </div>


    );


}

export default Loading;