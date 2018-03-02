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
    <table class="table table-striped table-hover table-responsive">
      <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">ID</th>
        <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
      {this.props.users.map((u, idx) => (
        <tr key={u.socketId}>
        <th scope="row">{idx + 1}</th>
        <th scope="row">{u.socketId}</th>
        <th scope="row">{u.email}</th>
        </tr>
      ))}
      </tbody>
    </table>
    </table>

    </div>
  );
} 
}



export default WelcomeScreen