import { store } from "../store.js";

import { API_URL } from "./API.js";
import Auth from "./Auth.js";

export default class OAuth {
    static async getAuthURL() {
        const response = await fetch(`${API_URL}/oauth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                redirect_uri: import.meta.env.VITE_APP_URL + '/oauth/callback'
            }),
        });

        if (response.status === 200) {
            const authURL = await response.json();
            return authURL.url;
        }

        throw new Error('Auth URL not found');
    }

    static async getUserInfo(code, state, session_state) {
        const response = await fetch(`${API_URL}/oauth/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                state,
                session_state,
                redirect_uri: import.meta.env.VITE_APP_URL + '/oauth/callback',
            }),
        });

        if (response.status === 200) {
            const {user, token} = await response.json();
            Auth.handleLogin(user, token, true);
            return user;
        }

        throw new Error('User info not found');
    }
}
