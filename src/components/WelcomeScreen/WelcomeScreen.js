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

  
  connectToOtherUser = (answererSocketId) => {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then((stream) => {
      stream.getTracks().forEach((track) => {
        this.props.peerConnection.addTrack(track, stream);
      });
      this.props.handleUpdateStream('localStream', stream);
      this.props.peerConnection.createOffer()
      .then((sdp) => {
        return this.props.peerConnection.setLocalDescription(sdp);
      })
      .then(() => {
        let offererSocketId = this.props.users.find(u => u.email === this.props.myEmail).socketId;
        this.socket.emit('offer', { sdp: this.props.peerConnection.localDescription, offererSocketId, answererSocketId});
      });
    })
    
  }



  showVideo = () => {
    if(this.props.localStream) this.localVideo.srcObject = this.props.localStream; 
    if(this.props.remoteStream) this.remoteVideo.srcObject = this.props.remoteStream; 
  }
  
  
  componentDidMount() {
    this.showVideo();
  }

  componentDidUpdate() {
    this.showVideo();
  }


  render() {
    return (
      <div className="userTable">
      <video id="charlie" ref={localVideo => this.localVideo = localVideo} autoPlay={true}/>
      <video id="delta" ref={remoteVideo => this.remoteVideo = remoteVideo} autoPlay={true}/>
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
          <tr key={idx}>
              <td scope="row">{idx + 1}</td>
              <td scope="row">{u.socketId}</td>
              <td scope="row">{u.email}</td>
              <td>
                { u.email === this.props.myEmail ?
                'Your Connection'
              :
              <button className="btn btn-success" onClick={() => this.connectToOtherUser(u.socketid)}>Let's Connect</button>
              }
              </td>
            </tr>
        ))}
        </tbody>
      </table>

      </div>
    );
  } 
}



export default WelcomeScreen