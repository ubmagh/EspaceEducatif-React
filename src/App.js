import React from 'react';
import Landing from './Components/Landing/index';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Student from './Components/Student/index';
import Prof from './Components/Prof/index';

import Loading from './Components/Common/Loading';


class App extends React.Component {

  componentDidMount() {
    setTimeout(() =>
      this.setState({ Loading: false }), 2000);
  }


  constructor(props) {

    super(props);

    this.state = { Loading: true, loged: false, user: '', token: localStorage.getItem('LogToken') };


    //Methode GET est non-sécurisée mais pour sa vitesse de réponse je l'ai utilisée ici

    if (localStorage.getItem('LogToken') + ''.length !== 0) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/TokenVerification',
        params: {
          token: localStorage.getItem('LogToken'),
          LastLogDate: localStorage.getItem('LastLogDate'),
        },
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => {

          //var getUrl = window.location;
          // var baseUrl = getUrl.protocol + "//" + getUrl.host + '/';

          if (res.data.error + '' !== 'none') {
            localStorage.clear();

            // window.open(baseUrl);
            // window.location = baseUrl;
            window.location.reload();

          } else {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('details', JSON.stringify(res.data.details));
            localStorage.setItem('LastLogDate', res.data.LastLogDate);
            this.setState({ loged: true, user: res.data.user });

          }

        })
        .catch(err => {
          console.log('error connectin the server ' + err);
        });

    }
    ///// end Axios

    //// masquer l'écran loading


  }






  render() {

    if (this.state.Loading) {
      return <Loading />
    }

    if (this.state.loged) {

      if (this.state.user.UserType === 'etud')
        return (
          <Student />
        );
      else if (this.state.user.UserType === 'prof')
        return (
          <Prof />
        );

    } else
      return (

        <Landing />

      );
  }
}

export default App;
