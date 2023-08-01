import { defineStore } from 'pinia';
import Post from './util/Post';
import User from './util/User';

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
