import React from 'react';

class Home extends React.Component {

    render() {
        return (<pre className="d-block">{localStorage.getItem('user')}</pre>);
    }

}

export default Home;