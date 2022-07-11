import { store } from "../store.js";

import { API_URL } from "./API.js";

export default class Auth {
    static handleLogin(user, token, remember = false) {
        store.commit('login', user);
        store.commit('token', token);

        if (remember) {
            localStorage.setItem('token', token);
        }
    }

    static async login(email, password, remember = false) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 200) {
            const {user, token} = await response.json();
            Auth.handleLogin(user, token, remember);
            return user;
        }

        throw new Error('Invalid credentials');
    }

    static async check() {
        const response = await fetch(`${API_URL}/user`, {
            headers: {
                'Authorization': 'Bearer ' + (store.state.token ?? ''),
            }
        });

        if (response.status === 200) {
            const user = await response.json();
            return user;
        }

        throw new Error('Not logged in');
    }

    static async logout() {
        store.commit('login', null);
        store.commit('token', null);
        localStorage.removeItem('token');
    }
}
