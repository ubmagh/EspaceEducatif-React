import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Banner from './Common/Banner';
import Footer from './Common/Footer';
import Page404 from './Common/404Page';
import Home from './Home/Home';



class Student extends React.Component {


    render() {

        return (
            <Router>
                <Banner />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route component={Page404} />

                </Switch>

                <Footer />


            </Router>
        );
    }


}

export default Student;