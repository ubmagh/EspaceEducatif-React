import React from 'react';


class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Avatar: props.Avatar, useriD: props.useriD }
    }

    /* 
    ce composant présente un poste ===  une publication 
    va recevoire l'id de poste 
    à la construction va demander à la BD un ou deux commentaires à afficher en bas du poste
    + le contenue txt et medias de ce poste 
        
    */

    render() {

        return (

            <div className="post-bar">
                <div className="posty">
                    <div className="post-bar no-margin">
                        <div className="post_topbar">
                            <div className="usy-dt">
                                <img src="http://via.placeholder.com/50x50" alt="postOwner Avatar" />
                                <div className="usy-name">
                                    <h3>John Doe</h3>
                                    <span><i className="far fa-clock text-secondary"></i> 3 min ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="job_descp">
                            <p>Post Content ...</p>
                        </div>
                        <div className="job-status-bar ">
                            <ul className="like-com ">
                                <li>
                                    <a href="#qsd" className="com mr-4"> 25<i className="far fa-thumbs-up fa-lg ml-2 "></i> Like</a>
                                </li>
                                <li><a href="#qs" className="com"> 10<i className="far fa-comment-dots fa-lg ml-2"> </i> Commentaires</a></li>
                                <li><a href="#qs" className="com"><i className="far fa-calendar-check fa-lg ml-2"></i> Ajouter </a></li>

                            </ul>

                        </div>
                    </div>{/*post-bar end*/}

                    <div className="comment-section">
                        <div className="plus-ic">
                            <i className="fa fa-plus" />
                        </div>
                        <div className="comment-sec">
                            <ul>
                                <li className=" border border-top-0 border-left-0 border-right-0 mb-2 ">
                                    <div className="comment-list ">
                                        <div className="bg-img">
                                            <img src="http://via.placeholder.com/40x40" alt="" />
                                        </div>
                                        <div className="comment">
                                            <h3>John Doe</h3>
                                            <span><i className="far fa-clock text-secondary"></i> 3 min ago</span>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at.</p>

                                        </div>
                                    </div>{/*comment-list end*/}
                                </li>
                            </ul>
                        </div>{/*comment-sec end*/}

                        <div className="post-comment">
                            <div className="cm_img">
                                <img src={this.state.Avatar} alt="UserAvatar" style={{ maxHeight: '40px', maxWidth: '40px' }} />
                            </div>
                            <div className="d-inline w-75 comment_box">
                                <form className="">
                                    <input type="text" placeholder="Ajouter un commentaire" className="form-control d-inline" />
                                    <button type="submit" className="d-inline" >Envoyer</button>
                                </form>
                            </div>
                        </div>{/*post-comment end*/}

                    </div>{/*comment-section end*/}
                </div>{/*posty end*/}
            </div>

        )


    }


}

export default Post;