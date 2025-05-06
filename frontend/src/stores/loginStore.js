import { defineStore } from 'pinia';
import axios from 'axios';
import axios from 'axios';

export const useLoginStore = defineStore(
    "loggedUser", {
    state: () => {
        return {
            token: localStorage.getItem('token') || null,
            isLoggedIn: localStorage.getItem('isLoggedIn') || false,
            username: '',
        }
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
                console.log('Svar från servern:', response.data);
                this.token = response.data.token;
                console.log(this.token);
                this.isLoggedIn = true;
                this.username = response.data.username;
                localStorage.setItem('token', this.token);
                localStorage.setItem('isLoggedIn', this.isLoggedIn);
            } catch (error) {
                console.error('Något gick fel: ', error);
            }
        },
        logout() {
            this.username = null;
            this.token = null;
            this.isLoggedIn = false;
            localStorage.removeItem('token');
        },
        async register(
            username,
            password
        ) {
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
            } catch (error) {
                console.error('Något gick fel: ', error);
            }
        },
        async createNewUser(firstName, lastName, phone, email, city) {
            const inputBody = {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                city: city,
            };
            console.log(inputBody);
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/users',
                    inputBody
                );
                console.log('Svar från servern:', response.data);
            } catch (error) {
                console.error('Något gick fel: ', error);
            }
        },
    }
})