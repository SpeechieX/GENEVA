import React, {Component} from 'react';
import WelcomeScreen from '../../components/WelcomeScreen/WelcomeScreen';
import './Welcome.css';

import socket from '../../utils/socket';

class Welcome extends Component {
    constructor(props) {
      super(props);
      this.state = {message: ''}
    }
  
    render() {
      return (
        <div className='Welcome'>
          <WelcomeScreen
            {...this.props}
            updateMessage={this.updateMessage}
            handleSignup={this.props.handleSignup}
          />
          <p>{this.state.message}</p>
        </div>
      );
    }
  };


export default Welcome