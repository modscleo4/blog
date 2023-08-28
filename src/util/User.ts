import { fetchAPI } from "./API";
import { useUsersStore } from "../store";

type BackendUser = {
    id: string;
    username: string;
    email?: string;
    name: string;
    bio: string;
    posts?: number;
};

export default class User {
    public id: string;
    public username: string;
    public email?: string;
    public name: string;
    public bio: string;
    public posts?: number;
    public emailVerifiedAt?: string;

    constructor({ id, username, email, name, bio, posts }: BackendUser) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.bio = bio;
        this.posts = posts;
    }

    static async get(id: string) {
        const usersStore = useUsersStore();
        if (usersStore.users.find(user => user.id === id)) {
            return usersStore.users.find(user => user.id === id)!;
        }

        const response = await fetchAPI(`/api/v1/user/${id}`, {
            method: 'GET',
        });

        if (response.status === 200) {
            const foundUser: BackendUser = await response.json();
            const user = new User(foundUser);
            usersStore.addOrUpdateUser(user);

            return user;
        }

        throw new Error('Post not found');
    }
}
