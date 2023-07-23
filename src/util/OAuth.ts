import { API_URL } from "./API.js";
import Auth from "./Auth.js";

export default class OAuth {
    static async getAuthURL() {
        const response = await fetch(`${API_URL}/oauth/login`, {
            method: 'GET',
        });

        if (response.status === 200) {
            const { url } = await response.json();
            return url;
        }

        throw new Error('Auth URL not found');
    }

    static async getUserInfo(code: string, state: string, session_state: string) {
        const response = await fetch(`${API_URL}/oauth/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                state,
                session_state,
            }),
        });

        if (response.status === 201) {
            const { access_token, refresh_token } = await response.json();
            Auth.handleLogin(access_token, refresh_token, true);
            return await Auth.check();
        }

        throw new Error('User info not found');
    }
}
