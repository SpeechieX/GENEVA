import React from 'react';
import LoginForm from '../../components/LoginForm/Login';
import './LoginPage.css';
import NavBar from '../../components/NavBar/NavBar';

const LoginPage = (props) => {
  return (
    <div className='LoginPage'>
      <img src="https://i.imgur.com/QTbFQUl.png" />
        <h3>Enter Your Creds and let's get started.</h3>
      <LoginForm
        {...props}
        />
    </div>
  );
};

export default LoginPage;