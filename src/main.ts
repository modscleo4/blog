import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import { createPinia } from 'pinia';

import App from './App.vue';

const OAuthCallback = () => import('./pages/OAuthCallback.vue');
const Home          = () => import('./pages/Home.vue');
const Login         = () => import('./pages/Login.vue');
const Profile       = () => import('./pages/Profile.vue');
const ViewPost      = () => import('./pages/post/View.vue');
const CreatePost    = () => import('./pages/post/Create.vue');
const EditPost      = () => import('./pages/post/Edit.vue');
const VerifyEmail   = () => import('./pages/VerifyEmail.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/oauth/callback', component: OAuthCallback, props: true },
        { path: '/email/verify', component: VerifyEmail },

        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/posts/create', component: CreatePost },
        { path: '/posts/:id', component: ViewPost, props: true },
        { path: '/posts/:id/:title', component: ViewPost, props: true },
        { path: '/posts/:id/edit', component: EditPost, props: true },
        { path: '/@:username', component: Profile, props: true },
    ],
});

const store = createPinia();

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
