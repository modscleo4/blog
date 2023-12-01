import { useAuthStore } from "../store.js";

import { API_URL, fetchAPI } from "./API.js";
import User from "./User.js";
import { showErrorToast, showToast } from "./toast.js";

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
            Auth.handleLogin(access_token, refresh_token, authStore.remember);
            return true;
        } else if (response.status === 401) {
            authStore.logout();
            return false;
        } else {
            return false;
        }
    }

    static async check(): Promise<User | false> {
        const authStore = useAuthStore();

        if (!authStore.access_token) {
            return false;
        }

        const response = await fetchAPI(`/auth/user`, {
            method: 'GET',
            auth: true,
            headers: {

            }
        });

        if (response.status === 200) {
            const user: User = await response.json();
            if (user.emailVerifiedAt === null) {
                showToast('Verificar email', 'Verifique seu email para poder postar e comentar', 'warning');
            } else if (authStore.user?.emailVerifiedAt === null) {
                showToast('Email verificado', 'Seu email foi verificado com sucesso!', 'info');
            }

            authStore.fetchUser(user);
            return user;
        } else if (response.status === 401) {
            authStore.logout();
            return false;
        }

        throw new Error('Not logged in');
    }

    static async requestEmailVerification(): Promise<void> {
        const response = await fetchAPI(`/auth/email/verify`, {
            method: 'POST',
            auth: true,
            headers: {

            }
        });

        if (response.status === 201) {
            showToast('Email enviado', 'Um email de verificação foi enviado para você', 'info');
            return;
        }

        throw new Error('Email not sent');
    }

    static async verifyEmail(token: string): Promise<boolean> {
        const response = await fetch(`${API_URL}/auth/email/verify?token=${token}`, {
            method: 'GET',
        });

        if (response.ok) {
            return true;
        }

        const body = await response.json();
        const message = body.message || 'Erro desconhecido';

        showToast('Erro ao verificar email', message, 'error');

        return false;
    }

    static async logout() {
        const authStore = useAuthStore();

        authStore.logout();
    }
}
