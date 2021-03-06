import userAPI from './userAPI';
import tokenService from './tokenService';
import { getSocket } from './socket';

function signup(user) {
  return userAPI.signup(user)
    .then(token => {
      const socket = getSocket();
      tokenService.setToken(token);
      socket.emit('register-user', user.email);
    });
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(user) {
  return userAPI.login(user)
    .then(token => {
      const socket = getSocket();
      tokenService.setToken(token);
      socket.emit('register-user', user.email)
      
    });
}

export default {
  signup,
  getUser,
  logout,
  login
}