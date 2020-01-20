import React from 'react';


function Posts() {

    return (


        <div className="col-lg-6 col-md-8 no-pd">
            <div className="main-ws-sec">
                <form methode="GET" className="post-topbar">
                    <div>
                        <input name="body" as="textarea"  id="exampleTextarea" cols={30} rows={1} className="form-control" placeholder="Write what you wish" defaultValue={""} />
                    </div>
                    <div className="post-st">
                        <ul>
                            <input type='submit' value='Publier'></input>
                        </ul>
                    </div>{/*post-st end*/}
                </form>{/*post-topbar end*/}
                <div className="posts-section">
                    <div className="posty">
                        <div className="post-bar no-margin">
                            <div className="post_topbar">
                                <div className="usy-dt">
                                    <img src="http://via.placeholder.com/50x50" alt="ss" />
                                    <div className="usy-name">
                                        <h3 > qsd</h3>
                                        <span>
                                        </span></div>
                                </div>
                            </div>
                            <div className="job_descp"> </div>
                            <div className="job-status-bar">
                                <ul className="like-com">
                                    <li>
                                        <a href="#aa"><i className="la la-heart" /> Like</a>
                                    </li>
                                </ul>
                                <a href="#sdf"><i className="la la-eye" /></a>
                            </div>
                        </div>{/*post-bar end*/}
                        <div className="comment-section">
                            <div className="plus-ic">
                            </div>
                            <div className="comment-sec">
                                <ul>
                                    <li>
                                        <ul>
                                            <li>
                                                <div className="comment-list">
                                                </div>{/*comment-list end*/}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="comment-list">
                                        </div>{/*comment-list end*/}
                                    </li>
                                </ul>
                            </div>{/*comment-sec end*/}
                            <div className="post-comment">
                                <div className="cm_img">
                                    <img src="http://via.placeholder.com/40x40" alt="" />
                                </div>
                                <div className="comment_box">
                                    <form>
                                        <input type="text" placeholder="Post a comment" />
                                        <button type="submit">Send</button>
                                    </form>
                                </div>
                            </div>{/*post-comment end*/}
                        </div>{/*comment-section end*/}
                    </div>{/*posty end*/}
                    <div className="process-comm">
                        <div className="spinner">
                            <div className="bounce1" />
                            <div className="bounce2" />
                            <div className="bounce3" />
                        </div>
                    </div>{/*process-comm end*/}
                </div>{/*posts-section end*/}
            </div>{/*main-ws-sec end*/}
        </div>


    );
}

export default Posts;