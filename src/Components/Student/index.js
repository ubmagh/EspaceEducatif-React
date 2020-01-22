import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Banner from './Common/Banner';
import Page404 from '../Common/404Page';
import Home from './Home/Home';

//// importing template css
import './css/style.css';
import './css/responsive.css';
import './css/animate.css';
import './css/jquery.range.css';





class Student extends React.Component {



    componentDidMount() {

    }

    render() {

        return (
            <Router>

                <div className="wrapper mt-0" style={{ Height: '100%' }}>

                    <Banner />

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route component={Page404} />

                    </Switch>



                </div>
            </Router >

        );
    }


}

export default Student;