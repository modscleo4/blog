import { useAuthStore, usePostsStore } from "../store.js";
import { API_URL } from './API.js';

type PostContentBlock = {
    type: 'paragraph',
    data: {
        text: string,
    },
} | {
    type: 'header',
    data: {
        text: string,
        level: number,
    },
} | {
    type: 'code',
    data: {
        code: string,
    },
};

export type PostContent = {
    time?: number,
    blocks?: PostContentBlock[],
    version?: string,
};

export default class Post {
    public id: string;
    public userId: string | null;
    public title: string;
    public resume: string;
    public content: PostContent;
    public imageUrl: string;
    public user: { username: string; };

    constructor({ id = '', userId = null, title = '', resume = '', content = { }, imageUrl = '#', user = { username: '' } }: { id: string, userId: string | null, title: string, resume: string, content: PostContent, imageUrl: string, user: { username: string; }; }) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.resume = resume;
        this.content = content;
        this.imageUrl = imageUrl;
        this.user = user;
    }

    static async getAll() {
        const response = await fetch(`${API_URL}/api/v1/post/`);

        if (response.status === 200) {
            const posts: Post[] = await response.json();
            return posts.map(post => new Post(post));
        }

        throw new Error('Posts not found');
    }

    static async create({ title, resume, content, imageUrl }: { title: string, resume: string, content: object, imageUrl: string }): Promise<Post> {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/api/v1/post/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (authStore.access_token ?? ''),
            },
            body: JSON.stringify({
                title,
                resume,
                content,
                imageUrl,
            })
        });

        if (response.status === 201) {
            const newPost = await response.json();
            return new Post(newPost);
        }

        throw new Error('Post not created');
    }

    static async get(id: string) {
        const postsStore = usePostsStore();

        if (postsStore.posts.length > 0) {
            const post = postsStore.posts.find(p => p.id === id);
            if (post) {
                return post;
            }
        }

        const response = await fetch(`${API_URL}/api/v1/post/${id}`);

        if (response.status === 200) {
            const post = await response.json();
            return new Post(post);
        }

        throw new Error('Post not found');
    }

    static async update(id: string, { title, resume, content, imageUrl }: { title: string, resume: string, content: object, imageUrl: string }): Promise<Post> {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/api/v1/post/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (authStore.access_token ?? ''),
            },
            body: JSON.stringify({
                title,
                resume,
                content,
                imageUrl,
            })
        });

        if (response.status === 200) {
            const updatedPost = await response.json();
            return new Post(updatedPost);
        }

        throw new Error('Post not updated');
    }

    static async delete(id: string) {
        const authStore = useAuthStore();

        const response = await fetch(`${API_URL}/api/v1/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authStore.access_token}`,
            },
        });

        if (response.status === 204) {
            return true;
        }

        throw new Error('Post not deleted');
    }
}
