import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import './WelcomeScreen.css';
import { getSocket } from '../../utils/socket';


class WelcomeScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
      this.socket = getSocket();
  };

  
  connectToOtherUser = (socketId) => {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then((stream) => {
      this.props.peerConnection.addStream(stream);
      this.props.peerConnection.createOffer()
      .then((sdp) => {
        return this.props.peerConnection.setLocalDescription(sdp);
      })
      .then(() => {
        let mySocketId = this.props.users.find(u => u.email === this.props.myEmail).socketId;
        this.socket.emit('recieve-offer', {sdp: this.props.peerConnection.localDescription, socketId: mySocketId, targetSocketId: socketId});
      });
    })
    
  }

  showVideo = () => {
    if(this.props.stream) this.videoEl.srcObject = this.props.stream; 
  }
  
  
  componentDidMount() {
    this.showVideo();
  }

  componentDidUpdate() {
    this.showVideo();
  }


  render() {
    return (
      <div className="Container">
      <video ref={videoEl => this.videoEl = videoEl} autoPlay={true}/>
      <table className="UsersList table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">Connect</th>
          </tr>
        </thead>
        <tbody>
        {this.props.users.map((u, idx) => (
          u.email === this.props.myEmail ?
            null
          :
            <tr key={u.socketId}>
              <td scope="row">{idx + 1}</td>
              <td scope="row">{u.socketId}</td>
              <td scope="row">{u.email}</td>
              <td><button className="btn btn-primary" onClick={() => this.connectToOtherUser(u.socketId)}>Let's Connect</button></td>
            </tr>
        ))}
        </tbody>
      </table>

      </div>
    );
  } 
}



export default WelcomeScreen