import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./NavBar.css";
import userService from '../../utils/userService';

import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
    super(props);

};




render() {
    return (
     
      <div className="navbar navbar-inverse bg-dark">
        <nav className="navbar navbar-dark bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          </button>
    { this.props.user && <a className="navbar-brand" href="#">Hello, {this.props.user.name}. Welcome to the Geneva Project</a> }
        <a className="nav-link" href="/home">Connect <span className="sr-only">(current)</span></a>
        { !this.props.user && <a className="nav-link" href="/signup">Create Account <span className="sr-only">(current)</span></a>}
        <a className="nav-link" href="/docs">Documentation <span className="sr-only">(current)</span></a>
        { !this.props.user && <a className="nav-link" href="/login">Login<span className="sr-only">(current)</span></a>}
        { this.props.user && <a className="nav-link" href="/logout" onClick={() => userService.logout()} >Logout <span className="sr-only">(current)</span></a>}
       </nav>
      </div>
     
    );
  }
};






export default NavBar