import Auth from "./Auth";
import { useAuthStore } from "../store";

export const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAPI(path: string, options?: RequestInit & { auth?: boolean }): Promise<Response> {
    const authStore = useAuthStore();

    if (options?.auth) {
        if (!authStore.access_token) {
            throw new Error('Not logged in');
        }

        const { auth, ...rest } = options;
        options = {
            ...rest,
            headers: {
                ...rest?.headers,
                'Authorization': `Bearer ${authStore.access_token}`,
            }
        }
    }

    if (!path.startsWith('/')) {
        path = `/${path}`;
    }

    async function doFetch() {
        return await fetch(`${API_URL}${path}`, options);
    }

    let res = await doFetch();
    if (res.status === 401 && (await Auth.refresh())) {
        if (options) {
            options!.headers = {
                ...options!.headers,
                'Authorization': `Bearer ${authStore.access_token}`,
            }
        }

        res = await doFetch();
    }

    return res;
}
