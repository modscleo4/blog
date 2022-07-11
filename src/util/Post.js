import { store } from "../store.js";
import { API_URL } from './API.js';

export default class Post {
    constructor({id = 0, user_id = null, title = '', resume = '', body = '', image = '#', user = { username: '' } }) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.resume = resume;
        this.body = body;
        this.image = image;
        this.user = user;
    }

    static async getAll() {
        const response = await fetch(`${API_URL}/post/`);

        if (response.status === 200) {
            const posts = await response.json();
            return posts.map(post => new Post(post));
        }

        throw new Error('Posts not found');
    }

    static async create(post) {
        const response = await fetch(`${API_URL}/post/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': store.state.token ?? '',
            },
            body: JSON.stringify(post)
        });

        if (response.status === 201) {
            const newPost = await response.json();
            return new Post(newPost);
        }

        throw new Error('Post not created');
    }

    static async get(id) {
        const response = await fetch(`${API_URL}/post/${id}`);

        if (response.status === 200) {
            const post = await response.json();
            return new Post(post);
        }

        throw new Error('Post not found');
    }

    static async update(post) {
        const response = await fetch(`${API_URL}/post/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': store.state.token ?? '',
            },
            body: JSON.stringify(post)
        });

        if (response.status === 200) {
            const updatedPost = await response.json();
            return new Post(updatedPost);
        }

        throw new Error('Post not updated');
    }

    static async delete(post) {
        const response = await fetch(`${API_URL}/post/${post.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': store.state.token ?? '',
            },
        });

        if (response.status === 204) {
            return true;
        }

        throw new Error('Post not deleted');
    }
}
