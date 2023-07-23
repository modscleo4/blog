import { defineStore } from 'pinia';
import Post from './util/Post';
import User from './util/User';

export const useAuthStore = defineStore('user', {
    state: () => ({
        access_token: localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token') ?? sessionStorage.getItem('refresh_token'),
        user: null as User | null,
    }),
    actions: {
        login(access_token: string, refresh_token: string, remember: boolean = false) {
            this.access_token = access_token;
            this.refresh_token = refresh_token;

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

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('refresh_token');
        }
    }
});

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [] as Post[],
    }),
    actions: {
        updatePosts(posts: Post[]) {
            this.posts = posts;
        },

        addOrUpdatePost(post: Post) {
            const index = this.posts.findIndex(p => p.id === post.id);
            if (index !== -1) {
                this.posts[index] = post;
            } else {
                this.posts.push(post);
            }
        },

        deletePost(id: string) {
            this.posts = this.posts.filter(p => p.id !== id);
        }
    }
});
