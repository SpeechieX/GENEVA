import React from 'react';
import LoginForm from '../../components/LoginForm/Login';
import './LoginPage.css';

const LoginPage = (props) => {
  return (
    <div className='LoginPage'>
      <LoginForm
        {...props}
      />
    </div>
  );
};

export default LoginPage;