import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';

import './WelcomeScreen.css';
import { getSocket } from '../../utils/socket';
import App from '../../pages/App/App'


class WelcomeScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        latitude: null,
        longitude: null,
        users: null,
      };
      this.socket = getSocket();
  };

  printPositon = () =>  {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      })
    })
  }
  
  connectToOtherUser = (answererSocketId) => {

    console.info(`${Date.now()}: Let's Connect button clicked`)

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then((stream) => {

      console.info(`${Date.now()}: getUserMedia returned this stream:`)
      console.dir(stream);
      
      stream.getTracks().forEach((track) => {
        this.props.peerConnection.addTrack(track, stream);
      });

      // show local stream
      this.props.handleUpdateStream('localStream', stream);
      
      console.info(`${Date.now()}: done adding tracks to this peerConnection`)
      console.dir(this.props.peerConnection)

      this.props.peerConnection.createOffer()
      .then((sdp) => {

        console.info(`${Date.now()}: offer created and now going to set local description with it`)
        
        return this.props.peerConnection.setLocalDescription(sdp);
      })
      .then(() => {

        console.info(`${Date.now()}: done setting local description and now going to emit offer message`)
        
        let offererSocketId = this.props.users.find(u => u.email === this.props.myEmail).socketId;
        this.socket.emit('offer', { sdp: this.props.peerConnection.localDescription, offererSocketId, answererSocketId});
      });
    })
    
  }
  
  showVideo = () => {

    console.info(`${Date.now()}: showVideo being called`)

    if(this.props.localStream) this.localVideo.srcObject = this.props.localStream; 
    if(this.props.remoteStream) this.remoteVideo.srcObject = this.props.remoteStream; 
  }
  
  
  componentDidMount() {
    
    // fetch('/', { 
    //   method: "GET",
    //   headers: new Headers({'Authorization': 'Bearer ' + tokenService.getToken()})

    // })
    //   .then(data => data.json())
    //   .then(users => console.log(users));
  
    console.info(`${Date.now()}: WelcomeScreen componentDidMount`)
    
    this.showVideo();
    this.printPositon();
  }
  
  componentDidUpdate() {

    console.info(`${Date.now()}: WelcomeScreen componentDidUpdate`)

    this.showVideo();
  }


  render() {
    return (
      
      <div className="userTable">
      <div className="Container">
      <div className="house1">
        <video id="charlie" ref={localVideo => this.localVideo = localVideo} autoPlay={true}/>
      </div>
      <div className="house2">
        <video id="delta" ref={remoteVideo => this.remoteVideo = remoteVideo} autoPlay={true}/>

      </div>
      <table className="UsersList table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Coordinates</th>
            <th scope="col">Connect</th>

          </tr>
        </thead>
        <tbody>
        {this.props.users.map((u, idx) => (
          <tr key={idx}>
            <td scope="row">{u.name}</td>
        {/* { <td scope="row">{this.props.user.name}</td> } */}
            <td scope="row">{u.socketId}</td>
            <td scope="row">{u.email}</td>
        <td className="geotag">
          {this.state.latitude ? this.state.latitude + " " : "grabbing your location.."}{this.state.longitude}
        </td>
            <td>
              { u.email === this.props.myEmail ?
                'Your Connection'
              :
                <button className="btn btn-primary" onClick={() => this.connectToOtherUser(u.socketId)}>Let's Connect</button>
              }
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      </div>
      </div>
    );
  } 
}



export default WelcomeScreen