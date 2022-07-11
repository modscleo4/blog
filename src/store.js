import { createStore } from 'vuex';

export const store = createStore({
    state: {
        token: localStorage.getItem('token'),
        user: null,
        posts: [],
    },
    mutations: {
        login(state, user) {
            state.user = user;
        },

        token(state, token) {
            state.token = token;
        },

        updatePosts(state, posts) {
            state.posts = posts;
        },

        updatePost(state, post) {
            const index = state.posts.findIndex(p => p.id === post.id);
            if (index !== -1) {
                state.posts[index] = post;
            } else {
                state.posts.push(post);
            }
        },

        deletePost(state, id) {
            state.posts = state.posts.filter(p => p.id !== id);
        },
    },
});
