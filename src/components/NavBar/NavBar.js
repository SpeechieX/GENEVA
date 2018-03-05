import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./NavBar.css";
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
        // <div className='Nav'>
        //   <div className="NavList">
        //     <Link to="/home"><li>HOME</li></Link>
        //     { this.props.user && <Link to="/video"><li>README</li></Link> }
        //     <Link to="/signup"><li>SIGN UP</li></Link>
        //     <Link to="/login"><li>LOGIN</li></Link>
        //   </div>
        // </div>
      <div className="navbar bg-dark navbar-light">
        <nav class="navbar navbar-light bg-faded">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          </button>
        <a class="navbar-brand" href="#">GENEVA</a>
        <a class="nav-link" href="/home">Connect <span class="sr-only">(current)</span></a>
        <a class="nav-link" href="/signup">Account <span class="sr-only">(current)</span></a>
        <a class="nav-link" href="/login">Login <span class="sr-only">(current)</span></a>
        <a class="nav-link" href="/logout">Logout <span class="sr-only">(current)</span></a>
        </nav>
      </div>
     
    );
  }
};






export default NavBar