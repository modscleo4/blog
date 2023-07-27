import { useAuthStore, usePostsStore } from "../store.js";
import { API_URL } from './API.js';
import Auth from "./Auth.js";

type BackendVote = {
    id: string;
    userId: string | null;
    postId: string;
    kind: 'UPVOTE' | 'DOWNVOTE';
    createdAt: string;
    updatedAt?: string;
};

export default class Vote {
    public id: string;
    public userId: string | null;
    public postId: string;
    public kind: 'UPVOTE' | 'DOWNVOTE';
    public createdAt: Date;
    public updatedAt?: Date;

    constructor({ id = '', userId = null, postId = '', kind = 'UPVOTE', createdAt = '', updatedAt = '' }: BackendVote) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.kind = kind;
        this.createdAt = new Date(createdAt);
        this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    }

    static async get(postId: string): Promise<Vote | null> {
        const authStore = useAuthStore();

        if (!authStore.access_token) {
            return null;
        }

        await Auth.check();

        const response = await fetch(`${API_URL}/api/v1/post/${postId}/vote`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authStore.access_token}`,
            },
        });

        if (response.status === 200) {
            const vote: BackendVote = await response.json();
            return new Vote(vote);
        } else if (response.status === 404) {
            return null;
        }

        throw new Error('Post not voted');
    }

    static async update(postId: string, { kind }: { kind: 'UPVOTE' | 'DOWNVOTE'; }): Promise<Vote> {
        const authStore = useAuthStore();

        await Auth.check();

        const response = await fetch(`${API_URL}/api/v1/post/${postId}/vote`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.access_token}`,
            },
            body: JSON.stringify({
                kind,
            }),
        });

        if (response.status === 200) {
            const vote: BackendVote = await response.json();
            return new Vote(vote);
        }

        throw new Error('Vote not voted');
    }

    static async delete(postId: string) {
        const authStore = useAuthStore();

        await Auth.check();

        const response = await fetch(`${API_URL}/api/v1/post/${postId}/vote`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authStore.access_token}`,
            },
        });

        if (response.status === 204) {
            return true;
        }

        throw new Error('Vote not deleted');
    }
}
