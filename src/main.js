import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import { store } from './store.js';
import App from './App.vue';
const OAuthCallback = () => import('./pages/OAuthCallback.vue');
const Home = () => import('./pages/Home.vue');
const Login = () => import('./pages/Login.vue');
const Profile = () => import('./pages/Profile.vue');
const CreatePost = () => import('./pages/post/Create.vue');
const EditPost = () => import('./pages/post/Edit.vue');

const router = createRouter({
    routes: [
        { path: '/oauth/callback', component: OAuthCallback, props: true },

        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/posts/create', component: CreatePost },
        { path: '/posts/:username/:id/:title', component: Home, props: true },
        { path: '/posts/:id/edit', component: EditPost, props: true },
        { path: '/:username', component: Profile, props: true },
    ],
    history: createWebHistory()
});

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
