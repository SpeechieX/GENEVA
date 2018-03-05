import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import WelcomeScreen from '../../components/WelcomeScreen/WelcomeScreen';
import userService from '../../utils/userService';
// import Video from '../../components/Video/Video';
import NavBar from '../../components/NavBar/NavBar';

import { getSocket, setApp, setPeerConnection } from '../../utils/socket';

class App extends Component {
  constructor(props) {
    super(props);
    setApp(this);
    this.state = {
      user: null,
      users: [],
      localStream: null,
      remoteStream: null,
      peerConnection: new RTCPeerConnection()
    };
    setPeerConnection(this.state.peerConnection);
  }


  printPositon = () =>  {
    navigator.geolocation.getCurrentPosition(success)
    function success(position){
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      console.log(latitude, longitude);
  }
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

  handleUpdateStream = (source, stream) => {
    this.setState({[source]: stream});
  }
  
  componentDidMount() {
    const socket = getSocket();
    let user = userService.getUser();
    this.setState({user});
    if (user) socket.emit('register-user', user.email);
    this.printPositon();
    // console.log(new RTCSessionDescription({type: "answer"}).sdp);
    // Make Fetch Request for Users
    // UpdateState w data from Fetch
    // Pass via Props
    // Render Props in Welcome Component 
  }

  

  render() {
    return (
      <div className="geneva">
          {/* <img id="geneva"src="https://i.imgur.com/Bfjla2A.png" /> */}
          <NavBar user={this.state.user}/>
          {/* {this.props.connected ? 'Connected' : 'Not connected'}
          <button onClick={this.props.onHost}>Host</button>
          <button onClick={this.props.onJoin}>Join</button> */}
          <Switch>
            <Route exact path='/home' render={(props) =>
                <WelcomeScreen
                  {...props}
                  localStream={this.state.localStream}
                  RemoteStream={this.state.remoteStream}
                  users={this.state.users}
                  myEmail={this.state.user && this.state.user.email}
                  peerConnection={this.state.peerConnection}
                  handleUpdateStream={this.handleUpdateStream}
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
       


      </div>
    );
  }
}

export default App;
