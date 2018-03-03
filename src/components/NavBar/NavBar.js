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
        <div className='Nav'>
          <div className="NavList">
            <Link to="/home"><li>HOME</li></Link>
            { this.props.user && <Link to="/video"><li>README</li></Link> }
            <Link to="/signup"><li>SIGN UP</li></Link>
            <Link to="/login"><li>LOGIN</li></Link>
          </div>
        </div>
    );
  }
};






export default NavBar