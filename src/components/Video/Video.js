import React, { Component } from 'react'
import  '../Video/VideoRules.js'


    

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
}

componentDidMount() {
  console.log(new RTCSessionDescription({type: "answer"}).sdp);
}

handleChange(e) {
    this.setState({value: e.target.value })
}

render() {
    return (

        <form onSubmit={this.handleSubmit}>
        <label>
          ID 1
          <textarea id="yourId" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          ID 2
          <textarea id="otherId" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="connect" />
      </form>

    );
  }
}

export default Video