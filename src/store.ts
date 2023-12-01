import { defineStore } from 'pinia';
import Post from './util/Post.js';
import User from './util/User.js';
import { Toast, ToastType } from './util/toast.js';

export const useAuthStore = defineStore('user', {
    state: () => ({
        access_token: localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token') ?? sessionStorage.getItem('refresh_token'),
        remember: localStorage.getItem('access_token') !== null || localStorage.getItem('refresh_token') !== null,
        user: null as User | null,
    }),
    actions: {
        login(access_token: string, refresh_token: string, remember: boolean = false) {
            this.access_token = access_token;
            this.refresh_token = refresh_token;
            this.remember = remember;

            if (remember) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
            } else {
                sessionStorage.setItem('access_token', access_token);
                sessionStorage.setItem('refresh_token', refresh_token);
            }
        },

        fetchUser(user: User) {
            this.user = user;
        },

        logout() {
            this.access_token = null;
            this.refresh_token = null;
            this.user = null;
            this.remember = false;

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('refresh_token');
        }
    }
});

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as User[],
    }),
    actions: {
        updateUsers(users: User[]) {
            this.users = users;
        },

        addOrUpdateUser(post: User) {
            const index = this.users.findIndex(p => p.id === post.id);
            if (index !== -1) {
                this.users[index] = post;
            } else {
                this.users.push(post);
            }
        },
    }
});

export const useToastsStore = defineStore('toast', {
    state: () => ({
        toasts: [] as Toast[],
    }),
    actions: {
        addError(error: Error, timeout: number | null = 5000): string {
            return this.addToast('error', error.name, error.message, timeout);
        },

        addToast(type: ToastType, title: string, message: string, timeout: number | null = 5000): string {
            const id = crypto.randomUUID();

            this.toasts.push({
                id,
                type,
                title,
                message,
                timeout,
            });

            if (timeout !== null) {
                setTimeout(() => {
                    this.removeToast(id);
                }, timeout);
            }

            return id;
        },

        removeToast(id: string): boolean {
            const index = this.toasts.findIndex(t => t.id === id);
            if (index !== -1) {
                this.toasts.splice(index, 1);
            }

            return index !== -1;
        }
    }
});
