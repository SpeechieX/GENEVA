import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { render } from 'react-dom';
import "../../components/WelcomeScreen/WelcomeScreen.css"
import {
    BrowserRouter,
    Link,
    Switch,
    Route
} from 'react-router-dom';

const Docs = () => (
    <div>
        <p className="docs">
        
        <img width="450px"src="https://i.imgur.com/Bfjla2A.png"/>
        <br/>

        GENEVA - A CODEC EXPERIMENT
        
        I originally wanted to build a security communications device that helps you chat with someone in a safe zone in real time. Using Technologies like WebRTC and Socket.IO, I was able to create a real time P2P video conference between two peers simultaneously.
        
        Geneva also generates location coordinates of each participant via the IP or Wi-Fi associated with each devices position.
        
        This experiment represents the beginning steps of a greater project. For now, feel free to chat with your friends seamlessly using the flow of WebRTC.
        
        <br/>
        
        
        
         
        
         
        
        </p>
    </div>
)


export default Docs;