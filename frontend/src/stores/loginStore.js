import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('loggedUser', {
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      isLoggedIn: localStorage.getItem('isLoggedIn') || false,
      username: localStorage.getItem('username') || '',
      showAlert: false,
      failLogin: false,
      loginSuccess: false,
    };
  },
  actions: {
    async login(username, password) {
      const loginBody = {
        username: username,
        password: password,
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/login',
          loginBody
        );
        //console.log('Svar från servern:', response.data);
        this.loginSuccess = true;
        this.token = response.data.token;
        this.isLoggedIn = true;
        this.username = response.data.username;
        localStorage.setItem('token', this.token);
        localStorage.setItem('isLoggedIn', this.isLoggedIn);
        localStorage.setItem('username', this.username);
      } catch (error) {
        this.failLogin = true;
        console.error('Något gick fel: ', error.message);
      }
    },
    logout() {
      this.username = null;
      this.token = null;
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');

      this.router.push({ path: '/' });
    },

    async register(username, password, firstName) {
      const registerBody = {
        username: username,
        password: password,
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/register',
          registerBody
        );
        console.log('Svar från servern:', response.data);
        this.createNewUser(firstName, username);
      } catch (error) {
        console.error('Något gick fel: ', error);
      }
    },

    async createNewUser(name, username) {
      const inputBody = {
        firstName: name,
        email: username,
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/api/users',
          inputBody
        );
        console.log('Svar från servern:', response.data);
        this.showAlert = true;
      } catch (error) {
        console.error('Något gick fel: ', error);
      }
    },
  },
});
