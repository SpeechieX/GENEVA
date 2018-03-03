import React, {Component} from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import './SignUpPage.css';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <div className='SignUpPage'>
        <img src="https://i.imgur.com/QTbFQUl.png"/>
        <SignUpForm
          {...this.props}
          updateMessage={this.updateMessage}
          handleSignup={this.props.handleSignup}
        />
        <p>{this.state.message}</p>
      </div>
    );
  }
};

export default SignUpPage;