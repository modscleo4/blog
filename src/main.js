import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import { store } from './store.js';
import App from './App.vue';
const Home = () => import('./pages/Home.vue');
const Login = () => import('./pages/Login.vue');
const Profile = () => import('./pages/Profile.vue');
const CreatePost = () => import('./pages/post/Create.vue');
const EditPost = () => import('./pages/post/Edit.vue');

const router = createRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/posts/create', component: CreatePost },
        { path: '/posts/:id/edit', component: EditPost, props: true },
        { path: '/:username', component: Profile, props: true },
    ],
    history: createWebHistory()
});

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
