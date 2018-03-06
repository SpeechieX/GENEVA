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
    // source argument needs to be sent as either 'localStream', or 'remoteStream'
    console.info(`${Date.now()}: ${source} going to be updated on App's state.stream`)
    
    this.setState({[source]: stream});
  }
  
  componentDidMount() {
    const socket = getSocket();
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
      <div className="geneva">
          <NavBar user={this.state.user} handleLogout={this.handleLogout}/>
          {/* {this.props.connected ? 'Connected' : 'Not connected'}
          <button onClick={this.props.onHost}>Host</button>
          <button onClick={this.props.onJoin}>Join</button> */}
          <Switch>
            <Route exact path='/home' render={(props) =>
                userService.getUser() ?
                <WelcomeScreen
                  {...props}
                  localStream={this.state.localStream}
                  remoteStream={this.state.remoteStream}
                  users={this.state.users}
                  myEmail={this.state.user && this.state.user.email}
                  peerConnection={this.state.peerConnection}
                  handleUpdateStream={this.handleUpdateStream}
                />
                :
                <Redirect to='/login' />
              }/>

             
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


