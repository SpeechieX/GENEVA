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
    this.state = {
        user: "",
        time: ""

    }; 
}




render() {
    return (
        <div className='Nav'>
          <div className="NavList">
            <li>DOCS</li>
            <li>MORE</li>
          </div>
        </div>
    );
  }
};






export default NavBar