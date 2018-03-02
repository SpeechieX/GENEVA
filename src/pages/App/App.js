import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import WelcomeScreen from '../../components/WelcomeScreen/WelcomeScreen';
import userService from '../../utils/userService';
// import Video from '../../components/Video/Video';
import NavBar from '../../components/NavBar/NavBar';

import socket, { setApp } from '../../utils/socket';

class App extends Component {
  constructor(props) {
    super(props);
    setApp(this);
    this.state = {
      user: null,
      users: []
    };
  }
  
  handleLogin = () => {
    this.setState({user: userService.getUser()});
  }
  
  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }
  
  handleSignup = () => {
    this.setState({user: userService.getUser()});
  }

  handleUpdateUsers = (users) => {
    this.setState({users});
  }
  
  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
    if (user) socket.emit('register-user', user.email);
    // console.log(new RTCSessionDescription({type: "answer"}).sdp);
    // Make Fetch Request for Users
    // UpdateState w data from Fetch
    // Pass via Props
    // Render Props in Welcome Component 
  }

  

  render() {
    return (
      <div className="App">
          <NavBar />
          {/* {this.props.connected ? 'Connected' : 'Not connected'}
          <button onClick={this.props.onHost}>Host</button>
          <button onClick={this.props.onJoin}>Join</button> */}
          <Router>
            <Switch>
            <Route exact path='/home' render={(props) =>
                <WelcomeScreen
                  {...props}
                  users={this.state.users}
                  myEmail={this.state.user && this.state.user.email}
                />
              }/>

              {/* <Route exact path='/video' render={(props) =>
                <Video
                  {...props}
                />
              }/> */}
              <Route exact path='/login' render={(props) =>
                <LoginPage
                  {...props}
                  handleLogin={this.handleLogin}
                />
              }/>
              <Route exact path='/signup' render={(props) => 
                <SignUpPage
                  {...props}
                  handleSignup={this.handleSignup}
                />
              }/>
            
            
            </Switch>
          </Router>
       


      </div>
    );
  }
}

export default App;
