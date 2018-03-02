import React, {Component} from 'react';
import WelcomeScreen from '../../components/WelcomeScreen/WelcomeScreen';
import './Welcome.css';

import socket from '../../utils/socket';

class Welcome extends Component {
    constructor(props) {
      super(props);
      this.state = {message: ''}
    }

    sendOfferToConnect = (socketId) => {
        // get media streams
        // and other stuff
        // to get the sdp
        let sdp = null;
        let mySocketId = this.props.users.find(u => u.email === this.props.myEmail).socketId;
        socket.broadcast.to(socketId).emit('recieve-offer', {sdp: sdp, socketId: mySocketId});
    }
  
    render() {
      return (
        <div className='Welcome'>
          <WelcomeScreen
            {...this.props}
            updateMessage={this.updateMessage}
            handleSignup={this.props.handleSignup}
          />
          <p>{this.state.message}</p>
        </div>
      );
    }
  };


export default Welcome