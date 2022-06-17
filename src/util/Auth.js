import { store } from "../store.js";

import { API_URL } from "./API.js";

export default class Auth {
    static async login(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 200) {
            const user = await response.json();
            store.commit('login', user);
            store.commit('token', user.api_token);
            return user;
        }

        throw new Error('Invalid credentials');
    }

    static async check() {
        const response = await fetch(`${API_URL}/user`, {
            headers: {
                'X-Auth-Token': store.state.token ?? '',
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
    }
}
