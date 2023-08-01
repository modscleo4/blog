import { useAuthStore } from "../store.js";
import { API_URL, fetchAPI } from './API.js';
import Auth from "./Auth.js";
import { PostContent } from "./content.js";

type BackendPost = {
    id: string,
    userId: string,
    title: string,
    resume: string,
    content?: PostContent,
    imageUrl: string,
    replies: { id: string }[],
    votes?: { [key: string]: number },
    createdAt: string;
    updatedAt: string;
};

export default class Post {
    public id: string;
    public userId: string;
    public title: string;
    public resume: string;
    public content: PostContent;
    public imageUrl: string;
    public replies: { id: string }[];
    public votes: { [key: string]: number };
    public createdAt: Date;
    public updatedAt?: Date;

    constructor({ id, userId, title, resume, content = {}, imageUrl, replies = [], votes = {}, createdAt, updatedAt }: BackendPost) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.resume = resume;
        this.content = content;
        this.imageUrl = imageUrl;
        this.replies = replies;
        this.votes = votes;
        this.createdAt = new Date(createdAt);
        this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    }

    static async getAll(username?: string): Promise<Post[]> {
        const fields = ['id', 'userId', 'title', 'resume', 'imageUrl', 'createdAt', 'updatedAt', 'user'].join(',');
        const response = await fetchAPI(`/api/v1/post/?fields=${fields}${username ? `&username=${username}` : ''}`, {
            method: 'GET',
        });

        if (response.status === 200) {
            const posts: BackendPost[] = await response.json();
            return posts.map(post => new Post(post));
        }

        throw new Error('Posts not found');
    }

    static async create({ title, resume, content, imageUrl }: { title: string, resume: string, content: object, imageUrl: string; }): Promise<Post> {
        const response = await fetchAPI(`/api/v1/post/`, {
            method: 'POST',
            auth: true,
            headers: {
                'Content-Type': 'application/json',
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
            const post = new Post(newPost);

            return post;
        }

        throw new Error('Post not created');
    }

    static async get(id: string): Promise<Post> {
        const response = await fetchAPI(`/api/v1/post/${id}`, {
            method: 'GET',
        });

        if (response.status === 200) {
            const post: BackendPost = await response.json();
            return new Post(post);
        }

        throw new Error('Post not found');
    }

    static async update(id: string, { title, resume, content, imageUrl }: { title: string, resume: string, content: object, imageUrl: string; }): Promise<Post> {
        const response = await fetchAPI(`/api/v1/post/${id}`, {
            method: 'PUT',
            auth: true,
            headers: {
                'Content-Type': 'application/json',
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
            const post = new Post(updatedPost);

            return post;
        }

        throw new Error('Post not updated');
    }

    static async delete(id: string) {
        const response = await fetchAPI(`/api/v1/post/${id}`, {
            method: 'DELETE',
            auth: true,
            headers: {

            },
        });

        if (response.status === 204) {
            return true;
        }

        throw new Error('Post not deleted');
    }
}
