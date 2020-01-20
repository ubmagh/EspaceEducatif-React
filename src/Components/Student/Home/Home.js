import React from 'react';
import LeftWidget from './Parts/Left-Widget';
import Posts from './Parts/Posts';
import RightWidget from './Parts/Right-Widget';

class Home extends React.Component {

    render() {
        return (

            <div className="main-section">
                <div className="container">
                    <div className="main-section-data">
                        <div className="row mt-3">

                            <LeftWidget />
                            <Posts />
                            <RightWidget />

                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default Home;