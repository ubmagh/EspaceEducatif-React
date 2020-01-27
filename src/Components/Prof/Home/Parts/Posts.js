import React from 'react';
import Post from './PostModel';

function Posts(props) {

    const Avatar = props.Avatar;
    const useriD = props.useriD;
    /* Ce composant va faire une requete pendant la construction pour obtenir les données des postes a afficher
        obtenir les données en JSON 
        utilisant la methode map on va placer les postes à l'intérieure des deux balises div suivantes<
    */
    return (


        <div className="col-lg-6 col-md-8 no-pd">
            <div className="main-ws-sec">


                <Post Avatar={Avatar} useriD={useriD} />
                <Post Avatar={Avatar} useriD={useriD} />


            {/* Load more posts Button goes here */}


            </div>{/*main-ws-sec end*/}
        </div>


    );
}

export default Posts;