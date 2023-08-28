import { useAuthStore } from "../store.js";
import { API_URL, fetchAPI } from './API.js';
import Auth from "./Auth.js";
import { PostContent } from "./content.js";

type BackendReply = {
    id: string,
    userId: string,
    postId: string,
    replyId: string | null,
    content: PostContent,
    votes?: { [key: string]: number },
    replies: { id: string }[],
    createdAt: string;
    updatedAt: string;
};

export default class Reply {
    public id: string;
    public userId: string;
    public postId: string;
    public replyId: string | null;
    public content: PostContent;
    public votes: { [key: string]: number; };
    public replies: { id: string; }[];
    public createdAt: Date;
    public updatedAt?: Date;

    constructor({ id, userId, postId, replyId = null, content = {}, votes = {}, replies = [], createdAt, updatedAt }: BackendReply) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.replyId = replyId;
        this.content = content;
        this.votes = votes;
        this.replies = replies;
        this.createdAt = new Date(createdAt);
        this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    }

    static async getAll(postId: string): Promise<Reply[]> {
        const response = await fetchAPI(`/api/v1/post/${postId}/reply`, {
            method: 'GET',
        });

        if (response.status === 200) {
            const replies: BackendReply[] = await response.json();
            return replies.map(reply => new Reply(reply));
        }

        throw new Error('Post not found');
    }

    static async create({ postId, replyId, content }: { postId: string, replyId?: string, content: object; }): Promise<Reply | false> {
        const response = await fetchAPI(`/api/v1/${replyId ? 'reply' : 'post'}/${replyId ?? postId}/reply`, {
            method: 'POST',
            auth: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
            })
        });

        if (response.status === 201) {
            const newReply = await response.json();
            return new Reply(newReply);
        } else if (response.status === 403) {
            return false;
        }

        throw new Error('Reply not created');
    }

    static async get(id: string): Promise<Reply> {
        const response = await fetchAPI(`/api/v1/reply/${id}`);

        if (response.status === 200) {
            const reply: BackendReply = await response.json();
            return new Reply(reply);
        }

        throw new Error('Reply not found');
    }

    static async update(id: string, { content }: { content: object; }): Promise<Reply | false> {
        const response = await fetchAPI(`/api/v1/post/${id}`, {
            method: 'PUT',
            auth: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
            })
        });

        if (response.status === 200) {
            const updatedPost = await response.json();
            return new Reply(updatedPost);
        } else if (response.status === 403) {
            return false;
        }

        throw new Error('Reply not updated');
    }

    static async delete(id: string): Promise<boolean> {
        const response = await fetchAPI(`/api/v1/reply/${id}`, {
            method: 'DELETE',
            auth: true,
            headers: {

            },
        });

        if (response.status === 204) {
            return true;
        } else if (response.status === 403) {
            return false;
        }

        throw new Error('Reply not deleted');
    }
}
