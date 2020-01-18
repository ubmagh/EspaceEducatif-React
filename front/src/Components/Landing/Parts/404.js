import React from 'react';
import pic from './logo.png';

const Page404 = () => {

    return (
        <>
            <div className="container-fluid d-flex align-content-center flex-wrap" style={{ minHeight: '100%', maxHeight: '100%' }}>
                <div className="row my-2">
                    <img
                        src={pic}
                        alt="React"
                        style={{ color: 'blue' }}
                        className="w-100 mx-auto"
                    />
                </div>

            </div>
        </>
    );

}

export default Page404;