export const errors: Error[] = [];

export function AppError(e: Error) {
    errors.push(e);
}
