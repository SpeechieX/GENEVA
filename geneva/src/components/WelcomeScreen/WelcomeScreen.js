import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import './WelcomeScreen.css';


class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };





render() {
  return (
    <div className="Container">
    <table className="UsersList">
      <thead>
        <tr>
          <td>#</td>
          <td>ID</td>
          <td>email</td>
        </tr>
      </thead>
      <tbody>
      {this.props.users.map((u, idx) => (
        <tr key={u.socketId}>
          <td>{idx + 1}</td>
          <td>{u.socketId}</td>
          <td>{u.email}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
  );
} 
}



export default WelcomeScreen