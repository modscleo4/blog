import { API_URL } from "./API";

export default class User {
    public id: string;
    public username: string;
    public email: string;
    public name: string;

    constructor({ id = '', username = '', email = '', name = '' }: { id: string, username: string, email: string, name: string }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
    }
}
