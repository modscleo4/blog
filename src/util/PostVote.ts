import { useAuthStore } from "../store.js";
import { API_URL, fetchAPI } from './API.js';
import Auth from "./Auth.js";

type BackendPostVote = {
    id: string;
    userId: string | null;
    postId: string;
    kind: 'UPVOTE' | 'DOWNVOTE';
    createdAt: string;
    updatedAt?: string;
};

export default class PostVote {
    public id: string;
    public userId: string | null;
    public postId: string;
    public kind: 'UPVOTE' | 'DOWNVOTE';
    public createdAt: Date;
    public updatedAt?: Date;

    constructor({ id = '', userId = null, postId = '', kind = 'UPVOTE', createdAt = '', updatedAt = '' }: BackendPostVote) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.kind = kind;
        this.createdAt = new Date(createdAt);
        this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    }

    static async get(postId: string): Promise<PostVote | null> {
        const authStore = useAuthStore();

        if (!authStore.access_token) {
            return null;
        }

        const response = await fetchAPI(`/v1/post/${postId}/vote`, {
            method: 'GET',
            auth: true,
            headers: {

            },
        });

        if (response.status === 200) {
            const vote: BackendPostVote = await response.json();
            return new PostVote(vote);
        } else if (response.status === 404) {
            return null;
        }

        throw new Error('Failed to fetch post vote');
    }

    static async update(postId: string, { kind }: { kind: 'UPVOTE' | 'DOWNVOTE'; }): Promise<PostVote | false> {
        const response = await fetchAPI(`/v1/post/${postId}/vote`, {
            method: 'PUT',
            auth: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kind,
            }),
        });

        if (response.status === 200) {
            const vote: BackendPostVote = await response.json();
            return new PostVote(vote);
        } else if (response.status === 403) {
            return false;
        }

        throw new Error('Failed to update post vote');
    }

    static async delete(postId: string): Promise<boolean> {
        const response = await fetchAPI(`/v1/post/${postId}/vote`, {
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

        throw new Error('Failed to delete post vote');
    }
}
