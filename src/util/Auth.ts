import { useAuthStore } from "../store.js";

import { API_URL } from "./API.js";
import User from "./User.js";

export default class Auth {
    static handleLogin(access_token: string, refresh_token: string, remember: boolean = false) {
        const authStore = useAuthStore();

        authStore.login(access_token, refresh_token, remember);
    }

    static async login(email: string, password: string, remember: boolean = false) {
        const response = await fetch(`${API_URL}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'password',
                username: email,
                password
            }),
        });

        if (response.status === 201) {
            const { access_token, refresh_token } = await response.json();
            Auth.handleLogin(access_token, refresh_token, remember);
            return await Auth.check();
        }

        throw new Error('Invalid credentials');
    }

    static async refresh(): Promise<boolean> {
        const authStore = useAuthStore();

        if (!authStore.refresh_token) {
            return false;
        }

        const response = await fetch(`${API_URL}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'refresh_token',
                refresh_token: authStore.refresh_token,
            }),
        });

        if (response.status === 201) {
            const { access_token, refresh_token } = await response.json();
            Auth.handleLogin(access_token, refresh_token);
            return true;
        } else {
            authStore.logout();
            return false;
        }
    }

    static async check(): Promise<User | false> {
        const authStore = useAuthStore();

        if (!authStore.access_token) {
            return false;
        }

        const response = await fetch(`${API_URL}/auth/user`, {
            headers: {
                'Authorization': `Bearer ${authStore.access_token}`,
            }
        });

        if (response.status === 200) {
            const user: User = await response.json();
            authStore.fetchUser(user);
            return user;
        } else if (response.status === 401) {
            if (await Auth.refresh()) {
                return await Auth.check();
            }
        }

        throw new Error('Not logged in');
    }

    static async logout() {
        const authStore = useAuthStore();

        authStore.logout();
    }
}
