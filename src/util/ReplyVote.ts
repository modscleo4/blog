import { useAuthStore } from "../store.js";
import { API_URL, fetchAPI } from './API.js';
import Auth from "./Auth.js";

type BackendReplyVote = {
    id: string;
    userId: string | null;
    replyId: string;
    kind: 'UPVOTE' | 'DOWNVOTE';
    createdAt: string;
    updatedAt?: string;
};

export default class ReplyVote {
    public id: string;
    public userId: string | null;
    public replyId: string;
    public kind: 'UPVOTE' | 'DOWNVOTE';
    public createdAt: Date;
    public updatedAt?: Date;

    constructor({ id = '', userId = null, replyId = '', kind = 'UPVOTE', createdAt = '', updatedAt = '' }: BackendReplyVote) {
        this.id = id;
        this.userId = userId;
        this.replyId = replyId;
        this.kind = kind;
        this.createdAt = new Date(createdAt);
        this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    }

    static async get(replyId: string): Promise<ReplyVote | null> {
        const authStore = useAuthStore();

        if (!authStore.access_token) {
            return null;
        }

        const response = await fetchAPI(`/v1/reply/${replyId}/vote`, {
            method: 'GET',
            auth: true,
            headers: {

            },
        });

        if (response.status === 200) {
            const vote: BackendReplyVote = await response.json();
            return new ReplyVote(vote);
        } else if (response.status === 404) {
            return null;
        }

        throw new Error('Failed to fetch reply vote');
    }

    static async update(replyId: string, { kind }: { kind: 'UPVOTE' | 'DOWNVOTE'; }): Promise<ReplyVote| false> {
        const response = await fetchAPI(`/v1/reply/${replyId}/vote`, {
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
            const vote: BackendReplyVote = await response.json();
            return new ReplyVote(vote);
        } else if (response.status === 403) {
            return false;
        }

        throw new Error('Failed to update reply vote');
    }

    static async delete(replyId: string): Promise<boolean> {
        const response = await fetchAPI(`/v1/reply/${replyId}/vote`, {
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

        throw new Error('Failed to delete reply vote');
    }
}
