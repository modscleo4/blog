import { useToastsStore } from '../store.js';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type Toast = {
    id: string;
    type: ToastType;
    title: string;
    message: string;
    timeout: number | null;
};

export function showToast(
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success',
    timeout: number = 5000
): string {
    const toastsStore = useToastsStore();

    return toastsStore.addToast(type, title, message, timeout);
}

export function showErrorToast(error: Error, timeout: number = 5000): string {
    const toastsStore = useToastsStore();

    return toastsStore.addError(error, timeout);
}
